# vue-grid-view
A grid view render, for Vue.js.

## Features

* configurable grid row number & column number
* grid item width is responsive by a ratio of `w : colNum`
* grid item height is responsive by a ratio of `h : rowNum`

## Getting Started

### Installation

Install the vue-grid-view [package](https://www.npmjs.org/package/vue-grid-view) package using [npm](https://www.npmjs.com/):

	npm install vue-grid-view


### Usage

```javascript
  import { GridView, GridItem } from 'vue-grid-view'
```

or include the script in your html (download from [releases](https://github.com/wangqh/vue-grid-view/releases)):
 
```html
    <script src="vue-grid-view.min.js"></script>
```` 

```javascript
  var testView = [
    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
    {"x":4,"y":0,"w":2,"h":6,"i":"2"},
    {"x":6,"y":0,"w":3,"h":3,"i":"3"},
    {"x":9,"y":0,"w":3,"h":3,"i":"4"},
    {"x":4,"y":6,"w":2,"h":6,"i":"5"}
  ];
	
  var GridView = VueGridView.GridView;
  var GridItem = VueGridView.GridItem;

  new Vue({
      el: '#app',
      components: {
          GridView,
          GridItem,
      },
      data: {
          viewList: testView,
      },
  });
```` 


````html
    <grid-view
      :view="viewList"
      :col-num="12"
      :row-num="12"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item v-for="item in viewList"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i" >
          {{item.i}}
      </grid-item>
    </grid-view>
```` 


### Documentation

#### Properties

##### GridView

* **view**
    
    * type: `Array`
    * required: `true`

    This is the initial view of the grid.

    The value must be an `Array` of `Object` items. Each item must have `i`, `x`, `y`, `w` and `h` proprties. Please refer to `GridItem` documentation below for more informations.

* **colNum**
    
    * type: `Number`
    * required: `false`
    * default: `12`

    Says how many columns the grid has.

    The value should be a _natural number_. 

* **rowNum**
    
    * type: `Number`
    * required: `false`
    * default: `12`

    Says how many rows the grid has.

    The value should be a _natural number_. 

* **margin**
    
    * type: `Array`
    * required: `false`
    * default: `[10, 10]`

    Says what are the margins of elements inside the grid.

    The value must be a two-element `Array` of `Number`. Each value is expressed in pixels. The first element is a margin horizontally, the second element is a vertical margin.

* **useCssTransforms**
    
    * type: `Boolean`
    * required: `false`
    * default: `true`

    Says if the CSS `transition-property: transform;` should be used.

    
##### GridItem

* **i**
    
    * type: `String`
    * required: `true`

    This is the unique identifier of the item.

* **x**
    
    * type: `Number`
    * required: `true`

    Says what is a initial horizontal position of the item (in which column it should be placed).

    The value must be a _whole number_. 

* **y**
    
    * type: `Number`
    * required: `true`

    Says what is a initial vertical position of the item (in which row it should be placed).

    The value must be a _whole number_. 

* **w**
    
    * type: `Number`
    * required: `true`

    Says what is a initial width of the item.

    The value is a number that is multiplied by `colWidth`.

* **h**
    
    * type: `Number`
    * required: `true`

    Says what is a initial height of the item.

    The value is a number that is multiplied by `rowHeight`.
