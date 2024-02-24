"use client";
import React, {useState} from 'react';
import {Button, Modal, Input, message, Col, Row, Card, Typography, Space, Image} from 'antd';
import {useRouter} from 'next/navigation';
import {GithubOutlined, MessageOutlined} from '@ant-design/icons';

const {TextArea} = Input;
const {Title, Paragraph} = Typography;

// 自定义图片导航组件
const NavigationImage = ({src, alt, path}) => {
    const router = useRouter();
    return (
        <Col xs={24} sm={12} md={8} lg={6}>
            <Image
                src={src}
                alt={alt}
                width={100} // 调整图片宽度
                preview={false}
                onClick={() => router.push(path)}
                style={{cursor: 'pointer'}}
            />
        </Col>
    );
};

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackContent, setFeedbackContent] = useState('');
    // 图片资源和路径配置
    const navigationImages = [
        {src: "/zkera.png", alt: "zkSync", path: "/zksync"},
        {src: "/linea.png", alt: "Linea", path: "/linea"},
        {src: "/base.png", alt: "Base", path: "/base"},
        {src: "/scroll.png", alt: "Scroll", path: "/scroll"},
    ];

    const showModal = () => setIsModalVisible(true);
    const handleOk = async () => { /* 发送反馈的逻辑 */
    };
    const handleCancel = () => setIsModalVisible(false);

    return (
        <Row justify="center" align="middle" style={{minHeight: '100vh', padding: '24px'}}>
            <Col span={24} lg={12} xl={10}>
                <Card>
                    <Typography>
                        <Title level={2} style={{textAlign: 'center'}}>AddrTracker</Title>
                    </Typography>
                    <Row gutter={[16, 16]} justify="center">
                        {navigationImages.map(({src, alt, path}) => (
                            <NavigationImage key={src} src={src} alt={alt} path={path}/>
                        ))}
                    </Row>
                    <Space direction="vertical" size="middle"
                           style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: 16}}>
                        <Button block icon={<GithubOutlined/>} size="large" type="link"
                                onClick={() => window.open('https://github.com/wxtsky/addrtracker', '_blank')}>GitHub(求一个⭐,很需要~~)</Button>
                        <Button block icon={<MessageOutlined/>} size="large" type="primary"
                                onClick={showModal}>提交反馈(请您畅所欲言~~)</Button>
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
