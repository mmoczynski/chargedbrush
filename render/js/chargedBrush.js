import createHTMLElement from "./createHTMLElement.js";

const chargedBrush = {
    canvas: document.createElement("canvas"),
    renderCanvas: document.createElement("canvas"),
    dataCanvas: document.createElement("canvas"),
    instances: [new ChargedBrushInstance()],
}

function ChargedBrushLayer(chargedBrushInstance) {
    this.chargedBrushInstance = chargedBrushInstance
    this.name = "Untitled";
    this.opacity = 1;
    this.locked = false;
}

function ChargedBrushInstance() {

    this.layers = [new ChargedBrushLayer(this)],

    this.canvas = createHTMLElement({
        nodeName: "canvas",
        className: "instance-canvas"
    })

}

chargedBrush.currentInstance = chargedBrush.instances[0];

export default chargedBrush;