<template>
	<div class="mask">
		<div class="modal">
			<i class="lnr lnr-cross close-btn" @click="closeModal"></i>
			<slot>test</slot>
		</div>
	</div>
</template>
<script>
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
	.modal-content
		padding 10% 10% 5% 10%
		h4
			padding-left 0
		span
			display inline-block
		label 
			h4
				margin-bottom 10px
			h6
				color darken(green, 10)
				font-size 18px
				margin-bottom 10px
			input
				border 0
				border-bottom 1px solid lighten(gray, 30)
				width 100%
				padding 2%
		ul li
			margin-bottom 15px
			& > * 
				display inline-block
				vertical-align middle

		.circled
			border-radius 360px
			background lighten(green, 55)
			border 1px solid lighten(gray, 45)
			padding 1%
			width 30px
			height 30px
			display inline-block
			text-align center
			line-height 20px
		.btn-group
			padding-top 30px
</style>