<template>
  <canvas id="canvas" style="border: 1px solid #000;"></canvas>
</template>

<script>
import { ref, onMounted } from 'vue';
import { JSONCanvas, Edge, TextNode, CanvasColor } from '@trbn/jsoncanvas';

export default {
  data() {
    return {
      jsonCanvas: null,
      canvasElement: null,
      context: null,
      scale: 1,
      position: { x: 0, y: 0 },
      dragging: false,
      dragStart: { x: 0, y: 0 },
      selectedNode: null,
      offsetX: 0,
      offsetY: 0
    };
  },
  mounted() {
    // Initialize JSONCanvas object
    this.jsonCanvas = new JSONCanvas();
    this.canvasElement = this.$refs.canvas;
    this.context = this.canvasElement.getContext("2d");

    // Initialize canvas with some nodes and edges
    this.initializeCanvas();

    // Draw the initial canvas
    this.draw();

    // Add nodes to the canvas
    const node1 = {
      id: 'node1',
      type: 'text',
      text: 'Node 1',
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      color: 1,
    };
    const node2 = {
      id: 'node2',
      type: 'text',
      text: 'Node 2',
      x: 200,
      y: 200,
      width: 100,
      height: 50,
      color: 4,
    };
    this.jsonCanvas.addNode(node1);
    this.jsonCanvas.addNode(node2);

    // Add edges to the canvas
    const edge = {
      id: 'edge1',
      fromNode: 'node1',
      toNode: 'node2',
      label: 'Edge 1',
      color: 2,
    };
    this.jsonCanvas.addEdge(edge);

    // Draw the canvas
    this.draw();

    // Add event listeners for drag
    this.canvasElement.addEventListener('mousedown', this.startDragging);
    this.canvasElement.addEventListener('mousemove', this.drag);
    this.canvasElement.addEventListener('mouseup', this.stopDragging);
    this.canvasElement.addEventListener('mouseleave', this.stopDragging);
  },
  methods: {
    initializeCanvas() {
      // If needed, initialize canvas with default nodes and edges
    },
    draw() {
      const canvas = this.canvasElement;
      const ctx = this.context;

      // Apply transformations (scale and translate)
      ctx.save();
      ctx.scale(this.scale, this.scale);
      ctx.translate(this.position.x, this.position.y);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nodes
      this.jsonCanvas.getNodes().forEach(node => {
        switch (node.type) {
          case 'text':
            this.drawTextNode(ctx, node);
            break;
          // Add cases for other node types as needed
        }
      });

      // Draw edges
      this.jsonCanvas.getEdges().forEach(edge => {
        this.drawEdge(ctx, edge);
      });

      // Restore canvas state
      ctx.restore();
    },
    drawTextNode(ctx, node) {
      // Draw text node
      // Example implementation
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.text, node.x + 10, node.y + 30);
    },
    drawEdge(ctx, edge) {
      // Draw edge
      ctx.beginPath();
      ctx.moveTo(edge.fromNode.x, edge.fromNode.y);
      ctx.lineTo(edge.toNode.x, edge.toNode.y);
      ctx.stroke();
    },
    startDragging(event) {
      const rect = this.canvasElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check if mouse is over a node
      const nodes = this.jsonCanvas.getNodes();
      for (let node of nodes) {
        if (x > node.x && x < node.x + node.width && y > node.y && y < node.y + node.height) {
          // Set selected node and dragging flag
          this.selectedNode = node;
          this.dragging = true;
          this.offsetX = x - node.x;
          this.offsetY = y - node.y;
          break;
        }
      }
    },
    drag(event) {
      if (this.dragging) {
        const rect = this.canvasElement.getBoundingClientRect();
        const x = event.clientX - rect.left - this.offsetX;
        const y = event.clientY - rect.top - this.offsetY;

        // Update node position
        this.selectedNode.x = x;
        this.selectedNode.y = y;

        // Redraw canvas
        this.draw();
      }
    },
    stopDragging() {
      // Reset dragging flag and selected node
      this.dragging = false;
      this.selectedNode = null;
    }
  },
};
</script>

<style scoped>
#canvas {
  width: 100%;
  height: 100%;
}
</style>
