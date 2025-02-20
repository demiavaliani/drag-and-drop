<template>
	<draggable
		v-model="items"
		ghost-class="ghost-elem"
		chosen-class="chosen-elem"
		drag-class="drag-elem"
		animation="200"
	>
		<template #item="{ element, index }">
			<div class="drag-item">
				<p>{{ index + 1 }}</p>
			</div>
		</template>
	</draggable>

	<div class="buttons-wrapper">
		<button type="button" class="button" @click="saveList">Save</button>

		<button type="submit" class="button" @click="shareList">Share</button>
	</div>
</template>

<script lang="ts" setup>
	import { useSite } from '../stores/site';
	import { storeToRefs } from 'pinia';
	import draggable from 'vuedraggable';

	const { items } = storeToRefs(useSite());

	const saveList = () => {
		console.log('Saved List: ', items.value);
	};

	const shareList = async () => {
		const response = await fetch('/api/list/share', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				dragList: { ...items.value },
			}),
		});

		const result = await response.json();

		console.log('List has been saved! See details: ', result);
	};
</script>

<style lang="scss">
	.drag-item {
		text-align: center;
		width: 200px;
		padding: 20px;
		background-color: #e9ecef;
		border: 1px solid #9acbd0;

		& + & {
			border-top: 0;
		}

		&:first-child {
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
		}

		&:nth-child(4) {
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}

	.chosen-elem {
		border-top: 1px solid grey !important;
	}

	.ghost-elem {
		opacity: 0.5;
	}

	.buttons-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		width: 200px;

		.button {
			padding: 5px;
			border: none;
			border-radius: 5px;
			background-color: #5087c2;
			color: white;
			font-weight: bold;
			cursor: pointer;

			&:hover {
				background-color: #3a6ea5;
			}
		}
	}
</style>
