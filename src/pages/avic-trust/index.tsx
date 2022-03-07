import React from 'react';
import styles from './index.module.less';
import Flow from './components/FLow';
import Form from './components/Form';

export default function Comp() {
    return (
        <div className={styles.container}>
            <Flow />
            <Form />
        </div>
    )
}