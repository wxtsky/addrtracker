"use client";
import React, {useEffect, useState} from 'react';
import {ProTable} from "@ant-design/pro-components";
import {Button, Input, message, Modal, Spin, Typography} from 'antd';
import getZksyncData from "@/services/zksync";

const {Text} = Typography;
const {TextArea} = Input;


const App = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addresses, setAddresses] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            render: (_, record, index) => <span style={{fontWeight: 'bold', color: 'blue'}}>{index + 1}</span>,
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            width: 350,
            search: true,
        },
        {
            title: '备注',
            dataIndex: 'note',
            key: 'note',
            render: (text) => <Text strong>{text}</Text>,
            ellipsis: true,
        },
        {
            title: '主网',
            dataIndex: 'mainnet',
            key: 'mainnet',
            children: [
                {
                    title: '余额(E)',
                    dataIndex: 'mainnet_balance',
                    key: 'mainnet_balance',
                    align: 'right',
                },
                {
                    title: 'TX数量',
                    dataIndex: 'mainnet_tx',
                    key: 'mainnet_tx',
                    align: 'right',
                },
            ],
        },
        {
            title: 'zkSync Era',
            dataIndex: 'zksync',
            key: 'zksyncera',
            children: [
                {
                    title: '余额(E)',
                    dataIndex: 'era_balance',
                    key: 'era_balance',
                    align: 'right',
                },
                {
                    title: 'TX',
                    dataIndex: 'era_tx',
                    key: 'era_tx',
                    align: 'right',
                },
                {
                    title: '日活',
                    dataIndex: 'era_day',
                    key: 'era_day',
                    align: 'right',
                },
                {
                    title: '周活',
                    dataIndex: 'era_week',
                    key: 'era_week',
                    align: 'right',
                },
                {
                    title: '月活',
                    dataIndex: 'era_month',
                    key: 'era_month',
                    align: 'right',
                },
                {
                    title: 'VOL(E)',
                    dataIndex: 'era_vol',
                    key: 'era_vol',
                    align: 'right',
                },
            ],
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, record) => (
                <Button type="link" onClick={() => handleDelete(record.key)}>删除</Button>
            ),
        }
    ];
    const refreshSelectedData = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请先选择至少一个地址');
            return;
        }
        setLoading(true);
        const updates = await Promise.all(
            data.filter(item => selectedRowKeys.includes(item.key)).map(async item => {
                const updatedData = await getZksyncData(item.address);
                return {...item, ...updatedData};
            })
        );
        const newData = data.map(item => {
            const update = updates.find(u => u.key === item.key);
            return update || item;
        });
        setData(newData);
        setLoading(false);
        message.success('选中的地址数据已刷新');
    };

    useEffect(() => {
        const storedData = localStorage.getItem('zksyncData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
        setIsInitialLoad(false);
    }, []);

    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem('zksyncData', JSON.stringify(data));
        }
    }, [data, isInitialLoad]);
    const fetchData = async () => {
        setIsModalVisible(false);
        setLoading(true);
        const uniqueAddresses = new Set(addresses.split(/[\s,]+/).filter(Boolean));
        const total = uniqueAddresses.size;
        let count = 0;
        for (const address of uniqueAddresses) {
            const res = await getZksyncData(address);
            const index = data.findIndex(item => item.address === address);
            if (index > -1) {
                data[index] = res;
            } else {
                setData(data => [...data, res]);
            }
            count += 1;
            setProgress((count / total) * 100);
            if (count === total) {
                setLoading(false);
                message.success('所有地址的数据已更新');
            }
        }
    };
    const handleDelete = (key) => {
        const newData = data.filter(item => item.key !== key);
        setData(newData);
        message.success('地址已删除');
    }
    return (
        <>
            <Spin spinning={loading} tip="加载中...">
                <ProTable
                    columns={columns}
                    dataSource={data}
                    rowKey="address"
                    bordered
                    pagination={{
                        showQuickJumper: true,
                    }}
                    search={false}
                    scroll={{x: 1300, y: 600}}
                    sticky
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
                    toolBarRender={() => [
                        <Button key="addAddress" type="primary" onClick={() => setIsModalVisible(true)}>
                            添加地址
                        </Button>,
                        <Button key="refreshSelected" type="default" onClick={refreshSelectedData}
                                disabled={selectedRowKeys.length === 0}>
                            刷新选中行数据
                        </Button>,
                    ]}
                />
            </Spin>
            <Modal
                title="输入地址"
                open={isModalVisible}
                onOk={fetchData}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                <TextArea
                    placeholder="请输入地址，多个地址请用逗号、空格或换行符分隔"
                    value={addresses}
                    onChange={(e) => setAddresses(e.target.value)}
                    style={{height: 400}}
                />
            </Modal>
        </>
    );
};

export default App;
