<template>
  <li class="folder" :class="[folder.leaf ? 'is-leaf' : 'is-folder']">
    <span @click="expand()">{{ folder.text }}</span>

    <ul
      v-if="folder.children && folder.children.length > 0"
      v-show="folder.expanded"
      class="sub-folders"
    >
      <folder
        v-for="(child, index) in folder.children"
        :key="index"
        :folder="child"
      />
    </ul>
    <div v-else v-show="!folder.leaf && folder.expanded" class="folder-empty">
      No Data
    </div>
  </li>
</template>

<script>
export default {
  name: 'Folder',
  props: {
    folder: Object
  },
  methods: {
    expand() {
      if (this.folder.leaf) {
        return
      }

      this.folder.expanded = !this.folder.expanded
    }
  }
}
</script>

<style scoped>
li.is-folder {
  padding: 1rem;
  border-left: 1px solid #d3d3d3;
  margin-bottom: 0.5rem;
}
li.is-folder > span {
  padding: 0.5rem;
  border: 1px solid #d3d3d3;
  cursor: pointer;
  display: inline-block;
}
li.is-leaf {
  padding: 0 0 0 1rem;
  color: #000;
}
ul.sub-folders {
  padding: 1rem 1rem 0 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  list-style: none;
}
div.folder-empty {
  padding: 1rem 1rem 0 1rem;
  color: #000;
  opacity: 0.5;
}
</style>
