/**
 * Created by nikolaymendyaev on 26.11.14.
 */
/**
 * Created by nikolaymendyaev on 26.11.14.
 */
var E = {};

function genSubstr(length){
    return function(elem){
        elem.slice(0, length);
    }
}

/*
 @param array [{ key: 'url', val: {a lot of params} } ]
 на уникальность нету никакой проверки так что при повторение ключа полностью будет скорее всего не сильно правильный вывод
 */
E.HashIndex = function(array, hashFunction){
    if (typeof(hashFunction) == 'number')
        hashFunction = genSubstr(hashFunction);
    this.hashFunction = hashFunction;
    this.index = array.reduce(function(index, elem){
        var hash = hashFunction(elem.key);
        if (index[hash])
            index[hash].push(elem);
        else
            index[hash] = [elem];
        return index;
    }, {})
};

E.HashIndex.prototype.searchByElem = function(elem){
    var hash = this.hashFunction(elem.key);
    return this.search(hash, elem.key);

};

E.HashIndex.prototype.search = function(hash, key){
    if (this.index[hash]){
        for(var i = 0; i<this.index[hash].length; i++)
        {
            if (this.index[hash][i].key == key)
                return this.index[hash][i].val;
        }
    }
    return null;
};

E.HashIndex.prototype.searchByKey = function(key){
    var hash = this.hashFunction(key);
    return this.search(hash, key);
};

module.exports = E;