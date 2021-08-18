# React-Tree-Selector  
A React tree selector component that built without using React UI libraries. It can support multi-layer data structure and display their relationship in a tree structure. 


## Getting Started
```
cd Desktop
git clone https://github.com/jessica199708/react-tree-selector.git
npm start

```

## Symbols
There are two kinds of symbols appear in the structure design:
 - Dropdown button: if the item has chlidren in the data structure, there is a dropdown button locates before the item name.
 - Checkbox: for any item including root nodes and leaf nodes, a checkbox is displayed before them to indicate whether the item is selected or not.


## States
Three states for each node:
- open: 'open', 'close', ''
  - 'open': current item shows its children dropdown list, the arror points down.
  - 'close': current item close its children list, the arror points right.
  - '': if the item does not have children, no arror display before it.
- onSelect: 'checked', 'half', ''
  - 'checked': for the leaf node, if it is selected, a check mark will display in the checkbox. For the parent node, if all of its children node is selected, a check mark will also display in its checkbox.
  - 'half': leaf node does not have this state, it only appears in parent node when more than one but not all of its children nodes have been selected. A blue square shows in the checkbox to represent this state.
- selectMode: 'Single', 'Multiple'
  - 'Single': the initial state for each item, it incidates that each item is in the single choice mode.
  - 'Multiple': when more than one of the children items have been selected, the selectMode for the parent item changes to Multiple.


![gif](https://github.com/jessica199708/react-tree-selector/blob/main/gif/1.gif)

![gif](https://github.com/jessica199708/react-tree-selector/blob/main/gif/2.gif)

![gif](https://github.com/jessica199708/react-tree-selector/blob/main/gif/3.gif)

![gif](https://github.com/jessica199708/react-tree-selector/blob/main/gif/4.gif)
