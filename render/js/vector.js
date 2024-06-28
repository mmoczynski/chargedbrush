function Vector(x,y) {
    this.x = x;
    this.y = y;
}

Vector.origin = new Vector(0,0);

/**
 * 
 * @param {Vector} a 
 * @param {Vector} b 
 * @returns {number}
 */

Vector.distance = function(a,b) {
    return Math.sqrt(Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2))
}

Vector.calcLength = function(a) {
    return Vector.distance(a,Vector.origin)
}

export default Vector;