<template>
	<div class="popup-wrap">
        <i @click.prevent="closePopup" class="lnr lnr-cross close btn r-corner" :class="[popup.ui==='square' ? 'dark' : '']"></i>
		<div :class="['popup-content', popup.ui]">
			<slot></slot>
		</div>
	</div>
</template>

<script>
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
    z-index 99999
    .close
        top 4%
        right 4%
        font-size 30px
        z-index 999991
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
        width 95vw
        height 95vh
        min-height 500px
        min-width 500px
        backface-visibility hidden
        perspective 1px
        overflow hidden
        border-radius 3px
        h4
            color red
            text-transform uppercase
            padding 3% 5% 0 5%
            margin 0
            font-weight 300
            letter-spacing 1.2px
        &.circle
            border-radius 100%            
</style>