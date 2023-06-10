import { RAPIDAPI } from '$env/static/private';

import { error } from '@sveltejs/kit';

export async function GET({ url }) {
	const input = url.searchParams.get('query');

	const string = `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${input}&accept-language=en&polygon_threshold=0.0`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': RAPIDAPI,
			'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(string, options);
		return response;
	} catch (error) {
		console.error(error);
	}
}
