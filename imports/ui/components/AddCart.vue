<template>
	<div class="add-cart backdrop">
		<i @click.prevent="toggleAddCart" class="fa fa-close btn r-corner"></i>
		<div class="container">
			<h3>ADD CART</h3>
			<div class="form clearfix">
				<ul>
					<li>
						<label for="location">Location:</label>
						<div class="input-wrap">
							<div :style="backgroundThumbnail" class="thumbnail" :class="[imageOutput ? 'has' : '']">
								<i v-if="!imageOutput" class="fa fa-building-o"></i>
							</div>
							<input v-model="location" id="location" type="text" @input="searchLocation" @change="findPhoto">
						</div>
						<auto-complete v-if="!!locations.length" :locations="locations"></auto-complete>
						<image-select v-if="!!images.length && !locations.length" v-show="!imageOutput" :images="images"></image-select>
					</li>
				</ul>
				<button @click="saveCart(currentCart)" class="btn btn-success right">SAVE</button>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState,mapGetters } from 'vuex';
import { toggleAddCart } from '../../vuex/actions';
// Components
import autoComplete from './autoComplete.vue';
import imageSelect from './imageSelect.vue';
export default {
	created() {
		console.log('Add Cart Form was created successfuly');
	},
	data() {
		return {
			location: '',
			name:'',
			locations:[],
			images:[],
			timer:null
		}
	},
	components: {
		autoComplete,
		imageSelect
	},
	watch: {
		'currentCart': {
			handler() {
				if (!!this.currentCart) {
					this.location = this.currentCart.location;
					this.findPhoto();
				}
			},
			deep:true
		}
	},
	methods: {
		...mapActions([
		  'toggleAddCart',
		  'saveCart'
		]),
		searchLocation() {
			clearTimeout(this.timer);
			this.images = [];
			let ref = this;
			this.timer = setTimeout(()=>{
				Meteor.call('getLocation', ref.location, function(err, response) {
					ref.locations = _.map(response.data.predictions, function(location) {
						return {
							name: location.structured_formatting.main_text,
							id: location.place_id
						}
					});
				})
			},500);
		},
		findPhoto() {
			let ref = this;
			this.$nextTick(()=> {
				let location = _.filter(ref.locations, {name:this.location});
				let placeid = !!location.length ? location[0].id : null;
				this.$set(this, 'locations', []);
				if (placeid) {
					Meteor.call('findPhotoOfLocation', placeid, function(err, response) {
						if (err) {
							console.log("returned with error > ", err);
							return;
						}
						_.each(response, photoref => {
							let src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photoref}&key=AIzaSyDYeKhSxCq8gMuLKfPYPRMxMkGf4k3CKpM`;
							ref.images.push(src)
						})
					})
				}
			})
		}
	},
	computed: {
		...mapState([
			  'activeAddCart',
			  'currentCart'
		]),
		...mapGetters({
			imageOutput:'currentLocationThumbnail'
		}),
		backgroundThumbnail() {
			let src = this.imageOutput;
			return !!src ? `background-image:url(${src})` : null;
		}
	}
}
</script>
<style lang="stylus">
@import '../../../../node_modules/rupture/rupture/index';
@import '../../../../node_modules/kouto-swiss/index';
@import '../styl/options.import';
.backdrop
	h3
		color #00bcd4
	.form
		& > ul li
			position relative
			margin-bottom 40px
			text-align left
		label
			color #fff
			display block
			fontsizer()
		.input-wrap
			position relative
			.thumbnail
				@extend .v-center
				height 30px
				width 30px
				border-width 0px
				left 10px
				&.has
					border-width 2px
				i
					font-size 14px
					@extend .vh-center
			input
				fontsizer(16px, 22px)
				color #f4f4f4
				height 60px
				line-height 60px
				background none
				border 1px solid #f1f1f1
				border-radius 4px
				margin 10px 0
				padding 0 45px
				width 100%
</style>