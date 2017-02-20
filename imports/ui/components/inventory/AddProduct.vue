<template>
    <div class="add-product">
        <div class="steps vh-center">
            <transition name="fade-slide" appear mode="out-in">
                    <div v-if="steps.active===1" class="step step-1" key="1">
                        <h4><label for="image">Picture of the product</label></h4>
                            <image-uploader id="image"  :image="image" class="image-loader" size="biggest" v-model="image"></image-uploader>
                        <div v-if="!!image" class="palette">
                            <h4>Choose color</h4>
                            <a href="#p" v-for="color in colors" @click.prevent="giveColor(color)" :style="'background:rgb('+color+')'"></a>
                            <input class="color-name" v-model="color">
                        </div>
                    </div>
                    <div v-if="steps.active===2" class="step step-2" key="2">
                        <h4><label for="type">Fill in the relevant info</label></h4>
                        <ul class="form-list mt-big">
                            <li>
                                <h5>TYPE</h5>
                                <i class="fa fa-bookmark"></i>
                                <div class="form-control">
                                    <select-wrap v-model="type" :value="type" name="type" :options="productOptions.type" tabindex="1"></select-wrap>
                                </div>
                            </li>
                            <li>
                                <h5>CATEGORY</h5>
                                <i class="fa fa-sort-amount-asc"></i>
                                <div class="form-control">
                                    <select-wrap v-model="category" :value="category" name="category" :options="productOptions.category" tabindex="2"></select-wrap>
                                </div>
                            </li>
                            <li>
                                <h5>BRAND</h5>
                                <i class="fa fa-tag"></i>
                                <div class="form-control">
                                    <select-wrap v-model="brand" :value="brand" name="brand" :options="productOptions.brand" tabindex="3"></select-wrap>
                                </div>
                            </li>
                            <li>
                                <h5>SIZE</h5>
                                <i class="fa fa-expand"></i>
                                <div class="form-control">
                                    <select-wrap v-model="size" :value="size" name="size" :options="productOptions.size"  tabindex="4"></select-wrap>
                                </div>
                            </li>
                            <li>
                                <h5>PRICE</h5>
                                <i class="fa fa-dollar"></i>
                                <div class="form-control">
                                    <div class="input-wrap">
                                        <input v-model="price" type="text" placeholder="MIN - MAX or fixed"  tabindex="5">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <h5>COST</h5>
                                <i class="fa fa-dollar"></i>
                                <div class="form-control">
                                    <div class="input-wrap">
                                        <input v-model="cost" type="text" placeholder="What's the cost to you ?"  tabindex="6">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <h5>AMOUNT</h5>
                                <i class="fa fa-cart-plus"></i>
                                <div class="form-control">
                                    <div class="input-wrap">
                                        <input v-model="amount" type="text" placeholder="How many you got ?"  tabindex="7">
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                        <label class="addtocart"><input v-model="addtocart" type="checkbox"> <span>Add to this cart?</span></label>
                    </div>
            </transition>
            <div class="nav-btns">
                <button v-if="notFirstStep" @click="prevStep" class="nav prev"></button>
                <button v-if="notLastStep || readyForSubmit" @click="submitNextClickHandler" class="nav" :class="[readyForSubmit ? 'submit' : 'next']"></button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import ImageUploader from '../image/ImageUploader.vue'
import SelectWrap from '../form/SelectWrap.vue'
import Multiselect from 'vue-multiselect'
import * as Vibrant from 'node-vibrant'

