import Vector from "./vector.js";

/**
 * 
 * @param {string} name 
 * @param {object} chargedBrush 
 * @param {Function} stampFunction 
 */

function Brush(name,chargedBrush,stampFunction) {
    this.name = name;
    this.fillStyle = "#000000";
    this.strokeStyle = "#000000";
    this.size = 5;
    this.ctx = chargedBrush.dataCtx;
    this.stamp = stampFunction;
    this.parent = chargedBrush;
}

Brush.prototype.activateDataMode = function() {
    this.ctx = this.chargedBrush.dataCtx;
    this.mode = "data";
}

Brush.prototype.activateRenderMode = function() {
    this.ctx = this.chargedBrush.renderCtx;
    this.mode = "render";
}

/**
 * 
 * Draw a linear biezer curve from `(a.x, a.y)` to `(b.x, b.y)`.
 * 
 * @function
 * @param {Vector} a
 * @param {Vector} b
 * 
 */

Brush.prototype.draw = function(a,b) {

    var movementLengthFloored = Math.floor(Vector.distance(a,b));

    for(let i = 0; i < movementLengthFloored; i++) {

        let x = a.x + (i/movementLengthFloored)*(b.x - a.x);
        let y = a.y + (i/movementLengthFloored)*(b.y - a.y);

        this.stamp(x,y);

    }
}

export default Brush;