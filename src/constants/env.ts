// Centralise la lecture des variables d'environnement EXPO_PUBLIC_*.
// Ne pas lire process.env directement ailleurs dans le code : passer par
// ce module pour avoir un seul endroit a corriger si une variable change.

function requirePublicEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(
      `Variable d'environnement manquante : ${name}. Copie .env.example vers .env et renseigne-la.`
    );
  }
  return value;
}

export const env = {
  apiUrl: requirePublicEnv('EXPO_PUBLIC_API_URL', 'http://localhost:8000'),
};