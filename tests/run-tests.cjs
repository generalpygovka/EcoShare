
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const server = path.resolve(__dirname, '../src/server');
const testUrl = process.env.TEST_DATABASE_URL;

if (!testUrl) {
    throw new Error('Додай TEST_DATABASE_URL до кореневого .env');
}

const target = new URL(testUrl);

if (
    !['postgresql:', 'postgres:'].includes(target.protocol) ||
    target.hostname !== '127.0.0.1' ||
    target.port !== '5433' ||
    target.pathname !== '/ecoshare_test'
) {
    throw new Error('Очікується локальна БД ecoshare_test на 127.0.0.1:5433');
}

if (process.env.DATABASE_URL) {
    const development = new URL(process.env.DATABASE_URL);

    if (development.pathname === target.pathname) {
        throw new Error('Робоча й тестова БД мають мати різні назви');
    }
}

const env = { ...process.env, DATABASE_URL: testUrl };

function run(args) {
    const result = spawnSync(process.execPath, args, {
        cwd: server,
        env,
        stdio: 'inherit',
    });

    if (result.error) throw result.error;

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

run(['node_modules/prisma/build/index.js', 'generate']);

run(['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json']);

run(['node_modules/prisma/build/index.js', 'migrate', 'deploy']);

run(['prisma/seed.cjs']);

run([
    '--test',
    '--test-concurrency=1',
    path.join(__dirname, 'domain.test.cjs'),
    path.join(__dirname, 'api.test.cjs'),
]);
