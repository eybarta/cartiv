<template>
    <transition name="slide-fade" appear>

        <div class="item-settings uncenter" :class="[open ? 'open' : '']">
            <i ref="toggler" class="fa fa-cog settings txt-small" @click="open=!open"></i>
            <transition name="slide-fade">
                <div class="item-actions" v-show="open">
                    <i class="fa fa-trash remove txt-small"></i>
                    <i class="fa fa-pencil edit txt-small"></i>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
export default{
    props: {
        actions: {
            type:[ String, Array]
        }
    },
    data(){
        return{
            open:false,
        }
    },
    mounted() {
        this.$nextTick(() => {
            var ref = this;
            setTimeout(() => {
                let size = ref.$el.offsetWidth;
                let togSize = ref.$refs.toggler.offsetWidth;
                console.log(ref.$refs.toggler);
                console.log("size > ", size, " :: " , togSize);
                let pad = Math.round(size/2.1 - togSize/2.1);
                $(ref.$el).css({
                    height: size + "px",
                    borderRadius: size + "px",
                    'padding-right': pad + "px"
                })
            }, 500)

        })

    }
}
</script>
<style lang="stylus">
@import '../styl/variables.import'
.mid
    display inline-block
    vertical-align middle

.slide-fade-enter-active
    transition all .8s ease

.slide-fade-leave-active
    transition all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-active
    transform translateX(10px)
    opacity 0
    width 0
.item-settings
    display none
    direction rtl
    text-align right
    width 35%
    border-radius 35px
    border 2px solid orange
    background #202020
    position absolute
    top 100%
    left 100%
    transform translate(-100%,-100%)
    white-space nowrap
    transition width 400ms ease
    backface-visibility hidden
    .settings
        @extend .mid
        transition transform 400ms ease
        transform rotate(-70deg)
    &:before
        content ''
        height 100%
        @extend .mid
    &.open
        width 100%
        padding 0 8%
        text-align right
        .settings
            border-left 1px solid darken(orange, 10)
            padding-left 7px
            transform rotate(0deg)
        .item-actions
            & > *
                margin-right 3%
                &:first-child
                    margin-right 0
    div
        @extend .mid
        text-align right
        padding-right 3%
    .settings
        color #6adacf


</style>