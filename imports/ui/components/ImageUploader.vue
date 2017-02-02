<template>
    <div>
        <div class="product-image thumb-big" @click="$refs.uploader.click()">
            <i class="fa fa-upload gray-lt txt-big" v-if="!imagesrc"></i>
            <img  v-if="!!imagesrc || !!finalimagesrc" ref="imagepreview" :src="finalimagesrc" alt="Item Image">
            <input ref="uploader" type="file" @change="uploadHandler($event)" hidden>
            <!--<div class="preview" v-if="!!image">-->
                <!--<img ref="preview" :src="image">-->

            <!--</div>-->
            <!--<i class="fa fa-image txt-big" v-else></i>-->
            <!--<canvas ref="canvas" width="500" height="400"></canvas>-->
        </div>
        <div class="component" v-show="!!imagesrc && !finalimagesrc">
            <div class="overlay">
                <div class="overlay-inner"></div>
            </div>
            <!-- This image must be on the same domain as the demo or it will not work on a local file system -->
            <!-- http://en.wikipedia.org/wiki/Cross-origin_resource_sharing -->
            <div ref="container" class="resize-container" @mousedown.prevent.stop="startMoving" @touchstart.prevent.stop="startMoving">
                 <span class="resize-handle resize-handle-nw" @mousedown.prevent.stop="startResize($event)" @touchstart.prevent.stop="startResize($event)"></span>
                 <span class="resize-handle resize-handle-ne" @mousedown.prevent.stop="startResize($event)" @touchstart.prevent.stop="startResize($event)"></span>
                <img  ref="image" class="resize-image" :src="imagesrc" alt="image for resizing">
                <span class="resize-handle resize-handle-se" @mousedown.prevent.stop="startResize($event)" @touchstart.prevent.stop="startResize($event)"></span>
                <span class="resize-handle resize-handle-sw" @mousedown.prevent.stop="startResize($event)" @touchstart.prevent.stop="startResize($event)"></span>
            </div>

            <button class="btn-crop js-crop" @click="crop">Crop <i class="fa fa-crop"></i></button>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['image'],
        data(){
            return{
                orig_src: null,
                event_state:{},
                constrain: true,
                min_width: 200, // Change as required
                min_height: 200,
                max_width: 500, // Change as required
                max_height: 400,
                resize_canvas:null,
                imagesrc: '',
                finalimagesrc: null,
            }
        },
        components:{
        },

        mounted() {
            console.log('my image elemetn > ', this.$refs.image);
           if (!!this.image) this.finalimagesrc = this.image;
        },
        methods: {
            uploadHandler(e) {
                this.finalimagesrc = null;
                let ref = this;
                let files = this.$refs.uploader.files;
                let reader = new FileReader();
                if (!!files.length) {
                    reader.onload = function (e) {
                        ref.imagesrc = e.target.result;
                    }
                    reader.readAsDataURL(files[0]);
                }
                $(this.$refs.image).one('load', function(e) {
                    console.log('image has loaded', e);
                    ref.initCropper();
                });
            },
            initCropper() {
                let image_target = this.$refs.image;
                 // When resizing, we will always use this copy of the original as the base
                 this.orig_src = new Image();
                this.orig_src.src=image_target.src;
                this.resize_canvas = document.createElement('canvas');
                this.initialResize();
                // Add events
            },
             startResize (e){
                this.saveEventState(e);
                $(document).on('mousemove touchmove', this.resizing);
                $(document).on('mouseup touchend', this.endResize);
              },
               endResize(e){
                $(document).off('mouseup touchend', this.endResize);
                $(document).off('mousemove touchmove', this.resizing);
              },
              initialResize() {
                    this.event_state.container_width = $(this.$refs.container).width();
                    this.event_state.container_height = $(this.$refs.container).height();
                    this.event_state.container_left = $(this.$refs.container).offset().left;
                    this.event_state.container_top = $(this.$refs.container).offset().top;


                    this.max_width = $(window).width()/2;
                    console.log("orig width > ", this.orig_src.width);
                    let width = this.max_width/1.5,
                    height = width / this.orig_src.width * this.orig_src.height;
                    
                    this.resize_canvas.width = width;
                    this.resize_canvas.height = height;
                    this.resize_canvas.getContext('2d').drawImage(this.orig_src, 0, 0, width, height);
                    this.$refs.image.setAttribute('src', this.resize_canvas.toDataURL("image/png"));
                    $(this.$refs.container).css({ top:'50%', left:'50%'})
              },
  saveEventState(e){
    // Save the initial event details and container state
    this.event_state.container_width = $(this.$refs.container).width();
    this.event_state.container_height = $(this.$refs.container).height();
    this.event_state.container_left = $(this.$refs.container).offset().left;
    this.event_state.container_top = $(this.$refs.container).offset().top;
    this.event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
    this.event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

	// This is a fix for mobile safari
	// For some reason it does not allow a direct copy of the touches property
	if(e.originalEvent && typeof e.originalEvent.touches !== 'undefined'){
		this.event_state.touches = [];
		$.each(e.originalEvent.touches, function(i, ob){
		  this.event_state.touches[i] = {};
		  this.event_state.touches[i].clientX = 0+ob.clientX;
		  this.event_state.touches[i].clientY = 0+ob.clientY;
		});
	}
    this.event_state.evnt = e;
  },

  resizing(e){
    let mouse={},width,height,left,top,offset=$(this.$refs.container).offset();
    mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
    mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

    // Position image differently depending on the corner dragged and this.constraints
    if( $(this.event_state.evnt.target).hasClass('resize-handle-se') ){
      width = mouse.x - this.event_state.container_left;
      height = mouse.y  - this.event_state.container_top;
      left = this.event_state.container_left;
      top = this.event_state.container_top;
    } else if($(this.event_state.evnt.target).hasClass('resize-handle-sw') ){
      width = this.event_state.container_width - (mouse.x - this.event_state.container_left);
      height = mouse.y  - this.event_state.container_top;
      left = mouse.x;
      top = this.event_state.container_top;
    } else if($(this.event_state.evnt.target).hasClass('resize-handle-nw') ){
      width = this.event_state.container_width - (mouse.x - this.event_state.container_left);
      height = this.event_state.container_height - (mouse.y - this.event_state.container_top);
      left = mouse.x;
      top = mouse.y;
      if(this.constrain || e.shiftKey){
        top = mouse.y - ((width / this.orig_src.width * this.orig_src.height) - height);
      }
    } else if($(this.event_state.evnt.target).hasClass('resize-handle-ne') ){
      width = mouse.x - this.event_state.container_left;
      height = this.event_state.container_height - (mouse.y - this.event_state.container_top);
      left = this.event_state.container_left;
      top = mouse.y;
      if(this.constrain || e.shiftKey){
        top = mouse.y - ((width / this.orig_src.width * this.orig_src.height) - height);
      }
    }

    // Optionally maintain aspect ratio
    if(this.constrain || e.shiftKey){
      height = width / this.orig_src.width * this.orig_src.height;
    }

    if(width > this.min_width && height > this.min_height && width < this.max_width && height < this.max_height){
      // To improve performance you might limit how often resizeImage() is called
      this.resizeImage(width, height);
      // Without this Firefox will not re-calculate the the image dimensions until drag end
      $(this.$refs.container).offset({'left': left, 'top': top});
    }
  },

  resizeImage(width, height){
    this.resize_canvas.width = width;
    this.resize_canvas.height = height;
    this.resize_canvas.getContext('2d').drawImage(this.orig_src, 0, 0, width, height);
    this.$refs.image.setAttribute('src', this.resize_canvas.toDataURL("image/png"));
  },

  startMoving(e){
    e.preventDefault();
    e.stopPropagation();
    this.saveEventState(e);
    $(document).on('mousemove touchmove', this.moving);
    $(document).on('mouseup touchend', this.endMoving);
  },
  endMoving(e){
    e.preventDefault();
    $(document).off('mouseup touchend', this.endMoving);
    $(document).off('mousemove touchmove', this.moving);
  },
  moving(e){
    var  mouse={}, touches;
    e.preventDefault();
    e.stopPropagation();

    touches = e.originalEvent.touches;

    mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
    mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
    $(this.$refs.container).offset({
      'left': mouse.x - ( this.event_state.mouse_x - this.event_state.container_left ),
      'top': mouse.y - ( this.event_state.mouse_y - this.event_state.container_top )
    });
    // Watch for pinch zoom gesture while moving
    if(this.event_state.touches && this.event_state.touches.length > 1 && touches.length > 1){
      var width = this.event_state.container_width, height = this.event_state.container_height;
      var a = this.event_state.touches[0].clientX - this.event_state.touches[1].clientX;
      a = a * a;
      var b = this.event_state.touches[0].clientY - this.event_state.touches[1].clientY;
      b = b * b;
      var dist1 = Math.sqrt( a + b );

      a = e.originalEvent.touches[0].clientX - touches[1].clientX;
      a = a * a;
      b = e.originalEvent.touches[0].clientY - touches[1].clientY;
      b = b * b;
      var dist2 = Math.sqrt( a + b );

      var ratio = dist2 /dist1;

      width = width * ratio;
      height = height * ratio;
      // To improve performance you might limit how often resizeImage() is called
      this.resizeImage(width, height);
    }
  },
  crop(){
    //Find the part of the image that is inside the crop box
    let image_target = this.$refs.image;
    var crop_canvas,
        left = $('.overlay').offset().left - $(this.$refs.container).offset().left,
        top =  $('.overlay').offset().top - $(this.$refs.container).offset().top,
        width = $('.overlay').width(),
        height = $('.overlay').height();

        crop_canvas = document.createElement('canvas');
        crop_canvas.width = width;
        crop_canvas.height = height;

        crop_canvas.getContext('2d').drawImage(image_target, left, top, width, height, 0, 0, width, height);
        this.finalimagesrc = crop_canvas.toDataURL("image/png");
        this.$emit('input', this.finalimagesrc);
      }
    }
}
</script>
<style lang="stylus">
.product-image
    border-radius 50%
    overflow hidden
    position relative
    i
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
    img
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
.component
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    /*width 100vw
    height 100vh
    top -9vh
    left -25vw*/
    background #202020
    z-index 999999
