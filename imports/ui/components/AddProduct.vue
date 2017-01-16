<template>
    <div class="add-product">
        <h4>ADD NEW PRODUCT</h4>
      		<i @click.prevent="toggleAddProduct" class="fa fa-close btn r-corner"></i>
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
                <li>
                    <input type="checkbox" id="checkbox" v-model="attach">
                    <label for="checkbox">Attach to current cart?</label>
                </li>
            </ul>
            <button class="btn btn-save" @click="submitProduct">SAVE</button>
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
            image:null,
            location_id: null,
            attach:true,
            _userId: Accounts.userId()
        }
    },
    created() {
        this.$set(this, 'location_id', this.$route.params.cartId);
        // this.$set(this, '_userId', Accounts.userId());
        console.log('created from inventory >> ');
    },
    mounted() {
        console.log('yo fromdfvzdfvsdfvsdfvsdfvsd inventory >> ', this.$route);
    },
    components: {
        ImageUploader,
    },
    methods: {
        ...mapActions([
            'toggleAddProduct',
            'saveProduct'
        ]),
        imageuploaded(res) {
            console.log(">> ", res);
            if (res.errcode == 0) {
                this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
            }   
        },
        submitProduct() {
            let product = _.clone(this.$data);
            console.log("1 save prod >> ", this.$data)
            delete product['attach'];
            if (!this.attach) {
                delete product['location_id'];
            }
            console.log("2 Save product > ", product);
            this.saveProduct(product);
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
    .btn-save
        background-color green

</style>