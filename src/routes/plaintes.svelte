<script lang="ts" context="module">
	import directus from '../lib/directus';

	async function loadComplaints() {
		// sort
		const ref = await directus.items('complaints').readByQuery({
			limit: -1,
			fields: '*.*'
		});

		return ref.data.sort((a, b) => {
			return Date.parse(b.date_created) - Date.parse(a.date_created);
		});
	}

	export async function load() {
		return {
			props: {
				complaints: await loadComplaints()
			}
		};
	}
</script>

<script lang="ts">
	import Thread from '../lib/Thread.svelte';
	import Masonry from 'svelte-bricks';

	export let complaints = [];

	let color = 'blue';
	let selectedComplaint = null;
	let showModal = false;

	function closeModal() {
		showModal = false;
	}

	function openModal() {
		showModal = true;
	}

	let showThread = false;
	function openThread(complaint) {
		selectedComplaint = complaint;
		showThread = true;
	}

	function closeThread() {
		selectedComplaint = null;
		showThread = false;
	}

	async function reloadBoard() {
		complaints = await loadComplaints();
	}

	function getColorClass(color) {
		switch (color) {
			case 'red':
				return 'bg-note-red';
			case 'green':
				return 'bg-note-green';
			case 'blue':
				return 'bg-note-blue';
			case 'yellow':
				return 'bg-note-yellow';
			case 'orange':
				return 'bg-note-orange';
			case 'purple':
				return 'bg-note-purple';
		}

		return 'bg-note-blue';
	}
	async function onPostComplaint(e) {
		e.preventDefault();

		const title = e.target.title.value;
		const text = e.target.text.value;

		try {
			await directus.items('complaints').createOne({
				title,
				content: text,
				color
			});

			closeModal();
			complaints = await loadComplaints();
		} catch (e) {
			alert("Eh oh doucement, réessaye dans quelques instants.");
		}
	}

</script>

{#if showModal}
	<div
		on:click={closeModal}
		class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 w-full h-full overflow-auto"
	>
		<!-- Main modal -->
		<div
			on:click|stopPropagation={() => {}}
			role="dialog"
			aria-modal="true"
			class="mx-auto my-20 px-4 w-full max-w-xl h-full md:h-auto"
		>
			<div class="bg-white rounded-lg shadow dark:bg-gray-800">
				<div class="flex justify-end p-2">
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
				<form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" on:submit={onPostComplaint}>
					<h3 class="text-xl font-medium text-gray-900 dark:text-white">Nouvelle plainte</h3>
					<div>
						<label
							for="title-complaint"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titre</label
						>
						<input
							type="text"
							name="title"
							id="title-complaint"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="Titre"
							required
							style="margin-bottom: 0.5rem;"
							maxlength={255}
						/>

						<label
							for="text-complaint"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>Description</label
						>
						<textarea
							name="text"
							id="text-complaint"
							class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="Texte"
							style="min-height: 200px"
							maxlength={4096}
							required
						/>
						<!-- select color -->
						<label
							for="color-complaint"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Couleur</label
						>
						<div class="flex">
							{#each ['blue', 'green', 'red', 'yellow', 'orange', 'purple'] as c}
								<span
									on:click={() => (color = c)}
									class:border-2={c === color}
									class="{getColorClass(
										c
									)} border-indigo-800 cursor-pointer block rounded-lg w-5 h-5 mr-1"
								/>
							{/each}
						</div>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Poster</button
					>
				</form>
			</div>
		</div>
	</div>
{/if}

{#if showThread}
	<Thread reload={reloadBoard} closeModal={closeThread} data={selectedComplaint} />
{/if}

<div class="container m-auto min-h-3/5 w-11/12" aria-hidden="true">
	<div class="text-center">
		<button
			class="md:inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3"
			rel="noopener noreferrer"
			on:click|preventDefault={openModal}
		>
			Ajouter une plainte
		</button>
	</div>

	<div class="mt-10 md:w-9/12 m-auto w-11/12">
		<Masonry items={complaints} minColWidth={200} maxColWidth={800} gap={35} let:item>
			<div
				on:click={() => openThread(item)}
				class="{getColorClass(
					item.color
				)} cursor-pointer w-full md:w-72 inline-block p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md hover:opacity-90 transition-opacity"
			>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{item.title}
				</h5>
				<!-- Cut the text if it's too long -->
				<p class="font-normal text-gray-700 dark:text-white">
					{item.content.length > 500 ? item.content.substring(0, 500) + '...' : item.content}
				</p>
				<div class="float-right flex">
					<span class="text-sm mr-px text-gray-700 dark:text-white">
						{item.comments?.length || 0}
					</span>

					<svg
						class="fill-gray-700 dark:fill-white"
						width="20px"
						height="20px"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20.25 6H19v2h1v8h-3a1 1 0 0 0-1 1v1.586l-2.293-2.293A1 1 0 0 0 13 16h-2.172l-2 2h3.758l3.707 3.707A1 1 0 0 0 18 21v-3h2.25A1.752 1.752 0 0 0 22 16.25v-8.5A1.752 1.752 0 0 0 20.25 6z"
						/>
						<path
							d="M7 18a1 1 0 0 1-1-1v-3H3.75A1.752 1.752 0 0 1 2 12.25v-8.5A1.752 1.752 0 0 1 3.75 2h12.5A1.752 1.752 0 0 1 18 3.75v8.5a1.762 1.762 0 0 1-.514 1.238A1.736 1.736 0 0 1 16.25 14h-4.836l-3.707 3.707A1 1 0 0 1 7 18zm-3-6h3a1 1 0 0 1 1 1v1.586l2.293-2.293A1 1 0 0 1 11 12h5V4H4v8z"
						/>
					</svg>
				</div>
			</div>
		</Masonry>
	</div>
</div>
