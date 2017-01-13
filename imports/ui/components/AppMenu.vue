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
	components: {
	}
}
</script>
<style lang="stylus">
@import '../../../../node_modules/rupture/rupture/index';
@import "../../../../node_modules/kouto-swiss/index";

color-white = quad( #abbabc )
.app-menu
	position fixed
	top 0
	width 100%
	z-index 999
	background rgba(0,0,0,0.9);
	height 50px
	padding 0 20px
	border-bottom 1px solid rgba(255,255,255,0.2)
	a
		text-decoration none
		line-height 50px
		display inline-block
		margin-right 10px
		color color-white[0]
		transition color 400ms ease
		&:active, &:visited
			color color-white[0]
		&.router-link-active
			color color-white[1]
</style>