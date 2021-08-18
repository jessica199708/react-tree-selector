
export function dataInit(data, parent) {
    return data.map(item => {
        if (item.children && item.children.length > 0) { // 如果当前节点有子节点
            item.open = 'close';  // 初始化的时候所有子节点收起
            item.children = dataInit(item.children, item);  // 递归其子节点
        } else {
            item.open = ''; //如果没有子节点则没有下拉单
        }
        item.selectMode = '';
        item.parent = parent;
        item.onSelect = ''; //初始化所有节点都没被选中
        item.selectMode = 'Single';  //初始化时所有节点都为Single
        return item
    });
}


export function getChecked(item) {   // 子选项的选择与否影响父选项
    var childUnchecked = item.children.map(item => item.onSelect).indexOf('') !== -1;
    var childChecked = item.children.map(item => item.onSelect).indexOf('checked') !== -1;
    var childHalf = item.children.map(item => item.onSelect).indexOf('half') !== -1;
    if (childUnchecked && !childChecked && !childHalf) return ''  //子选项都为空 父选项为空
    else if (childChecked && !childUnchecked && !childHalf) return 'checked' //子选项全选 父选项为全选
    else return 'half' //子选项部分选择 父选项为半选
}


export function adjustChecked(item) {  // 父选项如果被勾选那么其子选项全部被勾选
    let parent = item.parent;
    while (parent) {  // 循环父级的父级直到根节点
        parent.onSelect = getChecked(parent);
        parent = parent.parent;
    }
    if (item.children && item.children.length > 0) adjust(item.children, item.onSelect);
    function adjust(arr, checked) {  // 调整子选项与父选项保持一致
        arr.forEach(item => {
            item.onSelect = checked;
            if (item.children && item.children.length > 0) adjust(item.children, item.onSelect);
        })
    }
}

export function countCheck(item) {   // 改变selectMode的状态
    if (item.parent) {
        var counter = 0;
        var childList = item.parent.children;
        for (let i in childList) {
            if (childList[i].onSelect === 'checked') {
                counter++;
                if (counter > 1) {
                    item.parent.selectMode = 'Multiple';
                    var grandParent = item.parent.parent
                    while (grandParent) {
                        grandParent.selectMode = 'Multiple';
                        grandParent = grandParent.parent
                    }
                }
            }
        }
    }
}