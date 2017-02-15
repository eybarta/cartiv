<template>
	<div class="popup-wrap">
        <i @click.prevent="closePopup" class="lnr lnr-cross close btn r-corner" :class="[popup.ui==='square' ? 'dark' : '']"></i>
		<div :class="['popup-content', popup.ui]">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import 'linearicons'
import {mapActions, mapState } from 'vuex'
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
	},
    computed: {
        ...mapState([
            'popup'
        ])
    }
}
</script>
<style lang="stylus">
@import '~imports/ui/styl/variables.import'
.popup-wrap
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(gray, 0.93)
    z-index 999
    .close
        top 5%
        right 5%
        font-size 50px
        z-index 9999
        cursor pointer
        &.dark
            color gray
    .popup-content
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        background #fff
        z-index 21
        width 95vmin
        height 95vmin
        min-height 500px
        min-width 500mx
        backface-visibility hidden
        perspective 1px
        overflow hidden
        &.circle
            border-radius 360px            
</style>