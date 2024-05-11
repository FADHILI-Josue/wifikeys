import { exec } from 'child_process';
import ora from 'ora';

const spinner = ora('Loading wifi password(key)');
spinner.color = 'green';

export default async (ssid: string): Promise<string> => {
  const cmd = 'netsh';
  const arguments_ = ['wlan', 'show', 'profile', `name=${ssid}`, 'key=clear'];
  spinner.start();

  return new Promise<string>((resolve, reject) => {
    exec(`${cmd} ${arguments_.join(' ')}`, (error, stdout) => {
      if (error) {
        spinner.fail('Could not get password');
        reject(new Error(`Could not get password: ${error.message}`));
        return;
      }
      let returnValue;
      returnValue = /^\s*Key Content\s*: (.+)\s*$/gm.exec(stdout);
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