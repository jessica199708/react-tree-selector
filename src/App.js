import React, { useState } from 'react';
import { dataInit, adjustChecked, countCheck } from './tree/tree.jsx'
import './tree/tree.css'

function App() {
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


    const Tree = ({ data }) => (   // 树形选择组件
        <ul className='tree'>
            {data.map(item => (
                <li className={`tree-item ${item.open}`} key={item.id}>
                    <div className='tree-title'>
                        <div className={`folder ${item.open}`} onClick={() => {  // 是否点击下拉菜单打开子选项
                            if (item.open !== '') {
                                if (item.open === 'open') {
                                    item.open = 'close';
                                } else {
                                    item.open = 'open';
                                }
                                setData([...orgData]);  // 重新渲染更新状态后的数据
                            }
                        }} />
                        <div className={`checkbox ${item.onSelect}`} onClick={() => {  // 是否选择当前选项
                            if (item.onSelect === '') {
                                item.onSelect = 'checked';
                            } else {
                                item.onSelect = '';
                            }
                            adjustChecked(item);
                            countCheck(item);
                            setData([...orgData]); // 重新渲染更新状态后的数据
                            console.log(item) // 当前被选中的项 
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

export default App