<template>
	<div class="table-wrap">
		<table border="0" cell-padding="0" cellspacing="0">
			<thead>
				<tr>
					<th v-for="(value, key) in popdata[0]" v-if="key!=='_id' && key!=='atLocations'">{{ key }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in popdata" @click="callModal({ content:item})">
					<td v-for="(value, key) in item" v-if="key!=='_id' && key!=='atLocations'" track-by="_id" v-html="key=='image' ? '<img src='+value+'>' : value"></td>
				</tr>
			</tbody>
		</table>
		
		<modal v-if="modal.active">
			<div class="modal-content">
				<label for="">
					<div v-if="!!quantifyAvailability">
					<h6>How many items to take?</h6>
					<input v-model="transferAmount" placeholder="Type in amount" type="number">
					<span class="pt-min">({{ quantifyAvailability }} are available)</span>
					</div>
					<h4 class="red" v-else>Product is out of stock</h4>
					<div v-if="!!modal.content.atLocations" class="locations pt-med">
						<h6 class="orange">Stocked at locations:</h6>
						<ul>
							<li v-for="location in modal.content.atLocations">
								<span>{{ getLocationNameById(location.locationId) }}</span> <strong class="ml-small circled">{{ location.amount }}</strong>
							</li>
						</ul>
					</div>
					
				</label>
				<div v-if="!!quantifyAvailability" class="btn-group txt-right mt-med mb-min">
					<button class="btn" @click="closeModal">Cancel</button>
					<button class="btn btn-success" @click="saveProductToLocation({ cartId:route.params.cartId, productId: modal.content._id, amount: transferAmount })">Submit</button>
				</div>
				<button v-else class="btn right mt-med mb-med" @click="closeModal">OK</button>
			</div>
		</modal>
	</div>	

</template>
<script>
import { mapActions, mapState } from 'vuex'
import Modal from '../layouts/Modal.vue'
export default {
	props: ['popdata'],
	data() {
		return {
			transferAmount:null
		}
	},
	created() {
		console.log("popdata == ", this.popdata);
	},
	components: {
		Modal
	},
	methods: {
		...mapActions([
			'callModal',
			'closeModal',
			'saveProductToLocation'
		]),
		transferTheGoods() {
			console.log("transfer the good");
		},
		getLocationNameById(id) {
			let cart = _.find(this.carts, {_id:id});
			console.log('get cart >> ', cart);
			return cart.location
		}
	},
	computed: {
		...mapState([
			'modal',
			'inventory',
			'carts',
			'route'
		]),
		quantifyAvailability() {
			let product = this.modal.content;
			let sumAtLocations = 0;
			if (_.has(product, 'atLocations') && !!product.atLocations) {
				sumAtLocations = _.sumBy(product.atLocations, 'amount')
			}
			return product.amount - sumAtLocations;
		}
	}
}
</script>
<style lang="stylus">
@import '~imports/ui/styl/variables.import'
.modal-content
	padding 10%
	span
		display inline-block
	label 
		h4
			margin-bottom 10px
		h6
			color darken(green, 10)
			font-size 18px
			margin-bottom 10px
		input
			border 0
			border-bottom 1px solid lighten(gray, 30)
			width 100%
			padding 2%
	ul li
		& > * 
			display inline-block
			vertical-align middle

	.circled
		border-radius 360px
		background lighten(green, 55)
		border 1px solid lighten(gray, 45)
		padding 1%
		width 30px
		height 30px
		display inline-block
		text-align center
		line-height 20px
	.btn-group
		padding-top 30px
.table-wrap
	margin 0 auto
	padding 10% 5%
	max-height 95%
	overflow hidden
	overflow-y auto
	table
		width 100%
		thead
			th
				background lighten(#e7a255, 30)
				text-align left
				font-weight bold
				border-bottom 1px solid #212121
				padding 15px 10px
				font-size 16px
				text-transform capitalize
				letter-spacing 0.5px
		tbody
			tr
				cursor pointer
				&:nth-child(even)
					background-color lighten(#c1c1c1, 20)
				&:hover
					background-color lighten(red, 30)
				td
					border-bottom 1px solid #c1c1c1
					vertical-align middle
					padding 5px 10px
					img
						width 60px
						height 60px
						border-radius 360px
</style>