import type { HTMLAttributes } from 'react';

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  /** The code to display */
  code: string;
  /** The programming language of the code */
  language?: string;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Whether to show a copy button */
  showCopyButton?: boolean;
  /** Label for the code block (e.g. filename) */
  label?: string;
  /** The theme variant of the code block */
  variant?: 'dark' | 'light';
  /** Whether the code is editable */
  isEditable?: boolean;
  /** Callback when the code is changed (only if isEditable is true) */
  onCodeChange?: (newCode: string) => void;
}
