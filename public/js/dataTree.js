//a DataTree is an object with three characteristic parameters:
// 1) one called "id" that signifies the id,
// 2) one ending with "Id" that signifies the parent id (except for the initial record), and
// 3) one ending in "s" that signifies the array of children (except for the terminal records).
class DataTree {
    _data;
    
    constructor(data = {}) {
        this._data = data;
    }

    //Returns an array of indices, one index for each set of children
    indexPath(id) { return this._indexPath(id, this._data); }
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


    idPath(id) { return this._idPath(id, this._data); }
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

    tier(id) {
        throwError(isInteger, id);
        const t = this.indexPath(id); return (t === true) ? 0 : t.length;
    }

    exists(id) { return isInteger(this.tier(id)); }
    exist(ids) {
        throwError(isArrayOfIntegers, ids);
        return ids.every(id => this.exists(id));
    }

    keys(id) {
        throwError(isInteger, id);
        return (this.exists(id)) ? this._dataKeys(this.record(id)) : undefined;
    }
    _dataKeys(data) {
        throwError(isDataTree, data);
        return Object.keys(data);
    }

    hasParent(id) { return this.tier(id); }
    parentId(id) { return (this.hasParent(id)) ? this.idPath(id).slice(-2, -1)[0] : null; }
    parentIds(ids) {
        throwError(isArrayOfIntegers, ids);
        return [...new Set(ids.map(id => this.parentId(id)))]; //.filter(id => isInteger(id));
    }
    parentIdName(id) { return this._dataParentIdName(this.record(id)); }
    _dataParentIdName(data) {
        const name = this._dataKeys(data).find(key => key.endsWith("Id"));
        return (isString(name)) ? name : undefined;
    }

    hasChildren(id) {
        const record = this.record(id);
        return (record && !!this._dataChildrenName(record));
    }
    childrenName(id) { return (this.exists(id)) ? this._dataChildrenName(this.record(id)): undefined; }
    _dataChildrenName(data) {
        throwError(isDataTree, data);
        const name = this._dataKeys(data).find(key => key.endsWith("s"));
        return (isString(name) && name != "lines") ? name : undefined;
    }

    records(ids) {
        throwError(isArrayOfIntegers, ids);
        return ids.map(id => this.record(id));
    }
    record(id) { return this._record(id, this._data); }
    _record(id, data) {
        throwError(isInteger, id);
        throwError(isDataTree, data);
        const path = this.indexPath(id, data);
        if (path === true) { return data; }
        if (isArray(path)) {
            path.forEach(index => { data = data[this._dataChildrenName(data)][index] });
            return data;
        }
        return false;
    }

