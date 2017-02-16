<template>
    <div>
        <div class="top-bar clearfix">
            <h4>CART INVENTORY</h4>

            <div class="btn-group">
                <button class="btn btn-success" @click.prevent="callPopup({ type:'addProduct'})">
                    Add New Product
                </button>
                <button class="btn btn-warning" 
                    @click.prevent="callPopup({ title:'Select product', ui:'square', type:'DataTable', data:'parsedInventory' })">
                    Fetch from Inventory</button>
            </div>
        </div>
            <transition-group ref="list" name="list" tag="ul" appear
                    class="item-list waffle-parent-3"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave"
                    mode="out-in">
            <li v-for="product in activeInventory" :key="product._id" @click.prevent="callPopup({type:'viewProduct', data: product})">
         	    <item-image 
                    :src="product.image"
                    default-view="fa fa-file-image-o"
                    size="big"
                    :loader="false"
                    :actions="['remove','edit','upload']">
                </item-image>
                <div class="label txt-small">
                    <span>{{product.name}}</span>
                    <span><strong>$ {{ product.priceMin }} {{ !!product.priceMax ? ' - ' + product.priceMax : '' }}</strong></span>
                </div>
            </li>
            </transition-group>
        <transition name="fade">
            <popup v-if="popup.active">
                <h4 v-if="!!popup.title" v-text="popup.title"></h4>
                <component v-if="!!popup.type" :is="popup.type" :popdata="popup.data"></component>
                <!--<add-product v-if="popup.type=='add-product'"></add-product>
                <view-product v-else-if="popup.type=='view-product'"></view-product>-->
            </popup>
		</transition>
    </div>
</template>
<style lang="stylus" scoped>
.item-list
    padding-top 30px
    clear both
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
    import { mapActions, mapState,mapGetters } from 'vuex';
    import Popup from  '../layouts/Popup.vue';
    import AddProduct from './AddProduct.vue';
    import ViewProduct from './ViewProduct.vue';
    import DataTable from './DataTable.vue';
    import ItemImage from './itemImage.vue'
    import Velocity from 'velocity-animate';
    export default {
        props: ['location'],
        data() {
            return {}
        },
        created() {
            console.log('yo from inventory >> ', this.inventory);
        },
        components: {
            Popup,
            AddProduct,
            ViewProduct,
            DataTable,
            ItemImage,
        },
        methods: {
            ...mapActions([
                'callPopup',
                'closePopup'
            ]),
            beforeEnter: function (el) {
                $(el).css({
                    opacity:0,
                    transform: 'translateY(20%)'
                })
            },
            enter: function (el, done) {
                var delay = el.dataset.index * 100;
                setTimeout(function () {
                    Velocity(
                    el,
                    { opacity: 1, transform: 'translateY(0)' },
                    { complete: done }
                    )
                }, delay)
            },
            leave: function (el, done) {
                $(el).css({
                    opacity:0,
                    transform: 'translateY(120%)'
                })
                done();
            }            
        },
        computed: {
            ...mapState([
                'popup',
                'inventory'
            ]),
            ...mapGetters([
                'activeInventory',
                'parsedInventory'
            ]),
            

        }
    }
</script>