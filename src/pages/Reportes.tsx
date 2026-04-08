import { Card, CardContent } from '@/components/ui/card';
import { FileBarChart, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reportes = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Reportes</h1>
      <p className="text-sm text-muted-foreground">Genera y descarga reportes detallados</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { title: 'Reporte General', desc: 'Resumen de todos los procesos', icon: FileBarChart },
        { title: 'Reporte Financiero', desc: 'Costos y facturación detallada', icon: Download },
        { title: 'Reporte por Período', desc: 'Filtrado por rango de fechas', icon: Calendar },
      ].map((r, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
              <r.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
            <Button variant="outline" size="sm" className="w-full">Generar</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Reportes;
