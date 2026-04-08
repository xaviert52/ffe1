import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import {
  FileText,
  Fingerprint,
  Smartphone,
  ScanFace,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const STEPS = [
  { label: 'Documentos', icon: FileText },
  { label: 'Código Dactilar', icon: Fingerprint },
  { label: 'OTP', icon: Smartphone },
  { label: 'Biométrico', icon: ScanFace },
  { label: 'Finalización', icon: CheckCircle2 },
];

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center gap-1 mb-8">
    {STEPS.map((step, i) => (
      <div key={i} className="flex items-center">
        <div
          className={cn(
            'flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold transition-all duration-300',
            i < currentStep
              ? 'bg-success text-success-foreground'
              : i === currentStep
              ? 'bg-primary text-primary-foreground shadow-lg scale-110'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {i < currentStep ? <CheckCircle2 className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
        </div>
        {i < STEPS.length - 1 && (
          <div className={cn('w-8 sm:w-12 h-0.5 mx-1', i < currentStep ? 'bg-success' : 'bg-border')} />
        )}
      </div>
    ))}
  </div>
);

// Step 1: Documents
const StepDocuments = ({ onNext, onReject }: { onNext: () => void; onReject: () => void }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptRead, setAcceptRead] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-heading font-bold text-foreground">Revisión de Documentos</h2>
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Visor de documentos PDF</p>
              <p className="text-xs mt-1">(Integración con PDF.js)</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox checked={acceptTerms} onCheckedChange={(c) => setAcceptTerms(c === true)} className="mt-0.5" />
          <span className="text-sm text-foreground">Acepto los términos y condiciones del servicio</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox checked={acceptRead} onCheckedChange={(c) => setAcceptRead(c === true)} className="mt-0.5" />
          <span className="text-sm text-foreground">Confirmo haber leído todos los documentos presentados</span>
        </label>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onReject} className="flex-1">Rechazar</Button>
        <Button onClick={onNext} disabled={!acceptTerms || !acceptRead} className="flex-1">
          Continuar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 2: Fingerprint Code
const StepFingerprint = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    setStatus('loading');
    setTimeout(() => {
      if (code.length === 10) setStatus('success');
      else setStatus('error');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-heading font-bold text-foreground">Validación de Código Dactilar</h2>
      <Card>
        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">Ingresa tu código dactilar de 10 dígitos para verificar tu identidad.</p>
          <Input
            placeholder="0123456789"
            maxLength={10}
            value={code}
            onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); setStatus('idle'); }}
            className="text-center text-lg tracking-widest font-mono"
          />
          {status === 'success' && (
            <div className="flex items-center gap-2 text-success text-sm"><CheckCircle2 className="h-4 w-4" /> Código verificado exitosamente</div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-destructive text-sm"><AlertCircle className="h-4 w-4" /> Código incorrecto. Debe tener 10 dígitos.</div>
          )}
          <Button onClick={validate} disabled={code.length < 10 || status === 'loading'} className="w-full">
            {status === 'loading' ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verificando...</> : 'Verificar Código'}
          </Button>
        </CardContent>
      </Card>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" /> Atrás</Button>
        <Button onClick={onNext} disabled={status !== 'success'} className="flex-1">
          Continuar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 3: OTP
const StepOTP = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const sendOtp = () => {
    setSent(true);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const verifyOtp = () => {
    if (otp === '123456') setVerified(true);
    else setAttempts((a) => a + 1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-heading font-bold text-foreground">Verificación OTP</h2>
      <Card>
        <CardContent className="p-6 space-y-4">
          {!sent ? (
            <>
              <p className="text-sm text-muted-foreground">Se enviará un código de verificación de 6 dígitos a tu medio registrado.</p>
              <Button onClick={sendOtp} className="w-full">Enviar Código</Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Ingresa el código de 6 dígitos. (Código demo: 123456)</p>
              <Input
                placeholder="000000"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="text-center text-2xl tracking-[0.5em] font-mono"
              />
              {timer > 0 && <p className="text-xs text-muted-foreground text-center">Reenviar en {timer}s</p>}
              {timer === 0 && attempts < 3 && <Button variant="link" onClick={sendOtp} className="text-xs p-0 h-auto">Reenviar código</Button>}
              {attempts >= 3 && <p className="text-destructive text-sm">Máximo de intentos alcanzado</p>}
              {verified && <div className="flex items-center gap-2 text-success text-sm"><CheckCircle2 className="h-4 w-4" /> Código verificado</div>}
              {!verified && <Button onClick={verifyOtp} disabled={otp.length < 6 || attempts >= 3} className="w-full">Verificar</Button>}
            </>
          )}
        </CardContent>
      </Card>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" /> Atrás</Button>
        <Button onClick={onNext} disabled={!verified} className="flex-1">Continuar <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );
};

// Step 4: Biometric
const StepBiometric = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'error'>('idle');

  const capture = () => {
    setStatus('capturing');
    setTimeout(() => {
      setStatus('processing');
      setTimeout(() => setStatus('success'), 1500);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-heading font-bold text-foreground">Validación Biométrica</h2>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center border border-border relative overflow-hidden">
            {status === 'idle' && (
              <div className="text-center text-muted-foreground">
                <ScanFace className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Cámara desactivada</p>
              </div>
            )}
            {status === 'capturing' && (
              <div className="text-center text-info">
                <div className="h-32 w-24 border-2 border-info rounded-full mx-auto mb-2 animate-pulse-soft" />
                <p className="text-sm">Centre su rostro en el óvalo</p>
              </div>
            )}
            {status === 'processing' && (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-12 w-12 mx-auto mb-2 animate-spin" />
                <p className="text-sm">Procesando imagen...</p>
              </div>
            )}
            {status === 'success' && (
              <div className="text-center text-success">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm font-medium">Identidad verificada</p>
              </div>
            )}
            {status === 'error' && (
              <div className="text-center text-destructive">
                <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Error en verificación</p>
              </div>
            )}
          </div>
          {(status === 'idle' || status === 'error') && (
            <Button onClick={capture} className="w-full">
              <ScanFace className="mr-2 h-4 w-4" /> {status === 'error' ? 'Reintentar' : 'Iniciar Captura'}
            </Button>
          )}
        </CardContent>
      </Card>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" /> Atrás</Button>
        <Button onClick={onNext} disabled={status !== 'success'} className="flex-1">Continuar <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );
};

// Step 5: Completion
const StepCompletion = () => (
  <div className="text-center space-y-6 py-8 animate-scale-in">
    <div className="h-20 w-20 rounded-full bg-success/15 flex items-center justify-center mx-auto">
      <CheckCircle2 className="h-10 w-10 text-success" />
    </div>
    <div>
      <h2 className="text-2xl font-heading font-bold text-foreground">¡Proceso Completado!</h2>
      <p className="text-muted-foreground mt-2">Gracias por utilizar nuestro servicio de validación.</p>
      <p className="text-sm text-muted-foreground mt-1">Su identidad ha sido verificada exitosamente.</p>
    </div>
  </div>
);

// Rejection Modal
const RejectionScreen = () => (
  <div className="text-center space-y-4 py-8 animate-fade-in">
    <AlertCircle className="h-16 w-16 text-warning mx-auto" />
    <h2 className="text-xl font-heading font-bold text-foreground">Proceso Cancelado</h2>
    <p className="text-muted-foreground">Gracias por utilizar el servicio. Puede regresar en cualquier momento.</p>
  </div>
);

const PublicValidation = () => {
  const [step, setStep] = useState(0);
  const [rejected, setRejected] = useState(false);

  if (rejected) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg"><CardContent className="p-8"><RejectionScreen /></CardContent></Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-start flex-col p-4 pt-8">
        <div className="w-full max-w-lg">
          <StepIndicator currentStep={step} />
          <Card className="border-border shadow-lg">
            <CardContent className="p-6">
              {step === 0 && <StepDocuments onNext={() => setStep(1)} onReject={() => setRejected(true)} />}
              {step === 1 && <StepFingerprint onNext={() => setStep(2)} onBack={() => setStep(0)} />}
              {step === 2 && <StepOTP onNext={() => setStep(3)} onBack={() => setStep(1)} />}
              {step === 3 && <StepBiometric onNext={() => setStep(4)} onBack={() => setStep(2)} />}
              {step === 4 && <StepCompletion />}
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Paso {step + 1} de {STEPS.length} — {STEPS[step].label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicValidation;
