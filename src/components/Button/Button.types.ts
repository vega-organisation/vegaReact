import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Le contenu du bouton
   */
  children: ReactNode;
  /**
   * La variante du bouton
   */
  variant?: "primary" | "secondary" | "danger" | "success";
  /**
   * La taille du bouton
   */
  size?: "small" | "medium" | "large";
  /**
   * Bouton en pleine largeur
   */
  fullWidth?: boolean;
  /**
   * L'icône à afficher dans le bouton
   */
  icon?: ReactNode;
  /**
   * La position de l'icône
   */
  iconPos?: "left" | "right" | "top" | "bottom";
  /**
   * Outline
   */
  outline?: boolean;
}
