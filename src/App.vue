<template>
    <div id="app">
        <h1>Vue Grid View
            <button @click="toggleFullScreen">Toggle Fullscreen</button>
        </h1>
        <div id="content">
            <grid-view
                    :view="viewList"
                    :col-num="parseInt(colNum)"
                    :row-num="parseInt(rowNum)"
                    :use-css-transforms="false"
                    :margin="[10, 10]"
            >
                <grid-item v-for="item in viewList" :key="item.i"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                >
                    <test-element :text="item.i"></test-element>
                </grid-item>
            </grid-view>
        </div>
    </div>
</template>

<script>
    import GridItem from './GridItem.vue';
    import GridView from './GridView.vue';
    import TestElement from './TestElement.vue';

    var testView = [
        {"x":0,"y":0,"w":2,"h":2,"i":"0"},
        {"x":2,"y":0,"w":2,"h":4,"i":"1"},
        {"x":4,"y":0,"w":2,"h":6,"i":"2"},
        {"x":6,"y":0,"w":3,"h":3,"i":"3"},
        {"x":9,"y":0,"w":3,"h":3,"i":"4"},
        {"x":4,"y":6,"w":2,"h":6,"i":"5"},
    ];

    export default {
        name: 'app',
        components: {
            GridView,
            GridItem,
            TestElement,
        },
        data () {
            return {
                viewList: JSON.parse(JSON.stringify(testView)),
                rowNum: 12,
                colNum: 12
            }
        },
        methods: {
            toggleFullScreen () {
                if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                    if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen()
                    } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen()
                    } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen()
                    } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
                    }
                    return true
                } else {
                    if (document.exitFullscreen) {
                    document.exitFullscreen()
                    } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                    } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                    } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen()
                    }
                    return false
                }
            }
        }
    }
</script>

<style>
</style>
