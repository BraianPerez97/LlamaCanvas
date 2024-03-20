<template>
  <div ref="canvasContainer" styles="width: 100%; height 100%;"></div>
</template>

<script>
import { JSONCanvas } from '@trbn/jsoncanvas';

export default {
  mounted() {
    // Initialize JSONCanvas
    const canvas = new JSONCanvas();

    // Example data (replace with your actual data)
    const nodes = [
      { id: 'node1', type: 'text', text: 'Hello, World!', x: 100, y: 100, width: 100, height: 50 },
      { id: 'node2', type: 'text', text: 'Hello, World 2!', x: 300, y: 200, width: 100, height: 50 },
      { id: 'node3', type: 'link', url: 'https://example.com', x: 500, y: 300, width: 100, height: 50 }
    ];

    const edges = [
      { id: 'edge1', fromNode: 'node1', toNode: 'node2', label: 'Edge from Node 1 to Node 2' },
      { id: 'edge2', fromNode: 'node2', toNode: 'node3', label: 'Edge from Node 2 to Node 3' }
    ];

    // Add nodes
    nodes.forEach(node => {
      canvas.addNode(node);
    });

    // Add edges
    edges.forEach(edge => {
      canvas.addEdge(edge);
    });

    // Attach canvas to container element
    const container = this.$refs.canvasContainer;
    if (container instanceof HTMLElement) {
      canvas.attach(container);
    }
  }
};

</script>

<style scoped>
.canvas-container {
  position: relative;
  width: 800px;
  height: 600px;
  background-color: #FFFFFF;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
