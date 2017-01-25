<template>
    <div>
        <div class="top-bar clearfix">
            <h4>CART INVENTORY</h4>

            <div class="btn-group">

                <button class="btn btn-primary" @click.prevent="toggleAddProduct">
                    Add Product
                </button>
                
            </div>
        </div>
        <ul class="item-list waffle-parent-3">

            <!--<li class="new-product" @click.prevent="toggleAddProduct">
                <div class="location-thumb">
                    <i class="fa fa-plus big-icon"></i>
                </div>
            </li>-->


            <li v-for="product in inventory">
         	    <item-image 
                    :src="product.image"
                    default-view="fa fa-file-image-o"
                    size="big"
                    :loader="false"
                    :actions="['remove','edit','upload']">
                </item-image>
                <div class="label txt-small">
                    <span>{{product.name}}</span>
            
                    <span><strong>$ {{ product.price ?  product.price.min + ' - ' + product.price.max : 'N/A' }}</strong></span>
                </div>
            </li>
        </ul>
        <transition name="fade">
            <add-product v-if="activeAddProduct"></add-product>
		</transition>
    </div>
</template>
<style lang="stylus" scoped>
.top-bar 
    h4 
        float left
    .btn-group
            float right
.label
    text-align center
    span
        display block
        margin-top 5px
</style>
<script>
    import {
        mapActions,
        mapState,
        mapGetters
    } from 'vuex';
    import {
        toggleAddProduct
    } from '../../vuex/actions';
    import AddProduct from './AddProduct.vue';
    import ItemImage from './itemImage.vue'
    export default {
        data() {
            return {}
        },
        created() {
            console.log('yo from inventory >> ', this.inventory);
        },
        components: {
            AddProduct,
            ItemImage,
        },
        methods: {
            ...mapActions([
                'toggleAddProduct'
            ])
        },
        computed: {
            ...mapState([
                'activeAddProduct',
                'inventory'
            ])

        }
    }
</script>