<template>
	<div class="popup-wrap">

		<div class="popup-content">
			<component :is="currentPopup"></component>

		</div>
	</div>
</template>

<script>
import Signup from '../components/SignupForm.vue'
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
.popup-wrap
	background rgba(0,0,0,0.8)
	position fixed
	top 0
	left 0
	width 100%
	height 100%
	z-index 1
	.popup-content
		position absolute
		top 50%
		left 50%
		width 35%
		transform translate(-50%,-50%)
		background #fbfbfb
		padding 1%
		border-radius 3px
		border 5px solid rgba(41, 58, 58, 0.8)
		

</style>