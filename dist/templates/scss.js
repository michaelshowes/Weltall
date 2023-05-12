import { toCamelCase } from '../utils/index.js';
// component.module.scss
export function scss(name) {
    return `// ${name} Component

.${toCamelCase(name)} {
	
}
`;
}
