const express = require('express');
const fetch = require('node-fetch');
const db = require('../db/knex');
const kratosManager = require('../services/kratos-manager');
const crypto = require('crypto');

const router = express.Router();

const FLOWS_URL = 'https://front.primecore.online/flows';
const OTP_URL = 'https://front.primecore.online'; // Asumiendo APISIX para SMS/OTP si aplicara. El usuario indicó que ff2 es flujos y fns1 es otp

// Iniciar un flujo (Validacion)
router.post('/validation/start', async (req, res) => {
  const sessionId = crypto.randomUUID();
  try {
    // Aquí puedes llamar a `ff2` (flows) usando el token de admin
    // await fetch(`${FLOWS_URL}/flows/1/start`, { ... headers: { Authorization: `Bearer ${kratosManager.getToken()}`} })
    
    await db('validation_logs').insert({
      session_uuid: sessionId,
      step_name: 'init',
      status: 'success',
      details: 'Inicia flujo validacion'
    });

    res.json({ success: true, sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reportar paso y avanzar al backend de flujos
router.post('/validation/step/:stepName', async (req, res) => {
  const { sessionId, data, status } = req.body;
  const { stepName } = req.params;

  try {
    // Llamar a `ff2` pasándole data y el token de admin...
    // const token = kratosManager.getToken();
    // EJEMPLO: await fetch(`${FLOWS_URL}/executions/${sessionId}/step`, { ... })

    await db('validation_logs').insert({
      session_uuid: sessionId,
      step_name: stepName,
      status: status || 'success',
      details: JSON.stringify(data || {})
    });
    
    res.json({ success: true, message: `Paso ${stepName} completado en DB local` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Completar o Cancelar (Cerrar tracking para BI)
router.post('/validation/close', async (req, res) => {
  const { sessionId, status, reason } = req.body;

  try {
    await db('validation_logs').insert({
      session_uuid: sessionId,
      step_name: 'completion',
      status: status, // ej: "abandoned", "rejected", "completed"
      details: reason || 'Flujo terminado'
    });
    
    res.json({ success: true, message: 'Flujo cerrado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
