<template>
    <div>
        <h4>CART INVENTORY</h4>
        <ul class="item-list waffle-parent-3">

            <li class="new-product" @click.prevent="toggleAddProduct">
                <div class="location-thumb">
                    <i class="fa fa-plus big-icon"></i>
                </div>
            </li>
            <li v-for="product in inventory">prod</li>
        </ul>
        <transition name="fade">
            <add-product v-if="activeAddProduct"></add-product>
		</transition>
    </div>
</template>
<style lang="stylus">

</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { toggleAddProduct } from '../../vuex/actions';
import AddProduct from './AddProduct.vue'
export default{
    data(){
        return{
        }
    },
    created() {
        console.log('yo from inventory >> ', this.inventory);
    },
    components: {
        AddProduct
    },
    methods: {
		...mapActions([
		  'toggleAddProduct'
		])
	},
    computed: {
        ...mapState([
            'activeAddProduct'
        ]),
        ...mapGetters({
            inventory: 'activeInventory'
        })
    }
}
</script>
