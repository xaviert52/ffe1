const knex = require('knex');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../data/logs.sqlite3');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

async function initializeDB() {
  const hasTable = await db.schema.hasTable('validation_logs');
  if (!hasTable) {
    await db.schema.createTable('validation_logs', (table) => {
      table.increments('id').primary();
      table.string('session_uuid');
      table.string('step_name');
      table.string('status');
      table.text('details');
      table.timestamps(true, true);
    });
    console.log('Tabla validation_logs creada en ' + dbPath);
  }
}

initializeDB().catch(console.error);

module.exports = db;