    // Returns an array of ids for which the remaining given ids are all their descendants.
    mostAncestral(ids) {
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

    //ID retrieval methods
    get ids() { return this._ids(this._data); }
    _ids(data) {
        throwError(isDataTree, data);
        const childrenName = this._dataChildrenName(data);
        return (childrenName) ? [data.id].concat(...data[childrenName].map(child => this._ids(child)))
                              : [data.id];
    }

    childIds(id) {
        if (!this.exists(id)) { return null; }
        const record = this.record(id);
        const group = this._dataChildrenName(record);
        return (group) ? record[group].map(child => child.id) : [];
    }

    descendantIds(id) { return this._ids(this.record(id, data)).splice(ids.indexOf(id), 1); }

    //deletion methods
    delete(ids)  {
        throwError(isArrayOfIntegers, ids);
        var path;
        ids = this.mostAncestral(ids);
        if (isArray(ids) && ids.length > 0) {
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
    }

    undoDelete() {
        throwError(isArrayOfDataTrees, this.deleted);
        this.deleted.pop().forEach(record => { this.insert(record); });
    }

    //Assign external data tree
    set(data) {
        throwError(isDataTree, data);
        if (Object.keys(this._data).length) { this.delete(this._data.id); }
        this._data = data;
    }

    //Add a child to an existing parent.
    //Record must have a parentId, and a record with that ID must exist in the tree.
    insert(record) {
        throwError(isDataTree, record);
        var parentIdName; parentId, path, childrenNames;
        parentIdName = record[Object.keys(record).find(key => key.endsWith("Id"))];
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

    //Add a child to an existing parent.
    //The parent is specified by the first parameter.
    //The parentId parameter is added to the record before calling the insert method.
    addChild(parentId, record) {
        throwError(isInteger, parentId);
        throwError(this.exists, parentId);
        throwError(isDataTree, record);
        record[this.parentIdName(parentId)] = parentId; this.insert(record);
    }

    //returns a list of ids that exist in both the given data and the local data.
    sharedIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        const internalIds = this.ids;
        const externalIds = dataTree.ids;
        return [...new Set(internalIds.concat(externalIds))].filter(id => internalIds.includes(id) && externalIds.includes(id));
    }

    //returns a list of ids that exist in the given data but don't exist in the local data.
    unsharedIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        const internalIds = this.ids;
        const externalIds = dataTree.ids;
        return [...new Set(internalIds.concat(externalIds))].filter(id => !(internalIds.includes(id) && externalIds.includes(id)));
    }

    //Compares given data to internal record of the same id, and returns if the given record is newer.
    isNewer(external) {
        throwError(isDataTree, external);
        if (!this.exists(external.id)) { return false; }
        const internal = this.record(external.id);
        if ((internal.lastEdited > 0 && external.lastEdited > 0 && internal.lastEdited > external.lastEdited)  ||
            (internal.creation   > 0 && external.creation   > 0 && internal.creation   > external.creation)    ||
            (internal.lastOpened > 0 && external.lastOpened > 0 && internal.lastOpened > external.lastOpened)) { return true; }
        return false;
    }

    //Calls isNewer for every given id in the given dataTree, and returns all the ids that returned true
    newerIds(dataTree) {
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        return this.sharedIds(dataTree).filter(id => this.isNewer(dataTree.record(id)));
    }

    //Compares given data to internal record of the same id, and returns if the given record is older.
    isOlder(external) {
        throwError(isDataTree, external);
        if (!this.exists(external.id)) { return false; }
        const internal = this.record(external.id);
        if ((internal.lastEdited > 0 && external.lastEdited > 0 && internal.lastEdited < external.lastEdited)  ||
            (internal.creation   > 0 && external.creation   > 0 && internal.creation   < external.creation)    ||
            (internal.lastOpened > 0 && external.lastOpened > 0 && internal.lastOpened < external.lastOpened)) { return true; }
        return false;
    }

    //Calls isOlder for every given id in the given dataTree, and returns if all calls returned true
    olderIds(dataTree) {
        throwError(isArrayOfIntegers, ids);
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        if (!this.exist(ids)) { throw new Error("Given ids don't exist internally."); }
        if (!dataTree.exist(ids)) { throw new Error("Given ids don't exist in given dataTree."); }
        return this.sharedIds(dataTree).filter(id => this.isOlder(dataTree.record(id)));
    }

    //Compares given data to internal record of the same id, and returns if the given record is identical.
    isIdentical(external) {
        throwError(isDataTree, external);
        if (!this.exists(external.id)) { return false; }
        const internal = this.record(external.id);
        if (internal.length !== external.length) { return false; }
        const externalKeys = Object.keys(external);
        Object.keys(internal).forEach(key => {
            if (!externalKeys.contains(key)) { return false; }
            if (internal[key] != loaded[key]) { return false; }
        });
        return true;
    }

    //Calls isIdentical for every given id in the given dataTree, and returns if all calls returned true
    areIdentical(ids, dataTree) {
        throwError(isArrayOfIntegers, ids);
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        if (!this.exist(ids)) { throw new Error("Given ids don't exist internally."); }
        if (!dataTree.exist(ids)) { throw new Error("Given ids don't exist in given dataTree."); }
        return ids.every(id => this.isIdentical(dataTree.record(id)));
    }

    //Calls !isIdentical for every given id in the given dataTree, and returns if all calls returned true
    areDifferent(ids, dataTree) {
        throwError(isArrayOfIntegers, ids);
        if (!(dataTree instanceof DataTree)) { throw new Error("Expecting dataTree."); }
        if (!this.exist(ids)) { throw new Error("Given ids don't exist internally."); }
        if (!dataTree.exist(ids)) { throw new Error("Given ids don't exist in given dataTree."); }
        return ids.every(id => !this.isIdentical(dataTree.record(id)));
    }



    testing() {
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