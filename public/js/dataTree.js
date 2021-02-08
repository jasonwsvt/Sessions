//a DataTree is an object with three characteristic parameters:
// 1) .id that signifies the id,
// 2) .children, if it exists, is an array of DataTrees, and
// 3) .parentId, if it exists, signifies that it is a child.
class DataTree extends Flags {
    _data = {};
    _indexPaths = [];
    _idPaths = [];
    
    constructor(data = {}) {
        super("addFlag", false, false, "flagExists", false, false);
        if (isDataTree(data)) { this._data = data; }
        this.addFlag("select");
    }

    //DataTree methods
    size() { return this.ids().length(); }
    isEmpty() { return this._data == {}; }
    clear() { this._data = {}; }

    export() { return this._data; }
    exportJSON() { return JSON.stringify(this._data); }
    exportToSessionStorage(name) { sessionStorage.setItem(name, this.exportJSON()); }
    exportToLocalStorage(name) { localStorage.setItem(name, this.exportJSON()); }

    import(data) { throwError(isDataTree, data); this._data = data; }
    importJSON(json) { this.import(JSON.parse(json)); }
    importFromSessionStorage(name) { this.importJSON(sessionStorage.getItem(name)); }
    importFromLocalStorage(name) { this.importJSON(localStorage.getItem(name)); }

    isDataTree(data, parentId) {
        const keys = Object.keys(data);
        return (isObject(data) &&
            data.hasOwnProperty("id") &&
            (!data.hasOwnProperty("parentId") || data.parentId == parentId) &&
            (!data.hasOwnProperty("children") || data.children.every(child => this.isDataTree(child, id))));
    }


    //Record creation, reading, updating, deletion
    update(id, record) { record.id = id; this.insert(record); }

    //If record.id exists in tree and has a parent, the replacement record will take the old record's parentId.
    //If record.id doesn't exist, or record.id doesn't have a parent, the record will take the root.
    insert(record) {
        throwError(isDataTree, record);
        if (this.has(record.id) && this.hasParent(id)) {
            parent = this.record(record.parentId);
            if (!parent.hasOwnProperty("children")) { parent.children = [record]; }
            else { parent.children.push(record); }
        }
        else { this.import(record); }
    }

    //To delete a parameter, value must be undefined
    edit(id, names, values) {
        throwError(isInteger, id);
        if (!isArray(names)) { names = [names]; }
        if (!isARray(values)) { values = [values]; }
        if (names.length != values.length) { throw new Error("names and values must be arrays of the same length"); }
        const path = this.indexPath(id);
        var name, value;
        names.forEach((name, index) => { this.record(id)[name] = values[index]; });
    }

    delete()  {
        const ids = smoothArray(arguments);
        throwError(isArrayOfIntegers, ids);
        if (ids.length == 0) { return; }
        var path, group;
        ids = this.mostAncestral(ids);
        this.deleted.push(this.records(ids));
        if (ids.length == 1 && this.tier(ids[0]) == 0) { this.data = {}; return; }
        ids.forEach(id => {
            const parentId = this.parentId(id);
            const index = this.indexPath(id).splice(-1, 1);
            this.record(parentId).children.splice(index, 1);
        });
    }

    //Undo last deletion in deletion stack
    undoDelete() {
        if (!isArrayOfDataTrees(this.deleted)) { return; }
        this.deleted.pop().forEach(record => { this.insert(record); });
    }

    records() {
        const ids = smoothArray(arguments);
        throwError(isArrayOfIntegers, ids);
        return ids.map(id => this._record(id, this._data));
    }
    record(id)    { return this._record(id, this._data); }
    has()         { return smoothArray(arguments).every(id => isInteger(this.tier(id))); }
    keys(id)      { throwError(isInteger, id); return (this.has(id)) ? this._dataKeys(this.record(id)) : undefined; }

    indexPath(id) {
        var path = this._indexPaths.find(path => path.id == id);
        if (!path) {
            path = this._indexPath(id, this._data);
            if (path) { this._indexPaths.push({ id: id, path: path }); }
        }
        return path;
    }

