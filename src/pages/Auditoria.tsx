import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, User, Monitor } from 'lucide-react';

const MOCK_LOGS = [
  { action: 'Inicio de sesión', user: 'Carlos Mendoza', ip: '192.168.1.45', date: '2026-04-08 09:15:32' },
  { action: 'Creación de enlace', user: 'Ana García', ip: '192.168.1.78', date: '2026-04-08 09:12:10' },
  { action: 'Eliminación de usuario', user: 'Carlos Mendoza', ip: '192.168.1.45', date: '2026-04-07 17:45:00' },
  { action: 'Exportación de reporte', user: 'Luis Torres', ip: '192.168.1.92', date: '2026-04-07 16:30:22' },
  { action: 'Cambio de permisos', user: 'Carlos Mendoza', ip: '192.168.1.45', date: '2026-04-07 15:12:08' },
];

const Auditoria = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Trail de Auditoría</h1>
      <p className="text-sm text-muted-foreground">Historial completo de acciones del sistema</p>
    </div>
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Acción</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Usuario</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">IP</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LOGS.map((l, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 text-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0" />{l.action}
                  </td>
                  <td className="py-3 px-4 text-foreground"><span className="flex items-center gap-1"><User className="h-3 w-3" />{l.user}</span></td>
                  <td className="py-3 px-4 text-muted-foreground font-mono text-xs hidden md:table-cell"><span className="flex items-center gap-1"><Monitor className="h-3 w-3" />{l.ip}</span></td>
                  <td className="py-3 px-4 text-muted-foreground"><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{l.date}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Auditoria;
