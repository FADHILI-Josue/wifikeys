# wifikeys

![npm](https://img.shields.io/npm/v/wifikeys)
![License](https://img.shields.io/github/license/FADHILI-Josue/wifikeys/)

**wifikeys** is a command-line interface (CLI) tool for retrieving Wi-Fi passwords on your system. It allows you to easily retrieve passwords for saved Wi-Fi networks.

> purpose: Get a saved WiFi password (when someone asks for it) with specifying a WiFi name/SSID only or get the password of internet you are currently connected to.

## Installation

You can install **wifikeys** globally using npm:

```bash
npm install -g wifikeys
```

## Usage

#### Get Password for Wi-Fi you're connected to

To get the password for a Wi-Fi you're currently using:

```bash
wifikeys get
```

#### Get Password for a Specific Wi-Fi Network

To get the password for a specific Wi-Fi network, use the get command followed by the SSID (network name):

```bash
wifikeys get <ssid>
# eg: wifikeys get RCA-WiFii
```
<!-- NOTE: provide image example -->

#### Get Passwords for Multiple Wi-Fi Networks

To get passwords for multiple Wi-Fi networks at once, you can provide a list of SSIDs using the `-n` or `--networks` option:

```bash
wifikeys get -n <network1> <network2> <network3> ...
# eg: wifikeys get -n RCA-WiFii "Benax-WiFi(2.4G)"
```
<!-- NOTE: provide image example -->

## Options

`-n, --networks <networks...>`: Specify one or more Wi-Fi networks to retrieve passwords for.
```bash
# Get passwords for multiple Wi-Fi networks
wifikeys get -n Network1 Network2 Network3
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request by following the [contributing guide](/CONTRIBUTING.md)

[![Star on GitHub](https://img.shields.io/github/stars/FADHILI-Josue/wifikeys.svg?style=social)](https://github.com/FADHILI-Josue/wifikeys/stargazers)
[![Follow on Twitter](https://img.shields.io/twitter/follow/FADHILIJosue?style=social)](https://twitter.com/FADHILIJosue)
[![Connect on LinkedIn](https://img.shields.io/badge/connect-linkedin-blue)](https://www.linkedin.com/in/fadhili-josue/)

> [!IMPORTANT]
> Working with linux and mac os, has got some issues to be fixed. It's currently available for windows only!