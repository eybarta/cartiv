<template>
	<div class="hp">
		<div class="hp-content">
		<h1 ref="title" @mousemove="titleMoveHandler($event)" @mouseout="titleOutHandler($event)">CARTIV</h1>
		<div class="actions">
			<ul>
				<li>
					<router-link :to="{ name:'cartsbank' }">
						<i class="lnr lnr-cart"></i>
						<span>CARTS</span>
					</router-link>
				</li>
				<li>
					<router-link :to="{ name:'inventory' }">
						<i class="lnr lnr-briefcase"></i>
						<span>INVENTORY</span>
					</router-link>
				</li>
				<li>
					<a href="#p">
						<i class="lnr lnr-neutral"></i>
						<span>EMPLOYEES</span>
					</a>
					
				</li>
			</ul>
		</div>
	</div>
		<!--<transition name="fade">
			<add-cart v-if="activeAddCart"></add-cart>
		</transition>-->
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { toggleAddCart } from '/imports/vuex/actions';
import AddCart from '../components/AddCart.vue';
export default {
	data() {
		return {
			titleDOM:null,
		}
	},
	created() {
		console.log('enter screen was created successfuly');
	},
	mounted() {
		this.$nextTick(() => {
			this.titleDOM = {
				top: this.$refs.title.getBoundingClientRect().top,
				left: this.$refs.title.getBoundingClientRect().left,
				height: this.$refs.title.offsetHeight,
				width:this.$refs.title.offsetWidth,
			}
		})
		
	},
	components: {
		AddCart
	},
	methods: {
		...mapActions([
	      'toggleAddCart'
	    ]),
		titleMoveHandler(e) {
			let _y = e.clientY-this.titleDOM.top;
			let _x = e.clientX-this.titleDOM.left;
			let mouse_relative_position = [
				-(_y/this.titleDOM.height)*100/3.5,
				-(_x/this.titleDOM.width)*100/3.5
			];
			$(e.target).css({
				textShadow:	`${mouse_relative_position[1]}px ${mouse_relative_position[0]}px 0 rgba(32,36,47,0.67), -1px -1px 0 rgba(32,36,47,0.67), 1px -1px 0 rgba(32,36,47,0.67), -1px 1px 0 rgba(32,36,47,0.67),  1px 1px 0 rgba(32,36,47,0.67)`
			})
		},
		titleOutHandler(e) {
			$(e.target).attr('style', '')
		}
	},
	computed: mapState([
	  'activeAddCart'
	])
}
</script>
<style lang="stylus">
@import '~imports/ui/styl/settings';
@import '~imports/ui/styl/variables.import';
@import '~node_modules/rupture/rupture/index';

darktint = rgba(#20242f,0.67);
.hp
	height 100%
	position relative
.hp-content
	self-center()
	top 45%
h1
	font-size 200px
	font-family "Helvetica Md", "Gillsans", Arial
	text-align center
	color lighten(orange, 15)
	-webkit-text-stroke 1px darktint
	text-stroke 1px darktint
	text-shadow 5px 3px 0 darktint, -1px -1px 0 darktint, 1px -1px 0 darktint, -1px 1px 0 darktint,  1px 1px 0 darktint
	position relative
	transition text-shadow 200ms ease
		
.actions
	width 100%
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
			position relative
			display inline-block
			width 90px
			height 90px
			border-radius 50%
			border 1px solid rgba(darktint, 0.18)
			background #fff
			text-align center
			text-decoration none
			i
				self-center()
				font-size 40px
				color lighten(orange, 5)
				transition color 200ms ease-out
			span
				fontsizer()
				display inline-block
				color darktint
				text-align center
				font-family "Gillsans"
				padding-top 100px
				position relative
				transform translateY(0)
				transition color 200ms ease, transform 200ms ease
			&:hover
				i
					color darktint
				span
					color lighten(orange, 5)
					transform translateY(5%)
					
				
</style>