import {execa} from 'execa';
import consola from 'consola';

export default async (): Promise<string> => {
  const cmd = 'netsh';
  const arguments_ = ['wlan', 'show', 'interface'];

  return execa(cmd, arguments_).then(({stdout}) => {
    let returnValue;
    returnValue = /^\s*SSID\s*: (.+)\s*$/gm.exec(stdout);
    returnValue = returnValue && returnValue.length > 0 ? returnValue[1] : null;

    if (!returnValue) {
      consola.error('Could not get SSID');
      throw new Error('Could not get SSID');
    }

    return returnValue;
  });
};