    idPath(id)    {
        var path = this._idPaths.find(path => path.id == id);
        if (!path) {
            path = this._idPath(id, this._data);
            if (path) { this._idPaths.push({ id: id, path: path }); }
        }
        return path;
    }

    tier(id)      { const t = this._indexPath(id, this._data); return (t === true) ? 0 : t.length; }

    //Parent methods
    hasParent(id) { return !!this.tier(id); }
    parentId(id)  { return (this.hasParent(id)) ? this.idPath(id).slice(-2, -1)[0] : null; }
    parentIds() {
        const ids = smoothArray(arguments);
        throwError(isArrayOfIntegers, ids);
        return [...new Set(ids.map(id => this.parentId(id)))];
    }

    //Children methods
    hasChildren(id) {
        if (!this.has(id)) { return undefined; }
        return this._dataHasChildren(this.record(id));
    }

    //Add a child to an existing parent with the id given by parentId.
    //The parentId parameter is added to the record before calling the insert method.
    //If another parentId paremeter is found it's removed.
    addChildren(parentId, records) {
        throwError(isArrayOfDataTrees, records);
        records.forEach(record => this.addChild(parentId, record));
    }
    addChild(parentId, record) {
        throwError(isInteger, parentId);
        if (!this.has(parentId)) { throw new Error("Parent ID", parentId, "does not exist."); }
        throwError(isDataTree, record);
        record.parentId = parentId;
        this.insert(record);
    }

    //Id methods
    ids() { return this._ids(this._data); }
    tierIds(tier) { throwError(isInteger, tier); this.ids().filter(id => this.tier(id) == tier); }

    mostAncestral() {
        const ids = smoothArray(arguments);
        throwError(isArrayOfIntegers, ids);
        //filters a set of ids to only include those for which none of the others precede it in any path
        ids.map(id => this.idPath(id)).forEach(path => {
            while (path.length) {
                if (ids.includes(path.shift())) {
                    path.forEach(id => {
                        if (ids.includes(id)) { ids.splice(ids.indexOf(id), 1); }
                    });
                }
            }
        });
        return ids;
    }
    
    childIds(id) {
        if (!this.has(id) || !this.hasChildren(id)) { return null; }
        const record = this.record(id);
        return record.children.map(child => child.id);
    }

    descendantIds(id) { return this._ids(this.record(id, data)).splice(ids.indexOf(id), 1); }


