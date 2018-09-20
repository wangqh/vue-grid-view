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
            if (this.erd) {
                this.erd.removeListener(this.$refs.item, this.handleElementResize)
            }
        },
        mounted: function() {
            const self = this
            this.$nextTick(function () {
                validateView(self.view);
                self.$nextTick(function() {
                    const erd = this.erd = elementResizeDetectorMaker({
                        strategy: "scroll" //<- For ultra performance.
                    });
                    erd.listenTo(self.$refs.item, self.handleElementResize);
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
            handleElementResize (element) {
                if (element) {
                    this.width = element.clientWidth
                    this.height = element.clientHeight
                }
            }
        },
    }
</script>
