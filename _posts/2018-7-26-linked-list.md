---
layout : post
title :	Linked List
desc : <div class="tag">Data Structure</div><div class="tag">Python</div></br>An implementation of linked list data structure from scratch. 15 different opperations are implemented in python with test case for each operation.
img  : ../public/post-assets/DataStructure/LinkedList/title.gif
---

<a href="https://github.com/DungLai/dunglai.github.io/blob/master/public/post-assets/DataStructure/LinkedList/Linked_List.ipynb"><strong>Download Jupyter/IPython Notebook here<strong></a>

# Comparing Array and Linked List

### 1. Array

Fixed size, contain elements of same  data type. 
When array is full, we need to create a new array with double the size and free the memory for former array.
Insertion and deletion make almost all element moved/shifted

1. Access: read/write element at any position: O(1) - best thing about array
2. Insert, worst case is insert at the first position so all elements are shifted: O(n), insert at last position costs O(1)
3. Remove, remove first element cost O(n) and remove last element costs O(1)
4. Add, when array reaches max size, we need to copy all elements into new array: O(n), when not max size, it costs O(1)

### 2. Linked list

Linked list is non-consecutive nodes in memory, each node stores the actual data and the link to the next node (the address of the next node). 

Good thing is that each node cost small memory and all nodes doesnt take a long chunk in memory.

Althought the total memory is a bit larger (carry a pointer every element), if data is big, carrying a pointer is not a big deal

First node: Head node, this gives access of completed list
Last node: Does not point to any node. So if we want to access an element in between, we need to start to ask the first node.

1. Access: O(n)
2. Insert O(1), indexing (finding the node) is O(n)

Implementation:

These implementations are done individually and independent to each other

1. size() - returns number of data elements in list - O(n)
2. is_empty() - bool returns true if empty - O(1)
3. value_at(index) - returns the value of the nth item (starting at 0 for first) O(n)
4. push_front(value) - adds an item to the front of the list O(1)
5. pop_front() - remove front item and return its value O(1)
6. push_back(value) - adds an item at the end O(1)
7. pop_back() - removes end item and returns its value O(n)
8. front() - get value of front item O(1)
9. back() - get value of end item O(1)
10. insert(index, value) - insert value at index, so current item at that index is pointed to by new item at index O(n)
11. erase(index) - removes node at given index O(n)
12. search(value) - return an a list containing the indexes of every items that match the value O(n)
13. reverse() - reverses the list, reverse_recursion() - reverse the list using recursion O(n)
14. clear() - empty the list O(1)
15. search() - search list and return the array that containt the position of the value that matched, index start at 0 O(n)

## Implementation


```python
class ListNode:
    "ListNode class, each node has data and the reference to the next node"
    
    def __init__(self, data):
        self.data = data
        self.next = None
```


```python
class SingleLinkedList:
    "class for single linked list: each node contain reference to next node"
    
    def __init__(self):
        "A LinkedList only has first node and last node "
        
        self.head = None 
        self.tail = None
```

```python        
    def size(self):
        "count the number of list items"
        
        count = 0 
        current_node = self.head
        
        while current_node is not None:
            count += 1
            current_node = current_node.next
        
        return count
```

```python    
    def is_empty(self):
        "check if the list is empty or not"
        
        if self.head is None:
            return True
        else:
            return False
```

```python            
    def value_at(self, index):
        "return the value of the nth element, index start at 0"
        
        current_index = 0
        current_node = self.head
        
        while current_node is not None:
            if current_index == index:
                return current_node.data
            
            current_index += 1
            current_node = current_node.next
            
        return "Error: Index out of range"
```

```python           
    def push_front(self, value):
        "push an item to the front of the list"
         
        # convert data type of item to ListNode data type
        if not isinstance(value, ListNode):
            value = ListNode(value)
        
        # when list is empty
        if self.head is None:
            self.head = value
            return 
        
        # when list has one element, has to fix tail when add new element
        if self.tail is None:
            self.tail = self.head
            self.tail.next = None
            self.head = value
            value.next = self.tail
            return
        
        # when list has at least 2 element
        value.next = self.head
        self.head = value 
        
        return 
```

```python    
    def pop_front(self):
        "remove front item and return its value"
        
        # when list is empty, return None, list remains unchanged
        if self.head is None:
            return None
        
        # when list has 1 item, return head value and remove head of list
        if self.tail is None:
            head_value = self.head.data
            self.head = None
            return head_value
        
        # when list has 2 items, return head value and remove head from list
        if self.head.next is self.tail:
            head_value = self.head.data
            self.head = self.tail
            self.head.next = None
            self.tail = None
            return head_value
        
        # when list has 3 items
        head_value = self.head.data
            
        # change head position of linked list
        self.head = self.head.next
        
        return head_value
```

