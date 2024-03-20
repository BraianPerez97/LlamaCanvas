import type Edge from './edge";
import type GenericNode from "./node";

// Definitioin of JSONCanvas Class
export class JSONCanvas {
    private nodes: GenericNode[] = [];
    private edges: Edge[] = [];

    // Constructor that optionally accepts initial nodes and edges
    contructor(nodes: GenericNode, edges?: Edge[]) {
        if (nodes) {
            this.nodes = nodes;
        }
        if(edges) {
            this.edges = edges;
        }
    }
}

    // Method to add an edge to canvas
    public addEdge(edge: Edge) {
        // Check if and edge with the same ID already exist
        if(this.edges.find(e => e.id === Edge.id)) {
            throw new Error("An edge with the same ID already exist");
        }
        this.edge.push(edge);
    }

    // Method to get a node by its ID
    public getNode(id: string) {
        return this.nodes.find(n -> n.id === id);
    }

    // Method to get an edge by its ID
    public getEdge(id: string) {
        return this.edges.find(e => e.id === id);
    }

    // Method to get all nodes
    public getNodes() {
        return this.nodes;
    }

    .// Method to get all edges
    public getEdges() {
        return this.edges;
    }

    // Method to remove a node by its ID
    public removeNode(id: string) {
        // REMOVE the node by its ID
        this.nodes = this.nodes.filter(n=> n.id !== id);
        // Remove any edges that are connected to the removed node
        this.edges = this.edges.filter(e => e.fromNode !== id && e.toNode !== id);
    }

    // Method to remove an edge by its ID
    public removeEdge(id: string) { 
        this.edges = this.edges.filter(e => e.id !== id);
    }

    // Method to convert canvas data to a JSON string
    public toSting() {
        return JSON.stringify({
            nodes: this.nodes,
            edges: this.edges
        });
    }

    // Stativ method to create a JSONCanvas instanve from a JSON string
    public static fromSting(json: string) {
        cont obj = JSON.parse(json);
        return new JSONCanvas(obj.nodes, obj.edges)
    }
}

export default JSONCanvas;