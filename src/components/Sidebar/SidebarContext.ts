import { createContext, useContext } from 'react';

export interface SidebarContextValue {
  isExpanded: boolean;
  toggle: () => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarContext(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebarContext must be used within <Sidebar>');
  return ctx;
}
