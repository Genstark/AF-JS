import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Three from '@/views/Three.vue';
import Train from '@/views/Train.vue';
import FindCategory from '@/views/FindCategory.vue';
import Video from '@/views/Video.vue';
import CVJS from '@/views/CVJS.vue';
import ThreeModel from '@/views/ThreeModel.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomeView
		},
		{
			path: '/three',
			name: 'Three',
			component: Three
		},
		{
			path: '/train',
			name: 'Train',
			component: Train
		},
		{
			path: '/findCategory',
			name: 'FindCategory',
			component: FindCategory
		},
		{
			path: '/video',
			name: 'Video',
			component: Video
		},
		{
			path: '/cvjs',
			name: 'CVJS',
			component: CVJS
		},
		{
			path: '/ThreeModel',
			name: 'ThreeDModel',
			component: ThreeModel
		},
	]
});

export default router;