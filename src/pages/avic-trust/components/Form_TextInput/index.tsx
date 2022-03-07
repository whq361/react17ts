import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

type Greeting = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    maxLength: number;
    type?: 'noChinese' | undefined;
    hasBorder?: boolean;
}

export default function Comp(props: Greeting) {

    const { label, value, onChange, placeholder, maxLength, type,
        hasBorder = true,
    } = props;

    const handleOnChange = (e: any) => {
        let typeExp = /[^A-Za-z0-9\u4E00-\u9FA5]/g;
        if (type === 'noChinese') {
            typeExp = /[^A-Za-z0-9]/g;
        }
        const value = e.target.value.replace(typeExp, '');
        onChange(value);
    }

    return (
        <div className={classNames(styles.container,
            { [styles.bottomBorder]: hasBorder })}
        >
            <div className={styles.label}>{label}</div>
            <input
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                maxLength={maxLength}
            />
        </div>
    )
}