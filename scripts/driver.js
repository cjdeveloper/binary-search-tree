/*Creates the SVG coordinate space and the binary search tree in addition 
to setting up the click events on the buttons*/

$(document).ready(function() {

     // hide delete alert when page is loaded
     $("#deleteAlert").hide();

    // create the SVG coordinate space
    var svgContainer = d3.select("#svgContainer").append("svg")
        .attr("width", 1000)
        .attr("height", 1000)
        .style("border", "1px solid #04c");

    var tree = new BinarySearchTree();
    var jsonNodes;

    //click event for "Add node" button
    $("#addNode").click(function(){
        var node = parseInt($("#addInput").val());

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
        drawNodes(tree, svgContainer, jsonNodes);
        drawTextLabels(svgContainer, jsonNodes);
    });// end click

    // click event for the "Animated add" button
    $("#animatedAdd").click(function(){
        var nodeValue = parseInt($("#animatedAddInput").val());

        $("input").val("");
        console.log(nodeValue);
        tree.add(nodeValue);
        var animatedNode = tree.getNode(nodeValue);
        console.log(tree.toArray());

        computeNodePositions(tree);
        jsonNodes = convertToJSONwithoutAnimatedNode(scaleCoordinates(getNodeData(tree)), 
            nodeValue);

        //clear the screen
        svgContainer.selectAll("circle").remove();
        svgContainer.selectAll("line").remove();
        svgContainer.selectAll("text").remove();

        drawLines(tree, svgContainer);
        drawNodes(tree, svgContainer, jsonNodes);
        drawTextLabels(svgContainer, jsonNodes);
        drawAnimatedNode(tree, svgContainer, animatedNode, 200, tree._root.cy)
    });// end click

    $("#delete").click(function(){
        $("#deleteAlert").show();
    });// end click

    $("#deleteConfirm").click(function(){
        tree._root = null;
        svgContainer.selectAll("circle").remove();
        svgContainer.selectAll("line").remove();
        svgContainer.selectAll("text").remove();
        $("#deleteAlert").hide();
    }); // end click

    $("#closeAlert").click(function(){
        $("#deleteAlert").hide();
    }); // end click

});// end ready       