```python        
    def push_back(self, item):
        "add item to end of list"
        
        # convert data type of item to ListNode data type
        if not isinstance(item, ListNode):
            item = ListNode(item)
        
        # when list is empty then the value being added becomes head, otherwise it becomes 
        if self.head is None:
            self.head = item
            return
        # when list has 1 item
        elif self.tail is None:
            self.tail = item
            self.head.next = item
            return
        else:
            self.tail.next = item
            self.tail = item 
            return
```

```python        
    def pop_back(self):
        "removes end item and returns its value"
        
        # edge case
        # when list is empty
        if self.head is None:
            self.head = None
            return None
        
        # when list has 1 item, head is the last element
        if self.tail is None:
            head_value = self.head.data
            self.head = None
            return head_value
        
        # when list has 2 items, remove tail and return it
        if self.head.next is self.tail:
            tail_value = self.tail.data
            self.tail = None
            self.head.next = None
            return tail_value
        
        # when list has at least 3 items
        previous_node = None
        current_node = self.head
        
        # traverse the whole list to get the last node
        while current_node.next is not None:
            previous_node = current_node
            current_node = current_node.next
        
        tail_value = self.tail.data
        
        # current_node.next is none when current_node is the last node
        self.tail = previous_node
        previous_node.next = None
            
        return tail_value
```

```python    
    def front(self):
        "get value of front item"
        
        if self.head is None:
            return None
        else:
            return self.head.data
    
    def back(self):
        "get value of end item"
        
        if self.tail is None:
            return None
        else:
            return self.tail.data
```

```python        
    def insert(self, index, value):
        "insert value at index, put value at position index so current item at that index is pointed to the new item at index, index starts at 0"
        
        success_msg = "Node inserted succesfully at index %s" % index
        fail_msg = "Error: index %s out of range, unable to insert" % index
        
        # convert value to ListNode type if not already
        if not isinstance(value, ListNode):
            value = ListNode(value)
        
        # edge case: list is empty, there will be no next node
        if self.head is None:
            if index == 0:
                self.head = value
                return success_msg
            else:
                return fail_msg
        
        # when list has 1 item, we have to fix tail
        if self.tail is None: 
            # insert to head
            if index == 0:
                self.tail = self.head
                self.head = value
                value.next = self.tail
                return success_msg
            
            # insert to tail
            if index == 1:
                self.tail = value
                self.head.next = value
                return success_msg
        
        # when list has at least 2 items, put value in the position index 
        current_index = 0 

        previous_node = None
        current_node = self.head
        
        while current_node.next is not None:
            # insert to head
            if index == 0:
                value.next = self.head
                self.head = value
                return success_msg
            
            # insert to the middle of the list
            if current_index == index:
                # insert new node
                previous_node.next = value
                value.next = current_node
                return success_msg
            
            # increment index
            current_index += 1
            previous_node = current_node
            current_node = current_node.next
            
        # when current_node.next is none, it mean we have traversed the whole list insert to tail
        if current_node.next is None and current_index == index:
            current_node.next = value
            self.tail = value
            return success_msg
        
        return fail_msg
```

```python
    def print(self):
        "outputs all value of list"
        
        current_node = self.head
        
        while current_node is not None:
            print(current_node.data, end=' ')
            current_node = current_node.next
        
        print()
```

```python    
    def erase(self, index):
        "remove a node from the list by its position, change the referece of the node that point to them to the reference of next node from the deleted node, unrefereced data will be taken by python garbage collector"
        
        success_msg = "Node deleted successfully at index %s" % index
        fail_msg = "Error: index %s out of range, unable to delete" %index
        
        # When list is empty 
        if self.head is None:
            return fail_msg
        
        # When list has 1 item
        if self.tail is None:
            if index == 0:
                self.head = None
                return success_msg
        
        # When list has 2 items, has to remove tail
        if self.head.next is self.tail:
            # when erase head
            if index == 0:
                self.head = self.tail
                self.head.next = None
                self.tail = None
                return success_msg
            # when erase tail
            if index == 1:
                self.tail = None
                self.head.next = None
                return success_msg
            
            return fail_msg
        
        # when list has at least 3 items
        
        current_index = 0
        
        previous_node = None
        current_node = self.head
        
        while current_node is not None:
            if current_index == index: 
                
                # when erase the first node
                if previous_node is None: # if current_node is head
        
                    # when erase first node, the second node become the head
                    self.head = current_node.next
                
                    # remove the current node to free memory
                    current_node = None
                    
                    return success_msg
                
                # when erase last node
                if current_node.next is None: # if current_node is tail
                    previous_node.next = None # current_node will be collected by python garbage collector
                    self.tail = previous_node
                    return success_msg
                    
                # when erase a node in the middle of the list, change reference of the node before the one being deleted
                previous_node.next = current_node.next
                
                return success_msg
            
            current_index +=1
            previous_node = current_node
            current_node = current_node.next
        
        return fail_msg
```

