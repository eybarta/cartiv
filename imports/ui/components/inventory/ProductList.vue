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
        <div class="view-toggle clearfix">
            <button :class="['rnd', view=='list'?'disabled':'']" v-if="view=='table'" @click="view='list'"><i class="fa fa-list"></i></button>
            <button :class="['rnd', view=='table'?'disabled':'']" v-else-if="view=='list'" @click="view='table'"><i class="fa fa-table"></i></button>
        </div>
            <list-view :items="activeInventory" type="product" v-if="view=='list'"></list-view>
            <data-table :popdata="activeInventory" type="table" :item-callback="clickCall" v-else-if="view=='table'"></data-table>
        <transition name="fade">
            <popup v-if="popup.active">
                <h4 v-if="!!popup.title" v-text="popup.title"></h4>
                <component v-if="!!popup.type" :is="popup.type" :popdata="popup.data"></component>
                <!--<add-product v-if="popup.type=='add-product'"></add-product>
                <view-product v-else-if="popup.type=='view-product'"></view-product>-->
            </popup>
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
		</transition>
        
    </div>
</template>
<style lang="stylus" scoped>
@import '../../styl/settings'
.item-list
    padding-top 30px
    clear both
.top-bar

    border-bottom 1px solid lighten(#202020, 20)
    padding-bottom 10px
    position relative
    h4       
        margin 0
        self-center(vertical)
    .btn-group
            float right
.view-toggle
    margin 10px 0
    button
        float right
</style>
<script>
    import { mapActions, mapState,mapGetters } from 'vuex';
    import Popup from  '../../layouts/Popup.vue';
    import Modal from '../../layouts/Modal.vue';
    import AddProduct from './AddProduct.vue';
    import ViewProduct from './ViewProduct.vue';
    import DataTable from '../DataTable.vue';
    import ListView from '../views/ListView.vue'
    import ItemImage from '../item/ItemImage.vue'
    import Velocity from 'velocity-animate';
    export default {
        props: ['location'],
        data() {
            return {
                view: 'list'
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
                console.log('get cart >> ', cart);
                return cart.location
            },
            
        },
        computed: {
            ...mapState([
                'popup',
                'inventory',
                'modal'
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
            clickCall() {
                return { call: 'callPopup', type: 'ViewProduct', data: 'item'}
            }

        }
    }
</script>