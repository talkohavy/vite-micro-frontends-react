import { openTerminal } from "open-terminal-programmatically";

/** @typedef {import('open-terminal-programmatically').OpenTerminalProps} OpenTerminalProps */

/** @type {Array<OpenTerminalProps>} */
const terminalsArr = [
  {
    config: {
      name: "BooksMF",
      command: "cd apps/booksMF && npm run dev",
      color: "blue",
      autoFocus: true,
    },
  },
  {
    config: {
      name: "Host",
      command: "cd apps/host && npm run dev",
      color: "red",
      autoFocus: false,
    },
  },
];

terminalsArr.forEach((props) => openTerminal(props));
