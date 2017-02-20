<template>
	<div class="app-menu">
		<router-link :to="{ name:'home', exact: true }">Home</router-link>
		<router-link :to="{ name:'cartsbank' }">Your Carts</router-link>
	</div>
</template>
<script>
export default {
	created() {
		console.log('App Menu was created successfuly');
	},
	mounted() {
		console.log('App Menu was mounted successfuly');
	},
	updated() {
		console.log('App menu udpated');
	},
	components: {
	}
}
</script>
<style lang="stylus">
@import '~imports/ui/styl/variables.import';
@import '~node_modules/rupture/rupture/index';
@import "~node_modules/kouto-swiss/index";

color-white = quad( #abbabc )
.app-menu
	position fixed
	top 0
	width 100%
	z-index 999
	background lighten(#e7a255, 39)
	height 50px
	padding 0 20px
	box-shadow 0px 0px 3px lighten(#e7a255, 5)
	a
		font-family 'Helvetica Neue'
		font-size 14px
		text-decoration none
		line-height 50px
		display inline-block
		margin-right 10px
		letter-spacing 1px
		color darktint
		transition color 400ms ease
		&:active, &:visited
			color darktint
		&.router-link-active
			/*color orange*/
</style>