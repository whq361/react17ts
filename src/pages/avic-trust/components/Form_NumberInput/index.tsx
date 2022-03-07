import React from 'react';
import styles from './index.module.less';

type Greeting = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    max?: number;
    min?: number;
}

export default function Comp(props: Greeting) {

    const {
        label,
        value,
        onChange,
        placeholder,
        max = 999999999999999999999,
        min = 0,
    } = props;


    const handleOnChange = (e: any) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value !== undefined && value !== '') {
            if (Number(value) < min) onChange('' + min);
            else if (Number(value) > max) onChange('' + max);
            else onChange(value);
        } else {
            onChange(value);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <input
                type="tel"
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
            />
        </div>
    )
}