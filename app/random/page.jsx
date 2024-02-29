"use client"
import React, {useState} from 'react';
import {Button, Input, Table, message, Space, Form, Row, Col} from 'antd';
import {DownloadOutlined, RedoOutlined} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import {useRouter} from "next/navigation";

const App = () => {
    const [form] = Form.useForm();
    const [dailyTasks, setDailyTasks] = useState([]);
    const [tableData, setTableData] = useState([]);
    const router = useRouter();
    const shuffleTasks = (totalTasks) => {
        let allTasks = Array.from({length: totalTasks}, (_, i) => i + 1);
        allTasks.sort(() => Math.random() - 0.5);
        return allTasks;
    };

    const generateTasks = () => {
        form.validateFields().then(values => {
            const {totalTasks, daysToComplete, fileName} = values;
            if (totalTasks <= 0 || daysToComplete <= 0 || !fileName) {
                message.error('请确保所有输入都是有效的，并且文件名已填写。');
                return;
            }

            const allTasks = shuffleTasks(totalTasks);
            const tasksPerDayMin = Math.floor(totalTasks / daysToComplete);
            const extraTasksDays = totalTasks % daysToComplete;
            const tasksList = [];
            let currentTaskIndex = 0;

            for (let day = 0; day < daysToComplete; day++) {
                const tasksToday = tasksPerDayMin + (day < extraTasksDays ? 1 : 0);
                const tasksForToday = allTasks.slice(currentTaskIndex, currentTaskIndex + tasksToday);
                tasksList.push({day: `Day ${day + 1}`, tasks: tasksForToday.join(', ')});
                currentTaskIndex += tasksToday;
            }

            setDailyTasks(tasksList);
            setTableData(tasksList.map((item, index) => ({
                key: index,
                day: item.day,
                tasks: item.tasks,
            })));
        }).catch(errorInfo => {
            console.error('Validate Failed:', errorInfo);
        });
    };

    const exportToExcel = () => {
        const {fileName} = form.getFieldsValue(['fileName']);
        if (!fileName || dailyTasks.length === 0) {
            message.error('请先生成任务列表并提供文件名。');
            return;
        }

        const wb = XLSX.utils.book_new();
        const ws_data = [];

        const maxTasksCount = Math.max(...dailyTasks.map(dt => dt.tasks.split(', ').length));
        for (let i = 0; i < maxTasksCount; i++) {
            ws_data.push(new Array(dailyTasks.length * 2).fill(null));
        }

        dailyTasks.forEach((task, index) => {
            const taskNumbers = task.tasks.split(', ');
            taskNumbers.forEach((taskNumber, taskIndex) => {
                ws_data[taskIndex][index * 2] = `${taskNumber}`;
            });
            ws_data[0][index * 2] = task.day;
        });

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, "Daily Tasks");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };


    const columns = [
        {title: 'Day', dataIndex: 'day', key: 'day'},
        {title: 'Tasks', dataIndex: 'tasks', key: 'tasks'},
    ];

    return (
        <Space direction="vertical" size="middle" style={{display: 'flex', maxWidth: 600, margin: '0 auto'}}>
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="totalTasks" label="任务总数"
                                   rules={[{required: true, message: '请输入任务总数'}]}>
                            <Input type="number"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="daysToComplete" label="完成天数"
                                   rules={[{required: true, message: '请输入完成天数'}]}>
                            <Input type="number"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="fileName" label="文件名" rules={[{required: true, message: '请输入文件名'}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" onClick={generateTasks}>生成</Button>
                    <Button icon={<DownloadOutlined/>} onClick={exportToExcel}>下载为Excel</Button>
                    <Button type="link" onClick={() => router.push('/')}>返回主页</Button>
                </Form.Item>
            </Form>
            <Table dataSource={tableData} columns={columns} pagination={false}/>
        </Space>
    );
};

export default App;
