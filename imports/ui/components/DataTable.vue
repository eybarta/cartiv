<template>
	<div class="table-wrap">
		<table border="0" cell-padding="0" cellspacing="0">
			<thead>
				<tr>
					<th v-for="(value, key) in parsedData[0]" v-if="key!=='_id' && key!=='atLocations'">{{ key }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in parsedData" @click.prevent="clickHandler(item)">
					<td v-for="(value, key) in item" v-if="key!=='_id' && key!=='atLocations'" track-by="_id" v-html="key=='image' ? '<img src='+value+'>' : value"></td>
				</tr>
			</tbody>
		</table>
		
		
	</div>	

</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
	props: ['popdata', 'itemCallback'],
	data() {
		return {
			transferAmount:null
		}
	},
	created() {
		console.log("popdata == ", this.popdata, this[this.popdata]);
	},
	components: {
	},
	methods: {
		...mapActions([
			'callModal',
			'closeModal',
			'callPopup',
			'saveProductToLocation'
		]),
		transferTheGoods() {
			console.log("transfer the good");
		},
		clickHandler(item) {
			if (this.itemCallback) {
				let c = this.itemCallback;
				console.log(c['call']);
				this[c['call']]({ type:c['type'], data: item})
			} 
			else {
				callModal({ content:item})
			}
		}
		
	},
	computed: {
		...mapState([
			'modal',
			'inventory',
			'carts',
			'route'
		]),
		...mapGetters([
			'parsedInventory'
		]),
		parsedData() {
			return this.parsedInventory //!!this.popdata.length ? this.popdata : this[this.popdata]
		}
	}
}
</script>
<style lang="stylus">
@import '~imports/ui/styl/variables.import'
.table-wrap
	margin 0 auto
	padding 5%
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
				&:first-child
					border-radius 4px 0 0 0
				&:last-child
					border-radius 0 4px 0 0
		tbody
			tr
				cursor pointer
				&:nth-child(even)
					background-color lighten(#c1c1c1, 22)
				&:hover
					background-color lighten(red, 30)
				td
					border-bottom 1px solid lighten(#c1c1c1, 10)
					vertical-align middle
					padding 5px 10px
					img
						width 60px
						height 60px
						border-radius 360px
</style>