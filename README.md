# Drawing-app
A simple drawing app made as part of the Stackup Javascript Intermediate Bounty Campaign.

### Overview
- The app has two major components - A canvas and a space for controls just above it. Users can draw on the canvas part. The whole canvas can be cleared by reloading the page.
- The canvas part is the HTML canvas element. The script in index.js is used to fill this canvas element and control it.
- The controls part is made up of HTML button tags for controlling the brush width, an input element for entering the hex color code with a button to validate the hex color. An error or success message is shown inline using a span element. The button clicks are detected and processed by the script in the index.js file.
- The CSS file mostly deals with the positioning of the elements. The user selection of text elements was disabled for a better user experience.
- I have used a class to instantiate the whole canvas and its related properties including canvas size, brush color, brush width, etc.
- A switch case block was used to check which button on the controls was clicked and call a function accordingly. 
- Try catch blocks were used in event listeners and in the function to update brush stroke color and a try catch finally block was used for initializing the class object at the end of the index.js file

### Features
- Click and drag on the canvas for drawing
- Choose Brush color using hex codes
- Use white color for brush and draw over to erase parts of the drawing
- Current brush color and brush stroke width are displayed
- Choose brush width using the 'increase' and 'decrease' buttons
- Crosshair cursor while drawing inside the canvas

### Additional features that can be added
- Making the website responsive while resizing or on mobile devices.
- Adding buttons to draw fixed shapes like polygons, circles, etc.
- Option to save the drawing to the device.
- Visual color palette on the site instead of using hex codes to change color.
