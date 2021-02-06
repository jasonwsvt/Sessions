//a DataTree is an object with three characteristic parameters:
// 1) one called "id" that signifies the id,
// 2) one ending with "Id" that signifies the parent id (except for the initial record), and
// 3) one ending in "s" that signifies the array of children (except for the terminal records).
class DataTree extends Flags {
    _data;
    
    constructor(data = {}) {
        super("addFlag", false, false, "flagExists", false, false);
        if (isDataTree(data)) { this._data = data; }
        this.addFlag("select");
    }

    //DataTree methods
    export() { return this._data; }
    import(data) {
        throwError(isDataTree, data);
        if (Object.keys(this._data).length) { this.clear(); }
        this._data = data;
    }
    exportJSON() { return JSON.stringify(this._data); }
    importJSON(data) { if (isDataTree(data)) { this._data = data; } }
    exportToSessionStorage(name) { sessionStorage.setItem(name, this.exportJSON()); }
    exportToLocalStorage(name) { localStorage.setItem(name, this.exportJSON()); }
    importFromSessionStorage(name) { this.importJSON(sessionStorage.getItem(name)); }
    importFromLocalStorage(name) { this.importJSON(localStorage.getItem(name)); }
    size() { return ids().length(); }
    isDataTree(data) {
        const keys = Object.keys(data);
        return (isObject(data) &&
            keys.includes("id") &&
            (keys.find(key => key.endsWith("Id")) || keys.find(key => key.endsWith("s"))));
    }
    isEmpty() { return this._data == {}; }
    clear() { this._data = {}; }


    //Record creation, reading, updating, deletion
    add(parentId, record) {}
    update(id, record) {}
    delete(id) {}
    records() {
        const ids = smoothArray(arguments);
        throwError(isArrayOfIntegers, ids);
        return ids.map(id => this._record(id, this._data));
    }
    record(id) { return this._record(id, this._data); }

    exists(id) { return isInteger(this.tier(id)); }
    exist(ids) { throwError(isArrayOfIntegers, ids); return ids.every(id => this.exists(id)); }
    keys(id) { throwError(isInteger, id); return (this.exists(id)) ? this._dataKeys(this.record(id)) : undefined; }
    indexPath(id) { return this._indexPath(id, this._data); }
    idPath(id) { return this._idPath(id, this._data); }
    tier(id)   { throwError(isInteger, id); const t = this.indexPath(id); return (t === true) ? 0 : t.length; }

    //Parent methods
    hasParent(id) { return this.tier(id); }
    parentId(id) { return (this.hasParent(id)) ? this.idPath(id).slice(-2, -1)[0] : null; }
    parentIds() {
        const ids = smoothArray(arguments);
        throwError(isArrayOfIntegers, ids);
        return [...new Set(ids.map(id => this.parentId(id)))]; //.filter(id => isInteger(id));
    }
    parentIdName(id) { return (this.exists(id)) ? this._dataParentIdName(this.record(id)) : undefined; }

    //Children methods
    hasChildren(id) {
        const record = this.record(id);
        return (record && !!this._dataChildrenName(record));
    }
    childrenName(id) { return (this.exists(id)) ? this._dataChildrenName(this.record(id)): undefined; }
    childIds(id) {
        if (!this.exists(id)) { return null; }
        const record = this.record(id);
        const group = this._dataChildrenName(record);
        return (group) ? record[group].map(child => child.id) : [];
    }
    //Add a child to an existing parent with the id given by parentId.
    //The parentId parameter is added to the record before calling the insert method.
    //If another parentId paremeter is found it's removed.
    addChildren(parentId, records) { throwError(isArrayOfDataTrees, records); records.forEach(record => this.addChild(parentId, record)); }
    addChild(parentId, record) {
        throwError(isInteger, parentId);
        if (!this.exists(parentId)) { throw new Error("Parent ID", parentId, "does not exist."); }
        throwError(isDataTree, record);
        const parentIdName = this.childrenName(parentId).splice(0, -1) + "Id";
        if (record[parentIdName] != parentId) {
            const oldParentIdName = this._dataParentIdName(record);
            if (oldParentIdName != parentIdName) { delete record[oldParentIdName]; }
            record[parentIdName] = parentId;
        }
        //record[this._dataParentIdName(record)] = parentId;
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
    
    descendantIds(id) { return this._ids(this.record(id, data)).splice(ids.indexOf(id), 1); }

    unionIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return [...new Set(this.ids().concat(dataTree.ids()))];
    }

    //returns a list of ids that exist in both the given data and the local data.
    commonIds(dataTree) {
        return this.unionIds(dataTree).filter(id => this.ids().includes(id) && dataTree.ids().includes(id));
    }

