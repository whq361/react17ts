import React, { useCallback } from 'react';
import styles from './index.module.less';
import icon_flow1 from '@/assets/images/avic-trust/flow-1.png';
import icon_flow2 from '@/assets/images/avic-trust/flow-2.png';
import icon_flow3 from '@/assets/images/avic-trust/flow-3.png';

const flowMap = [
    {
        key: 0,
        label: '1.填写地址',
        icon: icon_flow1,
    },
    {
        key: 1,
        label: '2.领取礼盒',
        icon: icon_flow2,
    },
    {
        key: 2,
        label: '3.绘画学习',
        icon: icon_flow3,
    }
];

export default function Comp() {

    const Item = useCallback(({ data }) => (
        <div className={styles.flowItem}>
            <img src={data.icon} alt="" />
            <div className={styles.flowItemLabel}>{data.label}</div>
        </div>
    ), []);

    return (
        <div className={styles.flow}>
            <div className={styles.flowBlock}>
                <div className={styles.flowBlockTitle}>活动流程</div>
                <div className={styles.flowBlockUl}>
                    {
                        flowMap.map((item) => (<Item key={item.key} data={item} />))
                    }
                </div>
            </div>
        </div>
    )
}