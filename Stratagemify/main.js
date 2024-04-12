var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "390");
svg.setAttribute("height", "80");

// Create an SVG shape element, e.g., a rectangle
var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rect.setAttribute("x", "0");
rect.setAttribute("y", "0");
rect.setAttribute("width", "390");
rect.setAttribute("height", "80");
rect.setAttribute("fill", "		#636363");

var rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rect2.setAttribute("x", "12");
rect2.setAttribute("y", "12");
rect2.setAttribute("width", "57");
rect2.setAttribute("height", "57");
rect2.setAttribute("fill", "yellow");

// Add the shape to the SVG element
svg.appendChild(rect);
svg.appendChild(rect2);

// Append the SVG element to the document body
document.body.appendChild(svg);

const SVG_NS = "http://www.w3.org/2000/svg";
// an object to define the properties and text content of the text element 
let o = {
  props: {
    x: "99",
    y: "31",
	"font-family": "sinclair",
	"font-weight": "bold",
	"font-size": "18px"
  },
  txtConent: "ALPHAS 500KG EAGLE"
};

// a function to create a text element 
function drawText(o, parent) {
  // create a new text element
  let text = document.createElementNS(SVG_NS, "text");
  //set the attributes for the text
  for (var name in o.props) {
    if (o.props.hasOwnProperty(name)) {
      text.setAttributeNS(null, name, o.props[name]);
    }
  }
  // set the text content
  text.textContent = o.txtConent;
  // append the text to an svg element of your choice
  parent.appendChild(text);
  return text;
}

drawText(o, svg);
