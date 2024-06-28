import createHTMLElement from "./createHTMLElement.js";
import createModal from "./createModal.js";
import chargedBrush from "./chargedBrush.js";

// Open from online URL

chargedBrush.importFromURL = function(url) {

    return new Promise(function(fulfill, reject){

        var img = document.createElement("img");

        img.addEventListener("load",function(){

            chargedBrush.dataCtx.canvas.width = img.width;
            chargedBrush.dataCtx.canvas.height = img.height;

            chargedBrush.clearCanvas();
            chargedBrush.dataCtx.drawImage(img,0,0);
            fulfill();
        });

        img.addEventListener("error",reject);

        img.src = url;

    })

}

chargedBrush.importFromURLModal = function() {

    var m = createModal();

    m.querySelector(".modal-title").innerText = "Import from URL";

    m.querySelector(".modal-body").appendChild(createHTMLElement({

        nodeName: "div",

        children: [
            {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                nodeName: "input",
                className: "url-import-input"
            },

            {
                nodeName: "button",
                className: "url-import-button",
                innerText: "Import",

                events: {
                    click: function(){
                        chargedBrush.importFromURL(m.querySelector(".url-import-input").value).then(function(){

                        }).catch(function(e){
                            chargedBrush.alert("Error:" + e.reason);
                        });
                    }
                }

            }
        ]

    }));

}

document.querySelector("#import-url-modal").addEventListener("click",function(){
    chargedBrush.importFromURLModal();
});