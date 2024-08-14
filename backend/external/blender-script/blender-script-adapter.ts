import { exec } from "node:child_process";

const BLENDER_SCRIPT_PATH = "./external/blender-script";
const ACTIVATE_PYTHON_VENV = `. ${BLENDER_SCRIPT_PATH}/.venv/bin/activate`;

const createPythonCommand = (script: string): string => {
  return `${ACTIVATE_PYTHON_VENV} && python3 ${BLENDER_SCRIPT_PATH}/${script}`;
};

export const runBlenderScript = (script: string) => {
  exec(createPythonCommand(script), (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};
