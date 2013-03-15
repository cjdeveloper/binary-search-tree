/*Traverses the binary search tree (BST) and pushes each node into an array
tree: a binary search tree 
returns an array containing the nodes of the BST
*/

function getNodeData(tree) {
	var result = [];

	tree.traverse(function(node){
            result.push(node);
        });

	return result;
}

/*Scales the node coordinates to fit into the allotted space
nodeArray: an array containing the nodes of the BST; nodes are in sorted order
returns an array of nodes with scaled coordinates
*/

function scaleCoordinates(nodeArray) {
	var initialCoord_x = [];
	var initialCoord_y = [];
 	var newScaledCoord_x = [];
 	var newScaledCoord_y = [];

	//adjust horizontal and vertical spacing between nodes
	var x_adjust = 60;
	var y_adjust = 60;

	//get initial coordinates of the nodes
	for (var i = 0; i < nodeArray.length; i++) {
		initialCoord_x.push(nodeArray[i].cx * x_adjust);
		initialCoord_y.push(nodeArray[i].cy * y_adjust);
	}
 	 
 	//get the min and max x,y coordinates 
	var minDataPoint_x = d3.min(initialCoord_x);
	var maxDataPoint_x= d3.max(initialCoord_x);
	var minDataPoint_y = d3.min(initialCoord_y);
	var maxDataPoint_y= d3.max(initialCoord_y);

	//construct a linear scale
	var linearScale_x = d3.scale.linear()
                            .domain([minDataPoint_x,maxDataPoint_x])
                            .range([20,980]);

    var linearScale_y = d3.scale.linear()
                            .domain([minDataPoint_y,maxDataPoint_y])
                            .range([20,980]);


    // the arrays containing the x and y coordinates have the same length; the 'length'
	// variable is used in the for loop below	
    var length = initialCoord_x.length; 
	
 	//scale coordinates to fit the allotted space
	for (var i = 0; i < length; i++) {
	  newScaledCoord_x[i] = linearScale_x(initialCoord_x[i]);
	  newScaledCoord_y[i] = linearScale_y(initialCoord_y[i]);
	}

	// replace the initial coordinates in nodeAray with the new ones 
	// note that nodeArray.length also equals 'length'
	for (var i = 0; i < length; i++) {
		nodeArray[i].cx = newScaledCoord_x[i];
		nodeArray[i].cy = newScaledCoord_y[i];	
	}

	return nodeArray;
}

/*Converts an array of nodes into JSON so that the D3.js javascript library can be
used to manipulate the node data
nodeArray: an array of nodes
returns an array of nodes as JSON objects  
*/

function convertToJSON(nodeArray) {
	var x_adjust = 60;
	var y_adjust = 60;
	var color = "red";
	var radius = 20;
	var jsonNodes = [];
	var jsonNode = {};

	for (var i = 0; i < nodeArray.length; i++) {
		jsonNode = {
			"value": nodeArray[i].value,
			"xpos":  nodeArray[i].cx,
			"ypos":  nodeArray[i].cy,
			"radius": radius,
			"color": color
		};

		jsonNodes.push(jsonNode);
	}

	return jsonNodes;
}

/*Draws lines connecting a parent node with its children
tree: a BST
svgContainer: the SVG coordinate space
*/

function drawLines(tree, svgContainer) {
	tree.traverse(function(node){
		var parent_x = node.cx;
		var parent_y = node.cy;
		var leftChild = node.left;
		var rightChild = node.right;
		var left_xpos;
		var left_ypos;
		var right_xpos;
		var right_ypos;

		if (leftChild !== null) {
			left_xpos = leftChild.cx;
			left_ypos = leftChild.cy;

			var line = svgContainer.append("line")
	        .attr("x1", parent_x)
	        .attr("y1", parent_y)
	        .attr("x2", left_xpos)
	        .attr("y2", left_ypos)
	        .attr("stroke-width", 2)
	        .attr("stroke", "black");
		}

		if (rightChild !== null) {
			right_xpos = rightChild.cx;
			right_ypos = rightChild.cy;

			var line = svgContainer.append("line")
            .attr("x1", parent_x)
            .attr("y1", parent_y)
            .attr("x2", right_xpos)
            .attr("y2", right_ypos)
            .attr("stroke-width", 2)
            .attr("stroke", "black");
		} 			
    });        
}

/*Tests*/

$(document).ready(function() {

	var tree = new BinarySearchTree();
	tree.add(50);
	tree.add(40);
	tree.add(80);
	tree.add(30);
	tree.add(45);
	tree.add(60);
	tree.add(85);
	tree.add(55);
	tree.add(52);
	tree.add(28);
	tree.add(48);
	tree.add(46);
	tree.add(49);
	tree.add(41);
	tree.add(31);
	tree.add(51);
	tree.computeNodePositions();
	console.log(tree.toArray());
	console.log(getNodeData(tree));
	var jsonNodes = convertToJSON(scaleCoordinates(getNodeData(tree)));

	// create the SVG coordinate space
	var svgContainer = d3.select("body").append("svg")
        .attr("width", 1000)
        .attr("height", 1000)
        .style("border", "1px solid black");

    //draw lines first
	drawLines(tree, svgContainer);
 
   	//add SVG circles to the svgContainer and bind data to circles
	var circles = svgContainer.selectAll("circle")
       	.data(jsonNodes)
    	.enter()
   		.append("circle");

	//set the circle attributes
	var circleAttributes = circles
        .attr("cx", function (d) { return d.xpos; })
        .attr("cy", function (d) { return d.ypos; })
        .attr("r", function (d) { return d.radius; })
        .style("fill", function(d) { return d.color; });

   	//add the SVG Text Element to the svgContainer
	var text = svgContainer.selectAll("text")
        .data(jsonNodes)
        .enter()
        .append("text");

	//add SVG Text Element attributes
	var textLabels = text
       	.attr("x", function(d) { return d.xpos; })
        .attr("y", function(d) { return d.ypos; })
        .text( function (d) { return d.value; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("fill", "blue");

    tree.remove(80);
    console.log(tree.toArray());

}); // end ready