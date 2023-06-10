import { OPENWEATHERAPI } from '$env/static/private';

import { error } from '@sveltejs/kit';

export async function GET({ url }) {
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');

	const openweatherURI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OPENWEATHERAPI}`;
	const weatherOptions = {
		method: 'GET'
	};

	try {
		const response = await fetch(openweatherURI, weatherOptions);

		return response;
	} catch (error) {
		console.error(error);
	}
}
