import {execa} from 'execa';
import ora from 'ora';

const spinner = ora('Loading wifi password(key)');
spinner.color = 'green';

export default async (ssid: string) => {
  const cmd = 'sudo';
  const arguments_ = ['cat', `/etc/NetworkManager/system-connections/${ssid}`];

  return execa(cmd, arguments_).then(({stdout}) => {
    let returnValue;

    returnValue = /^\s*(?:psk|password)=(.+)\s*$/gm.exec(stdout);
    returnValue = returnValue && returnValue.length > 0 ? returnValue[1] : null;

    if (!returnValue) {
      spinner.fail('Could not get password');
      throw new Error('Could not get password');
    }

    spinner.succeed(`Password for ${ssid} successfully retrieved`);
    return returnValue;
  });
};
