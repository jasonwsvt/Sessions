//a DataTree is an object with three characteristic parameters:
// 1) one called "id" that signifies the id,
// 2) one ending with "Id" that signifies the parent id (except for the initial record), and
// 3) one ending in "s" that signifies the array of children (except for the terminal records).
class DataTree {
    data;
    
    constructor(data = {}) {
        this.data = data;
    }

    //Returns an array of indices, one index for each set of children
    indexPath(id) { return this._indexPath(id, this.data); }
    _indexPath(id, data) {
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


    idPath(id) { return this._idPath(id, this.data); }
    _idPath(id, data) {
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

    tier(id)                { const t = this.indexPath(id); return (t === true) ? 0 : t.length; }

    exists(id)              { return isInteger(this.tier(id)); }

    keys(id)                { return this._dataKeys(this.record(id)); }
    _dataKeys(data)         { return Object.keys(data); }

    hasParent(id)           { const t = this.tier(id); return (isInteger(t) && t > 0); }
    parentId(id)            { return (this.hasParent(id)) ? this.idPath(id).slice(-2, -1)[0] : null; }
    parentIds(ids)          { return [...new Set(ids.map(id => this.parentId(id)))].filter(id => isInteger(id)); }
    parentIdName(id)        { return this.keys(id).find(key => key.endsWith("Id")); }
    _dataParentIdName(data) { return this._dataKeys(data).find(key => key.endsWith("Id")); }

    hasChildren(id)         { return (this.recordExists(id) && !!childrenName(id)); }
    childrenName(id)        { return this.keys(id).find(key => key.endsWith("s")); }
    _dataChildrenName(data) { return this._dataKeys(data).find(key => key.endsWith("s")); }

    records(ids)            { return ids.map(id => this.record(id)); }
    record(id)              { return this._record(id, this.data); }
    _record(id, data) {
        const path = this.indexPath(id, data);
        if (path === true) { return data; }
        if (isArray(path)) {
            path.forEach(index => { data = data[this.dataChildrenName(data)][index] });
            return data;
        }
        return false;
    }

    // Returns an array of ids for which the remaining given ids are all their descendants.
    mostAncestral(ids) {
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
    get ids() { return this._ids(this.data); }
    _ids(data) {
        if (!isObject(data)) { return []; }
        const childrenName = this._dataChildrenName(data);
        return (childrenName) ? [data.id].concat(...data[childrenName].map(child => this._ids(child)))
                              : [data.id];
    }

    childIds(id) {
        const record = this.record(id);
        if (record == false) { return null; }
        const group = this.dataChildrenName(record);
        return (group) ? record[group].map(child => child.id) : [];
    }

    descendantIds(id) { return this._ids(this.record(id, data)).splice(ids.indexOf(id), 1); }

    //deletion methods
    delete(ids)  {
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
                        case 1: this.data[group[0]].splice(path[0],1); break;
                        case 2: this.data[group[0]][path[0]][group[1]].splice(path[1],1); break;
                        case 3: this.data[group[0]][path[0]][group[1]][path[1]][group[2]].splice(path[3],1); break;
                    }
                }
            });
        }
    }

    undoDelete() { this.deleted.pop().forEach(record => { this.insert(record); }); }

    //Assign external data tree
    set(data) { if (Object.keys(this.data).length) { this.delete(this.data.id); } this.data = data; }

    //Add a child to an existing parent.
    //Record must have a parentId, and a record with that ID must exist in the tree.
    insert(record) {
        var parentIdName; parentId, path, childrenNames;
        parentIdName = record[Object.keys(record).find(key => key.endsWith("Id"))];
        if (parentIdName) {
            parentId = record[parentIdName];
            path = this.indexPath(parentId);
            group = this.idPath(parentId).map(id => this.childrenName(id));
            switch (path.length) {
                case 1: this.data[group[0]].push(record); break;
                case 2: this.data[group[0]][path[0]][group[1]].push(record); break;
                case 3: this.data[group[0]][path[0]][group[1]][path[1]][group[2]].push(record); break;
            }
        }
    }

    //Add a child to an existing parent.
    //The parent is specified by the first parameter.
    //The parentId parameter is added to the record before calling the insert method.
    addChild(parentId, record) { record[this.parentIdName(parentId)] = parentId; this.insert(record); }

    testing() {
        this.data = {
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
}