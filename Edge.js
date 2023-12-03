// Edge.js

// Main Edge class definition
class Edge {
    constructor(node1, node2) {
      this.node1 = node1;
      this.node2 = node2;
      this.distance = dist(node1.x, node1.y, node2.x, node2.y);

      // Animation Fields
      this.animationProgress = 0; // Progress of the animation (0 to 1)
      this.isExpanding = false; // Flag to indicate if the edge is expanding
      this.isRetracting = false; // Flag to indicate if the edge is retracting
      this.toRemove = false; // Flag to indicate if the edge should be removed

    }

    retract() {
        this.isRetracting = true;
        this.isExpanding = false;
    }

    expand() {
        this.isExpanding = true;
        this.isRetracting = false;
    }

    /*
    // Update method for the animation
    update() {
        const animationSpeed = 0.1;
        this.animationProgress += animationSpeed;
        this.animationProgress = min(this.animationProgress, 1); // Cap at 1
    }
    */

    // Update method for the animation
    update() {
        const animationSpeed = 0.05; // Adjust speed as needed

        if (this.isExpanding) {
            this.animationProgress += animationSpeed;
            if (this.animationProgress >= 1) {
                this.animationProgress = 1;
                this.isExpanding = false;
            }
        } else if (this.isRetracting) {
            this.animationProgress -= animationSpeed;
            if (this.animationProgress <= 0) {
                this.animationProgress = 0;
                this.isRetracting = false;
                this.toRemove = true; // Flag the edge to be removed
            }
        }
    }

    // Partial retraction method
    retractTo(progress) {
        this.animationProgress = progress;
        this.isRetracting = true;
    }

    display() {
        let angle = atan2(this.node2.y - this.node1.y, this.node2.x - this.node1.x);
        const offset = 0.5;

        let startX = this.node1.x + cos(angle) * (this.node1.radius + offset);
        let startY = this.node1.y + sin(angle) * (this.node1.radius + offset);
        let adjustedLength = this.distance - this.node1.radius - this.node2.radius - offset * 2;

        let animatedEndX = startX + cos(angle) * adjustedLength * this.animationProgress;
        let animatedEndY = startY + sin(angle) * adjustedLength * this.animationProgress;

        let baseTransparency = desirability === 10.0 ? 255 : map(desirability, 0.0, 10.0, 0, 255);
        let exponent = map(desirability, 0.0, 10.0, 1, 2);
        let distanceFactor = pow(this.distance / width, exponent);

        let transparency;
        if (desirability < 10.0) {
            let transparencyFactor = 4.0;
            transparency = baseTransparency * (1 - distanceFactor * transparencyFactor);
            transparency = constrain(transparency, 0, 255);
        } else {
            transparency = 255;
        }

        let edgeColor = color(255, 255, 255, transparency);
        stroke(edgeColor);
        strokeWeight(2);
        line(startX, startY, animatedEndX, animatedEndY);
        strokeWeight(1);
    }

    // Method to determine stroke weight based on distance
    calculateStrokeWeight() {
        const minWeight = 1;
        const maxWeight = 5;
        const minDistance = 0;
        const maxDistance = 500;

        let normalizedDistance = (this.distance - minDistance) / (maxDistance - minDistance);
        normalizedDistance = 1 - normalizedDistance;
        return normalizedDistance * (maxWeight - minWeight) + minWeight;
    }
}
