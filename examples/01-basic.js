var testLayout = [
    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
    {"x":4,"y":0,"w":2,"h":6,"i":"2"},
    {"x":6,"y":0,"w":3,"h":3,"i":"3"},
    {"x":9,"y":0,"w":3,"h":3,"i":"4"},
    {"x":4,"y":6,"w":2,"h":6,"i":"5"},
];

Vue.config.debug = true;
Vue.config.devtools = true;

var GridView = VueGridView.GridView;
var GridItem = VueGridView.GridItem;

new Vue({
    el: '#app',
    components: {
		"GridView": GridView,
		"GridItem": GridItem
    },
    data () {
        return {
            layout: testLayout
        }
    },
});



