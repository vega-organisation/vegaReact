import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Le contenu de la carte
   */
  children?: ReactNode;
  /**
   * La variante de la carte
   */
  variant?: 'default' | 'outlined';
  /**
   * Image d'en-tête optionnelle
   */
  headerImage?: string;
  /**
   * Ratio de l'image (16:9, 1:1, etc.)
   */
  imageRatio?: '16:9' | '1:1' | '4:3';
  /**
   * Titre de la carte
   */
  title?: string;
  /**
   * Sous-titre de la carte
   */
  subtitle?: string;
  /**
   * Padding interne personnalisé
   */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /**
   * Si la carte est sélectionnée
   */
  selected?: boolean;
  /**
   * Si la carte est désactivée
   */
  disabled?: boolean;
}
