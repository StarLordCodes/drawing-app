// Define a class for a drawing application
class DrawingApp {
  // pass in the canvasId to initiate the full app
  constructor(canvasId) {
    // Get references to various DOM elements
    this.canvas = document.getElementById(canvasId); // Get the canvas object from the DOM
    this.thicknessDisplay = document.getElementById("thickness"); // Get the element for displaying line thickness
    this.colorInput = document.getElementById("colorId"); // Get the hex color code input element from the user
    this.colorError = document.getElementById("colorError"); // Get the element for displaying hex code error
    this.changedColor = document.getElementById("changedColor"); // Get the element for displaying the changed color
    this.context = this.canvas.getContext("2d"); // Get the 2D canvas context
    this.isDrawing = false; // Boolean to check if drawing is in progress
    this.lineThickness = 2; // Initial value for line thickness attribute

    // Set the canvas size based on the window size
    this.canvas.width = window.innerWidth - 40;
    this.canvas.height = 450;

    this.context.lineWidth = 2; // Set default stroke width
    this.context.strokeStyle = "#000000"; // Set default color for strokes

    // Add event listener to detect mouse down
    this.canvas.addEventListener("mousedown", () => {
      try {
        this.isDrawing = true; // Notify that drawing is in progress
        this.context.beginPath(); // Start a new stroke path
        this.canvas.style.cursor = "crosshair";
      } catch (error) {
        console.error("An error occurred:", error); // Handle any errors
      }
    });

    // Add event listener to track mouse movement
    this.canvas.addEventListener("mousemove", (e) => {
      try {
        if (!this.isDrawing) return; // If not drawing, do nothing

        // Get coordinates of moving cursor relative to the canvas
        this.context.lineTo(
          e.clientX - this.canvas.getBoundingClientRect().left,
          e.clientY - this.canvas.getBoundingClientRect().top
        );
        this.context.stroke(); // Finish the stroke
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });

    // Add event listener to detect mouse button release
    this.canvas.addEventListener("mouseup", () => {
      try {
        this.isDrawing = false; // Set drawing boolean to false
        this.context.closePath(); // Close the current drawing path
        this.canvas.style.cursor = "default";
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });

    // Add event listener to handle mouse leaving the canvas
    this.canvas.addEventListener("mouseleave", () => {
      try {
        this.isDrawing = false; // Set drawing boolean to false
        this.context.closePath(); // Close the current drawing path
        this.canvas.style.cursor = "default";
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });

    // Add event listeners for thickness buttons and change color button
    const decreaseButton = document.getElementById("decrease");
    const increaseButton = document.getElementById("increase");
    const colorButton = document.getElementById("colorButton");

    decreaseButton.addEventListener("click", () => {
      this.handleButtonAction("decrease");
    });

    increaseButton.addEventListener("click", () => {
      this.handleButtonAction("increase");
    });

    // Add event listener for color input
    colorButton.addEventListener("click", () => {
      this.handleButtonAction("changeColor");
    });
  }

  // Method to handle various button actions
  handleButtonAction(action) {
    switch (action) {
      case "decrease":
        this.decreaseLineThickness();
        break;
      case "increase":
        this.increaseLineThickness();
        break;
      case "changeColor":
        this.updateStrokeColor(this.colorInput.value);
        break;
      default:
        console.error("Invalid action:", action);
    }
  }

  // Method to decrease line thickness
  decreaseLineThickness() {
    if (this.lineThickness > 1) {
      this.lineThickness--;
      this.context.lineWidth = this.lineThickness;
      this.updateLineThickness();
    }
  }

  // Method to increase line thickness
  increaseLineThickness() {
    if (this.lineThickness < 10) { // Adjust the maximum line thickness as needed
      this.lineThickness++;
      this.context.lineWidth = this.lineThickness;
      this.updateLineThickness();
    }
  }

  // Method to update line thickness display
  updateLineThickness() {
    this.thicknessDisplay.textContent = this.lineThickness;
  }

  // Method to update stroke color based on a hex color code
  updateStrokeColor(hexColor) {
    try {
      if (/^#([0-9A-F]{3}){1,2}$/i.test(hexColor)) {
        this.context.strokeStyle = hexColor; // change stroke color for valid hex color code
        this.colorError.textContent = `Color changed to: ${hexColor}`; // show color changed message
        this.changedColor.style.backgroundColor = `${hexColor}`; // change the color of the brush color indicator
      } else {
        throw new Error("Invalid hex code"); 
      }
    } catch (error) { // in case of  an error execute these statements
      console.error("An error occurred:", error); // record the error on the console
      this.colorError.textContent = "Invalid hex code !"; // show error message on the app
      this.colorInput.value = `${this.context.strokeStyle}`; // set the input box value to the last valid hex code
    }
  }
}// end of class

try {
  const _app = new DrawingApp("canvas"); // Initialize the drawing app
} catch (error) {
  console.error("An error occurred:", error);  // in case of any error, record it on console
} finally {
  console.log("Drawing app initialized."); // No matter if the app starts or error occurs, log that the app was initialised
}
