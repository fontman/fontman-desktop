/**
 * Created by lpsandaruwan on 2/5/17.
 */

// build app native menus
const {Menu} = require('electron');
const ipc = require('electron').ipcRenderer;

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
                label: 'Help',
                click () { require('electron').shell.openExternal('http://fontman.io/help') }
            },
            {
                label: 'Interface guide',
                click () { require('electron').shell.openExternal('http://fontman.io/help#desktop-interface') }
            },
            {
                label: 'Report a bug',
                click () { require('electron').shell.openExternal('http://github.com/fontman/fontman-desktop/issues/new') }
            },
            {
                label: 'Ask a question',
                click () { require('electron').shell.openExternal('http://github.com/fontman/fontman-desktop/issues/new') }
            },
            {
                label: 'Updates from @fontmanApp'
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(nativeMenus);
