'use strict'

const path = require('path');
const cp = require('child_process');
const chokidar = require('chokidar');
const watcher = chokidar.watch(path.join(__dirname, '../src'));

let appIns = cp.fork(path.join(__dirname, '../src/app.js'));

watcher.on('ready', () => {
    watcher.on('change', (path) => {
        console.log('<---- watched file change, restart server ---->');
        appIns = reload(appIns);
    });

    watcher.on('add', (path) => {
        console.log('<---- watched new file add, restart server ---->');
        appIns = reload(appIns);
    })
});

process.on('SIGINT', () => {
    process.exit(0);
});

function reload(appIns) {
    Object.keys(require.cache).forEach(function (id) {
        if (/[\/\\](app)[\/\\]/.test(id)) {
            delete require.cache[id]
        }
    });
    appIns.kill('SIGINT');
    return cp.fork(require('path').join(__dirname, '../src/app.js'));
}