class DataTree {
    data = {};
    
    constructor() {

    }

    //Returns an array of indices, one index for each set of children
    indexPath(id) {
        var path;
        if (data.id == id) { return []; }
        else {
            const childrenName = this.childrenGroupName(data);
            if (childrenName) {
                path = data[childrenName].map((child, index) => {
                    const p = this.indexPath(id, child);
                    return (child.id == id) ? [index]
                         : (isArray(p)) ? [index, ...p]
                         : false;
    
                }).find(p => isArray(p));
                return (path === undefined) ? false : path;
            }
            else { return false; }
        }
    }

    idPath(id) {
        var path = false;
        if (data.id == id) { return [id]; }
        else {
            const childrenName = this.childrenGroupName(data);
            if (childrenName) {
                path = data[childrenName].map((child) => {
                    const p = this.idPath(id, child);
                    return (isArray(p)) ? [data.id, ...p]
                         : false;
    
                }).find(p => isArray(p));
                return (path === undefined) ? false : path;
            }
            else { return false; }
        }
    }

    tier(id)              { const t = this.indexPath(id); return (t === true) ? 0 : t.length; }

    exists(id)            { return isInteger(this.tier(id)); }

    hasParent(id)         { const t = this.tier(id); return (isInteger(t) && t > 0); }
    parentId(id)          { return (this.hasParent(id)) ? this.idPath(id).slice(-2, -1)[0] : null; }
    parentIds(ids)        { return [...new Set(ids.map(id => this.parentId(id)))].filter(id => isInteger(id)); }
    parentIdName(id)      { return Object.keys(this.record(id)).find(key => key.endsWith("Id")); }

    hasChildren(id)       { return (this.recordExists(id) && !!childrenGroupName(this.record(id))); }
    childrenGroupName(id) { return ["clients", "issues", "sessions", false][this.tier(id)]; }

    records(ids)          { return ids.map(id => this.record(id)); }
    record(id) {
        const index = this.indexPath(id);
        const group = this.idPath(id).map(id => this.childrenGroupName(id));
        if (isArray(path)) {
            if (path.length == 0) { return this.data; }
            if (path.length == 1) { return this.data[group[0]][index[0]]; }
            if (path.length == 2) { return this.data[group[0]][index[0]][group[1]][index[1]]; }
            if (path.length == 3) { return this.data[group[0]][index[0]][group[1]][index[1]][group[2]][index[2]]; }
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
    _ids(data) {
        if (!isObject(data)) { return []; }
        var ids;
        const childrenName = this.childrenGroupName(data);
        return (childrenName) ? [data.id].concat(...data[childrenName].map(child => this.ids(child)))
                              : [data.id];
    }

    get ids() { return this._ids(this.data); }

    childIds(id) {
        if (!this.exists(id)) { return null; }
        const childrenName = this.childrenGroupName(id);
        if (!childrenName) { return []; }
        data = this.record(id);
        return data[childrenName].map(child => child.id);
    }

    descendantIds(id) {
        var ids = this._ids(this.record(id, data));
        ids.splice(ids.indexOf(id), 1);
        return ids;
    }

    //deletion methods
    delete(ids)  {
        var path;
        ids = this.mostAncestral(ids);
        if (isArray(ids) && ids.length > 0) {
            this.deleted.push(this.records(ids));

            ids.forEach(id => {
                path = this.path(id);
                console.log(id, path, path.length);
                if (path === true) { data = {}; }
                else {
                    switch (path.length) {
                        case 1: data.clients.splice(path[0],1); break;
                        case 2: data.clients[path[0]].issues.splice(path[1],1); break;
                        case 3: data.clients[path[0]].issues[path[1]].sessions.splice(path[3],1); break;
                    }
                }
            });
        }
    }

    undoDelete() {
        records = this.deleted.pop();
        records.forEach(record => { this.insert(record); });
    }

    //Assign external data tree
    set(data) {
        if (Object.keys(this.data).length) { this.delete(this.data.id); }
        this.data = data;
    }

    insert(record) {
        var parentIdName; parentId, path, childrenNames;
        parentIdName = record[Object.keys(record).find(key => key.endsWith("Id"))];
        if (parentIdName) {
            parentId = record[parentIdName];
            path = this.indexPath(parentId);
            childrenNames = this.idPath(parentId).map(id => this.childrenGroupName(id));
            switch (path.length) {
                case 0: this.data = record; break;
                case 1: this.data[childrenNames[0]].push(record); break;
                case 2: this.data[childrenNames[0]][path[0]][childrenNames[1]].push(record); break;
                case 3: this.data[childrenNames[0]][path[0]][childrenNames[1]][path[1]][childrenNames[2]].push(record); break;
            }
        }
    }
}