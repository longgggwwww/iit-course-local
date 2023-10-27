const fs = require('fs');
const dotenv = require('dotenv');
const { spawn } = require('child_process');

dotenv.config();

console.log('Đường dẫn tuyệt đối hiện tại:', process.cwd());

const content = `
PORT=${process.env.PORT}
EXEC_FILE=${process.env.EXEC_FILE}
DATABASE_URL="file:${process.cwd()}/prod.db"
`;

fs.writeFile('.env', content, (err) => {
  if (err) {
    console.log(err);
    console.log('Lỗi khi đọc file');
    return;
  }

  const bat = spawn(`${process.env.EXEC_FILE}`, { shell: true });

  bat.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  bat.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  bat.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
});
