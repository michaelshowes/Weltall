export function toCamelCase(str) {
    return str
        .split(' ')
        .map(function (word) {
        return word.charAt(0).toLowerCase() + word.slice(1);
    })
        .join(' ');
}
