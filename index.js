// 
// COPYRIGHT 2016 NVW-DEVELOPMENT
// 
// THANKS TO:
// https://github.com/jamesblanksby/homebridge-gpio
//

var gpio = require('pi-gpio');
var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-gpio-relay', 'relay', RelayAccessory);
}

function RelayAccessory(log, config) {
    this.log = log;
    this.name = config['name'];
    this.pin = config['pin'];
    this.duration = config['duration'];
    this.service = new Service.Switch(this.name);

    if (!this.pin) throw new Error('You must provide a config value for pin.');

    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));

    var self = this;
    gpio.open(self.pin, 'output', function() {
        gpio.write(self.pin, 1, function() {
            // SET VALUE 1 TO SWITCH THE LOW-ACTIVE RELAY OFF
        });
    });
}


RelayAccessory.prototype.onRegister = function(characteristic) {
    this.log('onRegister');
    characteristic.eventEnabled = true;
}



// ***************************************************
// GETTER FUNCTIONS
// ___________________________________________________

RelayAccessory.prototype.getServices = function() {
    return [this.service];
}

RelayAccessory.prototype.getOn = function(callback) {
    gpio.read(this.pin, function(err, value) {
        if (err) {
            callback(err);
        } else {
            var on = (value == 1 ? false : true);
            callback(null, on);
        }
    });
}



// ***************************************************
// SETTER FUNCTIONS
// ___________________________________________________

RelayAccessory.prototype.setOn = function(on, callback) {
    this.activateRelais(on);
    if (on) {
        if (is_defined(this.duration) && is_int(this.duration) && 0 != this.duration) {
            this.pinTimer()
        }
        callback(null);
    } else {
        callback(null);
    }
}

/** THE GPIO PIN SHOULD BE ALREADY EXPORTED AT THIS TIME
    TO TURN THE LOW-ACTIVE RELAY OFF (DEFAULT STATUS) WE NEED TO WRITE: 1
    TO TURN THE LOW-ACTIVE RELAY ON (DEFAULT STATUS) WE NEED TO WRITE: 0  */
RelayAccessory.prototype.activateRelais = function(activate) {
	
        this.log('Turning ' + (activate == true ? 'on' : 'off') + ' pin #' + this.pin);

        var self = this;
        var value = (activate == true ? 0 : 1);

        gpio.open(self.pin, 'output', function() {
            gpio.write(self.pin, value, function() {
                return true;
            });
        });
}

RelayAccessory.prototype.pinTimer = function() {
        var self = this;
        setTimeout(function() {
            self.activateRelais(false);
            
			self.service
				.getCharacteristic(Characteristic.On)
				.updateValue(false);
                    
        }, this.duration);
}



// ***************************************************
// HELPER FUNCTIONS
// ___________________________________________________

var is_int = function(n) {
   return n % 1 === 0;
}

var is_defined = function(v) {
    return typeof v !== 'undefined';
}
