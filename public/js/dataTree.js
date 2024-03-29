//a DataTree is an object with three characteristic parameters:
// 1) .id that signifies the id,
// 2) .children, if it exists, is an array of DataTrees, and
class DataTree {
    constructor(data) {
        if (data) { this.import(data); } else { this._data = {}; }

        this._deleted = [];
        this._indexPaths = [];
        this._idPaths = [];
        this._select = new List((value, items) => (isInteger(value)) && !items.find(item => item.value == value));
    }

    //DataTree methods
    size() { const ids = this.ids(); return (isArray(ids)) ? this.ids().length : 0; }
    isEmpty() { return Object.keys(this._data) == 0; }
    clear() { this._data = {}; this._deleted = []; this._indexPaths = []; this._idPaths = []; this._select.clear(); }

    export()                            { return jQuery.extend(true, {}, this._data); }
    exportJSON(modifier)                { //true: uses encoding; integer or tab: export pretty JSON.
        const char = (isInteger(modifier) || modifier == '\t') ? modifier : null;
        const data = JSON.stringify(this._data, null, char);
        return (modifier == true) ? btoa(data) : data;
    }
    exportToSessionStorage(name)        { sessionStorage.setItem(name, this.exportJSON()); }
    exportToLocalStorage(name)          { localStorage.setItem(name, this.exportJSON()); }
    exportEncodedToSessionStorage(name) { sessionStorage.setItem(name, btoa(this.exportJSON())); }
    exportEncodedToLocalStorage(name)   { localStorage.setItem(name, btoa(this.exportJSON())); }
    sessionExport(name, when, ms) {
        if (Object.keys(sessionStorage).includes(name)) {
            if (when == undefined) { sessionStorage.setItem(name, this.exportJSON()); }
            if (when == 1 && isInteger(ms)) { setTimeout(this.sessionExport, ms, name); }
            if (when == 2 && isInteger(ms)) { setInterval(this.sessionExport, ms, name); }
        }
    }

    import(object) {
        var data = jQuery.extend(true, {}, object);
        if (!data.hasOwnProperty("id")) {
            data.id = this._newId();
        }
        if (!data.hasOwnProperty("creation")) {
            data.creation = this._now();
        }
        if (this.isDataTree(data)) {
            this.clear();
            this._data = data;
            return this._data.id;
        }
    }
    importJSON(json)                      { this.import(JSON.parse(json)); }
    importFromSessionStorage(name)        { this.importJSON(sessionStorage.getItem(name)); }
    importFromLocalStorage(name)          { this.importJSON(localStorage.getItem(name)); }
    importEncodedFromSessionStorage(name) { this.importJSON(atob(sessionStorage.getItem(name))); }
    importEncodedFromLocalStorage(name)   { this.importJSON(atob(localStorage.getItem(name))); }

    isDataTree(data) {
        //console.log(data, isObject(data), data.hasOwnProperty("id"), data.hasOwnProperty("children"));
        if (!isObject(data)) { return false; }
        //console.log(data.hasOwnProperty("id"))
        return (data.hasOwnProperty("id") &&
              (!data.hasOwnProperty("children") || data.children.every(child => this.isDataTree(child, data.id))));
    }

    isArrayOfDataTrees(data) {
        return (isArray(data) && data.every(item => this.isDataTree(item)));
    }

