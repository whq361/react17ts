import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import { Picker } from 'antd-mobile';
import { CascaderValue } from 'rmc-cascader/lib/CascaderTypes';
import classNames from 'classnames';
import { api } from '@/api/index';
import { awaitTo } from '@/api/http';
import { session, formatRegion } from '@/utils';
import { PickerData } from 'antd-mobile/lib/picker/PropsType';

const DefaultExtra = "省/直辖市、市、区/县";

type Greeting = {
    label: string;
    value: string[];
    onChange: (p: CascaderValue | undefined) => void;
}

export default function Comp(props: Greeting) {

    const { label, value = [], onChange } = props;
    const [region, setRegion] = useState<any[]>();

    const fetch = async () => {
        const dataRegion = session('region');
        if (dataRegion) {
            setRegion(dataRegion as any[]);
        } else {
            const [, data] = await awaitTo(api.GET_REGION, {});
            if (data && data.data) {
                const formatedRegion = formatRegion(data.data as any[]);
                session('region', formatedRegion);
                setRegion(formatedRegion);
            }
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const itemStyle = {
        height: '30px',
        lineHeight: '30px',
    };

    // const handleOnChange = (v: CascaderValue | undefined) => { onChange(selectedRegionFix(v as CascaderValue)) };

    const RenderUI = useCallback((props) => (
        <div
            className={styles.container}
            onClick={props.onClick}
        >
            <div className={styles.label}>{label}</div>
            <div className={classNames(styles.echo,
                { [`${styles.placeholder}`]: props.extra === DefaultExtra })}
            >
                {props.extra}
            </div>
        </div>
    ), [label]);

    return (
        <Picker
            extra={DefaultExtra}
            data={region as PickerData[]}
            title="地区选择器"
            value={value}
            onChange={onChange}
            onOk={onChange}
            indicatorStyle={itemStyle}
            itemStyle={itemStyle}
            className={styles.myPicker}
        >
            <RenderUI />
        </Picker>
    )
}