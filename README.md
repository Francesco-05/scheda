# Scheda

Hub personale dal telefono: allenamento, cibo, abitudini, soldi, pensieri, studio e progressi. Funziona anche offline e manda promemoria.

Indirizzo: https://francesco-05.github.io/scheda/

## Installarla sull'iPhone

1. Apri l'indirizzo in **Safari**.
2. Tocca **Condividi** → **Aggiungi alla schermata Home** → **Aggiungi**.
3. Apri la Scheda dall'icona sulla Home.

## Cosa c'è dentro

- **Oggi**: abitudini, acqua, passi, serie di giorni, livello, sfide della settimana e check-in serale «Chiudi la giornata».
- **Palestra**: sedute A/B/C con carichi, recuperi e progressione automatica.
- **Cibo**: diario con testo libero e calcolo delle calorie, meal prep, lista della spesa, guida per mangiare fuori.
- **Soldi**: spese ed entrate personali e dell'agenzia, budget del mese, obiettivi di risparmio.
- **Mente**: registratore di pensieri con trascrizione, riordino delle idee e sezione **Studio** (timer di concentrazione, argomenti per esame, interrogazione con il coach AI).
- **Tu**: progressi, premi, impostazioni, collegamento con Salute, coach AI, backup.

## Collegamento con Salute

Si fa con un Comando Rapido che copia passi e peso negli appunti in questo formato:

```
SCHEDA;passi=8432;peso=109,4
```

La guida passo passo è nell'app, in **Tu** → **Collegamento con Salute**. Poi basta toccare **Importa da Salute**.

## Coach AI (facoltativo)

Usa una chiave personale di Anthropic (console.anthropic.com). La chiave e il profilo restano solo sul telefono, non finiscono mai in questo repository. Si attiva da **Tu** → **Coach AI**.

## Attivare le notifiche

1. Dall'app (aperta dall'icona sulla Home): **Tu** → **Notifiche** → **Attiva notifiche** → consenti.
2. Copia il codice che compare.
3. Salvalo nel repository come secret: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**, nome `PUSH_CONFIG`, valore = il codice.
4. Prova: scheda **Actions** → **Notifiche** → **Run workflow**.

Promemoria: 9:45 sabato e domenica studio, 10:30 acqua (martedì e giovedì: palestra a pranzo), 18:00 passi o meal prep, 21:00 check-in della giornata.

Nota: GitHub sospende i workflow programmati dopo 60 giorni senza modifiche al repository e manda un'email. Per riattivarli basta aprire **Actions** → **Notifiche** → **Enable workflow**.

## Dati

I dati restano sul telefono. Fai ogni tanto un backup da **Tu** → **Backup** → **Esporta**.
