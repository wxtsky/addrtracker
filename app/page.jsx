"use client";
import React, {useState} from 'react';
import {Button, Modal, Input, message, Col, Row, Card, Typography, Space} from 'antd';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {
    GithubOutlined,
    MessageOutlined,
    PushpinOutlined,
    CloudServerOutlined,
    SettingOutlined
} from '@ant-design/icons';

const {TextArea} = Input;
const {Title, Paragraph} = Typography;

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackContent, setFeedbackContent] = useState('');
    const router = useRouter();

    const showModal = () => setIsModalVisible(true);

    const handleOk = async () => {
        try {
            const apiEndpoint = `https://api.day.app/T9gia4FCEd5NNmDCzHnNhT/${encodeURIComponent(feedbackTitle)}/${encodeURIComponent(feedbackContent)}`;
            await axios.post(apiEndpoint);
            message.success('反馈发送成功！');
            setIsModalVisible(false);
            setFeedbackTitle('');
            setFeedbackContent('');
        } catch (error) {
            console.error('反馈发送失败：', error);
            message.error('反馈发送失败，请稍后再试。');
        }
    };

    const handleCancel = () => setIsModalVisible(false);

    return (
        <Row justify="center" align="middle" style={{minHeight: '100vh', padding: '24px'}}>
            <Col span={24} lg={12} xl={10}>
                <Card>
                    <Typography>
                        <Title level={2} style={{textAlign: 'center'}}>区块链交互查询平台</Title>
                        <Paragraph style={{textAlign: 'center'}}>持续优化中... 请选择下方按钮进行导航。</Paragraph>
                    </Typography>
                    <Space direction="vertical" size="middle"
                           style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <Button
                            block
                            // icon={<CloudServerOutlined/>}
                            size="large"
                            onClick={() => router.push('/zksync')}
                        >
                            zkSync
                        </Button>
                        <Button
                            block
                            // icon={<SettingOutlined/>}
                            size="large"
                            onClick={() => router.push('/linea')}
                        >
                            Linea
                        </Button>
                        <Button
                            block
                            // icon={<PushpinOutlined/>}
                            size="large"
                            onClick={() => router.push('/base')}
                        >
                            Base
                        </Button>
                        <Button
                            block
                            // icon={<MessageOutlined/>}
                            size="large"
                            onClick={() => router.push('/scroll')}
                        >
                            Scroll
                        </Button>
                        <Button
                            block
                            icon={<GithubOutlined/>}
                            size="large"
                            type="link"
                            onClick={() => window.open('https://github.com/wxtsky/addrtracker', '_blank')}>
                            访问GitHub
                        </Button>
                        <Button block icon={<MessageOutlined/>} size="large" type="primary"
                                onClick={showModal}>提交反馈</Button>
                    </Space>
                </Card>
            </Col>
            <Modal title="提交反馈" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="请输入反馈标题" value={feedbackTitle}
                       onChange={(e) => setFeedbackTitle(e.target.value)} style={{marginBottom: 16}}/>
                <TextArea placeholder="请输入您的反馈内容..." value={feedbackContent}
                          onChange={(e) => setFeedbackContent(e.target.value)} rows={4}/>
            </Modal>
        </Row>
    );
}
