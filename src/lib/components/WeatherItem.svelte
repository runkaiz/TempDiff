<script>
	export let icon;
	export let condition = 'Lorem ipsum';
</script>

<div class="flex">
	<div class="mr-4 flex-shrink-0">
		<img
			class="h-16 w-16 border border-gray-300 bg-white text-gray-300"
			preserveAspectRatio="none"
			src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
			alt={icon}
			viewBox="0 0 200 200"
			aria-hidden="true"
		/>
	</div>
	<div>
		<h4 class="text-lg font-bold">{condition}</h4>
		<p class="mt-1">Temperature</p>
	</div>
</div>
