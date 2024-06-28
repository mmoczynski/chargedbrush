/**
 * 
 * @typedef {Object} CreateHTMLElementEventOptions
 * @property {String} event
 */

/**
 * 
 * @typedef {Object} CreateHTMLElementOptions
 * @property {String} nodeName - HTML Tag Name
 * @property {String} innerHTML - Inner HTML For new element
 * @property {String} innerText - innerText for new element
 * @property {String} className - HTML Class string
 * @property {String} 
 * @property {CreateHTMLElementEventOptions} events - Event object
 */


/**
 * @function
 * @param {CreateHTMLElementOptions} options 
 * @returns {HTMLElement}
 */

function createHTMLElement(options) {

    if(options.innerText && options.innerHTML) {
        throw "options.innerText and options.innerHTML cannot be defined set at the same time"
    }

    if(!options.nodeName) {
        throw "options.nodeName must be defined"
    }

    var e = document.createElement(options.nodeName);
    
    e.className = options.className || "";

    if(options.innerText) {
        e.innerText = options.innerText;
    }

    if(options.innerHTML) {
        e.innerHTML = options.innerHTML;
    }

    if(Array.isArray(options.children)) {

        for(let i = 0; i < options.children.length; i++) {

            if(options.children[i] instanceof HTMLElement) {
                e.appendChild(options.children[i]);
            }

            else {
                e.appendChild(createHTMLElement(options.children[i]));
            }

        }

    }

    if(options.parent || options.parentNode || options.parentElement) {
        (options.parent || options.parentNode || options.parentElement).appendChild(e);
    }

    if( Array.isArray(options.attributes) ) {

        for(let i = 0; i < options.attributes; i++) {
            e.setAttribute(options.attributes[i].keyoptions.attributes[i].value);
        }

    }

    Object.assign(e.dataset,options.dataset)

    if(typeof options.events === "object") {
        
        for(let key in options.events) {
            
            if(Array.isArray(options.events[key])) {

                for(let i = 0; i < options.events[key].length; i++) {
                    e.addEventListener(key,options.events[key][i]);
                }

            }

            if(typeof options.events[key] === "function") {
                e.addEventListener(key,options.events[key]);
            }
 
        }

    }

    return e;

}

export default createHTMLElement;