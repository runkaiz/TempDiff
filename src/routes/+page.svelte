<script>
	let firstQuery = '';
	let secondQuery = '';

	let day = true;
	let week = false;
	let month = false;
	let year = false;

	function select(selected) {
		day = selected == 'day' ? true : false;
		week = selected == 'week' ? true : false;
		month = selected == 'month' ? true : false;
		year = selected == 'year' ? true : false;
	}

	async function lookUp(query) {
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

			console.log(await response.json());
		} catch (error) {
			console.error(error);
		}
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
					<div class="w-full sm:m ax-w-xs">
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
							lookUp(firstQuery);
						}}>Lookup</button
					>
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
							lookUp(secondQuery);
						}}>Lookup</button
					>
				</form>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div>
			<div class="hidden sm:block">
				<nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
					<!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->
					{#if day}
						<button
							class="text-gray-900 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
							aria-current="page"
						>
							<span>Day</span>
							<span aria-hidden="true" class="bg-indigo-500 absolute inset-x-0 bottom-0 h-0.5" />
						</button>
					{:else}
						<button
							class="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
							aria-current="page"
							on:click={() => select('day')}
						>
							<span>Day</span>
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
	</div>
</main>
