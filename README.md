# homebridge-relay-switch
based on Niklas von Weihe's homebridge-gpio-relay plugin which I had to extend

Control your low-active relays using [Homebridge](https://github.com/nfarina/homebridge)

Currently, this plugin controls your low-active relays (like from [SainSmart](https://www.sainsmart.com/relay-1/relays.html)), which are connected to your Pi's GPIO Pins. This way you can switch your relays using HomeKit and Siri.

# Installation
1.	Install Homebridge using `sudo npm install -g homebridge` (if not already installed)
2.	Install this plugin `sudo npm install -g homebridge-gpio-relay`
3.	Update your configuration file - find below
4.	Install the forked version of [gpo-admin](https://github.com/quick2wire/quick2wire-gpio-admin):


```bash
git clone git://github.com/jamesblanksby/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser $USER gpio
```

# Configuration

Configuration sample:

 ```
	"accessories": [
		{
			"accessory": "relay",
			"name": "My relay no 2",
			"pin" : 3,
			"duration" : 5000
		}
	]
```
This example would switch on the relay, connected to GPIO 3. After 30 seconds the relay will be switched off again.

Fields: 

<table>
    <tr>
        <td>Key</td>
        <td>Value-description</td>
		<td>required / optional</td>
    </tr>
	<tr>
        <td>accessory</td>
        <td>Must always be "relay"</td>
		<td>required</td>
    </tr>
    <tr>
        <td>name</td>
        <td>Can be anything</td>
		<td>required</td>
    </tr>
	<tr>
        <td>pin</td>
        <td>The physical pin which is connected to your relay, NOT the GPIO nummer. For example type in "3" to control GPIO 02 with a Raspberry Pi 3.</td>
		<td>required</td>
    </tr>
	<tr>
        <td>duration</td>
        <td>The duration in milliseconds until the relay should be deactivated. Enter 0 or leave blank turn off this functionality.</td>
		<td>optional, default: 0 (turned off)</td>
    </tr>
</table>

# Testing

I am using this plugin to control a SainSmart 4-channel relay module. The specialty is, that the 4-channel relay doesn't need a separated power supply in addition to the 5V comming from the Raspberry Pi's GPIO pin. If you would like to control a larger relay (no matter which plugin you are using) keep in mind to connect an additional power supply to your relay board (for example 12V).

**Warning / Disclaimer**: Electrical wiring should be done by a specialist. This plugin is developed and tested as good as I can. I do NOT take any responsibility for any damages caused by the plugin.

#License

(The MIT License)

Copyright (c) 2017 Niklas von Weihe

Original Project Copyright (c) 2017 Niklas von Weihe, Homebridge-App for iOS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
