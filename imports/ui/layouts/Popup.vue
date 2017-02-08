<template>
	<div class="popup-wrap">
        <i @click.prevent="closePopup" class="fa fa-close btn r-corner"></i>
		<div class="popup-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	data() {
		return {

		}
	},
	created() {
		console.log('test was created successfuly');
	},
	methods: {
		...mapActions([
			'closePopup'
		])
	}
}
</script>
<style lang="stylus">
.popup-wrap
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(gray, 0.93)
    z-index 999
    .fa-close
        top 80px
        right 80px
        font-size 50px
        z-index 9999
        cursor pointer
    .popup-content
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        border-radius 100%
        background #fff
        border 2px solid rgba(blue, 0.2)
        z-index 21
        width 95vmin
        height 95vmin
        min-height 500px
        min-width 500mx
        backface-visibility hidden
        perspective 1px
        overflow hidden
</style>