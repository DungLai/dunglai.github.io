https://www.youtube.com/playlist?list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P

## Data structure course by mycodeschool

Overal: Array, list, linked list

### 1. Data structure

A way to store and organize data in a computer so that it can be used efficiently 

When talking about data structure, we care about

1. Logical view
2. Operations
3. Cost of operations (time complexity)
4. Implementation

### 2. Array

Fixed size, contain elements of same  data type. 
When array is full, we need to create a new array with double the size and free the memory for former array.
Insertion and deletion make almost all element moved/shifted

1. Access: read/write element at any position: O(1) - best thing about array
2. Insert, worst case is insert at the first position so all elements are shifted: O(n), insert at last position costs O(1)
3. Remove, remove first element cost O(n) and remove last element costs O(1)
4. Add, when array reaches max size, we need to copy all elements into new array: O(n), when not max size, it costs O(1)

### 3. Linked list

Linked list is non-consecutive nodes in memory, each node stores the actual data and the link to the next node (the address of the next node). 

Good thing is that each node cost small memory and all nodes doesnt take a long chunk in memory.

Althought the total memory is a bit larger (carry a pointer every element), if data is big, carrying a pointer is not a big deal

First node: Head node, this gives access of completed list
Last node: Does not point to any node. So if we want to access an element in between, we need to start to ask the first node.

1. Access: O(n)
2. Insert: need to create a new node and adjust the pointer/link of its previous node: O(n) because we also need to find the position