A binary search tree is a data structure (a way of storing data) with the following properties:
<ul>
  <li>Each node has a unique key value.</li>
  <li>The left subtree of a node n contains only nodes with keys less than node n's key.</li>
  <li>The right subtree of a node n contains only nodes with keys greater than node n's key.</li>
  <li>Both the left and right subtrees are also binary search trees.
  <li>There can be no duplicate nodes.</li>
</ul>

This project implements a visualization for a binary search tree.  The nodes currently only accept numbers (ex. 35).

Currently implemented features:
<ul>
  <li>The user can add nodes via an input field/button and remove nodes by clicking the node.</li>
  <li>The "Animated add" button takes the user through the process of inserting a node into the tree.</li>
  <li>The "Delete all nodes" button deletes all the nodes from the tree and clears the workspace.
</ul>

Features that I'd like to implement:
<ul>
  <li>Animating the deletion process so that the user can understand how nodes are removed from the tree</li>
  <li>A popover for each node that will display its contents</li>     
</ul>  

FAQ's: <br>
<ol>
  <li>Why does entering 20, 5, 30 produce a different tree than entering 30, 5, 20?
    <ul>
      <li>The order of insertion matters in a binary search tree.  A different insertion order will produce
      a different tree.</li>
    </ul>  
  </li>
</ol>

