<template>
    <div class="autocomplete">
        <ul>
            <li v-for="location in locations" v-text="location.name" @mousedown.prevent="updateCurrentCartLocation(location.name)"></li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { updateCurrentCartLocation } from '../../../vuex/actions';
    export default{
        props: ['locations'],
        methods: {
            ...mapActions([
              'updateCurrentCartLocation',
            ])
        }
    }
</script>
<style lang="stylus" scoped>
ul li
	margin 0 !important
	padding 20px 10px
	text-align left
	font-size 16px
	cursor pointer
	transition background 200ms ease-out
	background #000
	&:hover
		background #101010
</style>