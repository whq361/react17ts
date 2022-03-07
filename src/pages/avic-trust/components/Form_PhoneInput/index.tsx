import React from 'react';
import styles from './index.module.less';

type Greeting = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export default function Comp(props: Greeting) {

    const {
        label,
        value,
        onChange,
        placeholder,
    } = props;

    const handleOnChange = (e: any) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        onChange(value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <input
                type="tel"
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                maxLength={11}
            />
        </div>
    )
}