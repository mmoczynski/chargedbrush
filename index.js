const { BrowserWindow, ipcMain, dialog } = require("electron");
const electron = require("electron");
const fs = require("fs");
const app = electron.app;
const path = require("path");

const chargedBrushMain = {
    files: [

    ]
}

function createInitWindow() {

    let window = new BrowserWindow({
        width: 300,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname,"preload.js") 
        }
    });

    let doQuit = false;

    app.on("before-quit",function(event){

        if(doQuit) {
            
        }

        window.webContents.send("confirm-app-shutdown-with-modal");
        event.preventDefault();
    })

    window.loadFile(path.join(__dirname,"/render/index.html"));

    // File Prompt

    ipcMain.on("chargedbrush-open-file-dialog",function(){
        dialog.showOpenDialog(window,{}).then(function(o){
            fs.readFile(o.filePaths[0],function(err,file){
                window.webContents.send()
            });
        });
    });

}

ipcMain.on("app-shutdown-bridge",function(){
    app.quit();
});

app.whenReady().then(function(){

    createInitWindow();

    app.on("activate",function(){
        if(BrowserWindow.getAllWindows().length === 0) {
            createInitWindow();
        }
    });

    app.on("window-all-closed",function(){
        if(process.platform !== "darwin") {
            app.quit();
        }
    });

});