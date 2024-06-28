import chargedBrush from "./chargedBrush.js"

function createNewImage(w,h) {
    chargedBrush.renderCtx.canvas.width = w;
    chargedBrush.renderCtx.canvas.height = h;
    chargedBrush.clearCanvas();
}