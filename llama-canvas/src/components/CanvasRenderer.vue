<template>
  <canvas ref="canvasContainer"></canvas>
</template>

<script>
import { JSONCanvas } from '@trbn/jsoncanvas';

export default {
  data() {
    return {
      jsonCanvas: null,
    };
  },
  mounted() {
    this.jsonCanvas = new JSONCanvas();

    this.jsonCanvas.addNode({
      id: 'node1',
      type: 'text',
      text: 'Hello, World!',
      x: 100,
      y: 100,
      width: 100,
      height: 50,
    });

    this.jsonCanvas.addNode({
      id: 'node2',
      type: 'text',
      text: 'Hello, World 2!',
      x: 300,
      y: 200,
      width: 100,
      height: 50,
    });

    this.jsonCanvas.addEdge({
      id: 'edge1',
      fromNode: 'node1',
      toNode: 'node2',
      label: 'Edge from Node 1 to Node 2',
    });

    window.addEventListener('resize', this.adjustCanvasSize);
    this.adjustCanvasSize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustCanvasSize);
  },
  methods: {
    adjustCanvasSize() {
      const canvasElement = this.$refs.canvasContainer;
      const nodes = this.jsonCanvas.getNodes();
      const maxX = Math.max(...nodes.map(node => node.x + node.width));
      const maxY = Math.max(...nodes.map(node => node.y + node.height));
      const maxNodeWidth = Math.max(...nodes.map(node => node.width));
      const maxNodeHeight = Math.max(...nodes.map(node => node.height));
      canvasElement.width = maxX + maxNodeWidth;
      canvasElement.height = maxY + maxNodeHeight;
      this.drawNodes();
    },
    drawNodes() {
      const ctx = this.$refs.canvasContainer.getContext('2d');
      const nodes = this.jsonCanvas.getNodes();

      this.$nextTick(() => {
        nodes.forEach(node => {
          switch (node.type) {
            case 'text':
              this.drawTextNode(ctx, node);
              break;
            case 'file':
              this.drawFileNode(ctx, node);
              break;
            case 'link':
              this.drawLinkNode(ctx, node);
              break;
            case 'group':
              this.drawGroupNode(ctx, node);
              break;
          }
        });
        this.drawEdges();
      });
    },
    drawTextNode(ctx, node) {
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.text || 'Text Node', node.x + 10, node.y + 30);
    },
    drawFileNode(ctx, node) {
      ctx.fillStyle = 'lightyellow';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.filename || 'File Node', node.x + 10, node.y + 30);
    },
    drawLinkNode(ctx, node) {
      ctx.fillStyle = 'lightgreen';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.url || 'Link Node', node.x + 10, node.y + 30);
    },
    drawGroupNode(ctx, node) {
      ctx.fillStyle = 'lightpink';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.groupName || 'Group Node', node.x + 10, node.y + 30);
    },
    getNodePosition(nodeId) {
      const node = this.jsonCanvas.getNode(nodeId);
      if (node) {
        return { x: node.x, y: node.y, width: node.width, height: node.height };
      } else {
        throw new Error(`Node with ID ${nodeId} not found`);
      }
    },
    drawEdges() {
      const ctx = this.$refs.canvasContainer.getContext('2d');
      ctx.strokeStyle = 'red'; // Change this to the color you want for the lines
      const edges = this.jsonCanvas.getEdges();

      edges.forEach(edge => {
        const fromNode = this.getNodePosition(edge.fromNode);
        const toNode = this.getNodePosition(edge.toNode);

        ctx.beginPath();
        ctx.moveTo(fromNode.x + fromNode.width / 2, fromNode.y + fromNode.height / 2);
        ctx.lineTo(toNode.x + toNode.width / 2, toNode.y + toNode.height / 2);
        ctx.stroke();
      });
    },
  }
}

</script>

<style scoped>
canvas { 
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>