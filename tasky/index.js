const path = require('path')
const electron = require('electron')
const MainWindow = require('./app/main_window')
const TimerTray = require('./app/timer_tray')

const { app, Menu, ipcMain } = electron

let mainWindow

app.on('ready', () => {
  if (isMac()) {
    app.dock.hide()
  }
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`)

  const iconName = isWindows() ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  tray = new TimerTray(iconPath, mainWindow)
})

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft)
})


function isMac() {
  return process.platform === 'darwin'
}

function isWindows() {
  process.platform === 'win32'
}
