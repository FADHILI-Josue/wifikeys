import { exec } from 'child_process';
import ora from 'ora';

const spinner = ora('Loading wifi password(key)');
spinner.color = 'green';

export default async (ssid: string) => {
  const cmd = 'sudo';
  const arguments_ = ['cat', `/etc/NetworkManager/system-connections/${ssid}`];

  return new Promise<string>((resolve, reject) => {
    exec(`${cmd} ${arguments_.join(' ')}`, (error, stdout, stderr) => {
      if (error) {
        spinner.fail('Error when retrieving password');
        reject(new Error(`Error when retrieving password: ${error.message}`));
        return;
      }

      if (stderr) {
        spinner.fail(stderr);
        reject(new Error(stderr));
        return;
      }

      let returnValue;
      returnValue = /^\s*(?:psk|password)=(.+)\s*$/gm.exec(stdout);
      returnValue = returnValue && returnValue.length > 0 ? returnValue[1] : null;

      if (!returnValue) {
        spinner.fail('Could not get password');
        reject(new Error('Could not get password'));
        return;
      }

      spinner.succeed(`Password for ${ssid} successfully retrieved`);
      resolve(returnValue);
    });
  });
};
