# Scheda

App personale per allenamento, abitudini quotidiane e progressi. Funziona dal telefono, anche offline, e manda promemoria.

Indirizzo: https://francesco-05.github.io/scheda/

## Installarla sull'iPhone

1. Apri l'indirizzo in **Safari**.
2. Tocca **Condividi** → **Aggiungi alla schermata Home** → **Aggiungi**.
3. Apri la Scheda dall'icona sulla Home.

## Attivare le notifiche

1. Dall'app (aperta dall'icona sulla Home): **Coach** → **Attiva notifiche** → consenti.
2. Copia il codice che compare.
3. Salvalo nel repository come secret: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**, nome `PUSH_CONFIG`, valore = il codice.
4. Prova: scheda **Actions** → **Notifiche** → **Run workflow**.

Promemoria: 10:30 acqua, 18:00 passi (o palestra lunedì, mercoledì e venerdì), 21:00 bilancio della giornata.

Nota: GitHub sospende i workflow programmati dopo 60 giorni senza modifiche al repository e manda un'email. Per riattivarli basta aprire **Actions** → **Notifiche** → **Enable workflow**.

## Dati

I dati restano sul telefono. Fai ogni tanto un backup da **Coach** → **Backup** → **Esporta**.
