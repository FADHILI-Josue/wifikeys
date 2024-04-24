import osx from './osx';
import win from './win';
import linux from './linux';

type Platform = typeof osx | typeof linux | typeof win;

// eslint-disable-next-line import/no-mutable-exports
let getWifiName: Platform;

if (process.platform === 'darwin') {
  getWifiName = osx;
} else if (process.platform === 'win32') {
  getWifiName = win;
} else {
  getWifiName = linux;
}

export default getWifiName;
