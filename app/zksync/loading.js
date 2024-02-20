"use client"
import React from 'react';
import {Audio} from 'react-loader-spinner'

export default function Loading() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Audio
                height="100"
                width="100"
                color='#1677FF'
                ariaLabel='loading'
            />
        </div>
    );
}
