<template>
	<div class="app-wrap">
		<app-menu></app-menu> 
		<router-view></router-view>
	</div>
</template>
<script>
import AppMenu from './components/AppMenu.vue'
export default {
	created() {
		console.log('app was created successfuly');
	},
	components: {
		AppMenu
	}
}
</script>
<style lang="stylus">
.app-wrap
	width 100%
	height 100%
	background url('/img/background_hp.jpg') no-repeat 50% 0 / cover
</style>