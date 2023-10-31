const dotenv = require('dotenv');
const { spawn } = require('child_process');

dotenv.config();

const toUnixPath = (path) =>
  path.replace(/[\\/]+/g, '/').replace(/^([a-zA-Z]+:|\.\/)/, '');

const cwd = `DATABASE_URL="file:${toUnixPath(process.cwd())}/${
  process.env.DB
}"`;
console.log('CURRENT_PATH=', cwd);

const bat = spawn(`${cwd} ${process.env.EXEC}`, { shell: true });

console.log('Server is running...');

bat.stdout.on('data', (data) => {
  if (['1', 'true'].includes(process.env.DEBUG)) {
    console.log(`${data}`);
  }
});

bat.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

bat.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
