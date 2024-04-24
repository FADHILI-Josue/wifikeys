import {execa} from 'execa';
import ora from 'ora';

const spinner = ora('Loading wifi password(key)');
spinner.color = 'green';

export default async (ssid: string) => {
  const cmd = 'security';
  const arguments_ = ['find-generic-password', '-D', 'AirPort network password', '-wa', ssid];
  spinner.start();
  return execa(cmd, arguments_)
    .then(({stderr, stdout}) => {
      if (stderr) {
        spinner.fail(stderr);
        throw new Error(stderr);
      }

      if (!stdout) {
        spinner.fail('Could not get password');
        throw new Error('Could not get password');
      }

      spinner.succeed(`Password for ${ssid} successfully retrieved`);
      return stdout;
    })
    .catch((error: Error) => {
      if (error.message.includes('The specified item could not be found in the keychain')) {
        spinner.info("Your network doesn't have a password");
        throw new Error("Your network doesn't have a password");
      }

      spinner.fail('error when retrieving password');
      throw error;
    });
};
