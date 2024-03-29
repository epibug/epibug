<script context="module" lang="ts">
	import dayjs from 'dayjs';
	import { Tooltip } from 'flowbite-svelte';
	import incidents from '../incidents.json';

	function isURL(s: string): boolean {
		return /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(s);
	}
</script>

<div class="lg:max-w-4xl m-auto flex flex-col w-11/12">
	<div class="text-center">
		<a
			href="https://github.com/epibug/epibug/issues/new?assignees=&labels=Incident&template=ajout-d-un-incident.md&title=Ajout+d%27un+incident+%3A+%5BNOM%5D"
			target="_blank"
			class="md:inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3"
			rel="noopener noreferrer"
		>
			Ajouter un incident
		</a>
	</div>

	<ol class="relative border-l border-gray-200 dark:border-gray-700 mt-5">
		{#each incidents.sort((a, b) => dayjs(b.date).diff(dayjs(a.date))) as i}
			<li class="mb-10 ml-4">
				<div
					class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
				/>
				<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
					{dayjs(i.date, 'YYYY-MM-DD').format('D MMMM YYYY')}
				</time>
				{#if i.severity === 'high'}
					<span
						class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
					>
						High
					</span>
				{/if}
				{#if i.severity === 'medium'}
					<span
						class="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900"
					>
						Medium
					</span>
				{/if}

				{#if i.severity === 'low'}
					<span
						class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
					>
						Low
					</span>
				{/if}

				{#if i.fixed}
					{#if i.note}
						<Tooltip tip={i.note} top>
							<span
								class="cursor-pointer bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
							>
								Fixed
							</span>
						</Tooltip>
					{/if}
					{#if !i.note}
						<span
							class="cursor-pointer bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
						>
							Fixed
						</span>
					{/if}
				{/if}

				<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
					{i.name}
				</h3>
				<p
					class="mb-4 break-normal whitespace-pre-wrap text-justify text-base font-normal text-gray-500 dark:text-gray-400"
				>
					{i.description}
				</p>

				{#if i.source}
					<div class="mb-4">
						{#if isURL(i.source)}
							<a
								href={i.source}
								target="_blank"
								rel="noopener noreferrer"
								class="text-blue-500 hover:text-blue-600"
							>
								Source
							</a>
						{/if}
						{#if !isURL(i.source)}
							<span class="text-gray-500">Source : {i.source}</span>
						{/if}
					</div>
				{/if}

				<div class="flex flex-wrap -mx-1 mb-4">
					{#each i.tags.sort() as tag}
						<span
							class="inline-flex items-center px-1.5 py-0.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 mr-1"
						>
							{tag}
						</span>
					{/each}
				</div>
			</li>
		{/each}
	</ol>
</div>
