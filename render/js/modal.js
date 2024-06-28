const modal = {}

modal.create = function(options) {

    var filter = document.createElement("div");
    filter.className = "modal-filter"

    var modal = document.createElement("div");
    filter.appendChild(modal);

    var modalTitle = document.createElement("div");
    modal.appendChild(modalTitle);

    var modalBody = document.createElement("div");
    modal.appendChild(modalBody);

    var modalFooter = document.createElement("div");
    modal.appendChild(modalFooter);

}