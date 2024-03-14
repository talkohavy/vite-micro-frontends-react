import { importJson } from './importJson.js';
import { openTerminal } from 'open-terminal-programmatically';

/** @typedef {import('open-terminal-programmatically').OpenTerminalProps} OpenTerminalProps */

const vsCodeLaunchConfig = importJson('../.vscode/launch.json').configurations;

function getLaunchScriptOf(scriptName) {
  return vsCodeLaunchConfig.find(({ name }) => name === scriptName);
}

/** @type {Array<OpenTerminalProps>} */
const programs = [
  {
    isEncoded: true,
    config: {
      name: 'host',
      command: 'cd apps/host && npm run dev',
    },
  },
  {
    isEncoded: true,
    config: {
      name: 'remote',
      command: 'cd apps/remote && npm run dev',
      autoFocus: true,
    },
  },
  // {
  //   isDebugMode: true,
  //   delayNextFor: 1000,
  //   config: getLaunchScriptOf('some-script'),
  // },
];

async function runProgramInDebug() {
  for (const program of programs) {
    const { config, isDebugMode, ...rest } = program;

    await openTerminal({
      config: isDebugMode ? config : { ...config, color: 'blue' },
      isDebugMode,
      ...rest,
    });
  }
}

runProgramInDebug();
