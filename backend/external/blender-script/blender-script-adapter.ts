import { spawn } from "node:child_process";

const BLENDER_SCRIPT_PATH = "./external/blender-script";
const ACTIVATE_PYTHON_VENV = `. ${BLENDER_SCRIPT_PATH}/.venv/bin/activate`;

const createPythonCommand = (script: string): string => {
  return `${ACTIVATE_PYTHON_VENV} && python3 ${BLENDER_SCRIPT_PATH}/${script}`;
};

export const runBlenderScript = (script: string, data: object) => {
  const process = spawn("bash", ["-c", `${createPythonCommand(script)}`]);

  // Pythonスクリプトにデータを送信
  process.stdin.write(JSON.stringify(data));
  process.stdin.end();

  // 標準出力の処理
  process.stdout.on("data", (stdout) => {
    console.log(`stdout: ${stdout}`);
  });

  // 標準エラー出力の処理
  process.stderr.on("data", (stderr) => {
    console.error(`stderr: ${stderr}`);
  });

  // プロセス終了時の処理
  process.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
  });
};
