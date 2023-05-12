export function toCamelCase(str: string) {
	return str
		.split(' ')
		.map(function (word) {
			return word.charAt(0).toLowerCase() + word.slice(1);
		})
		.join(' ');
}
