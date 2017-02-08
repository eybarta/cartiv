<template>
	<div class="view-product">
		<item-image 
			:src="product.image"
			default-view="fa fa-file-image-o"
			size="big"
			:loader="false">
		</item-image>
		<ul>
			<li class="clearfix" v-for="value, key in productProps">
				<strong class="col-6">{{ key }}: </strong>
				<span class="col-6">{{ value }}</span>
			</li>
		</ul>
		<div class="btn-group center">
			<button class="btn btn-primary" @click="callPopup({ type: 'addProduct', item: cloneItem()})"><i class="fa fa-copy"></i> Clone</button>
			<button class="btn btn-warning" @click="callPopup({ type: 'addProduct'})"><i class="fa fa-edit"></i> Edit</button>
			<button class="btn btn-danger" @click="deleteProduct(product._id)"><i class="fa fa-trash"></i> Delete</button>
		</div>
	</div>
</template>
<script>
import ItemImage from './itemImage.vue'
import { mapState, mapActions } from 'vuex'
export default {
	created() {
		console.log("VIEW PRODUCT> ", this.product);
	},
	components: {
		ItemImage
	},
	methods: {
		...mapActions([
			'callPopup',
			'deleteProduct'
		]),
		cloneItem() {
			return _.merge(this.product,{_id:null})
		}
	},
	computed: {
		...mapState({
			product: state => state.popup.item
		}),
		productProps() {
			return _.omit(this.product, ['image', '_id'])
		}
	}
}
</script>
<style lang="stylus" scoped>
.view-product
	padding 4%
	.thumbnail
		height auto
		width 25%
		padding-top 25%
	ul
		padding 5% 30%
		li
			padding 10px 0 10px
			border-bottom 1px solid #c2c2c2
			& > *
				lost-column 1/2 2
				text-transform capitalize
				font-size 20px
				&:first-child
					text-align right

</style>