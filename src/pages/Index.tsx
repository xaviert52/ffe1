import { useUIStore } from '@/store/ui.store';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Fingerprint, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { theme } = useUIStore();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl text-center animate-fade-in space-y-8">
          <img
            src={theme === 'dark' ? 'https://primecore.lat/image/marko-logo.png' : 'https://primecore.lat/image/marko-logo-dark.png'}
            alt="Marko"
            className="h-14 mx-auto object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground leading-tight">
            Plataforma de Validación<br />
            <span className="text-accent">de Identidad</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Verificación segura y eficiente mediante documentos, código dactilar, OTP y biometría facial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/validacion">
              <Button size="lg" className="w-full sm:w-auto">
                Iniciar Validación <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Panel Administrativo
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            {[
              { icon: FileCheck, title: 'Documentos', desc: 'Visor PDF con aceptación de términos' },
              { icon: Fingerprint, title: 'Biométrico', desc: 'Verificación facial en tiempo real' },
              { icon: Shield, title: 'Seguro', desc: 'OTP y código dactilar integrados' },
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border">
                <f.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
