import { Card, CardContent } from '@/components/ui/card';
import { MOCK_PROCESSES } from '@/utils/mock-data';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';
import { useState } from 'react';
import type { ProcessStatus } from '@/types/process.types';
import { cn } from '@/lib/utils';

const statusConfig: Record<ProcessStatus, { label: string; className: string }> = {
  activo: { label: 'Activo', className: 'bg-info/15 text-info border-info/30' },
  completado: { label: 'Completado', className: 'bg-success/15 text-success border-success/30' },
  fallido: { label: 'Fallido', className: 'bg-destructive/15 text-destructive border-destructive/30' },
  pendiente: { label: 'Pendiente', className: 'bg-warning/15 text-warning border-warning/30' },
  vencido: { label: 'Vencido', className: 'bg-muted text-muted-foreground border-border' },
};

const Procesos = () => {
  const [search, setSearch] = useState('');
  const filtered = MOCK_PROCESSES.filter(
    (p) => p.clientName.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Procesos</h1>
          <p className="text-sm text-muted-foreground">Gestión y seguimiento de validaciones</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Filtros</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Exportar</Button>
        </div>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar por código o cliente..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Código</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Cliente</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Empresa</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Estado</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden lg:table-cell">Pasos</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">{p.code}</td>
                    <td className="py-3 px-4 text-foreground">{p.clientName}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{p.company}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={statusConfig[p.status].className}>{statusConfig[p.status].label}</Badge>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex gap-1">
                        {p.steps.map((s, i) => (
                          <div
                            key={i}
                            className={cn('h-2 w-6 rounded-full', {
                              'bg-success': s.status === 'completado',
                              'bg-info animate-pulse-soft': s.status === 'en_proceso',
                              'bg-destructive': s.status === 'error',
                              'bg-border': s.status === 'pendiente',
                            })}
                            title={`${s.name}: ${s.status}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">
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

export default Procesos;