    //returns a list of ids that don't exist in both the given data and the local data.
    exclusiveIds(dataTree) {
        return this.unionIds(dataTree).filter(id => !(dataTree.ids().includes(id) && this.ids().includes(id)));
    }

    //returns a list of ids that exist in the given data but don't exist in the local data.
    absentIds(dataTree) {
        return this.unionIds(dataTree).filter(id => dataTree.ids().includes(id) && !this.ids().includes(id));
    }

    //returns a list of ids that exist in the local data but don't exist in the given data.
    uniqueIds(dataTree) {
        return this.unionIds(dataTree).filter(id => this.ids().includes(id) && !dataTree.ids().includes(id));
    }


    //Methods for editing and deleting record parameters
    editParameter(id, name, value) {
        throwError(isInteger, id);
        throwError(isString(name));
        const path = this.indexPath(id);
        const group = this.idPath(id).map(id => this.childrenName(id));
        switch (path.length) {
            case 1: this._data[group[0]][path[0]][name] = value; break;
            case 2: this._data[group[0]][path[0]][group[1]][path[1]][name] = value; break;
            case 3: this._data[group[0]][path[0]][group[1]][path[1]][group[2]][path[2]][name] = value; break;
        }
    }

    editParameters(id, names, values) {
        throwError(isInteger, id);
        throwError(isArrayOfStrings(names));
        if (names.length != values.length) { throw new Error("names and values must be arrays of the same length"); }
        var name, value;
        const path = this.indexPath(id);
        const group = this.idPath(id).map(id => this.childrenName(id));
        for (i = 0; index < names.length; i++) {
            name = names[i];
            value = values[i]
            switch (path.length) {
                case 1: this._data[group[0]][path[0]][name] = value; break;
                case 2: this._data[group[0]][path[0]][group[1]][path[1]][name] = value; break;
                case 3: this._data[group[0]][path[0]][group[1]][path[1]][group[2]][path[2]][name] = value; break;
            }
        }
    }

    deleteParameter(id, key) {}
    deleteParameters(id, keys) {}


    //Methods for two DataTrees



