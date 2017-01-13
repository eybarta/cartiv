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
				<li v-for="cart in carts2" :key="cart">
					<item-image :src="cart.thumb" default-view="fa fa-building-o" size="big" :loader="false" :actions="['remove','edit','upload']"></item-image>
					<span class="location-name txt-small ">
						<i class="fa fa-location-arrow"></i>
						<strong>{{cart.location}}</strong>
					</span>

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
import { toggleAddCart } from '../../vuex/store/actions';
import AddCart from '../components/AddCart.vue';
import itemImage from "../components/itemImage.vue";
export default {
	data() {
		return {
			testlist:["1","2","3","4","5","6","7","8","9"],
			carts2:[]
		}
	},
	created() {
		console.log('enter screen was created successfuly >> ', this.carts);
	},
	mounted() {
		console.log("store state >> ", this.$store.state);
		console.log('test list > ', this.testlist);
		let carts = this.$store.state.carts;
		console.log('carts > ', carts);
		this.carts2 = this.$store.state.carts;
		console.log("Cats2 > ", this.carts2);
	},
	components: {
		AddCart,
		itemImage
	},
	watch: {
		'carts'() {
			this.carts2 = this.carts;
		}
	},
	methods: {
		...mapActions([
		  'toggleAddCart'
		]),
		testshuf() {
			console.log("shuffle? ", this.carts2);
			this.carts2 = _.shuffle(this.carts2);

			console.log("shuffle? ", this.carts2);
		}
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
@import "../../../node_modules/kouto-swiss/index";
@import '../../../node_modules/rupture/rupture/index';
@import '../styl/options.import';
.flip-list-move
	transition transform 1s


.bank-page
	padding 80px 2% 20px
	background #f2f2f2
	min-height 100%
	h2
		color lighten(#3c6c79, 15)
		text-align center
		margin 12vh 0
	ul
		li
			color #fff
			text-align center
			.location-thumb
				@extend .vh-center
				border-radius 50%
				width 10vw
				height 10vw
				border 5px solid #f0f0f0
				margin 0 auto
				i
					line-height 1
					color darken(#f0f0f0, 5)
			.location-name
				display inline-block
				margin 10px auto 0
				width 60%
				color #202020
				i
					color #eaae6b
			&.new-cart
				cursor pointer
				.location-thumb
					border-color darken(#eaae6b, 5)
					i
						color darken(#eaae6b, 5)
				.location-name i
					color darken(#eaae6b, 5)

</style>