import { app, App, BrowserWindow } from "electron";

const WINDOW_SPEC = {
    width: 800,
    height: 400,
    minWidth: 500,
    minHeight: 200,
    acceptFirstMouse: true
};

/**
 * An Application Entry-point Implementation
 */
class AppImpl
{
    /** an app window (if present) */
    private window: BrowserWindow | null = null;

    /**
     * @param app an app instance provided by electron
     * @param view a path to the view HTML
     */
    constructor(
        private app: App,
        private view: string = "index.html"
    )
    {
        this.app.on("ready", () => this.attachWindowIfNeeded());
        this.app.on("activate", () => this.attachWindowIfNeeded());
        this.app.on("window-all-closed", () => this.onWindowAllClosed());
    }

    /**
     * attach a new window if absent
     */
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

    /**
     * handle window close event
     */
    private onWindowClosed()
    {
        this.window = null;
    }

    /**
     * handle event where all the windows closed
     */
    private onWindowAllClosed()
    {
        this.app.quit();
    }
}

new AppImpl(app);
