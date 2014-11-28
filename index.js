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
 @param array [{ }]
 на уникальность нету никакой проверки так что при повторение ключа полностью будет скорее всего не сильно правильный вывод
 */
E.HashIndex = function(array, keyFunction, hashFunction, isHashFunctionBasedOnKey){
    this.isHashFunctionBasedOnKey = isHashFunctionBasedOnKey;
    if (typeof(hashFunction) == 'number')
        hashFunction = genSubstr(hashFunction);
    this.hashFunction = hashFunction;
    this.keyFunction = keyFunction;
    this.index = array.reduce(function(index, elem){
        var key = keyFunction(elem);
        if (isHashFunctionBasedOnKey)
            var hash = hashFunction(key);
        else
            var hash = hashFunction(elem);
        var obj = {
            key: key,
            val: elem
        };
        if (index[hash])
            index[hash].push(obj);
        else
            index[hash] = [obj];
        return index;
    }, {})
};

E.HashIndex.prototype.searchByElem = function(elem){
    var hash = this.hashFunction(elem);
    var key = this.keyFunction(elem);
    return this.search(hash, key);

};

E.HashIndex.prototype.search = function(hash, key, substr){
    if (this.index[hash]){
        if (substr)
        {
            for(var i = 0; i<this.index[hash].length; i++)
            {
                if (key.indexOf(this.index[hash][i].key)>=0)
                    return this.index[hash][i].val;
            }
        }
        else
        {
            for(var i = 0; i<this.index[hash].length; i++)
            {
                if (this.index[hash][i].key == key)
                    return this.index[hash][i].val;
            }
        }
    }
    return null;
};

//don't work if hash not based on key
E.HashIndex.prototype.searchByKey = function(key){
    if (!this.isHashFunctionBasedOnKey)
        return false;
    var hash = this.hashFunction(key);
    return this.search(hash, key);
};
//don't work if hash not based on key
E.HashIndex.prototype.searchByKeySubstr = function(key){
    if (!this.isHashFunctionBasedOnKey)
        return false;
    var hash = this.hashFunction(key);
    return this.search(hash, key, true);
};

module.exports = E;