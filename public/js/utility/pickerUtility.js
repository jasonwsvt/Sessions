//PickerUtility extends PopUpDivUtility.
//- search (true/false, defaults true)
//- search icon (with defaults),
//- search icon side (defaults right),
//- addSortMethod,
//- removeSortMethod,
//- sortMethodsArray (if only one sort method, sort methods are not shown,
//                    click sort button a second time in a row to reverse the sort),
//- object to pick from / directions to it)

class PickerUtility {
    _popUpDivUtility = null;

    constructor(data) {
        this._popUpDivUtility = new PopUpDivUtility();
        //data is either undefined, an array with method values in a specific order, or an object
    }

    _initEvents() {
        const self = this;
        $(document).ready(function() {
        });
    }
}