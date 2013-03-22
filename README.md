A binary search tree is a data structure (a way of storing data) with the following properties:
<ul>
  <li>Each node has a unique key value.</li>
  <li>The left subtree of a node n contains only nodes with keys less than node n's key.</li>
  <li>The right subtree of a node n contains only nodes with keys greater than node n's key.</li>
  <li>Both the left and right subtrees are also binary search trees.
  <li>There are no duplicate nodes.</li>
</ul>

This project allows the user to visualize a binary search tree.
The user can currently add nodes via an input field/button and remove nodes by clicking the node.
The nodes currently only accept numbers (ex. 35). 

Features that I'd like to implement:
<ul>
  <li>Animating the insertion and deletion process so that the user can understand how nodes are added 
      or removed from the tree</li>
  <li>A popover for each node that will display its contents</li>     
  <li>A clear button to clear the nodes from the graph when the user has finished</li>
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

