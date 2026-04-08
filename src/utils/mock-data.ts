import type { DashboardMetrics, ValidationProcess } from '@/types/process.types';

export const MOCK_METRICS: DashboardMetrics = {
  totalProcesses: 12847,
  successfulProcesses: 10234,
  failedProcesses: 1456,
  pendingProcesses: 1157,
  successRate: 79.6,
  avgTimeMinutes: 4.2,
  totalCost: 45230.50,
  costBreakdown: {
    registroCivil: 12500,
    otp: 8400,
    biometrico: 15330.50,
    pki: 9000,
  },
};

export const MOCK_PROCESSES: ValidationProcess[] = [
  {
    id: '1', code: 'VAL-2026-001', clientName: 'María López', clientEmail: 'maria@email.com',
    status: 'completado', createdAt: '2026-04-07T10:30:00', completedAt: '2026-04-07T10:34:12', company: 'Financiera ABC',
    steps: [
      { name: 'Documentos', status: 'completado', timestamp: '2026-04-07T10:30:15' },
      { name: 'Código Dactilar', status: 'completado', timestamp: '2026-04-07T10:31:02' },
      { name: 'OTP', status: 'completado', timestamp: '2026-04-07T10:32:30' },
      { name: 'Biométrico', status: 'completado', timestamp: '2026-04-07T10:33:45' },
      { name: 'Finalización', status: 'completado', timestamp: '2026-04-07T10:34:12' },
    ],
  },
  {
    id: '2', code: 'VAL-2026-002', clientName: 'José Ramírez', clientEmail: 'jose@email.com',
    status: 'fallido', createdAt: '2026-04-07T11:00:00', company: 'Seguros XYZ',
    steps: [
      { name: 'Documentos', status: 'completado', timestamp: '2026-04-07T11:00:20' },
      { name: 'Código Dactilar', status: 'completado', timestamp: '2026-04-07T11:01:15' },
      { name: 'OTP', status: 'error', timestamp: '2026-04-07T11:03:00', detail: 'Máximo de intentos alcanzado' },
      { name: 'Biométrico', status: 'pendiente' },
      { name: 'Finalización', status: 'pendiente' },
    ],
  },
  {
    id: '3', code: 'VAL-2026-003', clientName: 'Ana Torres', clientEmail: 'ana@email.com',
    status: 'activo', createdAt: '2026-04-08T09:15:00', company: 'Banco Nacional',
    steps: [
      { name: 'Documentos', status: 'completado', timestamp: '2026-04-08T09:15:30' },
      { name: 'Código Dactilar', status: 'en_proceso' },
      { name: 'OTP', status: 'pendiente' },
      { name: 'Biométrico', status: 'pendiente' },
      { name: 'Finalización', status: 'pendiente' },
    ],
  },
  {
    id: '4', code: 'VAL-2026-004', clientName: 'Pedro Sánchez', clientEmail: 'pedro@email.com',
    status: 'pendiente', createdAt: '2026-04-08T08:00:00', company: 'Financiera ABC',
    steps: [
      { name: 'Documentos', status: 'pendiente' },
      { name: 'Código Dactilar', status: 'pendiente' },
      { name: 'OTP', status: 'pendiente' },
      { name: 'Biométrico', status: 'pendiente' },
      { name: 'Finalización', status: 'pendiente' },
    ],
  },
  {
    id: '5', code: 'VAL-2026-005', clientName: 'Laura Gómez', clientEmail: 'laura@email.com',
    status: 'vencido', createdAt: '2026-04-01T14:00:00', company: 'Seguros XYZ',
    steps: [
      { name: 'Documentos', status: 'completado', timestamp: '2026-04-01T14:01:00' },
      { name: 'Código Dactilar', status: 'pendiente' },
      { name: 'OTP', status: 'pendiente' },
      { name: 'Biométrico', status: 'pendiente' },
      { name: 'Finalización', status: 'pendiente' },
    ],
  },
];

export const MOCK_CHART_DATA = [
  { name: 'Lun', exitosos: 120, fallidos: 18, pendientes: 8 },
  { name: 'Mar', exitosos: 145, fallidos: 22, pendientes: 12 },
  { name: 'Mié', exitosos: 132, fallidos: 15, pendientes: 6 },
  { name: 'Jue', exitosos: 168, fallidos: 20, pendientes: 10 },
  { name: 'Vie', exitosos: 155, fallidos: 25, pendientes: 14 },
  { name: 'Sáb', exitosos: 78, fallidos: 8, pendientes: 4 },
  { name: 'Dom', exitosos: 45, fallidos: 5, pendientes: 2 },
];
