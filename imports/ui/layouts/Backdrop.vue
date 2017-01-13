<template>
	<div class="backdrop">
			<component :is=" "></component>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentPopup: 'signup'
		}
	},
	components: {
		Signup
	},
	created() {
		console.log('test was created successfuly');
	}
}
</script>
<style lang="stylus">
.backdrop
	background rgba(0,0,0,0.8)
	position fixed
	top 0
	left 0
	width 100%
	height 100%
	z-index 1
</style>