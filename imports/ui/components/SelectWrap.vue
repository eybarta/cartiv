<template>
	<multiselect
		:id="name"
		:placeholder="placeHolder"
		:taggable="true"
		v-model="selected"
		:options="options"
		:CloseOnSelect="true"
		@tag="addTag"
		@input="updateValue"
		>
	</multiselect>
</template>
<script>
import { mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
export default {
	props: {
		name: String,
		value: String,
		options: Array
	},
	data() {
		return {
			tags:[],
			selected:''
		}
	},
	created() {
		this.tags = this.options;
		this.selected = this.value
	},
	components: {
		Multiselect
	},
	methods: {
		addTag(tag) {
			console.log('add tag for type>> ', this.selected, " :: ", tag);
			let _tag = this.capitalize(tag);
			// this.tags.push(_tag);
			this.selected = _tag;
			this.$emit('input', this.selected)

			let data = { name: this.name, tag: _tag}
			this.updateProductOptions(data);
		},
		updateValue(value) {
			console.log('update type value >>  ', value, " :: ", this.selected);
			this.$emit('input', this.selected)
			
		},
		capitalize(sentence) {
			let s = sentence.replace(/\w+/g, function (word) { return word.charAt(0).toUpperCase()+word.substr(1)})
			return s;
		},
		...mapActions([
			'updateProductOptions'
		])
	},
	computed: {
		placeHolder() {
			return "Select " + this.name + " or add"
		}
	}
	
}
</script>
<style lang="stylus">
	
</style>