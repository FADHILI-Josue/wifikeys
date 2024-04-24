import {execa} from 'execa';
import consola from 'consola';

export default async (): Promise<string> => {
  const cmd = 'iwgetid';
  const arguments_ = ['--raw'];

  return execa(cmd, arguments_).then(({stdout}) => {
    const returnValue = stdout.replace('\n', '');

    if (!returnValue) {
      consola.error('Could not get SSID');
      throw new Error('Could not get SSID');
    }

    return returnValue;
  });
};
