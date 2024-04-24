import {execa} from 'execa';
import ora from 'ora';

const spinner = ora('Loading wifi password(key)');
spinner.color = 'green';

export default async (ssid: string) => {
  const cmd = 'netsh';
  const arguments_ = ['wlan', 'show', 'profile', `name=${ssid}`, 'key=clear'];
  spinner.start();
  return execa(cmd, arguments_).then(({stdout}) => {
    let returnValue;
    returnValue = /^\s*Key Content\s*: (.+)\s*$/gm.exec(stdout);
    returnValue = returnValue && returnValue.length > 0 ? returnValue[1] : null;

    if (!returnValue) {
      spinner.fail('Could not get password');
      throw new Error('Could not get password');
    }

    spinner.succeed(`Password for ${ssid} successfully retrieved`);
    return returnValue;
  });
};
