// Manda una notifica push al telefono. Lanciato da GitHub Actions (.github/workflows/notifiche.yml).
// PUSH_CONFIG è un secret del repository: il codice che l'app mostra in Coach → Notifiche.
import webpush from "web-push";

const raw = process.env.PUSH_CONFIG;
if (!raw) {
  console.log("PUSH_CONFIG non impostato: nessuna notifica inviata.");
  process.exit(0);
}
const cfg = JSON.parse(Buffer.from(raw.trim(), "base64").toString("utf8"));
webpush.setVapidDetails("https://francesco-05.github.io/scheda/", cfg.publicKey, cfg.privateKey);

const TZ = "Europe/Rome";
const SLOTS = { 10: "acqua", 18: "passi", 21: "sera" };

// Che ora era in Italia nel momento programmato? Le righe cron sono in UTC e ce n'è una per l'ora
// legale e una per l'ora solare: parte solo quella che corrisponde all'orario italiano giusto.
function slotFromSchedule(cron) {
  const [min, hour] = cron.trim().split(/\s+/).map(Number);
  const now = new Date();
  const at = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hour, min));
  const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", hour12: false }).format(at));
  return SLOTS[h] || null;
}

const manual = process.env.EVENT === "workflow_dispatch";
const slot = manual ? (process.env.SLOT || "test") : slotFromSchedule(process.env.SCHEDULE || "");
if (!slot) {
  console.log("Riga cron dell'altro fuso (ora legale/solare): niente da inviare.");
  process.exit(0);
}

const weekday = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "short" }).format(new Date());
const gymDay = ["Mon", "Wed", "Fri"].includes(weekday);
const dayIndex = Math.floor(Date.now() / 86400000);
const pick = (arr) => arr[dayIndex % arr.length];

const MESSAGES = {
  test: [{ title: "Scheda", body: "Le notifiche da GitHub funzionano. Ci sentiamo alle 10:30." }],
  acqua: [
    { title: "Pausa acqua", body: "Un bicchiere adesso e segnalo nell'app. Due prima di pranzo e sei avanti." },
    { title: "Acqua", body: "A che punto sei? Riempi la bottiglia e tienila vicino." },
    { title: "Pausa acqua", body: "Il fegato lavora meglio idratato. Un bicchiere e un tocco su + Bicchiere." },
    { title: "Acqua", body: "Un bicchiere ora vale 2 punti. Facili." }
  ],
  passi: ["Sun", "Wed"].includes(weekday)
    ? [
        { title: "Meal prep", body: "Stasera 45 minuti di prep e i pranzi dei prossimi tre giorni sono pronti. Passaggi e spesa sono nella scheda Cibo." },
        { title: "Oggi si prepara", body: "Forno a 200°C, una teglia, un pentolino: tre pranzi pronti. Apri Cibo → Meal prep." }
      ]
    : gymDay
    ? [
        { title: "Oggi palestra", body: "Anche solo i primi tre esercizi valgono. Apri la Scheda e premi Inizia." },
        { title: "Giorno di palestra", body: "Borsa pronta? Un'ora per te, il resto può aspettare." },
        { title: "Oggi si allena", body: "Non serve la seduta perfetta, serve la seduta. Ci vediamo in palestra." }
      ]
    : [
        { title: "Passi", body: "Una camminata di 20 minuti adesso e l'obiettivo è quasi fatto." },
        { title: "Muoviti un po'", body: "Guarda quanti passi hai nell'app Salute e segnali. Ne mancano tanti? Giro dell'isolato." },
        { title: "Passi", body: "Hai una telefonata da fare? Falla camminando." }
      ],
  sera: [
    { title: "Chiudi la giornata", body: "2 minuti: come stai, come hai dormito, le priorità di domani. La serie ti aspetta." },
    { title: "Fine giornata", body: "Svuota la testa prima di dormire: scrivi e riordina, poi spegni." },
    { title: "Com'è andata oggi?", body: "Anche se è andata così così, chiudila lo stesso: la serie si costruisce anche con le giornate no." },
    { title: "Ultimo tocco", body: "Priorità di domani e una cosa fatta bene. Poi a letto: anche il sonno fa dimagrire." }
  ]
};

const msg = pick(MESSAGES[slot] || MESSAGES.test);
try {
  await webpush.sendNotification(cfg.subscription, JSON.stringify({ ...msg, tag: slot, url: slot === "sera" ? "./?checkin=1" : "./?tab=today" }), { TTL: 4 * 3600 });
  console.log(`Inviata (${slot}): ${msg.title}`);
} catch (err) {
  console.error("Invio fallito:", err.statusCode, err.body || err.message);
  if (err.statusCode === 404 || err.statusCode === 410) {
    console.error("L'iscrizione alle notifiche non è più valida: riattivale dall'app e aggiorna il secret PUSH_CONFIG.");
  }
  process.exit(1);
}
