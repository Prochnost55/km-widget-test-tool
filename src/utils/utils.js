export const setItemInLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data, stringifyFunctions));
}

export const getItemFromLocalStorage = (key) => {
    return JSON.parse(window.localStorage.getItem(key));
}

export const stringifyFunctions = (k, v) => typeof v == 'function' ? v.toString(): v;