```python
    def search(self, value):
        "search list and return the array that containt the position of the value that matched, index start at 0"
        
        results = [] 
        
        index = 0
        current_node = self.head
        
        while current_node is not None:
            
            if current_node.data == value:
                results.append(index)
                
            index += 1
            current_node = current_node.next
            
        return results
```

```python    
    def reverse(self):
        "reverse the referencing order of linked list using iterative method"
        
        previous_node = None
        current_node = self.head
        
        self.tail = self.head
        
        while current_node is not None:
            
            # store next node because the pointer to the next node will be change after that
            next_node = current_node.next
            
            # change pointer of each node to the previous node
            current_node.next = previous_node
            
            # shift the position of current and previous node
            previous_node = current_node
            current_node = next_node
        
        # previous node is the last node, make it the head of single linked list
        self.head = previous_node
```

```python    
    def reverse_recursion(self, head):
        "reverse a linked list using recursion method given the head node"
        
        # cannot use self.head instead of head because head is updated in recursion while self.head is a fixed value, self doesn't change
        
        self.tail = self.head
        current_node = head
        rest = current_node.next
        
        if rest is None:
            # rest is null when current_node is the last node of the list
            self.tail = self.head
            self.head = current_node
            return 
        
        self.reverse_recursion(rest)
        
        # create a reverse the link between current_node and the next node of it
        current_node.next.next = current_node
        
        # remove the the original link
        current_node.next = None
```

```python    
   def clear(self):
        "empty the list, python garbage collector will clear unreferenced memory"
        self.head = None
        self.tail = None
```

## Testing


```python
# function for testing

def print_list_infor(list):
    "print head,tail and the actual list"
    print("Front: %s, Back: %s" % (list.front(), list.back()))
    print("Actual list: ", end="")
    list.print()
    print()

```

### Test size(), push_front(), is_empty()


```python
list = SingleLinkedList()
print("Size of empty list: %s" % list.size(), end = "\n")
print("Is empty value: %s" % list.is_empty())
print()

list.push_front(2)
print_list_infor(list)

list.push_front(1)
print_list_infor(list)


print("List size: %s, actual list: " % list.size(), end = "")
list.print()

```

    Size of empty list: 0
    Is empty value: True
    
    Front: 2, Back: None
    Actual list: 2 
    
    Front: 1, Back: 2
    Actual list: 1 2 
    
    List size: 2, actual list: 1 2 
    

### Test value_at()


```python
print_list_infor(list)

print("Value at index -1: %s" % list.value_at(-1))
print("Value at index 0: %s" % list.value_at(0))
print("Value at index 1: %s" % list.value_at(1))
print("Value at index 2: %s" % list.value_at(2))
```

    Front: 1, Back: 2
    Actual list: 1 2 
    
    Value at index -1: Error: Index out of range
    Value at index 0: 1
    Value at index 1: 2
    Value at index 2: Error: Index out of range
    

### Test pop_front()


```python
list.push_front(3)
print_list_infor(list)


print("Value return by pop front: %s" % list.pop_front())
print_list_infor(list)


print("Value return by pop front: %s" % list.pop_front())
print_list_infor(list)

print("Value return by pop front: %s" % list.pop_front())
print_list_infor(list)


print("Value return by pop front: %s" % list.pop_front())
print_list_infor(list)
```

    Front: 3, Back: 2
    Actual list: 3 1 2 
    
    Value return by pop front: 3
    Front: 1, Back: 2
    Actual list: 1 2 
    
    Value return by pop front: 1
    Front: 2, Back: None
    Actual list: 2 
    
    Value return by pop front: 2
    Front: None, Back: None
    Actual list: 
    
    Value return by pop front: None
    Front: None, Back: None
    Actual list: 
    
    

### Test push_back()


```python
print("Actual list: ", end="")
print_list_infor(list)

list.push_back(1)
print_list_infor(list)

list.push_back(2)
print_list_infor(list)
```

    Actual list: Front: None, Back: None
    Actual list: 
    
    Front: 1, Back: None
    Actual list: 1 
    
    Front: 1, Back: 2
    Actual list: 1 2 
    
    

### Test pop_back()


