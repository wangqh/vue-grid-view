<template>
    <div ref="item"
         class="vue-grid-item"
         :class="{ 'cssTransforms' : useCssTransforms }"
         :style="style"
    >
        <slot></slot>
    </div>
</template>
<style>
    .vue-grid-item {
        transition: all 200ms ease;
        transition-property: left, top, right;
    }

    .vue-grid-item.cssTransforms {
        transition-property: transform;
        left: 0;
        right: auto;
    }
 
</style>
<script>
    import { setTopLeft, setTransform } from './utils';

    export default {
        name: "GridItem",
        props: {
            minH: {
                type: Number,
                required: false,
                default: 1
            },
            minW: {
                type: Number,
                required: false,
                default: 1
            },
            maxH: {
                type: Number,
                required: false,
                default: Infinity
            },
            maxW: {
                type: Number,
                required: false,
                default: Infinity
            },
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            w: {
                type: Number,
                required: true
            },
            h: {
                type: Number,
                required: true
            },
            i: {
                required: true
            }
        },
        inject: ["eventBus"],
        data: function () {
            return {
                cols: 1,
                rows: 1,
                containerWidth: 100,
                containerHeight: 100,
                margin: [10, 10],
                useCssTransforms: true,

                style: {},

                innerX: this.x,
                innerY: this.y,
                innerW: this.w,
                innerH: this.h
            }
        },
        created () {
            var self = this;

            // Accessible refernces of functions for removing in beforeDestroy
            self.updateWidthHandler = function (width) {
                self.updateWidth(width);
            };

            self.updateHeightHandler = function (width) {
                self.updateHeight(width);
            };

            self.setColNum = (colNum) => {
               self.cols = parseInt(colNum);
            }

            self.setRowNum = (rowNum) => {
               self.rows = parseInt(rowNum);
            }

            this.eventBus.$on('updateWidth', self.updateWidthHandler);
            this.eventBus.$on('updateHeight', self.updateHeightHandler);
            this.eventBus.$on('setColNum', self.setColNum)
            this.eventBus.$on('setRowNum', self.setRowNum)

        },
        beforeDestroy: function(){
            var self = this;
            //Remove listeners
            this.eventBus.$off('updateWidth', self.updateWidthHandler);
            this.eventBus.$off('updateHeight', self.updateHeightHandler);
            this.eventBus.$off('setColNum', self.setColNum);
            this.eventBus.$off('setRowNum', self.setRowNum)

        },
        mounted: function () {
            this.cols = this.$parent.colNum;
            this.rows = this.$parent.rowNum;
            this.containerWidth = this.$parent.width !== null ? this.$parent.width : 100;
            this.containerHeight = this.$parent.height !== null ? this.$parent.height : 100;
            this.margin = this.$parent.margin !== undefined ? this.$parent.margin : [10, 10];
           
            this.useCssTransforms = this.$parent.useCssTransforms;
            this.createStyle();
        },
        watch: {
            cols: function () {
                this.createStyle();
            },
            rows: function () {
                this.createStyle();
            },
            containerWidth: function () {
                this.createStyle();
            },
            containerHeight: function () {
                this.createStyle();
            },
            x: function (newVal) {
                this.innerX = newVal;
                this.createStyle();
            },
            y: function (newVal) {
                this.innerY = newVal;
                this.createStyle();
            },
            h: function (newVal) {
                this.innerH = newVal
                this.createStyle();
            },
            w: function (newVal) {
                this.innerW = newVal;
                this.createStyle();
            }
        },
        computed: {

        },
        methods: {
            createStyle: function () {
                if (this.x + this.w > this.cols) {
                    this.innerX = 0;
                    this.innerW = (this.w > this.cols) ? this.cols : this.w
                } else {
                  this.innerX = this.x;
                  this.innerW = this.w;
                }
                var pos = this.calcPosition(this.innerX, this.innerY, this.innerW, this.innerH);


                let style;
                // CSS Transforms support (default)
                if (this.useCssTransforms) {
                    style = setTransform(pos.top, pos.left, pos.width, pos.height);

                } else { // top,left (slow)
                    style = setTopLeft(pos.top, pos.left, pos.width, pos.height);
                }
                this.style = style;

            },
          
            calcPosition: function (x, y, w, h) {
                const colWidth = this.calcColWidth();
                const rowHeight = this.calcRowHeight();

                var out = {
                    left: Math.round(colWidth * x + (x + 1) * this.margin[0]),
                    top: Math.round(rowHeight * y + (y + 1) * this.margin[1]),
                    // 0 * Infinity === NaN, which causes problems with resize constriants;
                    // Fix this if it occurs.
                    // Note we do it here rather than later because Math.round(Infinity) causes deopt
                    width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
                    height: h === Infinity ? h : Math.round(rowHeight * h + Math.max(0, h - 1) * this.margin[1])
                };


                return out;
            },
            // Helper for generating column width
            calcColWidth() {
                var colWidth = (this.containerWidth - (this.margin[0] * (this.cols + 1))) / this.cols;
               // console.log("### COLS=" + this.cols + " COL WIDTH=" + colWidth + " MARGIN " + this.margin[0]);
                return colWidth;
            },

            // Helper for generating row height
            calcRowHeight() {
                var rowHeight = (this.containerHeight - (this.margin[1] * (this.rows + 1))) / this.rows;
                return rowHeight;
            },

            updateWidth: function (width) {
                this.containerWidth = width;
            },
            updateHeight (height) {
                this.containerHeight = height
            },
            compact: function () {
                this.createStyle();
            }
        },
    }
</script>
