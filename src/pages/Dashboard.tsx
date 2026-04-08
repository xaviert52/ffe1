import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MOCK_METRICS, MOCK_CHART_DATA, MOCK_PROCESSES } from '@/utils/mock-data';
import { useAuthStore } from '@/store/auth.store';
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Activity,
  Timer,
  BarChart3,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ProcessStatus } from '@/types/process.types';
import { cn } from '@/lib/utils';

const statusConfig: Record<ProcessStatus, { label: string; className: string }> = {
  activo: { label: 'Activo', className: 'bg-info/15 text-info border-info/30' },
  completado: { label: 'Completado', className: 'bg-success/15 text-success border-success/30' },
  fallido: { label: 'Fallido', className: 'bg-destructive/15 text-destructive border-destructive/30' },
  pendiente: { label: 'Pendiente', className: 'bg-warning/15 text-warning border-warning/30' },
  vencido: { label: 'Vencido', className: 'bg-muted text-muted-foreground border-border' },
};

const MetricCard = ({ title, value, icon: Icon, subtitle, className }: {
  title: string; value: string | number; icon: React.ElementType; subtitle?: string; className?: string;
}) => (
  <Card className={cn('animate-fade-in', className)}>
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuthStore();
  const m = MOCK_METRICS;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Panel de control — Vista de {user?.role === 'principal' ? 'Administrador' : user?.role === 'operativo' ? 'Operador' : 'Auditor'}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Procesos" value={m.totalProcesses.toLocaleString()} icon={BarChart3} subtitle="Último periodo" />
        <MetricCard title="Exitosos" value={m.successfulProcesses.toLocaleString()} icon={CheckCircle} subtitle={`${m.successRate}% tasa de éxito`} />
        <MetricCard title="Fallidos" value={m.failedProcesses.toLocaleString()} icon={XCircle} subtitle="Requieren atención" />
        <MetricCard title="Pendientes" value={m.pendingProcesses.toLocaleString()} icon={Clock} subtitle="En espera" />
      </div>

      {/* Second row - role specific */}
      {user?.role === 'principal' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Costo Total" value={`$${m.totalCost.toLocaleString()}`} icon={DollarSign} subtitle="Periodo actual" />
          <MetricCard title="Registro Civil" value={`$${m.costBreakdown.registroCivil.toLocaleString()}`} icon={Activity} />
          <MetricCard title="Biométrico" value={`$${m.costBreakdown.biometrico.toLocaleString()}`} icon={TrendingUp} />
          <MetricCard title="Tiempo Promedio" value={`${m.avgTimeMinutes} min`} icon={Timer} subtitle="Por proceso" />
        </div>
      )}

      {/* Chart */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Procesos por día</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Legend />
                <Bar dataKey="exitosos" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fallidos" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pendientes" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Processes */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Procesos Recientes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Código</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Cliente</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Empresa</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Estado</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden md:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PROCESSES.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 font-mono text-xs text-foreground">{p.code}</td>
                    <td className="py-3 px-2 text-foreground">{p.clientName}</td>
                    <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{p.company}</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className={statusConfig[p.status].className}>
                        {statusConfig[p.status].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">
                      {new Date(p.createdAt).toLocaleDateString('es-ES')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
