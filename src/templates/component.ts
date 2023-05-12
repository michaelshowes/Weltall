import { toCamelCase } from '../utils/index.js';

// Component.tsx
export function component(name: string) {
	return `// ${name} Component

import scss from './${toCamelCase(name)}.module.scss';

export default function ${name}() {
	return (
		<div className={scss.${toCamelCase(name)}}>
			${name} component content goes here
		</div>
	)
};
`;
}

export function page(name: string) {
	return `// ${name} Page

export default function ${name}() {
	return (
		<div>
			${name} page content goes here
		</div>
	)
};
`;
}
