// Ant.js


class AntNode {
    constructor(id, x, y, location) {
        this.id = id; // Unique identifier for the node
        this.x = x;   // x-coordinate
        this.y = y;   // y-coordinate
        this.radius = 10; // Half the diameter of the node
        this.isAnt = true; // Add an ant flag
        this.location = location; // Add a field that tracks the location of the ant
        this.path = []; // Add a field that tracks the path of the ant
        this.path.push(location);

        // Animation Fields
        this.target = null // Target node for the ant
        this.targetX = x;  // Target x-coordinate
        this.targetY = y;  // Target y-coordinate
        this.animationProgress = 0;  // Progress of the animation (0 to 1)
        this.moving = false;  // Flag to indicate if the ant is moving
    }
    
    display() {
        fill(0,0,0);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

        // Draw a red border around the AntNode
        stroke(255, 0, 0); // Red color for the border
        strokeWeight(2); // Set the border width
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        noStroke(); // Reset stroke settings
    }
    
    
    updatePosition (node){
        // Update the position of the ant
        this.x = node.x;
        this.y = node.y;
        //console.log("Ant moved from Node: " + ant.path[ant.path.length - 1].id + " to Node: " + this.id);
    }
    
    startMoving(targetNode) {
        //this.retractEdges(); // First, retract all edges
        // Set target position
        this.targetX = targetNode.x;
        this.targetY = targetNode.y;

        this.location = targetNode; // Update the location tracker of the ant
        this.path.push(targetNode); // Add the target node to the path

        // Start animation
        this.moving = true;
        this.animationProgress = 0;
    }
    
    printPath(){
        console.log("Ant Path: ");
        this.path.forEach(node => {
            console.log(node.id);
        });
    }

    
    // Method handles updating the ant's animation
    update(){
        if (this.moving) {
            // Update the animation progress
            this.animationProgress += 0.05; // Adjust the speed

            // Retract Edges
            edges = []; // Clear existing edges before creating new ones

            // Interpolate the position
            this.x = lerp(this.x, this.targetX, this.animationProgress);
            this.y = lerp(this.y, this.targetY, this.animationProgress);

            // Check if the animation is complete
            if (this.animationProgress >= 1) {
                // Animation is complete
                this.moving = false;
                this.animationProgress = 0;

                // Generate edges at new location
                this.createEdges(nodes);
            }
        } 
    }

    moveAlongEdge(targetEdge, onComplete) {
        this.moving = true;
        this.targetEdge = targetEdge;
        this.onComplete = onComplete;
    }

    createEdges(nodes){
        edges = []; // Clear existing edges

        // Create edges between this ant and all other nodes
        nodes.forEach(node => {
            if (node !== this.location) { // Avoid creating an edge to the ant's current location
                let newEdge = new Edge(this, node);
                newEdge.expand(); // Start expanding the new edge
                edges.push(newEdge);
            }
        });
    }

    retractEdges(targetNode) {
        // Find the shortest length edge
        //let shortestEdge = edges.reduce((a, b) => a.distance < b.distance ? a : b);
        //console.log(shortestEdge.distance);

        // Retract all nodes but the shortest edge
        //edges.forEach(edge => {
        //    if (edge !== shortestEdge) {
        //        edge.retract();
        //    }
        //});

        // Find the edge that connects to the target node
        let targetEdge = edges.find(edge => edge.node1 === targetNode || edge.node2 === targetNode);

        // Retract all edges but the target edge
        edges.forEach(edge => {
            if (edge !== targetEdge) {
                edge.retract();
            }
        });

        
        //edges.forEach(edge => edge.retract()); // Retract all edges

        // Start moving along the target edge
        //this.moveAlongEdge(targetEdge, () => {
        //    // Callback function after reaching the target node
        //    // You can put code here to execute after the ant reaches the target node
        //    this.location = targetNode; // Update the ant's location to the target node
        //    this.createEdges(nodes); // Assuming 'nodes' is accessible here
        //});
    }

    /*
    // Method to calculate the adjacency matrix for the AntNode
    calculateAdjacencyMatrix(nodes) {
        let matrix = [];
        nodes.forEach(node => {
            let row = nodes.map(otherNode => 
                edges.find(edge => 
                    (edge.node1 === node && edge.node2 === otherNode) ||
                    (edge.node1 === otherNode && edge.node2 === node)
                ) ? 1 : 0
            );
            matrix.push(row);
        });
        return matrix;
    }
    */
}