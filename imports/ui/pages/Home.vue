<template>
	<div>
		<h1>CARTIV</h1>
		<div class="actions">
			<ul>
				<li>
					<a @click.prevent="toggleAddCart" href="#p"><span>CARTS</span></a>
				</li>
				<li>
					<a href="#p"><span>INVENTORY</span></a>
					
				</li>
				<li>
					<a href="#p"><span>EMPLOYEES</span></a>
					
				</li>
			</ul>
		</div>
		<transition name="fade">
			<add-cart v-if="activeAddCart"></add-cart>
		</transition>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { toggleAddCart } from '/imports/vuex/actions';
import AddCart from '../components/AddCart.vue';
export default {
	created() {
		console.log('enter screen was created successfuly');
	},
	components: {
		AddCart
	},
	methods: {
		...mapActions([
	      'toggleAddCart'
	    ]),
	},
	computed: mapState([
	  'activeAddCart'
	])
}
</script>
<style lang="stylus">
@import '~node_modules/rupture/rupture/index';

h1
	font-size 140px
	font-family "Gillsans", Arial
	font-weight 300
	text-align center
	color rgba(#202020, 0.2)
	text-shadow 0 0 0 #000, 0 0 32px #d6f9ff
	position absolute
	top 50%
	left 50%
	transform translate(-50%,-50%)
.actions
	position absolute
	top 65%
	left 50%
	transform translate(-50%, 0)
	width 90%
	+above(1200px)
		width 75%
	ul
		text-align center
		padding 0
		margin 0
	li
		display inline-block
		width 30%
		padding 0
		margin 0
		a
			display inline-block
			width 120px
			height 120px
			border-radius 50%
			border 1px solid #fff
			background rgba(0,0,0,0.9)
			text-align center
			text-decoration none
			span
				fontsizer()
				display inline-block
				color #fff
				text-align center
				font-family "Gillsans"
				padding-top 130px
				
</style>