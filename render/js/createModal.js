import createHTMLElement from "./createHTMLElement.js";

/**
 * 
 * @module createModal
 * Module for creating modal
 */

function createModal() {

    var e = createHTMLElement({

        nodeName: "div",
        className: "modal",

        children: [

            {
                nodeName: "div",
                className: "modal-dialog",
                children: [

                    {
                        nodeName: "div",
                        className: "modal-content",
                        children: [

                            {
                                className: "modal-header",
                                nodeName: "div",
                                children: [

                                   {
                                       className: "modal-title",
                                       nodeName: "h5",
                                   }, 

                                   {
                                       className: "btn-close",
                                       nodeName: "button",
                                       dataset: {
                                           "bsDismiss": "modal"
                                       }
                                   }

                                ]
                            },

                            {
                                className: "modal-body",
                                nodeName: "div",
                            },

                            {
                                className: "modal-footer",
                                nodeName: "div"
                            }
                        ]
                    }

                ]
            }

        ]

    });

    document.body.appendChild(e);

    var m = new bootstrap.Modal(e);

    m.show();

    e.querySelector(".btn-close").addEventListener("click",function(){
        m.hide();
    });

    return e;

}

export default createModal;