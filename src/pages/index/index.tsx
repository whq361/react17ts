import React, { useCallback } from 'react';
import styles from './index.module.less';
import { routes } from '@/router';
import { NavLink } from 'react-router-dom';
import icon_copyright from '@/assets/images/copyright.png';
export default function Comp() {

    const defaultMessage = '美术宝-亲子业态组';

    const Item = useCallback(({ title, path }) => (
        <div className={styles.item}>
            <NavLink to={path} activeClassName="active">
                {`${title}`}
            </NavLink>
        </div>), []);

    return (<div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.title}>页面导航</div>
            <div className={styles.list}>
                {
                    routes.map((item) => {
                        if (item.name !== "Index" && item.name !== "Nofount") {
                            return (<Item key={item.name} title={item.title} path={item.path} />)
                        }
                        return null;
                    })
                }
            </div>
        </div>
        <div className={styles.footer}>
            <span>{"copyright "}</span>
            <img src={icon_copyright} alt='' />
            <span>{`${new Date().getFullYear()} ${defaultMessage} v${VERSION}`}</span>
        </div>
    </div>)
}