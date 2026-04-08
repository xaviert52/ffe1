import { Card, CardContent } from '@/components/ui/card';
import { Link2, FileUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const GenerarEnlace = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Generar Enlace de Validación</h1>
      <p className="text-sm text-muted-foreground">Crea un nuevo enlace para enviar al cliente</p>
    </div>
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nombre del cliente</Label>
            <Input placeholder="Nombre completo" />
          </div>
          <div className="space-y-2">
            <Label>Correo electrónico</Label>
            <Input type="email" placeholder="cliente@email.com" />
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input placeholder="+52 555 123 4567" />
          </div>
          <div className="space-y-2">
            <Label>Empresa</Label>
            <Input placeholder="Nombre de empresa" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Notas adicionales</Label>
          <Textarea placeholder="Información relevante sobre el proceso..." rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Documentos PDF</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
            <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Arrastra archivos PDF o haz clic para seleccionar</p>
            <p className="text-xs text-muted-foreground mt-1">Máximo 10MB por archivo</p>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1"><Eye className="mr-2 h-4 w-4" /> Previsualizar</Button>
          <Button className="flex-1"><Link2 className="mr-2 h-4 w-4" /> Generar Enlace</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default GenerarEnlace;