    //Private methods
    //Returns an array of indices, one index for each set of children
    _indexPath(id, data) {
        throwError(isInteger, id);
        throwError(isDataTree, data);
        var path;
        if (data.id == id) { return []; }
        else {
            const childrenName = this._dataChildrenName(data);
            if (childrenName) {
                path = data[childrenName].map((child, index) => {
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

    _idPath(id, data) {
        throwError(isInteger, id);
        throwError(isDataTree, data);
        var path = false;
        if (data.id == id) { return [id]; }
        else {
            const childrenName = this._dataChildrenName(data);
            if (childrenName) {
                path = data[childrenName].map((child) => {
                    const p = this._idPath(id, child);
                    return (isArray(p)) ? [data.id, ...p]
                         : false;
    
                }).find(p => isArray(p));
                return (path === undefined) ? false : path;
            }
            else { return false; }
        }
    }

    _dataParentIdName(dataTree) {
        throwError(isDataTree, dataTree);
        const name = this._dataKeys(dataTree).find(key => key.endsWith("Id"));
        return (isString(name)) ? name : undefined;
    }

    _dataKeys(dataTree) { throwError(isDataTree, dataTree); return Object.keys(dataTree); }

    //Find the children key name and return it
    _dataChildrenName(data) {
        throwError(isDataTree, data);
        const name = this._dataKeys(data).find(key => key.endsWith("s"));
        return (isString(name) && name != "lines") ? name : undefined;
    }

    //Find the id in the given data and return the data for the record
    _record(id, data) {
        throwError(isInteger, id);
        throwError(isDataTree, data);
        const path = this.indexPath(id, data);
        if (path === true) { return data; }
        if (isArray(path)) {
            path.forEach(index => { data = data[this._dataChildrenName(data)][index] });
            return data;
        }
    }

    //Return all the ids found in the given data
    _ids(data) {
        throwError(isDataTree, data);
        const childrenName = this._dataChildrenName(data);
        return (childrenName) ? [data.id].concat(...data[childrenName].map(child => this._ids(child)))
                              : [data.id];
    }

    //delete records for given ids
    delete()  {
        const ids = smoothArray(arguments);
        throwError(isArrayOfIntegers, ids);
        if (ids.length == 0) { return; }
        var path, group;
        ids = this.mostAncestral(ids);
        this.deleted.push(this.records(ids));

        ids.forEach(id => {
            path = this.indexPath(id);
            group = this.idPath(parentId).map(id => this.childrenName(id));
            console.log(id, path, path.length);
            if (path === true) { data = {}; }
            else {
                switch (path.length) {
                    case 1: this._data[group[0]].splice(path[0],1); break;
                    case 2: this._data[group[0]][path[0]][group[1]].splice(path[1],1); break;
                    case 3: this._data[group[0]][path[0]][group[1]][path[1]][group[2]].splice(path[3],1); break;
                }
            }
        });
    }

    //Undo last deletion in deletion stack
    undoDelete() {
        throwError(isArrayOfDataTrees, this.deleted);
        this.deleted.pop().forEach(record => { this.insert(record); });
    }

    //Each record must have a parentId, and a record with that ID must exist in the tree.
    insert(record) {
        throwError(isDataTree, record);
        var parentIdName; parentId, path, childrenNames;
        parentIdName = this._dataParentIdName(record);
        if (parentIdName) {
            parentId = record[parentIdName];
            path = this.indexPath(parentId);
            group = this.idPath(parentId).map(id => this.childrenName(id));
            switch (path.length) {
                case 1: this._data[group[0]].push(record); break;
                case 2: this._data[group[0]][path[0]][group[1]].push(record); break;
                case 3: this._data[group[0]][path[0]][group[1]][path[1]][group[2]].push(record); break;
            }
        }
    }

    //Calls isNewer for every record and returns whether or not they're all newer.
    areNewer(records) {
        throwError(isArrayOfDataTrees, records);
        return records.every(record => this.isNewer(record));
    }

    //If the id doesn't exist locally, returns true.
    //Compares given data to internal record of the same id, and returns if the local record is newer.
    isNewer(e) {
        throwError(isDataTree, e);
        if (!this.exists(e.id)) { return undefined; }
        const i = this.record(e.id);
        return ((i.lastEdited > 0 && e.lastEdited > 0 && i.lastEdited > e.lastEdited)  ||
                (i.creation   > 0 && e.creation   > 0 && i.creation   > e.creation)    ||
                (i.lastOpened > 0 && e.lastOpened > 0 && i.lastOpened > e.lastOpened));
    }

    //Calls isNewer for every given id in the given dataTree, and returns all the ids that returned true
    newerIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return this.commonIds(dataTree).filter(id => this.isNewer(dataTree.record(id)));
    }

    //If the id doesn't exist locally, returns undefined.
    //Compares given data to internal record of the same id, and returns if the local record is older.
    //Calls isOlder for every record and returns whether or not they're all older.
    _older() {
        const records = smoothArray(arguments);
        throwError(isArrayOfDataTrees, records);
        return records.every(record => {
            if (!this.exists(e.id)) { return undefined; }
            const i = this.record(e.id);
            return ((i.lastEdited > 0 && e.lastEdited > 0 && i.lastEdited < e.lastEdited)  ||
                    (i.creation   > 0 && e.creation   > 0 && i.creation   < e.creation)    ||
                    (i.lastOpened > 0 && e.lastOpened > 0 && i.lastOpened < e.lastOpened));
        });
    }

    //Calls _older for every given id in the given dataTree, and returns if all calls returned true
    olderIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return this.commonIds(dataTree).filter(id => this._older(dataTree.record(id)));
    }

    //Compares given data to internal record of the same id, and returns if the given record is identical.
    _identical() {
        const records = smoothArray(arguments);
        throwError(isArrayOfDataTrees, records);
        return records.every(external => {
            const internal = this.record(external.id);
            if (internal.length !== external.length) { return false; }
            const externalKeys = Object.keys(external);
            Object.keys(internal).forEach(key => {
                if (!externalKeys.includes(key)) { return false; }
                if (internal[key] != external[key]) { return false; }
            });
            return true;
        });
    }

    //Calls isIdentical for every given id in the given dataTree, and returns if all calls returned true
    identicalIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return this.commonIds(dataTree).filter(id => this._identical(dataTree.record(id)));
    }

    //Calls !isIdentical for every record and returns whether or not they're all different.
    _different(records) {
        throwError(isArrayOfDataTrees, records);
        return records.every(record => !this.isIdentical(record));
    }
    //Calls !isIdentical for every given id in the given dataTree, and returns if all calls returned true
    differentIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return this.commonIds(dataTree).filter(id => !this._identical(dataTree.record(id)));
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

    _mergeFlagged(flag, dataTree) {
        if (!dataTree.flagExists(flag)) {
            throw new Error("Flag doesn't exist (" + flag + ").");
        }
        if (!Object.keys(dataTree[flag + "Methods"]()).includes("list")) {
            throw new Error("List method doesn't exist for " + flag + ".");
        }
        this.mergeIds(dataTree[flag + "Method"]("list"), dataTree);
    }

    mergeSelected(dataTree) { this._mergeFlagged("select", dataTree); }


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