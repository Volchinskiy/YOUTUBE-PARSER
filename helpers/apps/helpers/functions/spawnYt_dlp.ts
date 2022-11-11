const { spawn } = require('child_process');
const { log } = require('./styledLogs');
require("dotenv").config();
// maybe show errors, how you do it in remove_gs_node_wrapper.ts
// maybe up spawn because you use spawn py and spawn yt_dlp
export const spawnYt_dlp = (commands: string[], isShowLogs: boolean): Promise<any> => {
  return new Promise((resolve) => {
    let buffer: string = '';
    const path = process.env.YT_DLP_PATH;
    const processYT = spawn(path, commands);
    processYT.stdout.on("data", (data: Buffer) => {
      const readableData = data.toString();
      if (isShowLogs) log(readableData.replace("\n", ""));
      buffer += readableData;
    });
    processYT.on("close", (code: number) => {
      if (code) throw new Error("SORRY, SOMETHING HAPPENED WITH yt_dlp.");
      resolve(buffer);
    });
  });
};