<template>
    <div v-show="!!defaultView || !!loaded" :class="[thumbnailClass, preloaderClass]" @click="actionCallback">
        <i v-if="!src || (!!defaultView && !loaded)" :class="defaultView"></i>
        <item-settings v-if="!!actions.length" :actions="actions"></item-settings>
    </div>
</template>


<!--EXAMPLE COMPONENT

<item-image src="url" loader[bool] default-view="fa fa-building-o || false" size="[big, med, small, tiny]" callback="callbackFunc"></item-image>
-->
<script>
import { mapActions } from 'vuex';
import { updateCurrentCartThumb } from '../../vuex/actions';

import itemSettings from './itemSettings.vue';
export default{
    props: {
        src: {
            type: String
            },
        actions: {
            type: [String, Array],
            default: ''
        },
        loader: {
            type: Boolean,
            default: true
        },
        defaultView: {
            type: [String, Boolean],
            default: false
        },
        withBorder: {
            type: [String, Boolean],
            default:true // [true, false, "Only with Image"]
        },
        size: {
            type: String,
            default: 'med'
        },
        callback: {
            type: [Function, String],
            required: false
        }
    },
    data() {
        return {
            loaded: false,
        }
    },
    mounted() {
        if (!this.src) return;
        let ref = this;
        setTimeout(()=> {
            let src = ref.src;
            $('<img/>').attr('src', src).error(function(e) {
                console.log("error loading img > ", e);
                $(this).remove();
                ref.loaded = false;
            }).load(function() {
                $(this).remove();
                ref.loaded = true;
                ref.$el.style = `background-image:url(${src}); background-size:108% 108%;`
            });
        },200)
    },
    components: {
        itemSettings
    },
    methods: {
        ... mapActions([
            'updateCurrentCartThumb'
        ]),
        actionCallback() {
            let action = this.callback;
            if (!!action) {
                let image = this.src;
                this[this.callback](image);
            }
        }
    },
    computed: {
        thumbnailClass() {
            let size = this.size;
            return `thumbnail thumb-${size}`;
        },
        preloaderClass() {
            return this.loader ? 'loading' : '';
        }

    }
}
</script>
<style lang="stylus" scoped>
i
    color #fff8dc
</style>