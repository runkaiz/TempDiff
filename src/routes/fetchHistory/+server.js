import { OPENWEATHERAPI } from '$env/static/private';

export async function GET({ url }) {
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');
	const time = url.searchParams.get('time');

	const openweatherURI = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${OPENWEATHERAPI}`;
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