    //Methods for two DataTrees
    unionIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return [...new Set(this.ids().concat(dataTree.ids()))];
    }

    compareIds(dataTree, inSet1, inSet2) {
        const set1 = this.ids();
        const set2 = dataTree.ids();
        return this.unionIds(dataTree).filter(id => set1.includes(id) == inSet1 && set2.includes(id) == inSet2);
    }
    commonIds(dataTree)    { return this.compareIds(dataTree, true,  true); }
    uniqueIds(dataTree)    { return this.compareIds(dataTree, true,  false); }
    absentIds(dataTree)    { return this.compareIds(dataTree, false, true); }
    exclusiveIds(dataTree) { return this.uniqueIds(dataTree).concat(this.absentIds(dataTree)); }

    //Calls isNewer for every given id in the given dataTree, and returns all the ids that returned true
    newerIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return this.commonIds(dataTree).filter(id => {
            if (!this.has(id)) { return undefined; }
            const i = this.record(e.id);
            const e = dataTree.record(id);
            return ((i.lastEdited > 0 && e.lastEdited > 0 && i.lastEdited > e.lastEdited)  ||
                    (i.creation   > 0 && e.creation   > 0 && i.creation   > e.creation)    ||
                    (i.lastOpened > 0 && e.lastOpened > 0 && i.lastOpened > e.lastOpened));
        });
    }

    //Calls _older for every given id in the given dataTree, and returns if all calls returned true
    olderIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return this.commonIds(dataTree).filter(id => {
            if (!this.has(e.id)) { return undefined; }
            const i = this.record(e.id);
            const e = dataTree.record(id);
            return ((i.lastEdited > 0 && e.lastEdited > 0 && i.lastEdited < e.lastEdited)  ||
                    (i.creation   > 0 && e.creation   > 0 && i.creation   < e.creation)    ||
                    (i.lastOpened > 0 && e.lastOpened > 0 && i.lastOpened < e.lastOpened));
        });
    }

    //Returns all ids in dataTree that are common and identical to ones in this.
    identicalIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return this.commonIds(dataTree).filter(id => {
            const internal = this.record(id);
            const external = dataTree.record(id);
            if (internal.length !== external.length) { return false; }
            const externalKeys = Object.keys(external);
            Object.keys(internal).forEach(key => {
                if (!externalKeys.includes(key)) { return false; }
                if (internal[key] != external[key]) { return false; }
            });
            return true;
        });
    }

    //Returns all ids in dataTree that are common and not indentical to ones in this.
    differentIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        const identical = this.identicalIds();
        return this.commonIds(dataTree).filter(id => !identical.includes(id));
    }
    
    merge(records) {
        throwError(isArrayOfDataTrees, records);
        records.forEach(record => this.insert(record));
    }

    mergeIds(ids, dataTree)  {
        throwError(isArrayOfIntegers, ids);
        throwError(isDataTree, dataTree);
        this.merge(dataTree.mostAncestral(dataTree.records(ids)));
    }

    mergeNewer(dataTree) {
        throwError(isDataTree, dataTree);
        this.mergeIds(dataTree.newerIds(this), dataTree);
    }

    mergeOlder(dataTree) {
        throwError(isDataTree, dataTree);
        this.mergeIds(dataTree.olderIds(this), dataTree);
    }

    mergeDifferent(dataTree) {
        throwError(isDataTree, dataTree);
        this.mergeIds(this.differentIds(dataTree), dataTree);
    }

    mergeAbsent(dataTree) {
        throwError(isDataTree, dataTree);
        this.mergeIds(this.absentIds(dataTree), dataTree);
    }

    //Merge this.data and dataTree based on the internal flagged (e.g. selected) list
    mergeFlagged(flag, dataTree) {
        if (!dataTree.flagExists(flag)) {
            throw new Error("Flag doesn't exist (" + flag + ").");
        }
        if (!Object.keys(dataTree[flag + "Methods"]()).includes("list")) {
            throw new Error("List method doesn't exist for " + flag + ".");
        }
        this.mergeIds(dataTree[flag + "Method"]("list"), dataTree);
    }

    //Merge this.data and dataTree based on the internal selected list.
    mergeSelected(dataTree) { this.mergeFlagged("select", dataTree); }   



    //Private methods
    //Returns an array of indices, one index for each array of children
    _indexPath(id, data) {
        throwError(isInteger, id);
        throwError(isDataTree, data);
        var path;
        if (data.id == id) { return []; }
        else {
            if (this._dataHasChildren(data)) {
                path = data.children.map((child, index) => {
                    const p = this._indexPath(id, child);
                    return (child.id == id) ? [index]
                         : (isArray(p)) ? [index, ...p]
                         : false;
    
                }).find(p => isArray(p));
                return (path === undefined) ? false : path;
            }
            else { return false; }
        }
    }

    //Returns an array of indices, each index containing a child id
    _idPath(id, data) {
        throwError(isInteger, id);
        throwError(isDataTree, data);
        var path = false;
        if (data.id == id) { return [id]; }
        else {
            if (this._dataHasChildren(data)) {
                path = data.children.map((child) => {
                    const p = this._idPath(id, child);
                    return (isArray(p)) ? [data.id, ...p]
                         : false;
    
                }).find(p => isArray(p));
                return (path === undefined) ? false : path;
            }
            else { return false; }
        }
    }

    _dataKeys(dataTree) { throwError(isDataTree, dataTree); return Object.keys(dataTree); }

    _dataHasChildren(data) {
        throwError(isDataTree, data);
        return (data.hasOwnProperty("children") && isArray(data.children) && data.children.length); 
    }

    //Find the id in the given data and return the data for the record
    _record(id, data) {
        throwError(isInteger, id);
        throwError(isDataTree, data);
        const path = this.indexPath(id, data);
        if (path === true) { return data; }
        if (isArray(path)) {
            path.forEach(index => { data = data.children[index] });
            return data;
        }
    }

    //Return all the ids found in the given data
    _ids(data) {
        throwError(isDataTree, data);
        return (this._dataHasChildren(data))
            ? [data.id].concat(...data.children.map(child => this._ids(child)))
            : [data.id];
    }




    testing() {
        this._data = {
            "username": "jason",
            "id": 473992495658025,
            "lastEdited": 1610577142,
            "lastOpened": 1610668775,
            "hidden": false,
            "email": "",
            "rememberMe": false,
            "practitioner": false,
            "storagePermanence": false,
            "pushToStorageFrequency": 5,
            "useServerStorage": false,
            "pushToServerFrequency": false,
            "clients": [
                {
                    "name": "Self",
                    "id": 242409687387783,
                    "lastEdited": null,
                    "lastOpened": 1610668775,
                    "userId": 473992495658025,
                    "issues": [
                        {
                            "name": "New Issue",
                            "id": 183289269562362,
                            "lastEdited": null,
                            "lastOpened": 1610668775,
                            "clientId": 242409687387783,
                            "sessions": [
                                {
                                    "creation": 1610578708,
                                    "id": 783632042579983,
                                    "lastEdited": 1610668330,
                                    "lastOpened": 1610668775,
                                    "issueId": 183289269562362,
                                    "lines": [
                                        "<div><h2 id=\"cursor\">|</h2></div>"
                                    ]
                                },
                                {
                                    "creation": 1610557182,
                                    "id": 860738253562629,
                                    "lastEdited": null,
                                    "lastOpened": 1610668775,
                                    "issueId": 183289269562362,
                                    "lines": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "New Issue 2",
                    "id": 183289260562362,
                    "lastEdited": null,
                    "lastOpened": 1610668775,
                    "clientId": 242409687387783,
                    "sessions": [
                        {
                            "creation": 1610578708,
                            "id": 783632042579083,
                            "lastEdited": 1610668330,
                            "lastOpened": 1610668775,
                            "issueId": 183289260562362,
                            "lines": [
                                "<div><h2 id=\"cursor\">|</h2></div>"
                            ]
                        },
                        {
                            "creation": 1610557182,
                            "id": 860708253562629,
                            "lastEdited": null,
                            "lastOpened": 1610668775,
                            "issueId": 183289260562362,
                            "lines": []
                        }
                    ]
                }
            ]
        }
    }

    testing2() {
        this._data = {
            "username": "jason",
            "id": 473992495658025,
            "lastEdited": 1610557142,
            "lastOpened": 1610668775,
            "hidden": false,
            "email": "",
            "rememberMe": false,
            "practitioner": false,
            "storagePermanence": false,
            "pushToStorageFrequency": 5,
            "useServerStorage": false,
            "pushToServerFrequency": false,
            "clients": [
                {
                    "name": "Self",
                    "id": 242409687387783,
                    "lastEdited": null,
                    "lastOpened": 1610678775,
                    "userId": 473992495658025,
                    "issues": [
                        {
                            "name": "New Issue",
                            "id": 183289269562362,
                            "lastEdited": null,
                            "lastOpened": 1610678775,
                            "clientId": 242409687387783,
                            "sessions": [
                                {
                                    "creation": 1610578708,
                                    "id": 783632042579983,
                                    "lastEdited": 1610679330,
                                    "lastOpened": 1610678775,
                                    "issueId": 183289269562362,
                                    "lines": [
                                        "<div><h2 id=\"cursor\">|</h2></div>"
                                    ]
                                },
                                {
                                    "creation": 1610557182,
                                    "id": 860738253562629,
                                    "lastEdited": 1610669775,
                                    "lastOpened": 1610668775,
                                    "issueId": 183289269562362,
                                    "lines": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}