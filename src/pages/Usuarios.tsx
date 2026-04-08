import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Edit, Trash2, Shield } from 'lucide-react';

const MOCK_USERS = [
  { id: '1', name: 'Ana García', email: 'operador@marko.com', role: 'operativo', status: 'activo' },
  { id: '2', name: 'Luis Torres', email: 'auditor@marko.com', role: 'auditor', status: 'activo' },
  { id: '3', name: 'Carmen Ruiz', email: 'carmen@marko.com', role: 'operativo', status: 'inactivo' },
];

const Usuarios = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Gestión de Usuarios</h1>
        <p className="text-sm text-muted-foreground">Administra los usuarios del sistema</p>
      </div>
      <Button><UserPlus className="h-4 w-4 mr-2" /> Nuevo Usuario</Button>
    </div>
    <div className="grid gap-4">
      {MOCK_USERS.map((u) => (
        <Card key={u.id}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{u.name}</p>
                <p className="text-sm text-muted-foreground">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="capitalize">{u.role}</Badge>
              <Badge variant={u.status === 'activo' ? 'default' : 'secondary'}>{u.status}</Badge>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Usuarios;
