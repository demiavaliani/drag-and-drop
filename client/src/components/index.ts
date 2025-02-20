import { defineAsyncComponent } from 'vue';

export const DragAndDrop = defineAsyncComponent(
	() => import('./DragAndDrop.vue')
);
