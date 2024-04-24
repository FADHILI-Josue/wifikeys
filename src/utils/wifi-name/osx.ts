import {execa} from 'execa';
import consola from 'consola';

export default async (): Promise<string> => {
  const cmd =
    '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';
  const arguments_ = ['-I'];

  return execa(cmd, arguments_).then(({stdout}) => {
    if (stdout.includes('AirPort: Off')) {
      throw new Error('Wi-Fi is turned off');
    }

    let returnValue;

    returnValue = /^\s*SSID: (.+)\s*$/gm.exec(stdout);
    returnValue = returnValue && returnValue.length > 0 ? returnValue[1] : null;

    if (!returnValue) {
      consola.error('Could not get SSID');
      throw new Error('Could not get SSID');
    }

    return returnValue;
  });
};
