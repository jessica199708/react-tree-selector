import React, { useState } from 'react';
import './assets/tree.css'

export default () => {
    const [orgData, setData] = useState(dataInit([   // Hook使得function组件有状态，第一次渲染时初始化数据
        {
            id: 0, title: '浙江', children: [
                {
                    id: 10, title: '杭州', children: [
                        { id: 100, title: '上城区' },
                        { id: 101, title: '下城区' },
                        { id: 102, title: '江干区' },
                        { id: 103, title: '拱墅区' },
                        { id: 104, title: '西湖区' },
                        { id: 105, title: '滨江区' },
                        { id: 106, title: '萧山区' },

                    ]
                },
                {
                    id: 11, title: '宁波', children: [
                        { id: 110, title: '余姚市' },
                        { id: 111, title: '慈溪市' },
                        { id: 112, title: '奉化市' },
                    ]
                }
            ]
        },
        {
            id: 1, title: '江苏', children: [
                { id: 20, title: '南京' },
                { id: 21, title: '南通' },
                { id: 22, title: '无锡' },
                { id: 23, title: '扬州' },
                { id: 24, title: '苏州' },
                { id: 25, title: '连云港' },
            ]
        },
        { id: 2, title: '上海' }
    ], null));  // 根节点的父组件为空

    // 初始化数据
    function dataInit(data, parent) {
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

    function getChecked(item) {   // 子选项的选择与否影响父选项
        var childUnchecked = item.children.map(item => item.onSelect).indexOf('') !== -1;
        var childChecked = item.children.map(item => item.onSelect).indexOf('checked') !== -1;
        var childHalf = item.children.map(item => item.onSelect).indexOf('half') !== -1;
        if (childUnchecked && !childChecked && !childHalf) return ''  //子选项都为空 父选项为空
        else if (childChecked && !childUnchecked && !childHalf) return 'checked' //子选项全选 父选项为全选
        else return 'half' //子选项部分选择 父选项为半选
    }



    function adjustChecked(item) {  // 父选项如果被勾选那么其子选项全部被勾选
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

    function countCheck(item) {   // 改变selectMode的状态
        if (item.parent) {
            var counter = 0;
            var childList = item.parent.children;
            for (let i in childList) {
                if (childList[i].onSelect == 'checked') {
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

    const Tree = ({ data }) => (   // 树形选择组件
        <ul className='tree'>
            {data.map(item => (
                <li className={`tree-item ${item.open}`} key={item.id}>
                    <div className='tree-title'>
                        <div className={`folder ${item.open}`} onClick={() => {  // 是否点击下拉菜单打开子选项
                            if (item.open !== '') {
                                if (item.open == 'open') {
                                    item.open = 'close';
                                } else {
                                    item.open = 'open';
                                }
                                setData([...orgData]);  // 重新渲染更新状态后的数据
                            }
                        }} />
                        <div className={`checkbox ${item.onSelect}`} onClick={() => {  // 是否选择当前选项
                            if (item.onSelect == '') {
                                item.onSelect = 'checked';
                            } else {
                                item.onSelect = '';
                            }
                            adjustChecked(item);
                            countCheck(item);
                            setData([...orgData]); // 重新渲染更新状态后的数据
                            console.log(orgData)
                            // console.log(item) // 当前被选中的项 
                            // eg: {id: 20, title: "南京", open: "", parent: {…}, onSelect: "checked"}
                        }} />
                        <div className='item'>{item.title}</div>
                    </div>
                    {item.children ? (
                        <Tree data={item.children} />
                    ) : ''}
                </li>
            ))}
        </ul>
    );

    return <Tree data={orgData} />
}