<template>
    <div class="page-wrap">
        <div class="container">
            <div class="cart-info">
                <!--<item-image :src="!!cart ? cart.thumb : null" default-view="fa fa-building-o" size="med" :loader="false"></item-image>-->
                <span class="location-name txt-small ">
                    <i class="fa fa-location-arrow"></i>
                    <strong>{{!!cart ? cart.location : ''}}</strong>
                </span>
            </div>
            <div class="cart-inventory">
                <product-list :location="cart"></product-list>


            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import itemImage from "../components/item/ItemImage.vue";
import ProductList from "../components/inventory/ProductList.vue";
export default{
    data(){
        return{
             options: {
              url: '/upload',
              paramName: 'file'
            }
        }
    },
    created() {
        console.log("cart page loaded");
    },
    mounted() {
        console.log("active cart > ", this.cart);
    },
    components: {
        itemImage,
        ProductList,
    },
    computed: {
        ...mapGetters({
            cart:'activeCart'
        })
    }
}
</script>
<style lang="stylus">
@import '../styl/variables.import';
.cart-info
    border-bottom 1px solid orange
    padding-bottom 10px
    margin-bottom 30px
    .thumbnail
        display inline-block
        vertical-align middle
    .location-name
        display inline-block
        vertical-align middle
        text-align left


</style>