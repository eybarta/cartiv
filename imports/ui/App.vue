<template>
	<div v-show="!!userId" class="app-wrap">
		<app-menu v-show="route.name!='home'"></app-menu> 
		<router-view></router-view>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppMenu from './partials/AppMenu.vue'
export default {
	created() {
		console.log('app was created successfuly');
		this.initUserId()
	},
	components: {
		AppMenu
	},
	methods: {
		...mapActions([
			'initUserId'
		])
	},
	computed: {
		...mapState([
			'userId',
			'route'
		])
	}
}
</script>
<style lang="stylus">
.app-wrap
	width 100%
	height 100%
	/*background url('/img/background_hp.jpg') no-repeat 50% 0 / cover*/
</style>