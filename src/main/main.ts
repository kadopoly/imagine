import { app, App, BrowserWindow } from "electron";

const WINDOW_SPEC = {
    width: 800,
    height: 400,
    minWidth: 500,
    minHeight: 200,
    acceptFirstMouse: true
};

class AppImpl
{
    private window: BrowserWindow | null = null;

    constructor(
        private app: App,
        private view: string = "index.html"
    )
    {
        this.app.on("ready", () => this.attachWindowIfNeeded());
        this.app.on("activate", () => this.attachWindowIfNeeded());
        this.app.on("window-all-closed", () => this.onWindowAllClosed());
    }

    private attachWindowIfNeeded()
    {
        if (this.window !== null) {
            return;
        }
        const viewPath = `file://${__dirname}/${this.view}`;
        this.window = new BrowserWindow(WINDOW_SPEC);
        this.window.loadURL(viewPath);
        this.window.webContents.openDevTools();
        this.window.on("closed", () => this.onWindowClosed())
    }

    private onWindowClosed()
    {
        this.window = null;
    }

    private onWindowAllClosed()
    {
        this.app.quit();
    }
}

new AppImpl(app);
