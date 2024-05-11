import { exec } from 'child_process';
import consola from 'consola';

export default async (): Promise<string> => {
  const cmd = 'netsh';
  const arguments_ = ['wlan', 'show', 'interface'];

  return new Promise<string>((resolve, reject) => {
    exec(`${cmd} ${arguments_.join(' ')}`, (error, stdout, stderr) => {
      if (error) {
        consola.error('Error when getting SSID');
        reject(new Error(`Error when getting SSID: ${error.message}`));
        return;
      }

      if (stderr) {
        consola.error(stderr);
        reject(new Error(stderr));
        return;
      }

      let returnValue;
      returnValue = /^\s*SSID\s*: (.+)\s*$/gm.exec(stdout);
      returnValue = returnValue && returnValue.length > 0 ? returnValue[1] : null;

      if (!returnValue) {
        consola.error('Could not get SSID');
        reject(new Error('Could not get SSID'));
        return;
      }

      resolve(returnValue);
    });
  });
};
