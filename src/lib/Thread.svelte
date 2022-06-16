<script lang="ts">
	import directus from '../lib/directus';
	import dayjs from 'dayjs';
	import { Button, Textarea } from 'flowbite-svelte';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	export let closeModal: () => void;
	export let reload: () => void;
	export let data: any;

	let comments = data.comments.sort((a, b) => {
		return Date.parse(a.date_created) - Date.parse(b.date_created);
	});

	async function onPostComment(e) {
		e.preventDefault();

		const text = e.target.content.value;

		try {
			let item = await directus.items('comments').createOne({
				content: text,
				complaint: data.id,
				complaint_id: data.id,
			});

			reload();
			
			e.target.content.value = '';
		} catch (error) {
			alert("Eh oh doucement, réessaye dans quelques instants.");
		}
	}
</script>

<div
	on:click={closeModal}
	class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 w-full h-full overflow-auto"
>
	<div
		on:click|stopPropagation={() => {}}
		role="dialog"
		aria-modal="true"
		class="mx-auto my-20 px-4 w-full max-w-xl h-full md:h-auto"
	>
		<div class="bg-white rounded-lg shadow dark:bg-gray-700">
			<div class="flex justify-end p-2">
				<button
					type="button"
					class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-white"
					on:click={closeModal}
				>
					<svg
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</div>
			<div class="px-6 space-y-6 lg:px-8">
				<h3 class="text-xl font-medium text-gray-900 dark:text-white">{data.title}</h3>
				<p class="text-gray-700 dark:text-white whitespace-pre-wrap">
					{data.content}
				</p>

				<p class="text-gray-700 dark:text-white text-sm italic mt-5">
					{dayjs(data.date_created).format('DD MMM YYYY à HH:mm')}
				</p>

				<div class="mt-6">
					{#if data.comments.length}
						<h3 class="text-xl font-medium text-gray-900 dark:text-white">
							Commentaires ({data.comments?.length || 0})
						</h3>
					{/if}
					<div class="mt-5 flex flex-col">
						{#each comments as comment}
							<div class="flex flex-col">
								<div class="flex items-center">
									<div class="text-gray-900 dark:text-white">
										<p class="text-sm font-medium">
											<span class="text-gray-600 dark:text-white">Anonymous</span>
											-
											<span class="text-gray-600 dark:text-white"
												>{dayjs(comment.date_created).fromNow()}</span
											>
										</p>
									</div>
								</div>
								<p class="mt-1 text-sm text-gray-700 dark:text-white">
									{comment.content}
								</p>
							</div>
							<hr class="mt-4 mb-4" />
						{/each}
					</div>
				</div>
			</div>
			<form class="mt-6 p-5" on:submit={onPostComment}>
				<div class="container">
					<Textarea
						id="content"
						rows={3}
						placeholder="Ajouter un commentaire..."
						label="Ton commentaire"
					/>
					<div class="mt-2">
						<Button type="submit" class="text-gray-900 dark:text-white">Envoyer</Button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
