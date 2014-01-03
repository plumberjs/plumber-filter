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


function filterOperation(cond) {
    function filter(resources) {
        return resources.filter(cond);
    }

    filter.type = function(type) {
        return filterOperation(intersection(function(resource) {
            return resource.type() === type;
        }, cond));
    };

    filter.not = filterOperation(complement(cond));

    return filter;
}

module.exports = filterOperation(identity);
