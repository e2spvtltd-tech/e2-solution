import { app, BrowserWindow } from 'electron';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import net from 'net';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let serverProcess;

function getAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => {
        resolve(port);
      });
    });
  });
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Binary MLM User",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    // Development mode connects to Vite
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    // Production mode boots the Nitro SSR node server
    try {
      const port = await getAvailablePort(3000);
      
      const serverPath = path.join(__dirname, '..', '.output', 'server', 'index.mjs');
      
      serverProcess = spawn(process.execPath, [serverPath], {
        env: { ...process.env, PORT: port.toString() }
      });

      serverProcess.stdout.on('data', (data) => console.log(`Server: ${data}`));
      serverProcess.stderr.on('data', (data) => console.error(`Server Error: ${data}`));

      // Wait a tiny bit for the server to bind to the port
      setTimeout(() => {
        mainWindow.loadURL(`http://localhost:${port}`);
      }, 1500);

    } catch (err) {
      console.error("Failed to start embedded server", err);
    }
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    if (serverProcess) serverProcess.kill();
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
