# Runbook incidents - ECHO (Frontend)

> Note : Sentry et EAS Update ne sont pas encore configures (voir audit-socle-exploitation.md). Les procedures ci-dessous decrivent l'etat cible, pas encore la realite operationnelle.

## 1. L'app plante massivement en production

1. Verifier le dashboard de crash reporting (Sentry une fois integre).
2. Identifier si le bug vient du code JS (corrigeable en OTA) ou de code natif (recompilation requise).
3. Si JS : publier un correctif via EAS Update (section 2).
4. Si natif : corriger, recompiler, soumettre aux stores.

## 2. Rollback d'une version buguee (OTA)

```bash
eas update:list --branch production
eas update:republish --group <id-precedent> --branch production
```

## 3. L'API backend est indisponible

- Le `ErrorBoundary` global (`src/components/error-boundary.tsx`) evite un ecran blanc, mais ne gere pas encore un etat "API down" explicite.
- A terme : une couche `services/api/client.ts` centralisant les appels API devra gerer les erreurs reseau.

## 4. Contacts / escalade

- A completer (binome DEMIREL / VALENDUC).