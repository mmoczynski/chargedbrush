import Brush from "./brush.js";
import createHTMLElement from "./createHTMLElement.js";
import createModal from "./createModal.js";
import chargedBrush from "./chargedBrush.js"
import "./urlImport.js";

// Set ChargedBrush canvas context.

chargedBrush.renderCtx = chargedBrush.renderCanvas.getContext("2d");
chargedBrush.dataCtx = chargedBrush.dataCanvas.getContext("2d");

chargedBrush.brushes = [
        
    new Brush("pen",chargedBrush,function(x,y){
        var ctx = this.ctx;
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.beginPath();
        ctx.arc(x,y,this.size / 2,0,2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }),

    new Brush("square",chargedBrush,function(x,y){

        var ctx = this.ctx;
        
        x = x - this.size * 0.5;
        y = y - this.size * 0.5;
         
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.beginPath();
        ctx.rect(x,y,this.size,this.size);
        ctx.closePath();
        ctx.fill();
        
    })
]

chargedBrush.currentBrush = chargedBrush.brushes[0];

/**
 * 
 * Inital mouse point.
 * Used for functions that require an inital mouse click
 */

chargedBrush.initMousePoint = {
    "x": 200,
    "y": 200
}

// ChargedBrush main instance brush

chargedBrush.drawWithMouseObject = function(mouseEvent) {

    chargedBrush.renderCtx.clearRect(0,0,chargedBrush.renderCtx.canvas.width,chargedBrush.renderCtx.canvas.height);
    
    var currentPoint = {
        x: mouseEvent.offsetX,
        y: mouseEvent.offsetY
    }

    var previousPoint = {
        x: currentPoint.x - mouseEvent.movementX,
        y: currentPoint.y - mouseEvent.movementY
    }

    chargedBrush.currentBrush.draw(previousPoint,currentPoint);

    chargedBrush.renderCtx.drawImage(chargedBrush.dataCanvas,0,0);

    if(typeof chargedBrush.initMousePoint === "object") {
        chargedBrush.renderCtx.beginPath();
        chargedBrush.renderCtx.moveTo(chargedBrush.initMousePoint.x,chargedBrush.initMousePoint.y);
        chargedBrush.renderCtx.lineTo(currentPoint.x,currentPoint.y);
        chargedBrush.renderCtx.stroke();
    }
    
}

chargedBrush.renderCanvas.addEventListener("mousedown",function(){
    chargedBrush.renderCanvas.addEventListener("mousemove",chargedBrush.drawWithMouseObject);
});

chargedBrush.renderCanvas.addEventListener("mouseup",function(){
    chargedBrush.renderCanvas.removeEventListener("mousemove",chargedBrush.drawWithMouseObject)
});

document.querySelector("#brush-color").addEventListener("input",function(){
    chargedBrush.currentBrush.fillStyle = this.value;
    chargedBrush.currentBrush.strokeStyle = this.value;
})

chargedBrush.clearRenderCanvas = function() {
    chargedBrush.renderCtx.clearRect(0,0,chargedBrush.renderCtx.canvas.width,chargedBrush.renderCtx.canvas.height);
}

chargedBrush.invertColor = function() {
    
    var x = chargedBrush.dataCtx.getImageData(0,0,chargedBrush.dataCtx.canvas.width,chargedBrush.dataCtx.canvas.height);
    
    for(let i = 0; i < x.data.length; i += 4) {
        x.data[i] = 255 - x.data[i];
        x.data[i + 1] = 255 - x.data[i + 1];
        x.data[i + 2] = 255 - x.data[i + 2];
        //x.data[i + 3] = x.data[i + 3];
    }

    chargedBrush.dataCtx.clearRect(0,0,chargedBrush.dataCtx.canvas.width,chargedBrush.dataCtx.canvas.height);
    chargedBrush.dataCtx.putImageData(x,0,0);

}

chargedBrush.extractChannel = function(n) { 

    var x = chargedBrush.dataCtx.getImageData(0,0,chargedBrush.dataCtx.canvas.width,chargedBrush.dataCtx.canvas.height);
    
    for(let i = 0; i < x.data.length; i += 4) {
        for(let j = 0; j < 4; j++) {
            if(j !== n) {
                x.data[i + j] = 0;
            }
        }
    }

    chargedBrush.dataCtx.clearRect(0,0,chargedBrush.dataCtx.canvas.width,chargedBrush.dataCtx.canvas.height);
    chargedBrush.dataCtx.putImageData(x,0,0);

};

// Change tool size

document.querySelector("#pen-size-ctrl").addEventListener("input",function(){
    chargedBrush.currentBrush.size = Number.parseInt(this.value);
});

// Invert 

document.querySelector("#invert-colors-opt").addEventListener("click",function(){
    chargedBrush.invertColor()
});

chargedBrush.alert = function(message,onconfirm) {

    return new Promise(function(resolve){

        var modal = createModal();

        createHTMLElement({
            nodeName: "div",
            innerText: message,
            parent: modal.querySelector(".modal-body")
        });
    
        createHTMLElement({
            parent: modal.querySelector(".modal-footer"),
            nodeName: "span",
            className: "btn btn-primary",
            innerText: "OK",
            events: {
                "click": function() {
                    modal.hide();
                    if (onconfirm) onconfirm();
                    resolve();
                }
            }
        });

    });

}


// Add canvas to document body

document.body.appendChild(chargedBrush.renderCanvas);

// Shutdown Button

document.querySelector("#exit-menu-option").addEventListener("click",function(){

    //ipcRenderer.send("app-shutdown-bridge");

    chargedBrush.alert("Exit?")

    //document.body.appendChild(createModal());

});

window.chargedBrush = chargedBrush;

export default chargedBrush;