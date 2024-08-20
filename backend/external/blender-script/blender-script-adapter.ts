import { spawn } from "node:child_process";

const BLENDER_SCRIPT_PATH = "./external/blender-script";
const ACTIVATE_PYTHON_VENV = `. ${BLENDER_SCRIPT_PATH}/.venv/bin/activate`;

const createPythonCommand = (script: string): string => {
  return `${ACTIVATE_PYTHON_VENV} && python3 ${BLENDER_SCRIPT_PATH}/${script}`;
};

export const runBlenderScript = <T>(
  script: string,
  data: object
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const process = spawn("bash", ["-c", `${createPythonCommand(script)}`], {
      stdio: ["pipe", "pipe", "pipe"], // 標準入力、標準出力、標準エラーを処理する
    });

    // Pythonスクリプトにデータを送信
    process.stdin.write(JSON.stringify(data));
    process.stdin.end();

    let output = "";

    // 標準出力と標準エラー出力をキャプチャ（順序を保持）
    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      output += data.toString();
    });

    // プロセス終了時に出力データを処理
    process.on("close", (code) => {
      if (code === 0) {
        // 出力を行ごとに処理
        const lines = output.split("\n");

        for (const line of lines) {
          if (line.startsWith("RESULT:")) {
            console.log(line); // RESULT行もログに表示

            const resultData = line.replace("RESULT:", "").trim();
            try {
              const parsedOutput: T = JSON.parse(resultData);
              resolve(parsedOutput); // 成功した場合に結果を返す
            } catch (error) {
              reject(new Error("Error parsing JSON output"));
            }
          } else if (line.trim()) {
            // その他のログ行の出力
            console.log(line);
          }
        }
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
};
