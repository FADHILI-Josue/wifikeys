import { exec } from 'child_process';
import ora from 'ora';

const spinner = ora('Loading wifi password(key)');
spinner.color = 'green';

export default async (ssid: string) => {
  const cmd = 'security';
  const arguments_ = ['find-generic-password', '-D', 'AirPort network password', '-wa', ssid];
  spinner.start();

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

      if (!stdout) {
        spinner.fail('Could not get password');
        reject(new Error('Could not get password'));
        return;
      }

      spinner.succeed(`Password for ${ssid} successfully retrieved`);
      resolve(stdout.trim());
    });
  }).catch((error: Error) => {
    if (error.message.includes('The specified item could not be found in the keychain')) {
      spinner.info("Your network doesn't have a password");
      throw new Error("Your network doesn't have a password");
    }

    throw error;
  });
};
