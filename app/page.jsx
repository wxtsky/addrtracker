"use client";
import {Button, Layout} from 'antd';
import {useRouter} from 'next/navigation';
import React from 'react';

const {Content, Footer} = Layout;

export default function Home() {
    const router = useRouter();

    return (
        <Layout className="layout" style={{minHeight: '100vh'}}>
            <Content style={{
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <div className="site-layout-content" style={{maxWidth: '600px', textAlign: 'center', width: '100%'}}>
                    <h1>欢迎来到区块链交互查询网站</h1>
                    <h2>
                        持续优化中...
                    </h2>
                    <p>请选择下方按钮进行导航</p>
                    <Button
                        type="primary"
                        onClick={() => router.push('/zksync')}
                        style={{margin: '0 8px'}}
                    >
                        zkSync
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => router.push('/linea')}
                        style={{margin: '0 8px'}}
                    >
                        Linea
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => router.push('/base')}
                        style={{margin: '0 8px'}}
                    >
                        Base
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => router.push('/scroll')}
                        style={{margin: '0 8px'}}
                    >
                        Scroll
                    </Button>
                </div>
            </Content>
            <Footer style={{textAlign: 'center', position: 'sticky', bottom: 0, width: '100%'}}>
                Addr Tracker ©2024
            </Footer>
        </Layout>
    );
}
