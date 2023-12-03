// sketch.js

let nodeCountInput, regenerateButton;
let nodes = []; // Global array to store nodes
let edges = []; // Global array to store edges
let ant = null; // Global variable to track ant
let sidebarWidth = 200; // Width of the sidebar for metrics and buttons
let nodeCount = 10; // Default number of nodes to create
let minDistance = 50; // Minimum distance between nodes
let currentNode = null; // Variable to store the currently selected node
let desirability; // Global desirability value
let desirabilitySlider; // Global slider object

let antCountInput; // Input for the number of ants
let antCount = 1; // Default number of ants
let placeAntsButton;




function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50); // Graphite gray background

  // Create input for node count
  nodeCountInput = createInput(nodeCount.toString());
  nodeCountInput.position(20, 60);
  nodeCountInput.style('width', '160px');
  nodeCountInput.attribute('type', 'number'); // Specify input type as number
  nodeCountInput.attribute('min', '1'); // Minimum value
  nodeCountInput.attribute('max', '220'); // Maximum value

  // Create button for regenerating nodes
  regenerateButton = createButton('Regenerate Nodes');
  regenerateButton.position(20, 100);
  regenerateButton.mousePressed(regenerateNodes);

  // Initial generation of nodes
  createNodes();

  // Initialize desirability to 5.0
  desirability = 5.0;

  // Create a slider for desirability with a default value of 5.0
  desirabilitySlider = createSlider(0.0, 10.0, 5.0, 0.1);
  desirabilitySlider.position(20, 140); // Adjust position as needed
  desirabilitySlider.style('width', '160px');

  // Create input for the number of ants
  antCountInput = createInput(antCount.toString());
  antCountInput.position(20, 180);
  antCountInput.style('width', '160px');
  antCountInput.attribute('type', 'number');
  antCountInput.attribute('min', '1'); // Minimum value

  // Create a label for the ant count input
  let antCountLabel = createElement('label', 'Number of Ants:');
  antCountLabel.position(20, 160);

  // Create 'Place Ants' button
  placeAntsButton = createButton('Place Ants');
  placeAntsButton.position(20, 220); // Adjust the position as needed
  //placeAntsButton.mousePressed(placeAnts); 
}


// Main draw loop
function draw() {
  // Clear the background to redraw everything again
  background(50); // Graphite gray background
  
  // Draw the sidebar
  fill(30); // Darker shade for the sidebar
  noStroke();
  rect(0, 0, sidebarWidth, height);

  // Draw the nodes
  for (let node of nodes) {
    node.display();
  }

  // Draw the ant
  if (ant){
    ant.update(); // Update Ant animation
    ant.display(); // Draw the Ant
  }

  
  // Update and draw all edges, and remove them if they are done retracting
  for (let i = edges.length - 1; i >= 0; i--) {
    edges[i].update();
    if (edges[i].toRemove) {
        edges.splice(i, 1); // Remove the edge
    } else {
        edges[i].display(); // Only display the edge if it's not removed
    }
  }

  // Update and draw all edges
  //edges.forEach(edge => {
  //  edge.update(); // Update the edge for animation
  //  edge.display(); // Draw the edge
  //});

  // Update desirability value from the slider
  desirability = desirabilitySlider.value();

  // Adjacency matrix (Not sure if I will keep this)
  //if (currentNode) {
  //  let matrix = currentNode.calculateAdjacencyMatrix(nodes);
  //  displayAdjacencyMatrix(matrix);
  //}
}

// Function to display the adjacency matrix
function displayAdjacencyMatrix(matrix) {
  // Starting position for displaying the matrix
  let startX = 20;
  let startY = 200;

  matrix.forEach((row, i) => {
      let rowText = row.join(' ');
      text(rowText, startX, startY + i * 15);
  });
}

// Function gets called whenever a mouseclick occurs
function mousePressed() {
  //console.log("Mouse was clicked at " + mouseX + ", " + mouseY);
  // Loop through all nodes to find if any of them were clicked
  nodes.forEach(node => {
      // Call the clicked method for each node
      node.clicked(mouseX, mouseY, nodes);

      // If the node was clicked, set it as the current node
      if (node.selected) {
        currentNode = node;
        // EXECUTE ANIMATION TO MOVE ANT TO NODE
      }

  });

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(50); // Maintain the graphite gray background after resizing
}
