import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSite = defineStore('site', () => {
	const items = ref([1, 2, 3, 4]);

	return { items };
});
