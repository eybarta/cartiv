<template>
	<div class="table-wrap">
		<table border="0" cell-padding="0" cellspacing="0">
			<thead>
				<tr>
					<th @click="sort(key)" @dblclick="sort(key, true)" :class="[key!='image' ? 'sortable' : '']" v-for="(value, key) in parsedData[0]" v-if="key!=='_id' && key!=='atLocations'">
						{{ key.replace('_', ' ') }} 
						<i v-if="key!='image'" :class="['fa', sortClass(key)]"></i></th>
				</tr>
			</thead>
				<transition-group name="flip-list" tag="tbody">
					<tr v-for="item in parsedData" @click.prevent="cellClickHandler(item)" :key="item._id">
						<td v-for="(value, key) in item" v-if="key!=='_id' && key!=='atLocations'" track-by="_id" v-html="parseValue(key,value)"></td>
					</tr>
				</transition-group>
		</table>
		
		
	</div>	

</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
	props: ['popdata', 'itemCallback'],
	data() {
		return {
			sortby: {
				keys: [],
				dir: []
			}
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
		cellClickHandler(item) {
			if (this.itemCallback) {
				let c = this.itemCallback;
				this[c['call']]({ type:c['type'], data: item})
			} 
			else {
				console.log('content >> ', item);
				this.callModal({ content:item })
			}
		},
		sortClass(key) {
			let sortindex = this.sortIndex(key);
			return (sortindex>-1) 
				? 'fa-sort-' + this.sortby.dir[sortindex]
				: 'fa-sort';
		},
		sortIndex(key) {
			return this.sortby.keys.indexOf(key);
		},
		sort(key, reset) {
			if (key=='image') return
			console.log('reset? ', reset)
			if (reset) {
				this.sortby.keys = [];
				this.sortby.dir = [];
			}
			let sortindex = this.sortIndex(key);
			if (sortindex<0) {
				this.sortby.keys.push(key);
				this.sortby.dir.push('desc')
			}
			else {
				this.$set(this.sortby.dir, sortindex, this.sortby.dir[sortindex]=='desc' ? 'asc' : 'desc')
			}
		},
		parseValue(key, value) {
			if (!!value) {
				return key=='image' ? '<img src='+value+'>' : /price/g.test(key) ? '$'+value : value
			}
			return '-';
		}
		
	},
	computed: {
		...mapState([
			'modal',
			'inventory',
			'carts',
			'route',
			'popup'
		]),
		...mapGetters([
			'parsedInventory'
		]),
		parsedData() {
			let data = !!this.popup.active && !!this.popup.data 
						? this[this.popup.data]
						: this.popdata
			let keys = this.sortby.keys; 
			let dir = this.sortby.dir;
			if (keys.length>0) {
				return _.orderBy(data, keys, dir)
			}
			return data //!!this.popdata.length ? this.popdata : this[this.popdata]
		}
	}
}
</script>
<style lang="stylus">
@import '~imports/ui/styl/variables.import'
.flip-list-move
	transition transform 400ms
.table-wrap
	margin 0 auto
	padding 10px 0
	max-height 95%
	overflow hidden
	overflow-y auto
	/.popup-wrap &
		padding 40px 5%
	table
		width 100%
		thead
			th
				background lighten(#e7a255, 30)
				text-align left
				font-family 'Helvetica Md'
				border-bottom 1px solid #212121
				padding 15px 10px
				font-size 14px
				text-transform capitalize
				letter-spacing 0.5px
				&:first-child
					border-radius 4px 0 0 0
				&:last-child
					border-radius 0 4px 0 0
				&.sortable
					cursor pointer
				i
					float right
					opacity 0.5
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