<template>
    <div class="add-product">
        <h4>ADD NEW PRODUCT</h4>
      		<i @click.prevent="toggleAddCart" class="fa fa-close btn r-corner"></i>
        <image-uploader  class="col-4" v-model="image"></image-uploader>
        <div class="col-8">
            <ul class="form">
                <li>
                    <input v-model="name" type="text" placeholder="Product name">
                </li>
                <li>
                    <input v-model="category" type="text" placeholder="Category">
                    
                </li>
                <li>
                    <input v-model="price_min" type="number" placeholder="Minimum Price">
                    
                </li>
                <li>
                    <input v-model="price_max" type="number" placeholder="Maximum price">
                    
                </li>
                <li>
                    <input v-model="amount" type="number" placeholder="Amount of items">
                </li>
                <li>
                    <input v-model="cost" type="number" placeholder="Cost of tems">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import ImageUploader from './ImageUploader.vue'
export default{
    data(){
        return{
            name: null,
            category: null,
            price_min:null,
            price_max:null,
            amount: null,
            cost:null,
            image:null
        }
    },
    created() {
        console.log('yo from inventory >> ', this.inventory);
    },
    mounted() {
        console.log('yo from inventory >> ', this.inventory);
    },
    components: {
        ImageUploader,
    },
    methods: {
        ...mapActions([
            'toggleAddProduct'
        ]),
        imageuploaded(res) {
            console.log(">> ", res);
            if (res.errcode == 0) {
                this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
            }   
        }
    },
}
</script>
<style lang="stylus">
@import '../styl/variables.import';
.add-product
    position fixed
    top 50px
    left 0
    right 0
    bottom 0
    padding 4%
    background #f2f2f2
    z-index 20
    i
        color #202020
    .form
        li
            margin-bottom 10px
            input
                background rgba(#fff, 0.9)
                padding 15px 10px
                border-radius 4px
                border 1px solid lighten(gray, 60)
                font-size 14px
    .product-image
        border 1px solid #c1c1c1
        text-align center

</style>