<template>
    <div>
        <h4>Inventory:</h4>
        <add-item></add-item>
        <div class="add-product col-4">
            <image-uploader></image-uploader>
        </div>
    </div>
</template>
<style lang="stylus">
.product-image
    width 100px
    height 100px
    border 1px solid #c1c1c1
    text-align center
</style>
<script>
import { mapGetters } from 'vuex';

import ImageUploader from './ImageUploader.vue'
import AddItem from './AddItem.vue'
export default{
    props: ["location"],
    data(){
        return{
            image: null,
             options: {
              url: '/upload',
            }

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
        addItem
    },

    computed: {
        ...mapGetters({
            inventory: 'activeInventory'
        })
    }
}
</script>
