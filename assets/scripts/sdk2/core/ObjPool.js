//仅限ccNode
var ObjPool = {
    poolMap : new Object(),


    openNewPool : function(name, maxNum) {
        if (!this.poolMap[name]) {
            this.poolMap[name] = {max_num : maxNum, pool : new Array()};
        } else {
            this.poolMap[name].max_num = maxNum;
        }
    },

    getObject(name, prefab) {
        if (this.poolMap[name] && this.poolMap[name].pool.length > 0) {
            return this.poolMap[name].pool.pop();
        } else {
            return cc.instantiate(prefab);
        }
    },

    recycleObject(obj) {
        if (!this.poolMap[obj.name]) {
            this.poolMap[obj.name] = {max_num : 999, pool : new Array()};
        }

        if (this.poolMap[obj.name].max_num >= this.poolMap[obj.name].pool.length) {
            this.poolMap[obj.name].pool.push(obj);
            return;
        }

        cc.log(`${obj.name} pool full`);
    },
}

module.exports = ObjPool;
