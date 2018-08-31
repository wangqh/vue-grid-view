<template>
    <div ref="item" class="vue-grid-view">
        <slot></slot>
    </div>
</template>
<style>
    .vue-grid-view {
        position: relative;
        transition: height 200ms ease;
        height: 100%;
    }
</style>
<script>
    import Vue from 'vue';
    var elementResizeDetectorMaker = require("element-resize-detector");

    import { validateView } from './utils';
    import GridItem from './GridItem.vue'

    export default {
        name: "GridView",
        provide() {
            return {
                eventBus: null
            }
        },
        components: {
            GridItem,
        },
        props: {
            colNum: {
                type: Number,
                default: 12
            },
            rowNum: {
                type: Number,
                default: 12
            },
            margin: {
                type: Array,
                default: function () {
                    return [10, 10];
                }
            },
            useCssTransforms: {
                type: Boolean,
                default: true
            },
            view: {
                type: Array,
                required: true,
            },
        },
        data: function () {
            return {
                width: null,
                height: null
            };
        },
        created () {
            var self = this;

            self._provided.eventBus =  new Vue();
            self.eventBus = self._provided.eventBus;

        },
        beforeDestroy: function(){
            //Remove listeners
            window.removeEventListener("resize", this.onWindowResize)
        },
        mounted: function() {
            const self = this
            this.$nextTick(function () {
                validateView(this.view);
                this.$nextTick(function() {
                    if (self.width === null || self.height === null) {
                        self.onWindowResize();
                        window.addEventListener('resize', self.onWindowResize);
                    }

                    self.$nextTick(function () {
                        var erd = elementResizeDetectorMaker({
                            strategy: "scroll" //<- For ultra performance.
                        });
                        erd.listenTo(self.$refs.item, function (element) {
                            self.onWindowResize();
                        });
                    });
                });
            });
        },
        watch: {
            width: function () {
                this.$nextTick(function () {
                    this.eventBus.$emit("updateWidth", this.width);
                });
            },
            height: function () {
                this.$nextTick(function () {
                    this.eventBus.$emit("updateHeight", this.height);
                });
            },
            view: function () {
                this.viewUpdate();
            },
            colNum: function (val) {
                this.eventBus.$emit("setColNum", val);
            },
            rowNum: function (val) {
                this.eventBus.$emit("setRowNum", val);
            }
        },
        methods: {
            viewUpdate() {
                if (this.view !== undefined) {
                    this.eventBus.$emit("updateWidth", this.width);
                    this.eventBus.$emit("updateHeight", this.height);
                }
            },
            onWindowResize: function () {
                if (this.$refs !== null && this.$refs.item !== null && this.$refs.item !== undefined) {
                    // debugger
                    this.width = this.$refs.item.offsetWidth;
                    this.height = this.$refs.item.offsetHeight;
                }
            }
        },
    }
</script>
