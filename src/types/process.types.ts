export type ProcessStatus = 'activo' | 'completado' | 'fallido' | 'pendiente' | 'vencido';

export interface ProcessStep {
  name: string;
  status: 'completado' | 'pendiente' | 'error' | 'en_proceso';
  timestamp?: string;
  detail?: string;
}

export interface ValidationProcess {
  id: string;
  code: string;
  clientName: string;
  clientEmail: string;
  status: ProcessStatus;
  createdAt: string;
  completedAt?: string;
  steps: ProcessStep[];
  company: string;
}

export interface DashboardMetrics {
  totalProcesses: number;
  successfulProcesses: number;
  failedProcesses: number;
  pendingProcesses: number;
  successRate: number;
  avgTimeMinutes: number;
  totalCost: number;
  costBreakdown: {
    registroCivil: number;
    otp: number;
    biometrico: number;
    pki: number;
  };
}
