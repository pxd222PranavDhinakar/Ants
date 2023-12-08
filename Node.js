// Node.js

// Main Node class definition
class Node {
    constructor(id, x, y) {
        this.id = id; // Unique identifier for the node
        this.x = x;   // x-coordinate
        this.y = y;   // y-coordinate
        this.radius = 10; // Half the diameter of the node
        this.selected = false; // Add a selected flag to track whether the node has an ant on it
    }

    display() {
        fill(255);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

        // Draw a red border around the node if it is selected
        //if (this.selected) {
        //    fill(0, 0, 0);
        //    stroke(255, 0, 0); // Red color for the border
        //    strokeWeight(2); // Set the border width
        //    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        //    noStroke(); // Reset stroke settings
        //}
    }


    // Method to check if the node is clicked
    clicked(px, py, nodes) {
        //console.log("Mouse position: ", px, py)
        //console.log("Node position: ", this.x, this.y)

        let d = dist(px, py, this.x, this.y);
        //console.log("Distance: ", d)
        //console.log("Radius: ", this.radius)
        if (d < this.radius) {
            
            console.log("Node " + this.id + " was clicked.");

            // Reset selection for all nodes
            nodes.forEach(n => n.selected = false);

            /*
            if (ant == null) {
                // Create a new ant if one doesn't exist
                ant = new AntNode(0, this.x, this.y, this);
                ant.createEdges(nodes); // Create edges for the ant
                //console.log("Ant created at Node: " + this.id);
            }else{
                // Before moving the ant, retract all existing edges but the next node
                ant.retractEdges(this);

                // Implement a delay or wait for retraction to complete before moving the ant
                setTimeout(() => {
                    // After edges have retracted, move the ant
                    ant.startMoving(this); // Start animating towards this node
                }, 500); // Adjust delay as necessary

                // Move the ant to the new node
                // THIS IS THE POINT WHERE I WANT TO RUN AN ANIMATION OF THE BLACK ANT MOVING ACCROSS THE SCREEN IN A STRAIGHTLINE TO THE NEW NODE
                //ant.startMoving(this); // Start animating towards this node
                //console.log("Ant moved from Node: " + ant.path[ant.path.length-2].id + " to Node: " + ant.path[ant.path.length-1].id);
            }
            */

            // At this point the ant has been either made on this node or moved to this node
            // Set this node as selected
            this.selected = true;
        }

    }



    // Method to calculate the adjacency matrix for the graph
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
}


// Function to create nodes
function createNodes() {
    // Clear the existing nodes
    nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      let newNode = generateNode(i);
      nodes.push(newNode);
    }
}
  
// Function to regenerate nodes based on the input value
function regenerateNodes() {
    edges = []; // Clear existing edges
    //ant = null; // Clear existing ant
    ants = [] // Clear existing ants

    // Update the node count based on input value
    nodeCount = parseInt(nodeCountInput.value());
    createNodes();
    // Redraw background and nodes
    draw();
}
  
// Funcion to generate a new random node with the given id
function generateNode(id) {
    let placed = false;  // Flag to check if the node has been placed successfully
    let x, y;  // Coordinates for the new node

    // Continue trying to place the node until a suitable position is found
    while (!placed) {
        // Generate random coordinates for the node.
        // The x-coordinate is constrained between the right edge of the sidebar and the right edge of the canvas.
        // The y-coordinate is constrained between the top and bottom edges of the canvas.
        x = random(sidebarWidth + 10, width - 10);
        y = random(10, height - 10);

        // Initially assume the node can be placed
        placed = true;

        // Check if the new node is too close to any existing node
        for (let n of nodes) {
            let d = dist(x, y, n.x, n.y); // Calculate the distance to each existing node
            if (d < minDistance) {
                // If the node is too close to an existing node, mark it as not placed and break out of the loop
                placed = false;
                break;
            }
        }
    }

    // Once a suitable position is found, create and return the new node with the generated coordinates
    return new Node(id, x, y);
}