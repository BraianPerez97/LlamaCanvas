<template>
  <canvas ref="canvasContainer" style="width: 100%; height: 100%;"></canvas>
</template>

<script>
export default {
  data() {
    return {
      nodes: [
        { id: 'node1', type: 'text', text: 'Hello, World!', x: 100, y: 100, width: 100, height: 50 },
        { id: 'node2', type: 'text', text: 'Hello, World 2!', x: 300, y: 200, width: 100, height: 50 },
        { id: 'node3', type: 'link', url: 'https://example.com', x: 500, y: 300, width: 100, height: 50 },
        { id: 'node4', type: 'text', text: 'Hello, World 4!', x: 700, y: 400, width: 100, height: 50 }
      ],
      edges: [
        { id: 'edge1', fromNode: 'node1', toNode: 'node2', label: 'Edge from Node 1 to Node 2' },
        { id: 'edge2', fromNode: 'node2', toNode: 'node3', label: 'Edge from Node 2 to Node 3' }
      ]
    };
  },
  mounted() {
    const canvasElement = this.$refs.canvasContainer;
    const maxX = Math.max(...this.nodes.map(node => node.x + node.width));
    const maxY = Math.max(...this.nodes.map(node => node.y + node.height));
    canvasElement.width = maxX + 10;  // Add a little extra space
    canvasElement.height = maxY + 10;  // Add a little extra space
    const ctx = canvasElement.getContext('2d');

    this.$nextTick(() => {
      this.nodes.forEach(node => {
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
  });

    this.edges.forEach(edge => {
      this.drawEdge(ctx, edge);
    });
  },
  methods: {
    drawTextNode(ctx, node) {
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.text, node.x + 10, node.y + 30);
    },
    drawLinkNode(ctx, node) {
      // Draw a link node
      // This is just an example, replace with your actual drawing code
      ctx.fillStyle = 'lightgreen';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.url, node.x + 10, node.y + 30);
    },
    drawFileNode(ctx, node) {
      // Draw a file node
      // This is just an example, replace with your actual drawing code
      ctx.fillStyle = 'lightyellow';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.filename || 'File Node',  node.x + 10, node.y + 30);
    },
    drawGroupNode(ctx, node) {
      // Draw a group node
      // This is just an example, replace with your actual drawing code
      ctx.fillStyle = 'lightpink';
      ctx.fillRect(node.x, node.y, node.width, node.height);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(node.groupName || 'Group Node',  node.x + 10, node.y + 30);
    },
    getNodePosition(nodeId) {
      const node = this.nodes.find(node => node.id === nodeId);
      if (node) {
        return { x: node.x, y: node.y, width: node.width, height: node.height };
      } else {
        throw new Error(`Node with ID ${nodeId} not found`);
      }
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>