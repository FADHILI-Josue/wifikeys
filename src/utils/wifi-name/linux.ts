import { exec } from 'child_process';
import consola from 'consola';

export default async (): Promise<string> => {
  const cmd = 'iwgetid';
  const arguments_ = ['--raw'];

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

      const returnValue = stdout.trim();

      if (!returnValue) {
        consola.error('Could not get SSID');
        reject(new Error('Could not get SSID'));
        return;
      }

      resolve(returnValue);
    });
  });
};
