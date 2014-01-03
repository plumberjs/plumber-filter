function identity(x){ return x; }

function complement(func) {
    return function() {
        return ! func.apply(null, arguments);
    };
}

function intersection(func1, func2) {
    return function() {
        return func1.apply(null, arguments) && func2.apply(null, arguments);
    };
}


function filterOperation(cond, negated) {
    function filter(resources) {
        return resources.filter(negated ? complement(cond) : cond);
    }

    filter.type = function(type) {
        return filterOperation(intersection(function(resource) {
            return resource.type() === type;
        }, cond), negated);
    };

    // Need to do it dynamically to avoid infinite recursion
    Object.defineProperty(filter, 'not', {
        get: function() {
            return filterOperation(cond, ! negated);
        }
    });

    return filter;
}

module.exports = filterOperation(identity, false);
