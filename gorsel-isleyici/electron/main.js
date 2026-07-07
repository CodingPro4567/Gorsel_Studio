const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let backendProcess;

const BACKEND_PATH = path.join(
    __dirname,
    "..",
    "backend",
    "main.py"
);

const FRONTEND_PATH = path.join(
    __dirname,
    "..",
    "frontend",
    "build",
    "index.html"
);

// --------------------
// BACKEND START (PYTHON DIRECT)
// --------------------
function startBackend() {
    console.log("Backend başlatılıyor (python):", BACKEND_PATH);

    backendProcess = spawn("python", [BACKEND_PATH], {
        cwd: path.join(__dirname, "..", "backend"),
        shell: true
    });

    backendProcess.stdout.on("data", (data) => {
        console.log("[BACKEND]", data.toString());
    });

    backendProcess.stderr.on("data", (data) => {
        console.log("[BACKEND ERROR]", data.toString());
    });

    backendProcess.on("close", (code) => {
        console.log("Backend kapandı:", code);
    });
}

// --------------------
// WINDOW
// --------------------
function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(FRONTEND_PATH);
}

// --------------------
// APP START
// --------------------
app.whenReady().then(() => {
    startBackend();
    createWindow();
});

// --------------------
// CLEAN EXIT
// --------------------
app.on("window-all-closed", () => {
    if (backendProcess) backendProcess.kill();
    if (process.platform !== "darwin") app.quit();
});