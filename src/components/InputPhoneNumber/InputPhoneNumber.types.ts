import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputPhoneNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
  /**
   * Le label du champ
   */
  label?: string;
  /**
   * Le texte placeholder
   */
  placeholder?: string;
  /**
   * La valeur du champ (contrôlé)
   */
  value: string;
  /**
   * Callback appelé lors du changement de valeur
   */
  onChange: (value: string) => void;
  /**
   * Message d'erreur à afficher
   */
  error?: string;
  /**
   * Indique si la validation est réussie
   */
  success?: boolean;
  /**
   * Texte d'aide contextuelle
   */
  helperText?: string;
  /**
   * Icône à afficher à gauche
   */
  iconLeft?: ReactNode;
  /**
   * Icône à afficher à droite
   */
  iconRight?: ReactNode;
  /**
   * La taille du champ
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Champ en pleine largeur
   */
  fullWidth?: boolean;
}
