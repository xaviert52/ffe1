import { NavLink, useLocation } from 'react-router-dom';
import { useUIStore } from '@/store/ui.store';
import { useAuthStore } from '@/store/auth.store';
import {
  LayoutDashboard,
  Link2,
  Users,
  FileBarChart,
  Shield,
  ListChecks,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/store/auth.store';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['principal', 'operativo', 'auditor'] },
  { label: 'Procesos', path: '/dashboard/procesos', icon: ListChecks, roles: ['principal', 'operativo', 'auditor'] },
  { label: 'Generar Enlace', path: '/dashboard/generar-enlace', icon: Link2, roles: ['principal', 'operativo'] },
  { label: 'Usuarios', path: '/dashboard/usuarios', icon: Users, roles: ['principal'] },
  { label: 'Reportes', path: '/dashboard/reportes', icon: FileBarChart, roles: ['auditor'] },
  { label: 'Auditoría', path: '/dashboard/auditoria', icon: Shield, roles: ['auditor'] },
];

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) return null;

  const filteredItems = NAV_ITEMS.filter((item) => item.roles.includes(user.role));

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={cn(
          'fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-sm font-heading font-semibold text-sidebar-foreground">Menú</span>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-sidebar-foreground hover:bg-sidebar-accent">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/50 text-center">Marko © 2026</p>
        </div>
      </aside>
    </>
  );
};
