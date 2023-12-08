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

        this.edges = []; // Add a field that tracks the edges of the ant
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
            this.edges = []; // Clear existing edges before creating new ones

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

    createEdges(nodes){
        //edges = []; // Clear existing edges

        // Create edges between this ant and all other nodes
        nodes.forEach(node => {
            if (node !== this.location) { // Avoid creating an edge to the ant's current location
                let newEdge = new Edge(this, node);
                newEdge.expand(); // Start expanding the new edge
                this.edges.push(newEdge);
            }
        });
    }

    retractEdges() {

        
        /*
        // Find the shortest length edge
        let shortestEdge = this.edges.reduce((a, b) => a.distance < b.distance ? a : b);
        //console.log(shortestEdge.distance);

        // Retract all nodes but the shortest edge
        this.edges.forEach(edge => {
            if (edge !== shortestEdge) {
                edge.retract();
            }
        });

        // Find the node that connects to the shortest edge
        this.target = nodes.find(node => node === shortestEdge.node1 || node === shortestEdge.node2);
        */


        // Pick a random edge to keep
        //let randomEdge = this.edges[Math.floor(Math.random() * this.edges.length)];

        // Retract all edges but the random edge
        //this.edges.forEach(edge => {
        //    if (edge !== randomEdge) {
        //        edge.retract();
        //    }
        //});

        // Pick a random node to move to (not the current node)
        //this.target = nodes[Math.floor(Math.random() * nodes.length)];

        // Find the edge connected to the target node
        //let targetEdge = this.edges.find(edge => edge.node1 === this.target || edge.node2 === this.target);

        // Retract all edges but the target edge
        //this.edges.forEach(edge => {
        //    if (edge !== targetEdge) {
        //        edge.retract();
        //    }
        //});



        // Pick a random nearby node to move to (not the current node)
        this.target = nodes[Math.floor(Math.random() * nodes.length)];
        
        // Use the function
        //this.target = pickTargetNode();

        // Find the edge connected to the target node
        let targetEdge = this.edges.find(edge => edge.node1 === this.target || edge.node2 === this.target);

        // Retract all edges but the target edge
        this.edges.forEach(edge => {
            if (edge !== targetEdge) {
                edge.retract();
            }
        });

    }


    pickTargetNode() {
        let probabilities = [];
        let totalProbability = 0;
    
        // Calculate distances and probabilities
        nodes.forEach(node => {
            let distance = dist(this.position.x, this.position.y, node.position.x, node.position.y);
            let probability = 1 / distance; // Inverse of distance
            probabilities.push(probability);
            totalProbability += probability;
        });
    
        // Normalize probabilities and pick a node
        let randomThreshold = Math.random() * totalProbability;
        let runningSum = 0;
    
        for (let i = 0; i < probabilities.length; i++) {
            runningSum += probabilities[i];
            if (runningSum > randomThreshold) {
                return nodes[i]; // Selected node
            }
        }
    
        // Fallback in case of rounding errors
        return nodes[nodes.length - 1];
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


function placeAnts() {
    // Clear existing ants
    ants = [];
    edges = []; // Clear existing edges

    // Read the number of ants from input
    let antCount = parseInt(antCountInput.value());

    // Randomly place ants on nodes
    for (let i = 0; i < antCount; i++) {
        let randomNodeIndex = Math.floor(Math.random() * nodes.length);
        let randomNode = nodes[randomNodeIndex];
        ants.push(new AntNode(i+1, randomNode.x, randomNode.y, randomNode)); // Assuming Ant constructor takes a node
    }

    // Print the ant positions
    //console.log("Ant Positions:");
    //ants.forEach(ant => {
    //    console.log(ant.id + ": " + ant.x + ", " + ant.y);
    //});

    // Generate edges for each ant node
    ants.forEach(ant => {
        ant.createEdges(nodes);
    });

}


function step() {    
    // Before moving the ant, retract all existing edges but the next node
    //ant.retractEdges(this);

    // Before moving the ants retract all existing edges but the next node for each ant
    ants.forEach(ant => {
        ant.retractEdges();
    });

    // Loop through each ant and print its location and its target
    //ants.forEach(ant => {
    //    console.log("Ant " + ant.id + " is at node " + ant.location.id + " and is moving to node " + ant.target.id);
    //});

    //console.log(ants[0].target.id);
    


    // Move each of the ants
    ants.forEach(ant => {
        // Implement a delay or wait for retraction to complete before moving the ant
        setTimeout(() => {
            // After edges have retracted, move the ant
            ant.startMoving(ant.target); // Start animating towards this node
        }, 700); // Adjust delay as necessary
    });

}