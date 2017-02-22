<template>
<transition-group ref="list" name="list" tag="ul" appear
		class="item-list waffle-parent-3"
		@before-enter="beforeEnter"
		@enter="enter"
		@leave="leave"
		mode="out-in">
	<li v-for="item in items" :key="item._id" @click.prevent="callPopup({type:getType, data: item})">
		<item-image 
			v-if="!!item.image"
			:src="item.image"
			default-view="fa fa-file-image-o"
			size="big"
			:loader="false">
		</item-image>
		<div class="label txt-small">
			<span>{{item.name}}</span>
			<span v-if="type=='product'"><strong>$ {{ item.priceMin }} {{ !!item.priceMax ? ' - ' + item.priceMax : '' }}</strong></span>
		</div>
	</li>
</transition-group>
</template>
<script>
import Velocity from 'velocity-animate'
import ItemImage from '../item/ItemImage.vue'
import { mapActions } from 'vuex'
export default {
	props: ['items', 'type'],
	methods: {
		...mapActions([
			'callPopup'
		]),
		beforeEnter: function (el) {	
			$(el).css({
				opacity:0,
				transform: 'translateY(20%)'
			})
		},
		enter: function (el, done) {
			var delay = el.dataset.index * 100;
			setTimeout(function () {
				Velocity(
				el,
				{ opacity: 1, transform: 'translateY(0)' },
				{ complete: done }
				)
			}, delay)
		},
		leave: function (el, done) {
			$(el).css({
				opacity:0,
				transform: 'translateY(120%)'
			})
			done();
		} 
	},
	components: {
		ItemImage
	},
	computed: {
		getType() {
			return 'View'+this.type.charAt(0).toUpperCase() + this.type.slice(1);
		}
	}
}
</script>
<style lang="stylus">
.label
    text-align center
    span
        display block
        margin-top 5px
        color #202020
</style>

