# Ant Colony Optimization in p5.js

This project is a visual representation and simulation of the Ant Colony Optimization (ACO) algorithm, particularly applied to solve the Traveling Salesman Problem (TSP) using p5.js. ACO is a probabilistic technique used in computing for finding optimized paths, inspired by the behavior of ants searching for food.

## Overview

In this simulation, a number of 'ants' explore paths between nodes (representing cities in the TSP). The goal is to find the shortest possible route that visits each city and returns to the origin city. This project visualizes how ants can gradually find more efficient paths through pheromone deposition and following trails left by other ants.

## Features

- **Dynamic Node Placement:** Click to create nodes, representing cities in the TSP.
- **Ant Placement and Movement:** Specify the number of ants and place them randomly on nodes. Ants move towards a selected node on click.
- **Pheromone Trails:** Simulate pheromone deposition and evaporation, influencing ant movement decisions.
- **Visualization:** Clear and engaging visual representation of nodes, ants, and their paths.

## Setup

To run this simulation:

1. Clone the repository to your local machine.
2. Open the `ants.html` file in a web browser to see the simulation.
3. Use the provided controls to interact with the simulation.

## Usage

- **Create Nodes:** Left-click on the canvas to create nodes.
- **Set Ants:** Enter the number of ants in the input box.
- **Place Ants:** Click the 'Place Ants' button to randomly distribute ants across nodes.
- **Move Ants:** Click on any node to move all ants to that node, simulating the path-finding process.

## Technologies

- **p5.js:** A JavaScript library that makes coding accessible for artists, designers, educators, and beginners.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](#).

## License

Distributed under the MIT License. See `LICENSE` for more information.
