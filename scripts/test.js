/*Test script*/

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
	var jsonNodes = convertToJSON(scaleCoordinates(getNodeData(tree)));

	// create the SVG coordinate space
	var svgContainer = d3.select("body").append("svg")
        .attr("width", 1000)
        .attr("height", 1000)
        .style("border", "1px solid black");

    //draw the BST
	drawLines(tree, svgContainer);
	drawNodes(tree, svgContainer,jsonNodes);
	drawTextLabels(svgContainer, jsonNodes);
});
