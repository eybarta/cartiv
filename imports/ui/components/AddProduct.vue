<template>
    <div class="add-product">
        <i @click.prevent="toggleAddProduct" class="fa fa-close btn r-corner"></i>
        <div class="circle-wrap">
            <div class="form-wrap">
                <!--<h4>ADD PRODUCT</h4>-->
                <!--<image-uploader  class="image-loader" v-model="image"></image-uploader>-->
                <div class="steps vh-center">
                    <transition name="fade-slide" appear mode="out-in">
                        <div v-if="steps.active===1" class="step step-1" key="1">
                            <h4><label for="type">What type of product?</label></h4>
                            <input v-model="type" type="text" placeholder="Shirt, Pants, Smartphone, Dead sea, etc..">

                            <div class="icon-grid parent-4">
                                <i class="lnr lnr-shirt"></i>
                                <i class="lnr lnr-camera-video"></i>
                                <i class="lnr lnr-camera"></i>
                                <i class="lnr lnr-smartphone"></i>
                                <i class="lnr lnr-laptop"></i>
                                <i class="lnr lnr-paw"></i>
                                <i class="lnr lnr-diamond"></i>
                                <i class="lnr lnr-coffee-cup"></i>
                                <i class="lnr lnr-music-note"></i>
                                <i class="lnr lnr-picture"></i>
                                <i class="lnr lnr-graduation-hat"></i>
                            </div>
                        </div>
                        <div v-if="steps.active===2" class="step step-2" key="2">
                            <h4><label for="name">Does it have a name?</label></h4>
                            <input v-model="name" type="text" placeholder="Type the product name..">

                            <h4><label for="pricerange">Give me the price range</label></h4>
                            <input v-model="pricerange" type="text" placeholder="$min - max">
                        </div>
                        <div v-if="steps.active===3" class="step step-3" key="3">
                            <h4><label for="amount">How many you got?</label></h4>
                            <input v-model="amount" type="text" placeholder="Amount of items...">
                            <h4><label for="description">Please describe your product</label></h4>
                            <textarea v-model="description" name="" id="description"></textarea>
                            <h5><strong>Please use this format:</strong> size: large, color: green, brand: tommy hillfiger, etc...</h5>
                        </div>
                         <div v-if="steps.active===4" class="step step-4" key="4">
                            <h4><label for="image">Upload a picture of the product</label></h4>
                            <image-uploader id="image" class="image-loader" size="biggest" v-model="image"></image-uploader>
                        </div>
                    </transition>
                    <div class="nav-btns">
                        <button v-if="notFirstStep" @click="prevStep" class="nav prev"></button>
                        <button v-if="notLastStep || readyForSubmit" @click="submitNextClickHandler" class="nav" :class="[readyForSubmit ? 'submit' : 'next']"></button>
                    </div>
                </div>
            <!--    <div class="col-8">
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
                -->
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
            steps: {
                active: 1,
                amount: 4
            },
            type: '',
            name:'',
            description:'',
            image:'',
            pricerange: '',
            amount:'',
        }
    },
    created() {
        // this.$set(this, 'location_id', this.$route.params.cartId);
        // this.$set(this, '_userId', Accounts.userId());
        // console.log('created from inventory >> ');
    },
    mounted() {
        this.bindKeys();
    },
    components: {
        ImageUploader,
        Multiselect
    },
    methods: {
        bindKeys() {
            $(document).on('keyup', e =>{
                switch (e.keyCode) {
                    case 13:
                        if (this.notLastStep || this.readyForSubmit)
                        this.submitNextClickHandler()
                        break;
                    case 39:
                        if (this.notLastStep)
                        this.nextStep();
                        break;
                    case 37:
                        if (this.notFirstStep)
                        this.prevStep();
                    default:
                        break;
                }
            })
        },
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
            // console.log("1 save prod >> ", this.$data)
            console.log("2 Save product > ", product);
            this.saveProduct(product);
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
@import '../styl/variables.import';
@import '../styl/options.import';
.add-product
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(gray, 0.93)
    z-index 999
    .fa-close
        top 80px
        right 80px
        font-size 50px
        z-index 9999
        cursor pointer
    .circle-wrap
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        border-radius 100%
        background #fff
        border 2px solid rgba(blue, 0.2)
        z-index 21
        width 95vmin
        height 95vmin
        min-height 500px
        min-width 500mx
        backface-visibility hidden
        perspective 1px
        overflow hidden
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
                    margin 20% 0 0
                    &:first-child
                        margin-top 0
                h5
                    text-align center
                input, textarea
                    margin-top 10%
                    width 100%
                    border 0
                    border-bottom 1px solid lighten(gray, 60)
                    height 40px
                    font-size 24px
                    color lighten(gray,15)
                    text-align center
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
        .form-wrap
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