```python
list.push_back(3)
print_list_infor(list)

print("Value return by pop back: %s" % list.pop_back())
print_list_infor(list)

print("Value return by pop back: %s" % list.pop_back())
print_list_infor(list)

print("Value return by pop back: %s" % list.pop_back())
print_list_infor(list)

print("Value return by pop back: %s" % list.pop_back())
print_list_infor(list)
```

    Front: 1, Back: 3
    Actual list: 1 2 3 
    
    Value return by pop back: 3
    Front: 1, Back: 2
    Actual list: 1 2 
    
    Value return by pop back: 2
    Front: 1, Back: None
    Actual list: 1 
    
    Value return by pop back: 1
    Front: None, Back: None
    Actual list: 
    
    Value return by pop back: None
    Front: None, Back: None
    Actual list: 
    
    

### Test front() back()


```python
print("Front: %s, Back: %s" % (list.front(), list.back()))
print("Actual list: ", end="")
list.print()
print()

list.push_back(3)
print("Actual list: ", end="")
list.print()
print("Front: %s, Back: %s" % (list.front(), list.back()))
print()

list.push_back(2)
print("Actual list: ", end="")
list.print()
print("Front: %s, Back: %s" % (list.front(), list.back()))
print()

list.push_back(1)
print("Actual list: ", end="")
list.print()
print("Front: %s, Back: %s" % (list.front(), list.back()))
print()

```

    Front: None, Back: None
    Actual list: 
    
    Actual list: 3 
    Front: 3, Back: None
    
    Actual list: 3 2 
    Front: 3, Back: 2
    
    Actual list: 3 2 1 
    Front: 3, Back: 1
    
    

## Test insert(index,value)


```python
list.clear()
print_list_infor(list)

print(list.insert(-1,1))
print_list_infor(list)

print(list.insert(1,1))
print_list_infor(list)

print(list.insert(0,1))
print_list_infor(list)

print(list.insert(1,2))
print_list_infor(list)

print(list.insert(0,2))
print_list_infor(list)

print(list.insert(0,3))
print_list_infor(list)

print(list.insert(2,4))
print_list_infor(list)
```

    Front: None, Back: None
    Actual list: 
    
    Error: index -1 out of range, unable to insert
    Front: None, Back: None
    Actual list: 
    
    Error: index 1 out of range, unable to insert
    Front: None, Back: None
    Actual list: 
    
    Node inserted succesfully at index 0
    Front: 1, Back: None
    Actual list: 1 
    
    Node inserted succesfully at index 1
    Front: 1, Back: 2
    Actual list: 1 2 
    
    Node inserted succesfully at index 0
    Front: 2, Back: 2
    Actual list: 2 1 2 
    
    Node inserted succesfully at index 0
    Front: 3, Back: 2
    Actual list: 3 2 1 2 
    
    Node inserted succesfully at index 2
    Front: 3, Back: 2
    Actual list: 3 2 4 1 2 
    
    

### Test erase(index)


```python
print("Actual list: ", end="")
print_list_infor(list)

print(list.erase(1))
print_list_infor(list)

print(list.erase(0))
print_list_infor(list)

print(list.erase(3))
print_list_infor(list)

print(list.erase(2))
print_list_infor(list)

print(list.erase(0))
print_list_infor(list)

print(list.erase(0))
print_list_infor(list)
```

    Actual list: Front: 3, Back: 2
    Actual list: 3 2 4 1 2 
    
    Node deleted successfully at index 1
    Front: 3, Back: 2
    Actual list: 3 4 1 2 
    
    Node deleted successfully at index 0
    Front: 4, Back: 2
    Actual list: 4 1 2 
    
    Error: index 3 out of range, unable to delete
    Front: 4, Back: 2
    Actual list: 4 1 2 
    
    Node deleted successfully at index 2
    Front: 4, Back: 1
    Actual list: 4 1 
    
    Node deleted successfully at index 0
    Front: 1, Back: None
    Actual list: 1 
    
    Node deleted successfully at index 0
    Front: None, Back: None
    Actual list: 
    
    

### Test reverse(), reverse_recursion()


```python
list.push_front(1)
list.push_front(3)
list.push_front(4)
list.push_front(5)

print_list_infor(list)

list.reverse()
print("List reversing...")
print_list_infor(list)

list.reverse_recursion(list.head)
print("List reversing...")
print_list_infor(list)
```

    Front: 5, Back: 1
    Actual list: 5 4 3 1 
    
    List reversing...
    Front: 1, Back: 5
    Actual list: 1 3 4 5 
    
    List reversing...
    Front: 5, Back: 1
    Actual list: 5 4 3 1 
    
    
