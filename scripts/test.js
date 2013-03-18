/*Test script*/

$(document).ready(function() {

    // create the SVG coordinate space
    var svgContainer = d3.select("#svgContainer").append("svg")
        .attr("width", 1000)
        .attr("height", 1000)
        .style("border", "1px solid #04c");

    var tree = new BinarySearchTree();
    var jsonNodes;

    //click event for "Add node" button
    $("#addNode").click(function(){
        var node = parseInt($("input").val());

        $("input").val("");

        tree.add(node);
        console.log(tree.toArray());

        computeNodePositions(tree);
        jsonNodes = convertToJSON(scaleCoordinates(getNodeData(tree)));

        //clear the screen
        svgContainer.selectAll("circle").remove();
        svgContainer.selectAll("line").remove();
        svgContainer.selectAll("text").remove();

        //draw the BST
        drawLines(tree, svgContainer);
        drawNodes(tree, svgContainer,jsonNodes);
        drawTextLabels(svgContainer, jsonNodes);
    });// end click

/*    var tree = new BinarySearchTree();
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

    computeNodePositions(tree);
    var jsonNodes = convertToJSON(scaleCoordinates(getNodeData(tree)));

    // create the SVG coordinate space
    var svgContainer = d3.select("#svgContainer").append("svg")
        .attr("width", 1000)
        .attr("height", 1000)
        .style("border", "1px solid black");

    //draw the BST
    drawLines(tree, svgContainer);
    drawNodes(tree, svgContainer,jsonNodes);
    drawTextLabels(svgContainer, jsonNodes);
*/    
});// end ready
       