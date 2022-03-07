import React from 'react';
import styles from './index.module.less';
import { ActivityIndicator } from 'antd-mobile';

export default function Comp() {
    return (
        <div className={styles.container}>
            <ActivityIndicator
                text="Loading..."
                size="large"
            />
        </div>
    )
}