    update(object = {}, id, update = true) {
        const record = jQuery.extend(true, {}, object);
        if (id == undefined) {
            if (record.hasOwnProperty("id")) { id = record.id; }
            else { return; }
        }
        console.log("is dataTree:", this.isDataTree(record));
        if (this.has(id) && this.isDataTree(record)) {
            const r = this._record(id);
            Object.keys(record).forEach(key => {
                console.log(r[key], record[key]);
                r[key] = record[key];
            });
            if (update) { record.lastEdited = this._now(); }
        }
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

    changeId(id, newId) {
        if (!isInteger(id) || !this.has(id)) { return; }
        if (newId == undefined) { newId = this._newId(); }
        else if (!isInteger(newId) || this.has(newId)) { return; }
        const record = this.record(id, false);
        record.id = newId;
        record.lastEdited = this._now();
        if (record.hasOwnProperty("children") && isArray(record.children)) {
            record.children.forEach(child => child.parentId = newId);
        }
    }

    hasKey(id, key) { return this.has(id) && this._record(id).hasOwnProperty(key); }
    value(id, key) {
        if (this.hasKey(id, key)) {
            const record = this._record(id);
            return record[key];
        }
    }
    setKey(id, key, value) {
        if (this.has(id) && isAlphabetic(key.charAt(0)) && isAlphanumeric(key)) {
            const record = this._record(id);
            record[key] = value;
            record.lastEdited = this._now();
            return true;
        }
    }
    deleteKey(id, key) {
        if (this.hasKey(id, key)) {
            const record = this._record(id);
            delete record[key];
            record.lastEdited = this._now();
            return true;
        }
    }

    records(ids, update = true) {
        if (ids == undefined) { ids = this.ids(); }
        else { ids = smoothArray(ids); }
        if (!isArrayOfIntegers(ids)) { return; }

        return ids.map(id => this.record(id, update));
    }

    record(id, update = true)    {
        if (!this.has(id)) { return; }
        const record = this._record(id);
        if (update) { record.lastOpened = this._now(); }
        return record;
    }

    numChildren(id) { return (this.hasChildren(id)) ? this._record(id).children.length : 0; }
    numSiblings(id) { return this.has(id) ? this.tier(id) == 0 ? 1 : this.numChildren(this.parentId(id)) : undefined; }
    has(ids)   {
        ids = smoothArray(ids);
        return (isArrayOfIntegers(ids))
            ? !!ids.every(id => isInteger(this.tier(id)))
            : undefined;
    }
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

    tier(id)       {
        const t = this._indexPath(id, this._data);
        return (isArray(t)) ? t.length : undefined;
    }

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
    parentIds(ids) {
        ids = smoothArray(ids);
        throwError(isArrayOfIntegers, ids);
        return [...new Set(ids.map(id => this.parentId(id)).filter(id => isInteger(id)))];
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

    addChild(parentId, object = {}) {
        const record = jQuery.extend(true, {}, object);
        if (!isInteger(parentId) || !this.has(parentId)) { return; }
        if (!record.hasOwnProperty("id")) { record.id = this._newId(); }
        if (!record.hasOwnProperty("creation")) { record.creation = this._now(); }
        if (!this.isDataTree(record)) { return; }
        const parent = this._record(parentId);
        if (parent.hasOwnProperty("children")) { parent.children.push(record); }
        else { parent.children = [record]; }
        return record.id;
    }

    addSibling(siblingId, record = {}) {
        if (!isInteger(siblingId) || !this.has(siblingId) || this.tier(siblingId) == 0) { return; }
        return this.addChild(this.parentId(siblingId), record);
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
        //console.log(tier, isInteger(tier), this.ids(), this.ids().filter(id => this.tier(id) == tier));
        return (isInteger(tier) && tier >= 0) ? this.ids().filter(id => this.tier(id) == tier) : undefined;
    }

    mostAncestral(ids) {
        ids = smoothArray(ids);
        //ids.forEach(id => console.log(id, this.idPath(id)))
        throwError(isArrayOfIntegers, ids);
        //filters a set of ids to only include those for which none of the others precede it in any path
        ids = ids.filter(id => !this.hasParent(id) || !this.idPath(this.parentId(id)).find(ancestor => ids.includes(ancestor)));
        //ids.forEach(id => console.log(id, this.idPath(id)))
        return ids;
    }
    
    children(id) {
        if (!this.has(id) || !this.hasChildren(id)) { return null; }
        const record = this._record(id);
        return record.children.map(child => child.id) || [];
    }

    siblings(id) {
        return (this.hasParent(id)) ? this.children(this.parentId(id))
                   : (this.has(id)) ? [id]
                   : undefined;
    }

    descendants(id) {
        var ids = this.ids(this._record(id));
        ids.splice(ids.indexOf(id), 1);
        return ids;
    }

    find(key, value, ids = this.ids()) {
        //console.log(ids, this.ids());
        return ids.find(id => this.hasKey(id, key) && this.value(id, key) == value);
    }

    filter(key, value, ids = this.ids()) {
        return ids.filter(id => this.hasKey(id, key) && this.value(id, key) == value);
    }

    sort(method, ids = this.ids()) {
        if (!isArrayOfIntegers(ids)) { console.log(ids); console.trace(); return; }
        return ids.map(id => this._record(id)).sort(method).map(record => record.id);
    }
    sortByKey(k, ids)              { return this.sort((a, b) => (a[k] instanceof String) ? a[k].localeCompare(b[k]) : (a[k] < b[k]) ? -1 : (a[k] > b[k]) ? 1 : 0, ids); }
    sortAlnumByKey(key, ids)       { return this.sort((a, b) => a[key].localeCompare(b[key]), ids); }
    sortNumByKey(key, ids)         { return this.sort((a, b) => (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0, ids); }
    sortByLastEdited(ids)          { return this.sortNumByKey("lastEdited", ids); }
    sortByLastOpened(ids)          { return this.sortNumByKey("lastOpened", ids); }
    sortByCreation(ids)            {
        //console.log(ids);
        ids = smoothArray(ids);
        ids = this.sortNumByKey("creation", ids);
        //console.log(ids);
        if (ids.length == 1) { return ids; }
        var max = ids.findIndex(id => this.creation(id) != this.creation(ids[0])) - 1; //Remove all items with >minimal creation

        if (max > 0) {
            ids = ids.map(id => [id, ...this.indexPath(id)]);
            while (max > 0) {
                ids = ids.sort((a, b) => a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0); //Sort by second array item
                max = ids.findIndex(id => id[1] != ids[0][1]) - 1;                //Disregard all items with >minimal index
                ids.forEach(id => { if (id.length > 1) { id.splice(1, 1); }});    //Remove second array item
            }
            ids = ids.map(id => id[0]);
        }
        return ids;
    }

    min(key, ids) { return this.sortNumByKey(key, ids)[0]; }
    max(key, ids) { return this.sortNumByKey(key, ids).reverse()[0]; }
    firstCreated(ids) { return this.sortByCreation(ids)[0]; }
    firstEdited(ids)  { return this.sortByLastEdited(ids); }
    firstOpened(ids)  { return this.sortByLastOpened(ids); }
    lastCreated(ids)  { return this.sortByCreation(ids).reverse()[0]; }
    lastEdited(ids)   { return this.sortByLastEdited(ids).reverse()[0]; }
    lastOpened(ids)   { return this.sortByLastOpened(ids).reverse()[0]; }

    select(ids) {
        ids = smoothArray(ids);
        if (!isArrayOfIntegers(ids)) { return; }
        //console.log("Selecting", ...ids)
        ids.filter(id => this.has(id)).forEach(id => this._select.add(id));
    }

    selected() { return this._select.values(); }

    isSelected(id) { return this._select.hasValue(id); }

    unselect(ids = this.selected()) {
        ids = smoothArray(ids);
        if (!isArrayOfIntegers(ids)) { return; }
        ids.forEach(id => this._select.dropValue(id));
    }

    //Methods for two DataTrees
    //Newer, Older, Unique all refer to this.  Different is the same either way.  Selected refers to dataTree.
    selectNewer(dataTree)     { this.select(this.newer(dataTree)); }     //Select ids that are newer in this
    selectOlder(dataTree)     { this.select(this.older(dataTree)); }     //Select ids that are older in this
    selectDifferent(dataTree) { this.select(this.different(dataTree)); } //Select ids that are different
    selectUnique(dataTree)    { this.select(this.unique(dataTree)); }    //Select ids that are unique to this
    selectSelected(dataTree)  { this.select(dataTree.selected()); }         //Select ids that are selected in dataTree

    union(dataTree) {
        if (!dataTree instanceof DataTree) { throw new Error("Expecting dataTree."); }
        //console.log(this.ids());
        //console.log(this.ids((dataTree));
        return [...new Set(this.ids().concat(dataTree.ids()))];
    }

    compare(dataTree, inSet1, inSet2, ids) {
        if (!dataTree instanceof DataTree) { throw new Error("Expecting dataTree"); }
        if (ids == undefined) { ids = this.union(dataTree); }
        const set1 = this.ids();
        const set2 = dataTree.ids();
        //console.log("unionIds:", ids);
        //console.log("In", set1, ":", inSet1)
        //console.log("In", set2, ":", inSet2);
        //ids.forEach(id => { console.log(id, set1.includes(id) == inSet1, set2.includes(id) == inSet2)})
        return ids.filter(id => set1.includes(id) == inSet1 && set2.includes(id) == inSet2);
    }

    common(dataTree, ids)    { return this.compare(dataTree, true,  true, ids); }
    unique(dataTree, ids)    { return this.compare(dataTree, true,  false, ids); }
    absent(dataTree, ids)    { return this.compare(dataTree, false, true, ids); }
    exclusive(dataTree, ids) { return this.unique(dataTree, ids).concat(this.absent(dataTree, ids)); }

    dataCompare(dataTree, compareFunc, ids) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        if (ids == undefined) { ids = this.union(dataTree); }
        if (!isArrayOfIntegers(ids)) { return; }
        return ids.filter(id => compareFunc(this._record(id), dataTree.record(id, false)));
    }

    //symbol        <, >, <=, >=, !=, ==  defaults to "=="
    //creation      true or false         defaults to true
    //edited        true or false         defaults to true
    //opened        true or false         defaults to true
    //ifNotExistsI  true or false         defaults to false
    //ifNotExistsE  true or false         defaults to true
    compareTimestamps(dataTree, ids, symbol = "==", creation = true, edited = true, opened = true, ifNotExistsI = false, ifNotExistsE = true) {
        if ([ifNotExistsI, ifNotExistsE, creation, edited, opened].find(arg => !isBoolean(arg)) ||
            !["<", ">", "<=", ">=", "!=", "=="].includes(symbol)) { return; }
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
        return this.dataCompare(dataTree, func, ids);
    }

    newer(dataTree, ids)                { return this.compareTimestamps(dataTree, ids, ">", true, true, false); }
    mostRecentlyCreated(dataTree, ids)  { return this.compareTimestamps(dataTree, ids, ">", true,  false, false); }
    mostRecentlyEdited(dataTree, ids)   { return this.compareTimestamps(dataTree, ids, ">", false, true,  false); }
    mostRecentlyOpened(dataTree, ids)   { return this.compareTimestamps(dataTree, ids, ">", false, false, true); }
    older(dataTree, ids)                { return this.compareTimestamps(dataTree, ids, "<", true, true, false); }
    leastRecentlyCreated(dataTree, ids) { return this.compareTimestamps(dataTree, ids, "<", true,  false, false); }
    leastRecentlyEdited(dataTree, ids)  { return this.compareTimestamps(dataTree, ids, "<", false, true,  false); }
    leastRecentlyOpened(dataTree, ids)  { return this.compareTimestamps(dataTree, ids, "<", false, false, true); }


    //Returns all ids in dataTree that are common and identical to ones in this.
    identical(dataTree, ids) {
        const func = (internal, external) => {
            var key;
            if (internal == undefined || external == undefined) { return false; }
            const iKeys = (internal) ? Object.keys(internal).filter(key => !["lastOpened", "lastEdited", "children"].includes(key)) : [];
            const eKeys = (external) ? Object.keys(external).filter(key => !["lastOpened", "lastEdited", "children"].includes(key)) : [];
            if (iKeys.length != eKeys.length) { return false; }
            if (iKeys.find(key => !eKeys.includes(key))) { return false; }
            if (iKeys.find(key => isArray(internal[key] && isArray(external[key]) &&
                                  internal[key].find((val, index) => val != external[key][index])))) { return false; }
            if (iKeys.find(key => !["lastEdited", "lastOpened"].includes(key) && internal[key] != external[key])) { return false; }
            return true;
        }
        return this.dataCompare(dataTree, func, ids);
    }

    //Returns all ids in dataTree that are common and not indentical to ones in this.
    different(dataTree, ids) {
        const func = (internal, external) => {
            var key;
            if (internal == undefined || external == undefined) { return true; }
            const iKeys = (internal) ? Object.keys(internal).filter(key => !["lastOpened", "lastEdited", "children"].includes(key)) : [];
            const eKeys = (external) ? Object.keys(external).filter(key => !["lastOpened", "lastEdited", "children"].includes(key)) : [];
            if (iKeys.length != eKeys.length) { return true; }
            if (key == iKeys.find(key => !eKeys.includes(key))) { return true; }
            if (iKeys.find(key => isArray(internal[key] && isArray(external[key]) &&
                                  internal[key].find((val, index) => val != external[key][index])))) { return true; }
            if (iKeys.find(key => !["lastEdited", "lastOpened"].includes(key) && internal[key] != external[key])) { return true; }
            return false;
        }
        return this.dataCompare(dataTree, func, ids);
    }

    merge(dataTree, ids)  {
        if (ids == undefined) { ids = dataTree.ids(); }
        else {
            ids = smoothArray(ids);
            if (!isArrayOfIntegers(ids)) { return; }
        }
        dataTree.mostAncestral(ids).forEach(id => {
            const record = jQuery.extend({}, dataTree.record(id, false));
            if (this.has(id)) { console.log("has", id); this.update(record, id, false); }
            else if (dataTree.hasParent(id)) {
                const parentId = dataTree.parentId(id);
                if (this.has(parentId)) { console.log(id, "has parent"); this.addChild(parentId, record); }
            }
            else { console.log(id, "has no connection");  this.import(record); }
            console.log(this._record(id));
        });
    }

    //Newer, Older, Unique, and Selected, all refer to dataTree.  Different is the same either way.
    mergeNewer(dataTree)     { this.merge(dataTree, dataTree.newer(this)); }
    mergeOlder(dataTree)     { this.merge(dataTree, dataTree.older(this)); }
    mergeDifferent(dataTree) { this.merge(dataTree, dataTree.different(this)); }
    mergeUnique(dataTree)    { this.merge(dataTree, dataTree.unique(this)); }
    mergeSelected(dataTree)  { this.merge(dataTree, dataTree.selected()); }

    delete(ids)  {
        ids = smoothArray(ids);
        throwError(isArrayOfIntegers, ids);
        ids = ids.filter(id => this.has(id));
        if (ids.length == 0) { return; }
        ids = this.mostAncestral(ids);
        this._deleted.push(ids.map(id => [this._record(id), this.parentId(id)]));
        //console.log(this._deleted);
        if (this.tier(ids[0]) == 0) { this.clear(); }
        else {
            ids.forEach(id => {
                const parentId = this.parentId(id);
                const index = this.indexPath(id).splice(-1)[0];
                //console.log(parentId, index);
                const record = this._record(parentId)
                if (record.children.length > 1) { record.children.splice(index, 1); }
                else { delete record.children; }
                //console.log(this._record(parentId));
            });
        }
        return true;
    }

    //Newer, Older, Unique, Selected all refer to this.  Different is the same either way.
    deleteNewer(dataTree)     { this.delete(this.newer(dataTree)); }
    deleteOlder(dataTree)     { this.delete(this.older(dataTree)); }
    deleteDifferent(dataTree) { this.delete(this.different(dataTree)); }
    deleteUnique(dataTree)    { this.delete(this.unique(dataTree)); }
    deleteSelected()          { this.delete(this.selected()); }

    //Undo last deletion in deletion stack
    undoDelete() {
        if (isArray(this._deleted) && this._deleted.length > 0) {
            if (!this.isArrayOfDataTrees(this._deleted[this._deleted.length - 1])) { return; }
            console.log(this._deleted);
            this._deleted.pop().forEach((record, parentId) => { this.merge(record, parentId); });
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
                return (!isArray(path)) ? false : path;
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

    _dataKeys(record) { return Object.keys(record); }
    _dataValues(record) { return Object.values(record); }

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