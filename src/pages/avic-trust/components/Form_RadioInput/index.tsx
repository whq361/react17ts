import React, { Fragment } from 'react';
import styles from './index.module.less';

type Greeting = {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

const radioMap = [{
    id: 'truely',
    label: '是',
    value: 1,
}, {
    id: 'falsely',
    label: '否',
    value: 0,
}];

export default function Comp(props: Greeting) {

    const { label, value, onChange } = props;

    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.options}>
                {
                    radioMap.map((item) => (
                        <Fragment key={item.id}>
                            <input
                                className={styles.radio}
                                type="radio"
                                name="learned"
                                id={item.id}
                                value={item.value}
                                checked={value === item.value}
                                onChange={e => { onChange(Number(e.target.value)) }}
                            />
                            <label htmlFor={item.id}>{item.label}</label>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}