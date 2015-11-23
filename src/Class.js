CUORE.Class = function(Parent, props) {
    Parent || (Parent = Object);
    var hasOwn = Object.prototype.hasOwnProperty;

    var Child = function() {
            if (!Child.prototype.init)  throw "Parent class not found maybe you forgot to include the base Class";
            Child.prototype.init.apply(this, arguments);
        };

    var F = function() {};
    F.prototype = Parent.prototype;

    Child.prototype = new F();
    Child.parent = Parent.prototype;
    Child.prototype.constructor = Child;

    for (var i in props) {
        if (hasOwn.call(props, i)) {
            Child.prototype[i] = props[i];
        };
    }
    return Child;
};
