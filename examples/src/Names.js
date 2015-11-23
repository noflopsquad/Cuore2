Names = CUORE.Class(CUORE.Service, {
    FIRST_NAMES : [
        'Alligator','Bat','Bear','Bison','Bobcat','Butterfly','Caribou','Cat',
        'Condor','Crab','Crocodile','Deer','Dog','Dolphin','Elephant','Falcon','Ferret',
        'Fisher','Fox','Frog','Goat','Hummingbird','Kangaroo','Koala','Leopard','Lion',
        'Lynx','Manatee','Ocelot','','Otter','Owl','Panther','Parrot','Pelican','Penguin',
        'Puma','Rabbit','Shark','Sheep','Snake','Spider','Squirrel','Terrapin','Tiger','Turtle',
        'Walrus','Warbler','Whale','Wolf'
    ],

    MIDDLE_NAMES : [
        'Acrion','Aedesia','Aenesidemus','Aesara','Brontinus','Callicles','Calliphon','Callistratus',
        'Carneades','Damascius','Democrates','Demonax','Echecrates','Empedocles','Epicurus',
        'Eubulides','Favorinus','Geminus','Gorgias','Hegias','Heraclitus','Hypatia','Leucippus','Maximus',
        'Menedemus','Monimus','Nicomachus','Onasander','Onatas','Panaetius','Panthoides','Phaedrus',
        'Philiscus','Phintys','Plotinus','Polus','Sallustius','Siro','Sosipatra','Stilpo','Syrianus','Telauges',
        'Theano','Themistius','Timycha','Xeniades','Xenocrates','Zenobius','Zenodotus'
    ],

    LAST_NAMES : [
        'Armand','Bayer','Beccari','Berdyaev','Bontemps','Bové','Brophy','Camus','Caplan','Carter',
        'Comfort','Day','Ellul','Fimmen','Franklin','Freinet','Goodman','Hennacy','Hiratsuka','Hiratsuka',
        'Igualada','Kelly','Keyes','Khein','Landauer','Lecoin','Light','McCarthy','Montelius','Moreau','Moura',
        'Nieuwenhuis','Ostergaard','Pankhurst','Philips','Poch','Rankin','Relgis','Ryner','Saulière','Selenka',
        'Starhawk','Stewart','Tolstoy','Vonnegut','Westerweel','Willcox','Wolfe','Woodcock'
    ],


    init: function() {
        Names.parent.init.call(this);
        this.name = 'NAMES';
    },
    

    generate: function(params,eventName) {
        var SPACER = " ";
        var name = this._pickRandom( this.FIRST_NAMES );
        var middle = this._pickRandom( this.MIDDLE_NAMES );
        var last = this._pickRandom( this.LAST_NAMES ); 
        this.emit(eventName, name + SPACER + middle + SPACER + last);
    },

   _getRandomInt:function (max) {
        return Math.floor(Math.random() * (max  + 1)) ;
    },

    _pickRandom:function (pool) {
        return pool[this._getRandomInt(pool.length - 1)] ;
    },

});