import { createApp } from './create-app';

async function main() {
  const app = await createApp();
  await app.listen(3000, '127.0.0.1');
  console.log('EcoShare API: http://127.0.0.1:3000/api/health');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
