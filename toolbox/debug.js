import { openTerminal } from 'open-terminal-programmatically';

/** @type {Array<import('open-terminal-programmatically').OpenTerminalProps>} */
const programs = [
  {
    isEncoded: true,
    config: {
      name: 'host',
      command: 'cd apps/host && npm run dev',
      autoFocus: true,
    },
  },
  {
    isEncoded: true,
    config: {
      name: 'remote',
      command: 'cd apps/remote && npm run dev',
    },
  },
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
