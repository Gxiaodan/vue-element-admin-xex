<template>
  <div class="vue-app">
    https://juejin.cn/post/6844904016778887175
    <root :folder="root" />
    <hr>
    <folder :folder="root" />
  </div>
</template>

<script>
import Root from './components/Root'
import Folder from './components/Folder'

export default {
  name: 'App',
  components: {
    Root,
    Folder
  },
  data: function() {
    return {
      root: {
        text: 'Root Folder',
        leaf: false,
        expanded: true,
        children: [
          {
            text: 'Sub Folder 1',
            leaf: false,
            expanded: false,
            children: [
              {
                text: 'Sub Sub Folder 1',
                leaf: false,
                expanded: false,
                children: [
                  {
                    text: 'SomeFile1.js',
                    leaf: true
                  }
                ]
              },
              {
                text: 'Sub Sub Folder 2',
                leaf: false,
                expanded: false,
                children: []
              },
              {
                text: 'SomeFile.txt',
                leaf: true
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