.resize-container
    position relative
    display inline-block
    cursor move
    margin 0 auto
    transform translate(-50%,-50%)
    img
        display block

.resize-container:hover img,
.resize-container:active img
    outline 2px dashed rgba(222,60,80,.9)

.resize-handle-ne,
.resize-handle-se,
.resize-handle-nw,
.resize-handle-sw
    position absolute
    display block
    width 10px
    height 10px
    background rgba(222,60,80,.9)
    z-index 999

.resize-handle-nw
    top -5px
    left -5px
    cursor nw-resize

.resize-handle-sw
    bottom -5px
    left -5px
    cursor sw-resize

.resize-handle-ne
    top -5px
    right -5px
    cursor ne-resize

.resize-handle-se
    bottom -5px
    right -5px
    cursor se-resize

.overlay
    position absolute
    left 50%
    top 50%
    margin-left -100px
    margin-top -100px
    z-index 999
    width 200px
    height 200px
    border solid 2px rgba(222,60,80,.9)
    box-sizing content-box
    pointer-events none
    &:before
        top 0
        margin-left -2px
        margin-top -40px
    &:after
        bottom 0
        margin-left -2px
        margin-bottom -40px

.overlay:after,
.overlay:before
    content ''
    position absolute
    display block
    width 204px
    height 40px
    border-left dashed 2px rgba(222,60,80,.9)
    border-right dashed 2px rgba(222,60,80,.9)

.overlay-inner:after,
.overlay-inner:before
    content ''
    position absolute
    display block
    width 40px
    height 204px
    border-top dashed 2px rgba(222,60,80,.9)
    border-bottom dashed 2px rgba(222,60,80,.9)

.overlay-inner
    &:before
        left 0
        margin-left -40px
        margin-top -2px
    &:after
        right 0
        margin-right -40px
        margin-top -2px

.btn-crop
    position absolute
    vertical-align bottom
    right 5px
    bottom 5px
    padding 6px 10px
    z-index 999
    background-color rgb(222,60,80)
    border none
    border-radius 5px
    color #FFF
    img
        vertical-align middle
        margin-left 8px
</style>

