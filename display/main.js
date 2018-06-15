const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, ipcMain } = electron;
const mqtt = require('mqtt');

// const resin = require('resin-sdk');

const mqqtconfig={
  broker: process.env.MQTT_BROKER,
  id: process.env.UUID,
  name: process.env.NAME,
};

// ToDo: Fix undefined auth module
// resin.auth.loginWithToken(process.env.RESIN_API_KEY);
let window;

// simple parameters initialization
const electronConfig = {
  URL_LAUNCHER_TOUCH: process.env.URL_LAUNCHER_TOUCH === '1' ? 1 : 0,
  URL_LAUNCHER_TOUCH_SIMULATE: process.env.URL_LAUNCHER_TOUCH_SIMULATE === '1' ? 1 : 0,
  URL_LAUNCHER_FRAME: process.env.URL_LAUNCHER_FRAME === '1' ? 1 : 0,
  URL_LAUNCHER_KIOSK: process.env.URL_LAUNCHER_KIOSK === '1' ? 1 : 0,
  URL_LAUNCHER_NODE: process.env.URL_LAUNCHER_NODE === '1' ? 1 : 0,
  URL_LAUNCHER_WIDTH: parseInt(process.env.URL_LAUNCHER_WIDTH || 800, 10),
  URL_LAUNCHER_HEIGHT: parseInt(process.env.URL_LAUNCHER_HEIGHT || 480, 10),
  URL_LAUNCHER_TITLE: process.env.URL_LAUNCHER_TITLE || 'RESIN.IO',
  URL_LAUNCHER_CONSOLE: process.env.URL_LAUNCHER_CONSOLE === '1' ? 1 : 0,
  URL_LAUNCHER_URL: process.env.URL_LAUNCHER_URL || `file:///${path.join(__dirname, 'build', 'index.html')}`,
  URL_LAUNCHER_ZOOM: parseFloat(process.env.URL_LAUNCHER_ZOOM || 1.0),
  URL_LAUNCHER_OVERLAY_SCROLLBARS: process.env.URL_LAUNCHER_CONSOLE === '1' ? 1 : 0,
  DISABLE_HARDWARE_ACCELERATION: process.env.DISABLE_HARDWARE_ACCELERATION === '1' ? 1 : 0,
};

// enable touch events if your device supports them
if (electronConfig.URL_LAUNCHER_TOUCH) {
  app.commandLine.appendSwitch('--touch-devices');
}
// simulate touch events - might be useful for touchscreen with partial driver support
if (electronConfig.URL_LAUNCHER_TOUCH_SIMULATE) {
  app.commandLine.appendSwitch('--simulate-touch-screen-with-mouse');
}

if (electronConfig.DISABLE_HARDWARE_ACCELERATION) {
  app.disableHardwareAcceleration();
}

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  Object.assign(electronConfig, {
    URL_LAUNCHER_HEIGHT: 480,
    URL_LAUNCHER_WIDTH: 800,
    URL_LAUNCHER_KIOSK: 0,
    URL_LAUNCHER_CONSOLE: 1,
    URL_LAUNCHER_FRAME: 1,
  });
}

/*
 we initialize our application display as a callback of the electronJS "ready" event
 */
app.on('ready', () => {
  // here we actually configure the behavour of electronJS
  window = new BrowserWindow({
    width: electronConfig.URL_LAUNCHER_WIDTH,
    height: electronConfig.URL_LAUNCHER_HEIGHT,
    frame: !!(electronConfig.URL_LAUNCHER_FRAME),
    title: electronConfig.URL_LAUNCHER_TITLE,
    kiosk: !!(electronConfig.URL_LAUNCHER_KIOSK),
    webPreferences: {
      nodeIntegration: !!(electronConfig.URL_LAUNCHER_NODE),
      zoomFactor: electronConfig.URL_LAUNCHER_ZOOM,
      overlayScrollbars: !!(electronConfig.URL_LAUNCHER_OVERLAY_SCROLLBARS),
    },
  });

  window.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      window.show();
    }, 300);
  });

  // if the env-var is set to true,
  // a portion of the screen will be dedicated to the chrome-dev-tools
  if (electronConfig.URL_LAUNCHER_CONSOLE) {
    window.openDevTools();
  }

  // the big red button, here we go
  window.loadURL(electronConfig.URL_LAUNCHER_URL);

  //Connect to a broker and subscribe to some chancels!
  setupMqtt();

  sendMessageToRenderer();


});

function setupMqtt(){
  console.log(`Conneting to ${mqqtconfig.broker} as ${mqqtconfig.name} with id ${mqqtconfig.id}`);
  var client  = mqtt.connect(mqqtconfig.broker);
  client.on('connect', function () {
    client.subscribe(`${mqqtconfig.id}/`);
    client.publish('register', JSON.stringify({id: mqqtconfig.id, name: mqqtconfig.name, type: 'display'}),{qos: 2}, err=>{
      if (err!==null){
        //Logg it
        console.log('FEHLER BEIM VERBINDEN!', err);
        //Try again
        setTimeout(setupMqtt(), 3000);
      }
      console.log('MQTT erfolgreich verbunden!');
    });
  });

  client.on('reconnect', ()=>{
    console.log('doing a reconnect!')
  });

  client.on('error', err=>{
    console.log('MQTT Fehler: ', err);
  });

  client.on('message', function (topic, message) {
    let m = JSON.parse(JSON.parse(message));
    // message is Buffer
    if(m.type==='REG_ACK'){
      console.log('Erfolgreich Registriert!');
    }else{
      sendMessageToRenderer(topic, message);
    }


  })
}

function sendMessageToRenderer(topic, message){
  console.log('going to send a msg!', topic, message);
  window.webContents.send('mqtt', {topic: topic, message: message});
}

ipcMain.on('save-settings-for', (event, arg) => {
  // ToDo: Try to save the passed arguments as env vars inside the device (esp. for the service)
  /*
  for(k in arg) {
    if (arg.hasOwnProperty(k)) {
      resin.models.environmentVariables.device.create(process.env.RESIN_DEVICE_UUID,
                                                      `SETTINGS_${k.toUpperCase()}`,
                                                      arg[k]);
    }
  }
  */

  console.log(arg);
  // event.returnValue = 'lulz'
})
