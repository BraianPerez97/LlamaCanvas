<template>
  <div id="app">
    <CanvasRenderer />
  </div>
</template>

<script>
import CanvasRenderer from './components/CanvasRenderer.vue';

export default {
  name: 'App',
  components: {
    CanvasRenderer
  }
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
