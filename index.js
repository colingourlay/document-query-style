module.exports = documentQueryStyle;

function documentQueryStyle(prop, value, shouldReturnFirstResult) {
    var query = {};
    var firstResultIndex;

    function filter(element, index) {
        var style = window.getComputedStyle(element, null);

        var hasStyle = props.every(function propHasValue(prop) {
            return style.getPropertyValue(prop) === query[prop];
        })

        if (shouldReturnFirstResult && hasStyle && firstResultIndex == null) {
            firstResultIndex = index;
        }

        return hasStyle;
    }

    if (typeof prop === 'string') {
        query[prop] = value;
    } else if (typeof prop === 'object') {
        query = prop;
        shouldReturnFirstResult = value;
    } else {
        throw new Error('Cannot handle property/query:', prop);
    }

    shouldReturnFirstResult = !!shouldReturnFirstResult;

    var elements = [].slice.call(document.querySelectorAll('*'));

    var props = Object.keys(query);

    var results = elements[shouldReturnFirstResult ? 'some' : 'filter'](filter);

    if (shouldReturnFirstResult) {
        return results ? elements[firstResultIndex] : null;
    }

    return results;
};

function polyfill(api) {
    if (api == null) {
        api = document;
    }

    if (typeof api !== 'object' && typeof api !== 'function') {
        throw new Error('Cannot polyfill API:', api);
    }

    if (!document.queryStyle) {
        api.queryStyle = function queryStyle() {
            return apiCall(arguments, true);
        };
    }

    if (!document.queryStyleAll) {
        api.queryStyleAll = function queryStyleAll() {
            return apiCall(arguments, false);
        };
    }
}

function apiCall(arguments, shouldReturnFirstResult) {
    var args = [].slice.call(arguments);

    args.push(shouldReturnFirstResult);

    return documentQueryStyle.apply(null, args);
}

documentQueryStyle.polyfill = polyfill;
