<template>
  <ul class="folders">
    <li>Folders</li>
    <folder :folder="folder" />
  </ul>
</template>

<script>
import Folder from './Folder'

export default {
  name: 'Root',
  components: {
    Folder
  },
  props: {
    folder: Object
  }
}
</script>

<style scoped>
ul.folders {
  padding: 1rem;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  list-style: none;
}
ul.folders > li:first-child {
  padding: 1rem 1rem 1rem 0;
}
</style>
