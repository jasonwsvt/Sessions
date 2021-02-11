//a DataTree is an object with three characteristic parameters:
// 1) .id that signifies the id,
// 2) .children, if it exists, is an array of DataTrees, and
// 3) .parentId, if it exists, signifies that it is a child.
class DataTree {
    _data = {};
    _deleted = [];
    _indexPaths = [];
    _idPaths = [];
    _select = new List((value, items) => (isInteger(value)) && !items.find(item => item.value == value));
    
    constructor(data) {
        if (this.isDataTree(data)) { this._data = data; }
    }

    //DataTree methods
    size() { const ids = this.ids(); return (isArray(ids)) ? this.ids().length : 0; }
    isEmpty() { return Object.keys(this._data) == 0; }
    clear() { this._data = {}; }

    export() { return this._data; }
    exportJSON() { return JSON.stringify(this._data); }
    exportToSessionStorage(name) { sessionStorage.setItem(name, this.exportJSON()); }
    exportToLocalStorage(name) { localStorage.setItem(name, this.exportJSON()); }

    import(data) { if (this.isDataTree(data)) { this._data = data; } }
    importJSON(json) { this.import(JSON.parse(json)); }
    importFromSessionStorage(name) { this.importJSON(sessionStorage.getItem(name)); }
    importFromLocalStorage(name) { this.importJSON(localStorage.getItem(name)); }

    isDataTree(data, parentId) {
        //console.log(!isObject(data))
        if (!isObject(data)) { return false; }
        //console.log(data.hasOwnProperty("id"))
        //console.log((!data.hasOwnProperty("parentId") || data.parentId == parentId || ((parentId == undefined && this.has(data.parentId)))))
        return (data.hasOwnProperty("id") &&
              (!data.hasOwnProperty("parentId") || data.parentId == parentId || ((parentId == undefined && this.has(data.parentId)))) &&
              (!data.hasOwnProperty("children") || data.children.every(child => this.isDataTree(child, data.id))));
    }

    isArrayOfDataTrees(data) {
        return (isArray(data) && data.every(item => this.isDataTree(item)));
    }

    //Record creation, reading, updating, deletion
    //If record.id exists in tree and has a parent, the replacement record will take the old record's parentId.
    //If record.id doesn't exist, or record.id doesn't have a parent, the record will take the root.
    insert(record) {
        //console.log("Record:", record)
        //console.log("isDataTree:", this.isDataTree(record))
        //console.log("Has", record.id, ":", this.has(record.id))
        if (!this.isDataTree(record) || this.has(record.id)) { return; }
        //console.log("Has parent id:", record.hasOwnProperty("parentId"))
        //console.log("Has", record.parentId, ":", this.has(record.parentId))
        //console.log("Parent record:", this.record(record.parentId))
        if (record.hasOwnProperty("parentId") && this.has(record.parentId)) {
            parent = this.record(record.parentId);
            //console.log(record, record.parentId, parent, this.record(record.parentId));
            if (!parent.hasOwnProperty("children")) { parent.children = [record]; }
            else { parent.children.push(record); }
        }
        else {
            console.log("No parentId.  Importing.");
            this.import(record);
        }
    }

    update(id, record) { record.id = id; this.insert(record); }

    delete(...args)  {
        var ids = smoothArray(args);
        throwError(isArrayOfIntegers, ids);
        ids = ids.filter(id => this.has(id));
        if (ids.length == 0) { return; }
        ids = this.mostAncestral(ids);
        this._deleted.push(this.records(ids));
        //console.log(this._deleted);
        if (this.tier(ids[0]) == 0) { this.clear(); return true; }
        ids.forEach(id => {
            const parentId = this.parentId(id);
            const index = this.indexPath(id).splice(-1, 1)[0];
            //console.log(parentId, index);
            this.record(parentId).children.splice(index, 1);
            //console.log(this.record(parentId));
        });
        return true;
    }

