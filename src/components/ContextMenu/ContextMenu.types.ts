export interface ContextMenuProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  items?: {
    icon: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  }[];
}
