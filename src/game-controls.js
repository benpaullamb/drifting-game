import Vue from 'vue';

window.vue = new Vue({
	el: '#app',
	data: {
		selectedLevel: {
			name: 'First',
			bgColour: 'white',
		},
		levels: [
			{
				name: 'First',
				bgColour: 'white',
			},
			{
				name: 'Second',
				bgColour: 'white',
			},
		],
	},
});
