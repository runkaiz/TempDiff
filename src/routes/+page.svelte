<script>
	import WeatherItem from '$lib/components/WeatherItem.svelte';

	let firstQuery = '';
	let secondQuery = '';

	let firstLat = 0;
	let firstLon = 0;

	let secondLat = 0;
	let secondLon = 0;

	let firstValid = false;
	let secondValid = false;

	let resultReady = false;

	let days = 0;

	let results = [[], []];
	$: validInput = firstValid && secondValid;
	$: validSelection = current || week || month || year;
	let loading = false;

	$: shouldDisplayResult = !loading && validInput && validSelection;

	let current = false;
	let week = false;
	let month = false;
	let year = false;

	function select(selected) {
		if (validInput) {
			current = selected == 'current' ? true : false;
			week = selected == 'week' ? true : false;
			month = selected == 'month' ? true : false;
			year = selected == 'year' ? true : false;

			resultReady = false;
			results = [[], []];
			getWeather(selected);
		}
	}

	async function lookUp(query, slot) {
		if (query.trim() == '') {
			if (slot == 0) {
				firstLat = 0;
				firstLon = 0;
				firstValid = false;
			} else {
				secondLat = 0;
				secondLon = 0;
				secondValid = false;
			}

			return;
		}

		try {
			const options = {
				method: 'GET'
			};

			const url =
				'/geolookup?' +
				new URLSearchParams({
					query: query
				});
			const response = await fetch(url, options);
			const parsed = await response.json();
			const { lat, lon } = parsed[0];

			if (slot == 0) {
				firstLat = lat;
				firstLon = lon;
				firstValid = true;
			} else {
				secondLat = lat;
				secondLon = lon;
				secondValid = true;
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function getWeather(selected) {
		switch (selected) {
			case 'current':
				days = 1;
				break;
			case 'week':
				days = 7;
				break;
			case 'month':
				days = 30;
				break;
			case 'year':
				days = 365;
				break;
		}

		try {
			const options = {
				method: 'GET'
			};

			const url =
				'/fetchWeather?' +
				new URLSearchParams({
					lat: firstLat,
					lon: firstLon
				});
			const response = await fetch(url, options);
			const parsed = await response.json();

			results[0].push(parsed);

			const url2 =
				'/fetchWeather?' +
				new URLSearchParams({
					lat: secondLat,
					lon: secondLon
				});
			const response2 = await fetch(url2, options);
			const parsed2 = await response2.json();

			results[1].push(parsed2);

			results = results;
			resultReady = true;
		} catch (error) {
			console.error(error);
		}

		console.log(results);
	}
</script>

<main class="app">
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8 my-6">
		<div class="md:flex md:items-center md:justify-between">
			<div class="min-w-0 flex-1">
				<h2
					class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
				>
					TempDiff
				</h2>
			</div>
			<div class="mt-4 flex md:ml-4 md:mt-0">
				<button
					type="button"
					class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>Useless</button
				>
				<button
					type="button"
					class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Buttons</button
				>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8 mb-6">
		<div class="bg-white shadow sm:rounded-lg">
			<div class="px-4 py-5 sm:p-6">
				<h3 class="text-base font-semibold leading-6 text-gray-900">Where are you now?</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<p>Input your first location to compare with.</p>
				</div>
				<form class="mt-5 sm:flex sm:items-center">
					<div class="w-full sm:max-w-xs">
						<input
							type="search"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="New York City"
							bind:value={firstQuery}
						/>
					</div>
					<button
						class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
						on:click={() => {
							lookUp(firstQuery, 0);
						}}>Lookup</button
					>
					<p
						class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
					>
						Lat: {firstLat}<br />Lon: {firstLon}
					</p>
				</form>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8 mb-6">
		<div class="bg-white shadow sm:rounded-lg">
			<div class="px-4 py-5 sm:p-6">
				<h3 class="text-base font-semibold leading-6 text-gray-900">Where are you going to?</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<p>Input your second location to compare against.</p>
				</div>
				<form class="mt-5 sm:flex sm:items-center">
					<div class="w-full sm:max-w-xs">
						<input
							type="search"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Chicago"
							bind:value={secondQuery}
						/>
					</div>
					<button
						class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
						on:click={() => {
							lookUp(secondQuery, 1);
						}}>Lookup</button
					>
					<p
						class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
					>
						Lat: {secondLat}<br />Lon: {secondLon}
					</p>
				</form>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="hidden sm:block">
			<nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
				<!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->
				{#if current}
					<button
						class="text-gray-900 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
						aria-current="page"
					>
						<span>Current</span>
						<span aria-hidden="true" class="bg-indigo-500 absolute inset-x-0 bottom-0 h-0.5" />
					</button>
				{:else}
					<button
						class="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
						aria-current="page"
						on:click={() => select('current')}
					>
						<span>Current</span>
						<span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5" />
					</button>
				{/if}
				{#if week}
					<button
						class="text-gray-900 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
						aria-current="page"
					>
						<span>Week</span>
						<span aria-hidden="true" class="bg-indigo-500 absolute inset-x-0 bottom-0 h-0.5" />
					</button>
				{:else}
					<button
						class="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
						aria-current="page"
						on:click={() => select('week')}
					>
						<span>Week</span>
						<span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5" />
					</button>
				{/if}
				{#if month}
					<button
						class="text-gray-900 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
						aria-current="page"
					>
						<span>Month</span>
						<span aria-hidden="true" class="bg-indigo-500 absolute inset-x-0 bottom-0 h-0.5" />
					</button>
				{:else}
					<button
						class="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
						aria-current="page"
						on:click={() => select('month')}
					>
						<span>Month</span>
						<span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5" />
					</button>
				{/if}
				{#if year}
					<button
						class="text-gray-900 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
						aria-current="page"
					>
						<span>Year</span>
						<span aria-hidden="true" class="bg-indigo-500 absolute inset-x-0 bottom-0 h-0.5" />
					</button>
				{:else}
					<button
						class="text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
						aria-current="page"
						on:click={() => select('year')}
					>
						<span>Year</span>
						<span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5" />
					</button>
				{/if}
			</nav>
		</div>
	</div>
	{#if shouldDisplayResult && resultReady}
		<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div class="grid grid-cols-3 mt-2 gap-8 place-content-center">
				<div>
					{#each results[0] as result}
						<WeatherItem condition={result.current.temp} icon={result.current.weather[0].icon} />
					{/each}
				</div>
				<div class="mx-auto text-center">
					<h3>Result</h3>
					<h2>{results[1][0].current.temp - results[0][0].current.temp}</h2>
				</div>
				<div>
					{#each results[1] as result}
						<WeatherItem condition={result.current.temp} icon={result.current.weather[0].icon} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</main>
