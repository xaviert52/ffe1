const fetch = require('node-fetch');

class KratosManager {
  constructor() {
    this.sessionToken = null;
    this.expiresAt = null;
    // Hardcoded credentials as requested
    this.email = 'admin@alfa.com';
    this.password = 'Admin2026.empresa_alfa!';
    // Real URLs from Apisix
    this.kratosApiUrl = 'https://front.primecore.online/kratos';
  }

  async login() {
    console.log('[Kratos] Iniciando auto-login para', this.email);
    try {
      // 1. Obtener flow ID de login via API
      let res = await fetch(`${this.kratosApiUrl}/self-service/login/api`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Error en inicializacion login. Status: ${res.status}`);
      let flow = await res.json();

      // 2. Enviar credenciales
      res = await fetch(`${this.kratosApiUrl}/self-service/login?flow=${flow.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          method: 'password',
          password: this.password,
          identifier: this.email,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        this.sessionToken = data.session_token;
        this.expiresAt = new Date(data.session?.expires_at);
        console.log('[Kratos] Auto-login exitoso. Token obtenido.');
      } else {
        const errData = await res.json();
        console.error('[Kratos] Fallo auto-login:', errData);
      }
    } catch (e) {
      console.error('[Kratos] Excepcion en login:', e.message);
    }
  }

  startAutoRefresh() {
    // 45 minutes = 45 * 60 * 1000
    this.login();
    setInterval(() => {
      console.log('[Kratos] Refrescando token de administrador...');
      this.login();
    }, 45 * 60 * 1000);
  }

  getToken() {
    return this.sessionToken;
  }
}

const kratosManager = new KratosManager();
module.exports = kratosManager;
