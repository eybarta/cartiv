<template>
    <div class="page-wrap">
        <div class="container">
            <div class="cart-info col-4">
                <item-image :src="!!cart ? cart.thumb : null" default-view="fa fa-building-o" size="med" :loader="false"></item-image>
                <span class="location-name txt-small ">
                    <i class="fa fa-location-arrow"></i>
                    <strong>{{!!cart ? cart.location : ''}}</strong>
                </span>
            </div>
            <div class="cart-inventory col-8">
                <inventory :location="cart"></inventory>


            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import itemImage from "../components/itemImage.vue";
import Inventory from "../components/Inventory.vue";
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
        Inventory,
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
    border-right 1px solid orange
    padding-bottom 40vh
    .location-name
        display block
        text-align center

</style>