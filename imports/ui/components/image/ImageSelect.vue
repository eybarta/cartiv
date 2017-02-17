<template>
    <transition-group class="autocomplete" name="flip-list" tag="div" >
        <item-image v-for="image in imageShuffle" :key="image" class="image-item" :src="image" callback="updateCurrentCartThumb" appear></item-image>

    </transition-group>

</template>

<script>
import itemImage from "../item/ItemImage.vue";
export default{
    props: ['images'],
    created() {
        console.log("IMAGES >", this.images);
    },
    components:{
        itemImage
    },
    computed: {
        imageShuffle() {
            return _.shuffle(this.images);
        }
    }
}
</script>
<style lang="stylus">
.flip-list-move
    transition transform 1s

.autocomplete > div
    display inline-block
    margin 10px
    text-align center

.list-enter-active, .list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
}
</style>