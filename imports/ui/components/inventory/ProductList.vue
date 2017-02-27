<template>
    <div>
        <div class="top-bar clearfix">
            <h4>PRODUCT LIST</h4>
            <div class="btn-group">
                <button class="btn btn-success" @click.prevent="callPopup({ type:'addProduct'})">
                    Add New Product
                </button>
                <button v-if="activeCart" class="btn btn-warning" 
                    @click.prevent="callPopup({ title:'Select product', ui:'square', type:'DataTable', data:'parsedInventory' })">
                    Fetch from Inventory</button>
            </div>
        </div>
        <div v-if="!!parsedInventory.length">
            <div class="view-toggle">
                <button :class="['rnd', view=='list'?'disabled':'']" v-if="view=='table'" @click="view='list'"><i class="fa fa-list"></i></button>
                <button :class="['rnd', view=='table'?'disabled':'']" v-else-if="view=='list'" @click="view='table'"><i class="fa fa-table"></i></button>
            </div>
            <div class="filter-wrap">
                <label for="filterSelect">Choose Filter:</label>
            <multiselect id="filterSelect" v-model="filters" :options="parsedFilterKeys" :multiple="true" group-values="values" group-label="key" placeholder="Type to search" track-by="name" label="name"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></multiselect>
            </div>
            <div class="clear">
                <list-view :items="filteredInventory" type="product" v-if="view=='list'"></list-view>
                <data-table :popdata="filteredInventory" type="table" :item-callback="clickCall" v-else-if="view=='table'"></data-table>
            </div>
        </div>
        <h4 v-else>You have no products here.. consider adding one <span class="red">&#9786;</span></h4>
        
        <transition name="fade">
            <popup v-if="popup.active">
                <h4 v-if="!!popup.title" v-text="popup.title"></h4>
                <component v-if="!!popup.type" :is="popup.type" :popdata="popup.data"></component>
                <!--<add-product v-if="popup.type=='add-product'"></add-product>
                <view-product v-else-if="popup.type=='view-product'"></view-product>-->
            </popup>
            
		</transition>
        <modal v-if="modal.active">
                <div class="modal-content">
                    <label for="">
                        <div v-if="!!quantifyAvailability">
                        <h6>How many items to take?</h6>
                        <input v-model="transferAmount" placeholder="Type in amount" type="number">
                        <span class="pt-min">({{ quantifyAvailability }} {{ quantifyAvailability>1 ? 'are' : 'is'}} available)</span>
                        </div>
                        <h4 class="red" v-else>Product is out of stock</h4>
                        <div v-if="!!modal.content.atLocations" class="locations pt-big">
                            <h6 class="orange">Stocked at locations:</h6>
                            <ul>
                                <li v-for="location in modal.content.atLocations">
                                    <span>{{ getLocationNameById(location.locationId) }}</span> <strong class="ml-small circled">{{ location.amount }}</strong>
                                </li>
                            </ul>
                        </div>
                        
                    </label>
                    <div v-if="!!quantifyAvailability" class="btn-group txt-right mt-med mb-min">
                        <button class="btn" @click="transferAmount=null; closeModal()">Cancel</button>
                        <button class="btn btn-success" @click="saveProductToLocation({ cartId:route.params.cartId, productId: modal.content._id, amount: transferAmount }); transferAmount=null">Submit</button>
                    </div>
                    <button v-else class="btn right mt-med mb-med" @click="closeModal">OK</button>
                </div>
            </modal>
        
    </div>
</template>
<style lang="stylus" scoped>
@import '../../styl/settings'
.item-list
    padding-top 30px
    clear both
.view-toggle
    margin 10px 0
    float right
.filter-wrap
    width 80%
    padding 10px 2% 10px 2%
    & > *
        display inline-block
        vertical-align middle
        &.multiselect
            width 80%
.top-bar
    border-bottom 1px solid lighten(#202020, 20)
    padding-bottom 10px
    margin-bottom 20px
    position relative
    h4       
        margin 0
        self-center(vertical)
    .btn-group
            float right

</style>
<script>
    import { mapActions, mapState,mapGetters } from 'vuex';
    import Popup from  '../../layouts/Popup.vue';
    import Modal from '../../layouts/Modal.vue';
    import AddProduct from './AddProduct.vue';
    import ViewProduct from './ViewProduct.vue';
    import Multiselect from 'vue-multiselect'
    import DataTable from '../DataTable.vue';
    import ListView from '../views/ListView.vue'
    import ItemImage from '../item/ItemImage.vue'
    import Velocity from 'velocity-animate';
    export default {
        props: ['location'],
        data() {
            return {
                view: 'list',
                filters: [],
       			transferAmount:null,
            }
        },
        created() {
            console.log('yo from inventory >> ', this.inventory);
            
        },
        components: {
            Popup,
            Modal,
            AddProduct,
            ViewProduct,
            DataTable,
            ItemImage,
            Multiselect,
            ListView
        },
        methods: {
            ...mapActions([
                'callPopup',
                'closePopup',
                'callModal',
                'closeModal',
                'saveProductToLocation'
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
            },
            getLocationNameById(id) {
                let cart = _.find(this.carts, {_id:id});
                return cart.location
            },
            
        },
        computed: {
            ...mapState([
                'popup',
                'inventory',
                'modal',
                'route',
                'carts'
            ]),
            ...mapGetters([
                'activeInventory',
                'parsedInventory',
                'activeCart'
            ]),
            quantifyAvailability() {
                let product = this.modal.content;
                let sumAtLocations = 0;
                if (_.has(product, 'atLocations') && !!product.atLocations) {
                    sumAtLocations = _.sumBy(product.atLocations, 'amount')
                }
                return product.amount - sumAtLocations;
            },
            filteredInventory() {
                let filters = this.filters;
                let inventory = this.parsedInventory;
                let formattedFilters = _.transform(_.groupBy(filters, 'key'), function(res,val,key) {
                    return res[key] = _.map(val, 'name')
                }, {});
                if (!!this.filters.length) {
                    return _.filter(inventory, obj => {
                        let arr = _.map(formattedFilters, (val,key) => {
                            return val.indexOf(obj[key])>-1
                        })  
                        return _.every(arr)
                    })
                }
                return inventory;
            },
            parsedFilterKeys() {
                let list = this.parsedInventory;
                let filters = [];
                if (!!list.length) {
                    let obj = list[0]
                    let filterby = Object.keys(obj).filter((key) => ( typeof obj[key]== 'string' && key!='image' && key!='_id'))
                    filters = _.map(filterby, key => {
                        return {
                            key,
                            values: _.uniqBy(_.map(list, obj => { return { key: key, name:obj[key]}}), 'name')
                        }
                    })
                }
                return filters
            },
            clickCall() {
                return { call: 'callPopup', type: 'ViewProduct', data: 'item'}
            }
        }
    }
</script>