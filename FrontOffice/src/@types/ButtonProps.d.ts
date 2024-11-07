export interface ButtonProps {
  to?: string; // Pour les liens de navigation
  onClick?: () => void; // Pour les boutons d'action
  children: React.ReactNode; // Contenu du bouton (texte)
  className?: string; // Classe supplémentaire si nécessaire
}
