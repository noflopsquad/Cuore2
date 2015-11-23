Names = CUORE.Class(CUORE.Service, {

    init: function() {
      Names.parent.init.call(this);
      this.name = 'NAMES';
    },
    

    generate: function(params,eventName) {
        var SPACER = " ";
        var name = this._pickRandom( FIRST_NAMES );
        var middle = this._pickRandom( MIDDLE_NAMES );
        var last = this._pickRandom( LAST_NAMES ); 
        this.emit(eventName, name + SPACER + middle + SPACER + last);
    },

   _getRandomInt:function (max) {
        return Math.floor(Math.random() * (max  + 1)) ;
    },

    _pickRandom:function (pool) {
        return pool[this._getRandomInt(pool.length - 1)] ;
    },

});