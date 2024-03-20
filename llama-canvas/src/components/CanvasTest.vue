<template>
  <div ref="canvasContainer" style="position: relative; width: 500px; height: 500px;"></div>
</template>

<script>
// Import JSONCanvas at the top of the script section
import { JSONCanvas } from '@trbn/jsoncanvas';

export default {
  name: 'CanvasTest',
  mounted() {
    // Initialize JSONCanvas and attach to container element
    const canvas = new JSONCanvas();
    canvas.attach(this.$refs.canvasContainer);

    // Example usage: add a text node to the canvas
        canvas.addNode({
        id: 'node1',
        type: 'text',
        text: 'Hello, JSONCanvas!',
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        });
    },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