    //Undo last deletion in deletion stack
    undoDelete() {
        if (isArray(this._deleted) && this._deleted.length > 0) {
            if (!this.isArrayOfDataTrees(this._deleted[this._deleted.length - 1])) { return; }
            console.log(this._deleted);
            this._deleted.pop().forEach(record => { this.insert(record); });
        }
    }

    records(...ids) {
        ids = (ids == undefined) ? this.ids()
            : (isArray(ids)) ? smoothArray(ids)
            : undefined;
        throwError(isArrayOfIntegers, ids);
        return ids.map(id => this._record(id, this._data));
    }
    record(id)    { return this._record(id, this._data); }
    has(...ids)   { return smoothArray(ids).every(id => isInteger(this.tier(id)));  }
    keys(id)      { throwError(isInteger, id); return (this.has(id)) ? this._dataKeys(this.record(id)) : undefined; }
    values(id)    { throwError(isInteger, id); return (this.has(id)) ? this._dataValues(this.record(id)) : undefined; }

    indexPath(id) {
        var path = this._indexPaths.find(path => path.id == id);
        path = (path) ? path.path : false;
        //console.log(id, path);
        if (!path) {
            path = this._indexPath(id, this._data);
            if (path) { this._indexPaths.push({ id: id, path: path }); }
        }
        //console.log(path);
        return path;
    }

    idPath(id)    {
        var path = this._idPaths.find(path => path.id == id);
        //console.log(path);
        path = (path) ? path.path : false;
        //console.log(path);
        if (!path) {
            path = this._idPath(id, this._data);
            if (path) { this._idPaths.push({ id: id, path: path }); }
        }
        return path;
    }

    tier(id)      { const t = this._indexPath(id, this._data); return (t === true) ? 0 : t.length; }

    //Parent methods
    hasParent(id) { return !!this.tier(id); }
    parentId(id)  {
        if (!this.has(id)) { return undefined; }
        const p = this.idPath(id);
        return (p.length > 1) ? p.slice(-2, -1)[0] : null;
    }
    parentIds(...ids) {
        ids = smoothArray(ids);
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
        if (!this.isDataTree(record)) { return; }
        if (!this.has(parentId)) { throw new Error("Parent ID", parentId, "does not exist."); }
        record.parentId = parentId;
        this.insert(record);
    }

    //Id methods
    ids() { return this._ids(this._data); }
    tierIds(tier) {
        throwError(isInteger, tier);
        return this.ids().filter(id => this.tier(id) == tier);
    }

    mostAncestral(...ids) {
        ids = smoothArray(ids);
        //ids.forEach(id => console.log(this.parentId(id)))
        throwError(isArrayOfIntegers, ids);
        //filters a set of ids to only include those for which none of the others precede it in any path
        ids.map(id => {
            var path = this.idPath(id);
            var id =  this.parentId(path[path.length-1]);
            //console.log(id, path, this.parentId(id));
            path.forEach(path => {
                while (path.length) {
                    if (ids.includes(path.shift())) {
                        path.forEach(id => {
                            if (ids.includes(id)) { ids.splice(ids.indexOf(id), 1); }
                        });
                    }
                }
            });
            //console.log(id, path, this.parentId(id));
        });
//        ids.forEach(id => console.log(id, this.parentId(id)))
        return ids;
    }
    
    childIds(id) {
        if (!this.has(id) || !this.hasChildren(id)) { return null; }
        const record = this.record(id);
        return record.children.map(child => child.id);
    }

