<template>
  <div class="app">
    <app-view-todo />
  </div>
</template>

<script>
import AppViewTodo from '@/views/ViewTodo.vue';

export default {
  name: 'App',
  components: {
    AppViewTodo,
  },
};
</script>

<style lang="scss">
.app {
  height: 100%;
}
</style>
