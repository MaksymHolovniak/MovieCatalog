export function generateSlug(str) {
	return str
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^a-zа-яїієґ0-9-]+/g, ''); // Додано українські літери
}