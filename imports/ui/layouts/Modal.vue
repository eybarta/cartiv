<template>
	<div class="mask">
		<div class="modal">
			<i class="lnr lnr-cross close-btn" @click="closeModal"></i>
			<slot>test</slot>
		</div>
	</div>
</template>
<script>
import 'linearicons'

import { mapActions } from 'vuex'
export default {
	methods: {
		...mapActions([
			'closeModal'
		])
	}
}
</script>
<style lang="stylus">
@import '~imports/ui/styl/variables.import'
.mask
	position absolute
	top 0
	left 0
	right 0
	bottom 0
	background rgba(gray, 0.8)
.modal
	position absolute
	top 50%
	left 50%
	transform translate(-50%,-50%)
	background #fff
	border-radius 4px
	border 2px solid lighten(blue, 20)
	min-width 50%
	min-height 50px
	.close-btn
		position absolute
		top 3px
		right 3px
		cursor pointer
		font-size 22px
</style>