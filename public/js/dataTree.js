const { modelNames } = require("mongoose");

class DataTree {
    data = [];
    
    constructor() {

    }

    childrenGroupName(data) {
        const name = Object.keys(data).find(key => key.endsWith("s"));
        return (name && name != "lines") ? name : false;
    }

    records(ids, data) { return ids.map(id => this.record(id, data)); }
    record(id, data) {
        const path = this.indexPath(id, data);
        if (path === true) { return data; }
        if (isArray(path)) {
            path.forEach(index => { data = data[this.childrenGroupName(data)][index] });
            return data;
        }
        return false;
    }

    //Returns an array of indices, one index for each set of children
    indexPath(id, data) {
        var path;
        if (data.id == id) { return true; }
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

    idPath(id, data) {
        var path = false;
        if (data.id == id) { return [id]; }
        else {
            const childrenName = this.childrenGroupName(data);
            if (childrenName) {
                path = data[childrenName].map((child, index) => {
                    const p = this.idPath(id, child);
                    return (isArray(p)) ? [data.id, ...p]
                         : false;
    
                }).find(p => isArray(p));
                return (path === undefined) ? false : path;
            }
            else { return false; }
        }
    }

    tier(id, data) { const t = this.indexPath(id, data); return (t === true) ? 0 : t.length; }

    // Returns an array of ids for which the remaining given ids are all their descendants.
    mostAncestral(ids, data) {
        //filters a set of ids to only include those for which none of the others precede it in any path
        ids.map(id => this.idPath(id, data)).forEach(path => {
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

    hasParent(id, data)   { const t = this.tier(id, data); return (isInteger(t) && t > 0); }

    parentId(id, data)    { return (this.hasParent(id, data)) ? this.idPath(id, data).slice(-2, -1)[0] : null; }

    parentIds(ids, data)  { return [...new Set(ids.map(id => this.parentId(id, data)))].filter(id => isInteger(id)); }
    get allRowParentIds() { return this.parentIds(this.allIds); }
    
    hasChildren(id, data) { return (this.recordExists(id, data) && !!childrenGroupName(this.record(id, data))); }

    //id existance methods
    get loadedRecordsExist() { return (this.loadedData != false); }
    recordExists(id, data)   { return isInteger(this.tier(id, data)); }

    //deletion methods
    deleteRecords(localIds, loadedIds)  {
        localIds  = (isArray(localIds))  ? this.localMostAncestral(localIds)   : false;
        loadedIds = (isArray(loadedIds)) ? this.loadedMostAncestral(loadedIds) : false;

        if (localIds || loadedIds) {
            const ids = (isArray(localIds) && isArray(loadedIds)) ? [...new Set(localIds.concat(loadedIds))]
                      : (isArray(localIds))                       ? localIds
                      : (isArray(loadedIds))                      ? loadedIds
                      : [];
        
            this.deletedRecords.push([this.localRecords(localIds), this.loadedRecords(loadedIds)]);

            ids.forEach(id => {
                if (localIds.includes(id))  { this.deleteLocalRecord(id, this.localData); }
                if (loadedIds.includes(id)) { this.deleteLoadedRecord(id, this.loadedData); }
                this._buildRecord(id);
            });
    
            //build record list
        }
    }

    delete(id) {
        const path = this.path(id, this.localData);
        console.log(id, path, path.length);
        if (path === true) { this.localData = {}; }
        else {
            switch (path.length) {
                case 1: this.localData.clients.splice(path[0],1); break;
                case 2: this.localData.clients[path[0]].issues.splice(path[1],1); break;
                case 3: this.localData.clients[path[0]].issues[path[1]].sessions.splice(path[3],1); break;
            }
        }
    }

    undoDelete() {
        var path, parentIdName, childrenNames; parentId, records;
        records = this.deletedRecords.pop();
        records.forEach(record => {
            id = record.id;
            parentIdName = this.parentIdName(record);
            parentId = (parentIdName) ? record[parentIdName] : false;
            indexPath = this.indexPath(parentId);
            idPath = this.idPath(parentId);
            switch (path.length) {
                case 0: this.localData = record; break;
                case 1: this.localData[this.childrenName()].push(record); break;
                case 2: this.localData.clients[path[0]].issues.push(record); break;
                case 3: this.localData.clients[path[0]].issues[path[1]].sessions.push(record); break;
            }
        });
    }

    parentIdName(id) { return Object.keys(this.record(id)).find(key => key.endsWith("Id")); }

    childrenName(id) { return ["clients", "issues", "sessions", false][this.tier(id)]; }
}