const electron = require('electron');

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// build app native menus
const {Menu} = require('electron');


// native menu template
const nativeMenus = [
  {
    label: 'Fonts',
    submenu: [
      {
        label: 'Check for updates'
      }
    ]

  },
  {
    label: 'Account',
    submenu: [
      {
        label: 'Register'
      },
      {
        label: "Sign In"
      }
    ]
  },
  {
    label: 'Settings'
  },
  {
    label: 'About'
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Help'
      },
      {
        label: 'Interface guide'
      },
      {
        label: 'Report a bug'
      },
      {
        label: 'Ask a question'
      },
      {
        label: 'Updates from @fontmanApp'
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(nativeMenus);
Menu.setApplicationMenu(menu);


// Module to control tray application.
const Tray = electron.Tray;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let appIcon = null;

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({icon: 'images/fontman.ico', titleBarStyle: 'hidden', width: 1600, height: 850});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // remove default main menu
  //mainWindow.setMenu(null);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }

});
