// Règles miroir des contraintes @Assert côté backend (App\Entity\Reader).

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "L'email est requis.";
  if (!EMAIL_REGEX.test(email)) return "Format d'email invalide.";
  return null;
}

export function validateUsername(username: string): string | null {
  if (!username.trim()) return "Le nom d'utilisateur est requis.";
  if (username.length < 3 || username.length > 30) {
    return "Le nom d'utilisateur doit contenir entre 3 et 30 caractères.";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Le mot de passe est requis.';
  if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.';
  return null;
}

export function validatePasswordMatch(password: string, confirmation: string): string | null {
  if (!confirmation) return 'La confirmation du mot de passe est requise.';
  if (password !== confirmation) return 'Les mots de passe ne correspondent pas.';
  return null;
}
