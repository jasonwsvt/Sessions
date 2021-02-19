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
    
    constructor(data) { if (data) { this.import(data); } }

    //DataTree methods
    size() { const ids = this.ids(); return (isArray(ids)) ? this.ids().length : 0; }
    isEmpty() { return Object.keys(this._data) == 0; }
    clear() { this._data = {}; }

    export() { return this._data; }
    exportJSON() { return JSON.stringify(this._data); }
    exportPrettyJSON() { return JSON.stringify(this._data, null, "\t"); }
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
        //console.log("got here", record.id)
        if (isObject(record) && !record.hasOwnProperty("id")) { record.id = this._newId(); }
        if (!this.isDataTree(record)) { return; }
        if (!record.hasOwnProperty("creation")) { record.creation = this._now(); }
        if (!record.hasOwnProperty("lastEdited")) { record.lastEdited = this._now(); }
        if (record.hasOwnProperty("parentId") && this.has(record.parentId)) {
            parent = this._record(record.parentId);
            if (this.has(record.id) && !this.childIds(parent.id).includes(record.id)) { return; } //id exists but not replacing it
            if (!parent.hasOwnProperty("children")) {                              //Parent has no children
                parent.children = [record];
            } else if (!this.has(record.id)) {                                       //id doesn't exist
                parent.children.push(record);
            } else {
                const index = parent.children.findIndex(r => r.id == record.id);
                parent.children[index] = record;
            }
        } else {
            //console.log("got here")
            this.import(record);
        }
        return record.id;
    }

    update(id, record) {
        if (this.has(id)) { record.id = id; record.lastEdited = this._now(); this.insert(record); }
    }

    edit(id, keys, values) {
        if (!isInteger(id) || !this.has(id)) { return; }
        if (isAlphanumeric(keys))            { keys = [keys]; }
        if (!isArray(values))                { values = [values]; }
        if (isArrayOfAlphanumerics(keys) && isArrayOfAlphanumerics(values) && keys.length == values.length) {
            const record = this._record(id);
            keys.forEach((key, index) => record[key] = values[index]);
            record.lastEdited = this._now();
        }
    }

    hasKey(id, key) { return this.has(id) && this._record(id).hasOwnProperty(key); }
    getKey(id, key) {
        if (this.hasKey(id, key)) {
            this.record(id).lastOpened = this._now();
            return this.record(id)[key];
        }
    }
    setKey(id, key, value) {
        if (this.hasKey(id, key)) {
            this.record(id)[key] = value;
            this.record(id).lastEdited = this._now();
            return true;
        }
    }
    deleteKey(id, key) {
        if (this.hasKey(id, key)) {
            delete this.record(id)[key];
            this.record(id).lastEdited = this._now();
            return true;
        }
    }

    records(...ids) {
        if (ids == undefined) { ids = this.ids(); }
        else { ids = smoothArray(ids); }
        if (!isArrayOfIntegers(ids)) { return; }

        return ids.map(id => this.record(id, this._data));
    }

    record(id, data = this._data)    {
        if (!this.has(id)) { return; }
        const record = this._record(id, data);
        record.lastOpened = this._now();
        return record;
    }

    children(id) { return (this.hasChildren(id)) ? this._record(id).children.length : 0; }
    siblings(id) { return this.has(id) ? this.tier(id) == 0 ? 1 : this.children(this.parentId(id)) : undefined; }
    has(...ids)   { return smoothArray(ids).every(id => isInteger(this.tier(id)));  }
    keys(id)      { throwError(isInteger, id); return (this.has(id)) ? this._dataKeys(this._record(id)) : undefined; }
    values(id)    { throwError(isInteger, id); return (this.has(id)) ? this._dataValues(this._record(id)) : undefined; }

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

    tier(id)       { const t = this._indexPath(id, this._data); return (t === true) ? 0 : t.length; }
    creation(id)   { return this._record(id).creation; }
    lastEdited(id) { return this._record(id).lastEdited; }
    lastOpened(id) { return this._record(id).lastOpened; }

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
        return (!this.has(id)) ? undefined : this._dataHasChildren(this._record(id));
    }

    //Add a child to an existing parent with the id given by parentId.
    //The parentId parameter is added to the record before calling the insert method.
    //If another parentId paremeter is found it's removed.
    addChildren(parentId, records) {
        records.forEach(record => this.addChild(parentId, record));
    }

    addChild(parentId, record = {}) {
        if (!isInteger(parentId) || !this.has(parentId)) { return; }
        if (!record.hasOwnProperty("id")) { record.id = this._newId(); }
        if (!this.isDataTree(record)) { return; }
        record.parentId = parentId;
        this.insert(record);
        return record.id;
    }

    addSibling(siblingId, record = {}) {
        if (!isInteger(siblingId) || !this.has(siblingId) || this.tier(siblingId) == 0) { return; }
        if (!record.hasOwnProperty("id")) { record.id = this._newId(); }
        if (!this.isDataTree(record)) { return; }
        record.parentId = this.record(siblingId).parentId;
        this.insert(record);
        return record.id;
    }
    
    //Id methods
    ids(data = this._data) {
        //console.log([data.id].concat(...data.children.map(child => this.ids((child))));
        return (data.hasOwnProperty("id"))
                ? (data.hasOwnProperty("children"))
                ? [data.id].concat(...data.children.map(child => this.ids(child)))
                : [data.id]
                : [];
    }

    tierIds(tier) {
        return (isInteger(tier) && tier >= 0) ? this.ids().filter(id => this.tier(id) == tier) : undefined;
    }

    mostAncestral(...ids) {
        ids = smoothArray(ids);
        //ids.forEach(id => console.log(id, this.idPath(id)))
        throwError(isArrayOfIntegers, ids);
        //filters a set of ids to only include those for which none of the others precede it in any path
        ids = ids.filter(id => !this.hasParent(id) || !this.idPath(this.parentId(id)).find(ancestor => ids.includes(ancestor)));
        //ids.forEach(id => console.log(id, this.idPath(id)))
        return ids;
    }
    
    childIds(id) {
        if (!this.has(id) || !this.hasChildren(id)) { return null; }
        const record = this._record(id);
        return record.children.map(child => child.id);
    }

    sort(ids, method)                 {
        //console.log(ids, method);
        return ids.map(id => this._record(id)).sort(method).map(record => record.id); }
    sortAlphabeticallyByKey(ids, key) { return this.sort(ids, (a, b) => a[key].localeCompare(b[key])); }
    sortNumericallyByKey(ids, key)    { return this.sort(ids, (a, b) => {
        //console.log("a.id:", a.id, ", a." + key + ":", a[key]);
        //console.log("b.id:", b.id, ", b." + key + ":", b[key]);
        //console.log((a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0);
        return (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
    }); }
    sortByCreation(ids)               { return this.sortNumericallyByKey(ids, "creation"); }
    sortByLastEdited(ids)             { return this.sortNumericallyByKey(ids, "lastEdited"); }
    sortByLastOpened(ids)             { return this.sortNumericallyByKey(ids, "lastOpened"); }

    find(key, value, ids = this.ids()) {
        return ids.filter(id => this.has(id) && this.hasKey(id, key) && this._record(id)[key] == value);
    }

    descendantIds(id) {
        var ids = this.ids(this._record(id));
        ids.splice(ids.indexOf(id), 1);
        return ids;
    }

    selectIds(...ids) {
        ids = smoothArray(ids);
        if (!isArrayOfIntegers(ids)) { return; }
        console.log("Selecting", ...ids)
        ids.filter(id => this.has(id)).forEach(id => this._select.add(id));
    }
    //Newer, Older, Unique all refer to this.  Different is the same either way.  Selected refers to dataTree.
    selectNewer(dataTree)     { this.selectIds(this.newerIds(dataTree)); }     //Select ids that are newer in this
    selectOlder(dataTree)     { this.selectIds(this.olderIds(dataTree)); }     //Select ids that are older in this
    selectDifferent(dataTree) { this.selectIds(this.differentIds(dataTree)); } //Select ids that are different
    selectUnique(dataTree)    { this.selectIds(this.uniqueIds(dataTree)); }    //Select ids that are unique to this
    selectSelected(dataTree)  { this.selectIds(dataTree.selected()); }         //Select ids that are selected in dataTree

    selected() {
        return this._select.values();
    }

    unselectIds(...ids) {
        ids = smoothArray(ids);
        if (!isArrayOfIntegers(ids)) { return; }
        ids.forEach(id => this._select.dropValue(id));
    }

    //Methods for two DataTrees
    unionIds(dataTree) {
        if (!dataTree instanceof DataTree) { throw new Error("Expecting dataTree."); }
        //console.log(this.ids());
        //console.log(this.ids((dataTree));
        return [...new Set(this.ids().concat(dataTree.ids()))];
    }

    compareIds(dataTree, inSet1, inSet2, ids) {
        if (!dataTree instanceof DataTree) { throw new Error("Expecting dataTree"); }
        if (ids == undefined) { ids = this.unionIds(dataTree); }
        const set1 = this.ids();
        const set2 = dataTree.ids();
        //console.log("unionIds:", ids);
        //console.log("In", set1, ":", inSet1)
        //console.log("In", set2, ":", inSet2);
        //ids.forEach(id => { console.log(id, set1.includes(id) == inSet1, set2.includes(id) == inSet2)})
        return ids.filter(id => set1.includes(id) == inSet1 && set2.includes(id) == inSet2);
    }
    commonIds(dataTree, ids)    { return this.compareIds(dataTree, true,  true, ids); }
    uniqueIds(dataTree, ids)    { return this.compareIds(dataTree, true,  false, ids); }
    absentIds(dataTree, ids)    { return this.compareIds(dataTree, false, true, ids); }
    exclusiveIds(dataTree, ids) { return this.uniqueIds(dataTree, ids).concat(this.absentIds(dataTree, ids)); }

    dataCompareIds(dataTree, compareFunc, ids) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        if (ids == undefined) { ids = this.unionIds(dataTree); }
        if (!isArrayOfIntegers(ids)) { return; }
        return ids.filter(id => compareFunc(this._record(id), dataTree.record(id)));
    }

    //symbol        lt, gt, lte, gte, ne, e  defaults to "e"
    //creation      true or false            defaults to true
    //edited        true or false            defaults to true
    //opened        true or false            defaults to true
    //ifNotExistsI  true or false            defaults to false
    //ifNotExistsE  true or false            defaults to true
    compareIdTimestamps(dataTree, ids, symbol = "e", creation = true, edited = true, opened = true, ifNotExistsI = false, ifNotExistsE = true) {
        if ([ifNotExistsI, ifNotExistsE, creation, edited, opened].find(arg => !isBoolean(arg)) ||
            !["<", ">", "<=", ">=", "!=", "e"].includes(symbol)) { return; }
        const func = (i, e) => {
            if (i == undefined) { return ifNotExistsI; }
            if (e == undefined) { return ifNotExistsE; }
            const values = [];
            if (opened   && isInteger(i.lastOpened) && isInteger(e.lastOpened)) { values.push([i.lastOpened, e.lastOpened]); }
            if (edited   && isInteger(i.lastEdited) && isInteger(e.lastEdited)) { values.push([i.lastEdited, e.lastEdited]); }
            if (creation && isInteger(i.creation)   && isInteger(e.creation))   { values.push([i.creation,   e.creation  ]); }
            if (values.length == 0) { return; }
            return !!values.find(value => (symbol == "<"  && value[0] <  value[1]) ||
                                          (symbol == "<=" && value[0] <= value[1]) ||
                                          (symbol == ">"  && value[0] >  value[1]) ||
                                          (symbol == ">=" && value[0] >= value[1]) ||
                                          (symbol == "!=" && value[0] != value[1]) ||
                                          (symbol == "==" && value[0] == value[1]));
        }
        return this.dataCompareIds(dataTree, func, ids);
    }

    newerIds(dataTree, ids)             { return this.compareIdTimestamps(dataTree, ids, ">"); }
    mostRecentlyCreated(dataTree, ids)  { return this.compareIdTimestamps(dataTree, ids, ">", true,  false, false); }
    mostRecentlyEdited(dataTree, ids)   { return this.compareIdTimestamps(dataTree, ids, ">", false, true,  false); }
    mostRecentlyOpened(dataTree, ids)   { return this.compareIdTimestamps(dataTree, ids, ">", false, false, true); }
    olderIds(dataTree, ids)             { return this.compareIdTimestamps(dataTree, ids, "<"); }
    leastRecentlyCreated(dataTree, ids) { return this.compareIdTimestamps(dataTree, ids, "<", true,  false, false); }
    leastRecentlyEdited(dataTree, ids)  { return this.compareIdTimestamps(dataTree, ids, "<", false, true,  false); }
    leastRecentlyOpened(dataTree, ids)  { return this.compareIdTimestamps(dataTree, ids, "<", false, false, true); }


    //Returns all ids in dataTree that are common and identical to ones in this.
    identicalIds(dataTree, ids) {
        const func = (internal, external) => {
            if (internal == undefined || external == undefined || internal.length !== external.length) { return false; }
            const externalKeys = Object.keys(external);
            Object.keys(internal).forEach(key => {
                if (!externalKeys.includes(key) || internal[key] != external[key]) { return false; }
            });
            return true;
        }
        return this.dataCompareIds(dataTree, func, ids);
    }

    //Returns all ids in dataTree that are common and not indentical to ones in this.
    differentIds(dataTree, ids) {
        const func = (internal, external) => {
            if (internal == undefined || external == undefined || internal.length !== external.length) { return true; }
            const externalKeys = Object.keys(external);
            Object.keys(internal).forEach(key => {
                if (!externalKeys.includes(key) || internal[key] != external[key]) { return true; }
            });
            return false;
        }
        return this.dataCompareIds(dataTree, func, ids);
    }
    
    mergeRecords(...records) {
        records = smoothArray(records);
        if (!isArray(records) && records.every(record => this.isDataTree(record))) { return; }
        records.forEach(record => this.insert(record));
    }

    mergeIds(ids, dataTree)  {
        if (isInteger(ids)) { ids = [ids]; }
        if (!isArrayOfIntegers(ids)) { return; }
        console.log("Merging", ids, "of dataTree with", this.ids());
        this.mergeRecords(dataTree.records(dataTree.mostAncestral(ids)));
    }

    //Newer, Older, Unique, and Selected, all refer to dataTree.  Different is the same either way.
    mergeNewer(dataTree)     { this.mergeIds(dataTree.newerIds(this), dataTree); }
    mergeOlder(dataTree)     { this.mergeIds(dataTree.olderIds(this), dataTree); }
    mergeDifferent(dataTree) { this.mergeIds(dataTree.differentIds(this), dataTree); }
    mergeUnique(dataTree)    { this.mergeIds(dataTree.uniqueIds(this), dataTree); }
    mergeSelected(dataTree)  { this.mergeIds(dataTree.selected(), dataTree); }

    delete(...ids)  {
        var ids = smoothArray(ids);
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
            this._record(parentId).children.splice(index, 1);
            //console.log(this._record(parentId));
        });
        return true;
    }

    //Newer, Older, Unique, Selected all refer to this.  Different is the same either way.
    deleteNewer(dataTree)     { this.delete(this.newerIds(dataTree)); }
    deleteOlder(dataTree)     { this.delete(this.olderIds(dataTree)); }
    deleteDifferent(dataTree) { this.delete(this.differentIds(dataTree)); }
    deleteUnique(dataTree)    { this.delete(this.uniqueIds(dataTree)); }
    deleteSelected()          { this.delete(this.selected()); }

    //Undo last deletion in deletion stack
    undoDelete() {
        if (isArray(this._deleted) && this._deleted.length > 0) {
            if (!this.isArrayOfDataTrees(this._deleted[this._deleted.length - 1])) { return; }
            console.log(this._deleted);
            this._deleted.pop().forEach(record => { this.insert(record); });
        }
    }



    //Private methods
    //Returns an array of indices, one index for each array of children
    _indexPath(id, data = this._data) {
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
    _idPath(id, data = this._data) {
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

    _dataHasChildren(data = this._data) {
        return (data.hasOwnProperty("children") && isArray(data.children) && data.children.length); 
    }

    //Find the id in the given data and return the data for the record
    _record(id, data = this._data) {
        //console.log(id, data);
        //if (this._dataHasChildren(id)) { data.children.map((child) => console.log(id, this._record(id, child))); }
        return (data.id == id) ? data
             : (this._dataHasChildren(data)) ? data.children.map((child) => this._record(id, child)).find(child => child != undefined)
             : undefined;
    }

    _now() { return Math.round(Date.now() / 1000); }

    _newId() {
        const ids = this.ids();
        var id;
        while (true) {
            id = Math.round(Math.random() * 1000000000000000);
            if (!ids.includes(id)) { break; }
        }
        return id;
    }



    testing() {
        return {
            "username": "newuser",
            "id": 555186077026119,
            "creation": 1613682513,
            "lastEdited": 1613682513,
            "children": [
                {
                    "name": "Self",
                    "id": 829240261997762,
                    "parentId": 555186077026119,
                    "creation": 1613682513,
                    "lastEdited": 1613682513,
                    "children": [
                        {
                            "name": "New",
                            "id": 790975876190617,
                            "parentId": 829240261997762,
                            "creation": 1613682513,
                            "lastEdited": 1613682518,
                            "children": [
                                {
                                    "id": 240693585791438,
                                    "parentId": 790975876190617,
                                    "creation": 1613682513,
                                    "lastEdited": 1613682513,
                                    "lastOpened": 1613682524,
                                    "lines": [
                                        "<div><h2 id=\"cursor\">|</h2></div>"
                                    ]
                                }
                            ],
                            "lastOpened": 1613682521
                        }
                    ],
                    "lastOpened": 1613682524
                },
                {
                    "name": "Test client",
                    "id": 396281549040763,
                    "parentId": 555186077026119,
                    "creation": 1613682524,
                    "lastEdited": 1613682524,
                    "children": [
                        {
                            "name": "New",
                            "id": 649166345020170,
                            "parentId": 396281549040763,
                            "creation": 1613682524,
                            "lastEdited": 1613682532,
                            "children": [
                                {
                                    "id": 7015795721364,
                                    "parentId": 649166345020170,
                                    "creation": 1613682524,
                                    "lastEdited": 1613682524,
                                    "lastOpened": 1613682546,
                                    "lines": [
                                        "<div><h2 id=\"cursor\">|</h2></div>"
                                    ]
                                }
                            ],
                            "lastOpened": 1613682546
                        },
                        {
                            "name": "Test issue",
                            "id": 692861448382300,
                            "parentId": 396281549040763,
                            "creation": 1613682546,
                            "lastEdited": 1613682546,
                            "children": [
                                {
                                    "id": 775444920217077,
                                    "parentId": 692861448382300,
                                    "creation": 1613682546,
                                    "lastEdited": 1613682546,
                                    "lastOpened": 1613682572,
                                    "lines": [
                                        "<div><h2 id=\"cursor\">|</h2></div>"
                                    ]
                                }
                            ],
                            "lastOpened": 1613682572
                        }
                    ],
                    "lastOpened": 1613682574
                }
            ],
            "lastOpened": 1613682513
        }
    }

    testing2() {
        return {
            "username": "jason",
            "id": 473992495658025,
            "lastEdited": 1610557142,
            "lastOpened": 1610668775,
            "hidden": false,
            "email": "",
            "rememberMe": false,
            "practitioner": false,
            "storagePermanence": false,
            "backupFrequency": 5,
            "useServerStorage": false,
            "serverBackupFrequency": false,
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