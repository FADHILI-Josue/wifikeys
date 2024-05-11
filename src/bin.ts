// #!/usr/bin/env node

import {exec} from 'node:child_process'

import {Command} from 'commander';
import consola from 'consola';
import pkg from '../package.json';
import getWifiPassword from './utils/wifi-password';

const program = new Command();

program
  .name('wifikeys')
  .description('get wifi keys(passwords) CLI')
  .usage('command [arguments]')
  .version(
    `\u001B[1mv${pkg.version}\u001B[0m`,
    '-v, --version',
    "Output wifikeys's current version.",
  )
  .helpOption('-h, --help', 'Output usage of wifikeys.');

program
  .command('get [ssid]')
  .description('get password for wifi')
  .option('-n, --networks  <networks...>', 'wifi networks to get passwords for')
  .action(async (ssid: string, options) => {
    try {
      if (options?.networks?.length) {
        const promises = (options.networks as string[]).map(async (ssid) => {
          const password: string = await getWifiPassword(ssid);
          console.log(`> ${ssid}: ${password} \n`);
        });

        // Wait for all promises to resolve
        await Promise.all(promises);
        process.exit(0);
      }

      await getWifiPassword(ssid).then(console.log);
      process.exit(0);
    } catch {
      consola.error(
        'failed to get password!! check if the you have saved password for wifi network',
      );
      process.exit(0);
    }
  });

program.parse(process.argv);