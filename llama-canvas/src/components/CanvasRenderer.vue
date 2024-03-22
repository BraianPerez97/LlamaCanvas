<template>
  <canvas ref="canvasContainer" style="width: 100%; height: 100%;"></canvas>
</template>

<script>
import { JSONCanvas } from '@trbn/jsoncanvas';

export default {
  mounted() {
    // Access the canvas HTML element
    let canvasElement = this.$refs.canvasContainer;

    // Initialize JSONCanvas with the canvas HTML element
    const canvas = new JSONCanvas(canvasElement);

    // Draw on the canvas
    canvas.draw({
      type: 'rect',
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: '#f00'
    });
  }
}
</script>