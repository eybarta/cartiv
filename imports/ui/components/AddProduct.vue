<template>
    <div class="add-product">
        <div class="circle-wrap">
            <i @click.prevent="toggleAddProduct" class="fa fa-close btn r-corner"></i>
            <div class="form-wrap">
                <h4>NEW PRODUCT</h4>
                
                <image-uploader  class="col-4 half-height vh-center" v-model="image"></image-uploader>
                <div class="col-8">
                    <ul class="form">
                        <li>
                            <i class="fa fa-pencil"></i>
                            <input id="productName" v-model="name" type="text" required>
                            <label for="productName">Product name</label>
                        </li>
                        <li>
                            <i class="fa fa-filter"></i>
                             <input id="category" v-model="category" type="text" required>
                            <label for="category">Category</label>
                        </li>
                        <li>
                            <i class="fa fa-dollar"></i>
                            <input id="priceMin" v-model="price_min" type="number" required>
                            <label for="priceMin">Minimum Price</label>
                            
                        </li>
                        <li>
                            <i class="fa fa-dollar"></i>
                            <input id="priceMax" v-model="price_max" type="number" required>
                            <label for="priceMax">Maximum Price</label>
                        </li>

                        <li>
                            <i class="fa fa-expand"></i>
                            <input id="size" v-model="size" type="text" required>
                            <label for="size">Size</label>
                        </li>
                        <li>
                            <i class="fa fa-ellipsis-v"></i>
                            <input id="amount" v-model="amount" type="number" required>
                            <label for="amount">Amount of items</label>
                        </li>
                        <li>
                            <i class="fa fa-dollar"></i>
                            <input id="cost" v-model="cost" type="number" required>
                            <label for="cost">Cost of items</label>
                        </li>
                        <li>
                                <i class="fa fa-tags"></i>
                                <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                        </li>
                        <li>
                            <input type="checkbox" id="checkbox" v-model="attach">
                            <label for="checkbox">Attach to current cart?</label>
                        </li>
                    </ul>
                    <button class="btn btn-success right" @click="submitProduct">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import ImageUploader from './ImageUploader.vue'
import Multiselect from 'vue-multiselect'
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
            size:'',
               value: [ ],
                options: [
                    
                ],
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
        Multiselect
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
        addTag (newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        },
        submitProduct() {
            let product = _.clone(this.$data);
            console.log("1 save prod >> ", this.$data)
            console.log("2 Save product > ", product);
            this.saveProduct(product);
        },
        
    },
}
</script>
<style lang="stylus">
@import '../styl/variables.import';
.add-product
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(gray, 0.93)
    z-index 999
    .circle-wrap
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        border-radius 100%
        background #fff
        border 2px solid rgba(blue, 0.2)
        z-index 21
        width 65%
        padding-top 65%
        backface-visibility hidden
        perspective 1px
        .form-wrap
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 100%
            padding 10% 5% 5% 5%
            i
                color #202020
            h4
                text-align center
            .form
                width 90%
                margin 0
                li
                    position relative
                    margin-bottom 20px
                    i.fa
                        position absolute
                        left -25px
                        bottom 25%
                        color lighten(gray, 20)
                        opacity 0.9
                    input:not([type='checkbox'])
                        background transparent
                        padding 15px 10px 5px
                        border 0
                        border-bottom 1px solid lighten(gray, 70)
                        font-size 14px
                        width 100%
                        color lighten(gray, 20)
                        & + label
                            position absolute
                            font-size 14px
                            color lighten(gray, 50)
                            top 0
                            left 5%
                            transform translate3d(0,0,0)
                            transform translateY(16px)
                            transition color 200ms ease, font-size 200ms ease, transform 200ms ease, left 200ms ease
                        &:focus, &:valid
                            & + label
                                left 0
                                transform translateY(-5px)
                                font-size 12px
                                opacity 0.8
            .product-image
                border 1px solid #c1c1c1
                text-align center
            .btn
                margin-right 30%
            

</style>