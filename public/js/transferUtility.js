/* utilities class links to sessions class
*/

class TransferUtility {
    _utilitiesID = "utilities";
    _utilityID = "transferUtility";
    _app = null;

    _exportIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-download' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z'/></svg>";
    _importIcon = "<svg width='1.25em' height='1.25em' viewBox='0 0 16 16' class='bi bi-upload' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path fill-rule='evenodd' d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z'/></svg>";

    _importButtonID = "importButton";
    _importDivID = "importDiv";
    _exportButtonID = "exportButton";
    _exportDivID = "exportDiv";

    constructor (app) {
        const self = this;
        this._app = app;

        this._build();
        this.manage();

        $(document).ready(function() {
            self._exportButton.on("click", function() {

            });

            self._importButton.on("click", function() {

            });
        }); 
    }

    get div()                     { return $("#" + this._utilityID); }
    get app()                     { return this._app; }

    get _exportButton()           { return $("#" + this._exportButtonID); }
    get _exportDiv()              { return $("#" + this._exportDivID); }

    get _importButton()           { return $("#" + this._importButtonID); }
    get _importDiv()              { return $("#" + this._importDivID); }

    _build() {
        const exportIcon = this._exportIcon;
        const importIcon = this._importIcon;

        const importButton = "<button id = '" + this._importButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + importIcon + "</button>";
        const importDiv = "<div id = '" + this._importDivID + "' class = 'popUpMenu'></div>";

        const exportButton = "<button id = '" + this._exportButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>" + exportIcon + "</button>";
        const exportDiv = "<div id = '" + this._exportDivID + "' class = 'popUpMenu'></div>";

        this.div.addClass("btn-group");
        this.div.attr("role", "group");

        this.div.append(importButton + importDiv);
        this._importDiv.append();

        this.div.append(exportButton + exportDiv);
        this._exportDiv.append();
    }

    manage() {
    }

    downloadJSON() {
        json = this.currentUser.createJSON();
        const blob1 = new Blob([json], { type: "text/plain;charset=utf-8" });
        const name = this.currentUser.userName + ".json";
 
        //Check the Browser.
        const isIE = false || !!document.documentMode;
        if (isIE) { window.navigator.msSaveBlob(blob1, name); }
        else {
            const url = window.URL || window.webkitURL;
            const link = url.createObjectURL(blob1);
            var a = $("<a />");
            a.attr("download", name);
            a.attr("href", link);
            $("body").append(a);
            a[0].click();
            $("body").remove(a);
        }
    }

    uploadJSON() {
        const hiddenDiv = "<div id = 'hiddenDiv' class = 'hidden'></div>";
        const fi = "<input id = 'upload' type = 'file'>";
        var fi = $();
        $("body").append(hiddenDiv);
        $("hiddenDiv").append(fi);
        $("upload").click( function () {
            if (!window.FileReader) {
                return alert( 'FileReader API is not supported by your browser.' );
            }
            var $i = $('#upload'), // Put file input ID here
                input = $i[0]; // Getting the element from jQuery
            if ( input.files && input.files[0] ) {
                file = input.files[0]; // The file
                fr = new FileReader(); // FileReader instance
                fr.onload = function () {
                    // Do stuff on onload, use fr.result for contents of file
                    this.utilities.syncUtility(fr.result);
                };
                fr.readAsText(file);
                //fr.readAsDataURL( file );
            } else {
                // Handle errors here
                alert( "Either a file was not selected, or the browser is incompatible." )
            }
        } );

        $("upload").click();
        $("hiddenDiv").remove();

    }

    closeMenus(except) {
        if (except != this._issuePickerButtonID)   {
            this._issuePickerDiv.addClass("hidden");
            this._issuePickerButton.blur();
        }
        if (except != this._issueRenameButtonID)   { 
            this._issueRenameDiv.addClass("hidden");
            this._issueRenameButton.blur();
        }
        if (except != this._issueAddButtonID)      { 
            this._issueAddDiv.addClass("hidden");
            this._issueAddButton.blur();
        }
        if (except != this._sessionPickerButtonID) { 
            this._sessionPickerDiv.addClass("hidden");
            this._sessionPickerButton.blur();
        }
    }
}