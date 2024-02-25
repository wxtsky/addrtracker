"use client";
import React, {useState} from 'react';
import {Button, Modal, Input, message, Col, Row, Card, Typography, Space, Image} from 'antd';
import {useRouter} from 'next/navigation';
import {GithubOutlined, MessageOutlined} from '@ant-design/icons';
import axios from "axios";

const {TextArea} = Input;
const {Title, Text} = Typography;

const NavigationImage = ({src, alt, path, title}) => {
    const router = useRouter();
    return (
        <Col xs={12} sm={8} md={6} lg={4} xl={4}
             style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
            {/* 使用flex布局使得内容垂直排列，并居中对齐 */}
            <div>
                <Image
                    src={src}
                    alt={alt}
                    width={100}
                    preview={false}
                    onClick={() => router.push(path)}
                    style={{cursor: 'pointer'}}
                />
            </div>
            <div style={{marginTop: 8}}> {/* 添加一些间距 */}
                <Text>{title}</Text>
            </div>
        </Col>
    );
};

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackContent, setFeedbackContent] = useState('');
    const navigationImages = [
        {src: "/zkera.png", alt: "zkSync", path: "/zksync", title: "zkSync"},
        {src: "/linea.png", alt: "Linea", path: "/linea", title: "Linea"},
        {src: "/base.png", alt: "Base", path: "/base", title: "Base"},
        {src: "/scroll.png", alt: "Scroll", path: "/scroll", title: "Scroll"},
    ];


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
        <Row justify="center" align="middle" style={{padding: '24px'}}>
            <Col span={24} lg={16} xl={12}>
                <Card>
                    <Typography>
                        <Title level={2} style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}>AddrTracker</Title>
                    </Typography>
                    <Row gutter={[16, 16]} justify="center">
                        {navigationImages.map(({src, alt, path, title}) => (
                            <NavigationImage key={src} src={src} alt={alt} path={path} title={title}/>
                        ))}
                    </Row>
                    <Space direction="vertical" size="middle"
                           style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: 24}}>
                        <Button block icon={<GithubOutlined/>} size="large" type="link"
                                style={{marginTop: '16px'}}
                                onClick={() => window.open('https://github.com/wxtsky/addrtracker', '_blank')}>GitHub(求一个⭐,很需要~~)</Button>
                        <Button block icon={<MessageOutlined/>} size="large" type="primary"
                                style={{marginTop: '16px'}}
                                onClick={showModal}>提交反馈(请您畅所欲言~~)</Button>
                    </Space>
                </Card>
            </Col>
            <Modal title="提交反馈" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} style={{top: 20}}>
                <Input placeholder="请输入反馈标题" value={feedbackTitle}
                       onChange={(e) => setFeedbackTitle(e.target.value)} style={{marginBottom: 8}}/>
                <TextArea placeholder="请输入您的反馈内容..." value={feedbackContent}
                          onChange={(e) => setFeedbackContent(e.target.value)} rows={4} style={{marginBottom: 8}}/>
            </Modal>
        </Row>
    );
}