import { color_data } from '../plugins/color-data-set.js'
import { get_dataset, ColorClassifier } from '../plugins/color-classifier.js'
export default{
    data(){
        return{
            // ui management
            steps: {
                active: 1,
                amount: 2
            },
            addtocart: false,
            id:null,
            name:'',
            description:'',
            // base64 image result
            image:'',
            // Manage color selection
            colors:[],
            color:'',
            classifier:null,
            // Product properties
            price: null,
            amount:null,
            cost:'',
            // from selectors (<select-wrap>)
            type: '',
            category: '',
            brand: '',
            size: '',
        }
    },
    watch: {
        'image'() {
            console.log("this happends once");
            this.colors = [];
            Vibrant.from(this.image).getPalette((err, palette) => {
                console.log("this happends 3 times")
                for (color in palette) {
                    if (this.colors.length<5 && !!palette[color].rgb)
                    this.colors.push(palette[color].rgb.join(','))
                }
            })
        }
    },
    created() {
        // this.initProductOptions();
    },
    mounted() {
        var ref = this;
        this.bindKeys();
        this.setColorClassifier();
       console.log("ITEM > ", this.popup.data);
       if (!!this.popup.data) {
           _.merge(this.$data, this.itemParse(this.popup.data));
       }

    },
    components: {
        ImageUploader,
        Multiselect,
        SelectWrap
    },
    methods: {
        itemParse(item) {
            item.price = item.priceMin + ((!!item.priceMax) ? " - " + item.priceMax : '');
            item.id = item._id;

            delete item.priceMin
            if (item.priceMax) {
                delete item.priceMax
            }

            return item;
        },
        giveColor(rgb) {
            this.color = this.classifier.classify(rgb);
        },
        setColorClassifier() {
            // let ref = this;
            this.classifier = new ColorClassifier();
            get_dataset(color_data, (data) => {
                this.classifier.learn(data);
            })
        },
        bindKeys() {
            // $(document).on('keyup', e =>{
            //     switch (e.keyCode) {
            //         case 13:
            //             if (this.notLastStep || this.readyForSubmit)
            //             this.submitNextClickHandler()
            //             break;
            //         case 39:
            //             if (this.notLastStep)
            //             this.nextStep();
            //             break;
            //         case 37:
            //             if (this.notFirstStep)
            //             this.prevStep();
            //         default:
            //             break;
            //     }
            // })
        },
        ...mapActions([
            'toggleAddProduct',
            'saveProduct'
        ]),
        parsePrice() {
            let price = this.price;
            console.log("PARSE PRICE >> ", price);
            if (/-/g.test(price)) {
                let price_split = price.split('-');
                l("price split",price_split)
                return [parseInt(price_split[0]),parseInt(price_split[1])]
            }
            else {
                return [parseInt(price), null];
            }
        },
        submitProduct() {
            console.log(
                'submit product'
            );
            let price = this.parsePrice();
            console.log('submit price >> ', price);
                product =  {
                    _id: !!this.id ? this.id : null,
                    image: this.image,   
                    type: !!this.type ? this.type : null,
                    brand: !!this.brand ? this.brand : null,
                    category: !!this.category ? this.category : null,
                    size: !!this.size ? this.size : null,
                    priceMin: price[0],
                    priceMax: price[1],
                    amount: parseInt(this.amount),
                    color: this.color,                 
                    cost: !!this.cost ? parseInt(this.cost) : null,
                    addtocart: this.addtocart,
                }
            console.log("2 Save product > ", _.pickBy(product));
            // this.attachProductToCart()
            this.saveProduct(_.pickBy(product));
        },
        nextStep() {
            this.steps.active++;
        },
        prevStep() {
            this.steps.active--;
        },
        submitNextClickHandler() {
            this.readyForSubmit ? this.submitProduct() : this.nextStep()
        }
        
    },
    computed: {
        ...mapState([
            'productOptions',
            'popup'
        ]),
        notFirstStep() {
            return this.steps.active > 1
        },
        notLastStep() {
            return this.steps.active < this.steps.amount
        },
        readyForSubmit() {
            // TODO:: Replace 'true' with validation of form.
            return !this.notLastStep && true;
        }
    }
}
</script>
<style lang="stylus">
@import '../../styl/variables.import';
@import '../../styl/settings';
 .add-product
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    padding 14%
    .image-loader
        .product-image
            display inline-block
        margin 0 auto
        text-align center
    h4
        text-align center
    .product-image
        border 1px solid #c1c1c1
        text-align center
    .btn
        margin-right 30%
    .steps
        height 100%
        .nav-btns
            position absolute
            bottom -15%
            left 50%
            transform translateX(-50%)
            word-spacing 20px
            .nav
                cursor pointer
                border 1px solid lighten(gray, 30)
                color darken(darkgray, 20)
                border-radius 50%
                width 60px
                height 60px
                transition border-color 400ms ease, transform 400ms ease
                &:after
                    content ''
                    display inline-block
                    border-top 1px solid darken(darkgray, 20)
                    border-left 1px solid darken(darkgray, 20)
                    width 20px
                    height 20px
                    transform-origin 50%
                    transition border-color 400ms ease, transform 400ms ease, height 400ms ease
                &.next:after
                    transform translateX(-25%) rotate(135deg)                        
                &.prev:after
                    transform translateX(25%) rotate(-45deg)
                &:hover
                    border-color darken(blue, 70)
                    &:after
                        border-color darken(blue, 70)
                &.submit
                    border-color #86d040
                    transform scale(1.3)
                    &:after
                        height 30px
                        transform translate(-4%, -20%) rotate(220deg)
                        border-color #86d040
                        color green
                    &:hover
                        border-color darken(#86d040, 20)
                        &:after
                            border-color darken(#86d040, 20)
        .step
            width 100%
            transform translate(-50%, -50%)
            h4
                font-size  34px
                font-weight 300
                color lighten(gray, 20)
                margin 20% 0 5%
                &:first-child
                    margin-top 0
            input, textarea
                &:first-letter
                    text-transform capitalize
            textarea
                margin-top 5%
                height 15vh
                text-align left
                border-radius 4px
                border 1px solid lighten(gray,60)
                padding 2%
                margin-bottom 2%
                -webkit-resizer 0
            .image-loader
                margin-top 10%
                .thumb-big
                    height auto
                    width 50%
                    padding-top 50%
    .icon-grid
        padding 10%
        i
            cursor pointer
            font-size 40px
            color lighten(gray, 15)
            &:hover
                color darken(red, 10)
       

.form-list
    & > li
        height 60px
        h5
            display inline-block
            vertical-align middle
            margin 0
            text-align right
            padding-right 2%
            width 20%
            font-weight bold
            font-size 16px
        .fa
            width 20px
            text-align right
            padding-right 10px
        .form-control
            @extend $inline-mid
            display inline-block
            vertical-align middle
            border-left 1px solid gray
            padding-left 5%
            width 75%
            height 100%
            position relative
            .input-wrap
                @extend $clearfix
                border-bottom 1px solid lighten(gray, 70)
                width 100%
                display inline-block
                input
                    font-size 16px
                    width 90%
                    padding 0 4% 1%
            i.fa
                display inline-block
                float left
            .multiselect__tags, input
                border none
                border-radius 0
                overflow hidden
                display block
                &.multiselect__tags
                    border-bottom 1px solid lighten(gray, 70)
            .multiselect__input
                border none
                height auto
                font-size 16px
                /*text-transform capitalize*/
.addtocart
    display block
    margin 10% auto 0
    font-size 22px   
    text-align center
    &:before
        display inline-block
        vertical-align middle
        height 100%
        content ''
    & > *
        display inline-block
        vertical-align middle
        margin 0 3px
.palette
    padding-top 30px
    text-align center
    h4
        padding-bottom 20px
    a
        display inline-block
        width 40px
        height 40px
        border 1px solid gray
        border-radius 50%
        margin 0 10px
    .color-name
        display block
        width 50%
        margin 30px auto
        border 0
        border-bottom 1px solid gray
        padding 5px
        text-align center
        font-size 20px
</style>