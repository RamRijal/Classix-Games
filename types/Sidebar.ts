export interface SidebarItem {
  id: number;
  text: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void;
}
export interface SidebarProps {
  items?: SidebarItem[];
  expanded?: boolean;
  isdarkMode?: boolean;
  toggleTheme: () => void;
  onToggle?: (expanded: boolean) => void;
  expandedWidth?: number;
  collapsedWidth?: number;
}