    descendantIds(id) {
        var ids = this._ids(this.record(id));
        ids.splice(ids.indexOf(id), 1);
        return ids;
    }


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
        this.merge(dataTree.mostAncestral(dataTree.records(ids)));
    }

    mergeNewer(dataTree)     { this.mergeIds(dataTree.newerIds(this), dataTree); }
    mergeOlder(dataTree)     { this.mergeIds(dataTree.olderIds(this), dataTree); }
    mergeDifferent(dataTree) { this.mergeIds(this.differentIds(dataTree), dataTree); }
    mergeAbsent(dataTree)    { this.mergeIds(this.absentIds(dataTree), dataTree); }

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
    mergeSelected(dataTree) { this.mergeIds(dataTree.select.values(), dataTree); }



    //Private methods
    //Returns an array of indices, one index for each array of children
    _indexPath(id, data) {
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

    _dataKeys(dataTree) { return Object.keys(dataTree); }
    _dataValues(dataTree) { return Object.values(dataTree); }

    _dataHasChildren(data) {
        return (data.hasOwnProperty("children") && isArray(data.children) && data.children.length); 
    }

    //Find the id in the given data and return the data for the record
    _record(id, data) {
        //console.log(id, data);
        //if (this._dataHasChildren(id)) { data.children.map((child) => console.log(id, this._record(id, child))); }
        return (data.id == id) ? data
             : (this._dataHasChildren(data)) ? data.children.map((child) => this._record(id, child)).find(child => child != undefined)
             : undefined;
    }

    //Return all the ids found in the given data
    _ids(data) {
//        console.log([data.id].concat(...data.children.map(child => this._ids(child))));
        return (data.hasOwnProperty("id"))
             ? (data.hasOwnProperty("children"))
                ? [data.id].concat(...data.children.map(child => this._ids(child)))
                : [data.id]
             : null;
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
            "children": [
                {
                    "name": "Self",
                    "id": 242409687387783,
                    "lastEdited": null,
                    "lastOpened": 1610668775,
                    "parentId": 473992495658025,
                    "children": [
                        {
                            "name": "New Issue",
                            "id": 183289269562362,
                            "lastEdited": null,
                            "lastOpened": 1610668775,
                            "parentId": 242409687387783,
                            "children": [
                                {
                                    "creation": 1610578708,
                                    "id": 783632042579983,
                                    "lastEdited": 1610668330,
                                    "lastOpened": 1610668775,
                                    "parentId": 183289269562362,
                                    "lines": [
                                        "<div><h2 id=\"cursor\">|</h2></div>"
                                    ]
                                },
                                {
                                    "creation": 1610557182,
                                    "id": 860738253562629,
                                    "lastEdited": null,
                                    "lastOpened": 1610668775,
                                    "parentId": 183289269562362,
                                    "lines": []
                                }
                            ]
                        },
                        {
                            "name": "New Issue 2",
                            "id": 183289260562362,
                            "lastEdited": null,
                            "lastOpened": 1610668775,
                            "parentId": 242409687387783,
                            "children": [
                                {
                                    "creation": 1610578708,
                                    "id": 783632042579083,
                                    "lastEdited": 1610668330,
                                    "lastOpened": 1610668775,
                                    "parentId": 183289260562362,
                                    "lines": [
                                        "<div><h2 id=\"cursor\">|</h2></div>"
                                    ]
                                },
                                {
                                    "creation": 1610557182,
                                    "id": 860708253562629,
                                    "lastEdited": null,
                                    "lastOpened": 1610668775,
                                    "parentId": 183289260562362,
                                    "lines": []
                                }
                            ]
                        }        
                    ]
                },
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
            "children": [
                {
                    "name": "Self",
                    "id": 242409687387783,
                    "lastEdited": null,
                    "lastOpened": 1610678775,
                    "parentId": 473992495658025,
                    "children": [
                        {
                            "name": "New Issue",
                            "id": 183289269562362,
                            "lastEdited": null,
                            "lastOpened": 1610678775,
                            "parentId": 242409687387783,
                            "children": [
                                {
                                    "creation": 1610578708,
                                    "id": 783632042579983,
                                    "lastEdited": 1610679330,
                                    "lastOpened": 1610678775,
                                    "parentId": 183289269562362,
                                    "lines": [
                                        "<div><h2 id=\"cursor\">|</h2></div>"
                                    ]
                                },
                                {
                                    "creation": 1610557182,
                                    "id": 860738253562629,
                                    "lastEdited": 1610669775,
                                    "lastOpened": 1610668775,
                                    "parentId": 183289269562362,
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