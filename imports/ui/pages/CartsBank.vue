<template>
	<div class="bank-page">
		<h2>YOUR CARTS</h2>
		<!--<button @click="testshuf">click to shuffle</button>-->
		<ul>

			<transition-group class="waffle-parent-3" name="flip-list" tag="ul" appear>
				<li class="new-cart" @click.prevent="toggleAddCart">
					<div class="location-thumb">
						<i class="fa fa-plus big-icon"></i>
					</div>
				</li>
				<li v-for="cart in carts" :key="cart">
					<router-link :to="{ name: 'cart', params: { cartId: cart._id }}">
						<item-image :src="cart.thumb" default-view="fa fa-building-o" size="big" :loader="false" :actions="['remove','edit','upload']"></item-image>
						<span class="location-name txt-small ">
							<i class="fa fa-location-arrow"></i>
							<strong>{{cart.location}}</strong>
						</span>
					</router-link>
				</li>
			</transition-group>
		</ul>
		<transition name="fade">
			<add-cart v-if="activeAddCart"></add-cart>
		</transition>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { toggleAddCart } from '/imports/vuex/actions';
import AddCart from '../components/AddCart.vue';
import itemImage from "../components/itemImage.vue";
export default {
	created() {
		console.log('enter screen was created successfuly >> ', this.carts);
	},
	components: {
		AddCart,
		itemImage
	},
	methods: {
		...mapActions([
		  'toggleAddCart'
		])
	},
	computed: {
		...mapState([
		  'activeAddCart',
		  'carts'
		]),
		...mapGetters([
			'currentLocationThumbnail'
		]),
		backgroundThumbnail() {
			let src = this.currentLocationThumbnail;
			return !!src ? `background-image:url(${src})` : null;
		}
	}
}
</script>
<style lang="stylus">
@import "~node_modules/kouto-swiss/index";
@import '~node_modules/rupture/rupture/index';
@import '../styl/options.import';
.flip-list-move
	transition transform 1s


.bank-page
	padding 80px 2% 20px
	background #f2f2f2
	min-height 100%
	ul
		li
			color #fff
			text-align center
			&.new-cart
				cursor pointer
				.location-thumb
					border-color darken(#eaae6b, 5)
					i
						color darken(#eaae6b, 5)
				.location-name i
					color darken(#eaae6b, 5)

</style>