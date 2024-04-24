import getWifiName from '../wifi-name';
import osx from './osx';
import win from './win';
import linux from './linux';

export default async (ssid?: string) => {
  let function_: typeof osx | typeof linux | typeof win;

  if (process.platform === 'darwin') {
    function_ = osx;
  }

  function_ = process.platform === 'win32' ? win : linux;

  if (ssid) {
    return function_(ssid);
  }

  return getWifiName().then(function_);
};
