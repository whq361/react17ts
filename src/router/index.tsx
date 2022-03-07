import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Loading from '@/components/loading';

const FallbackOption = { fallback: <Loading /> };

const Index = loadable(() => import('@/pages/index'), FallbackOption);
const Nofount = loadable(() => import('@/pages/nofount'), FallbackOption);
const AvicTrust = loadable(() => import('@/pages/avic-trust'), FallbackOption);

export const routes = [
    {
        'path': '/',
        'name': 'Index',
        'exact': true,
        'component': Index,
        'title': '欢迎'
    },
    {
        'path': '/avic-trust',
        'name': 'AvicTrust',
        'component': AvicTrust,
        'title': '航空小卫士',
    },
    {
        'path': '*',
        'name': 'Nofount',
        'title': '404',
        'component': Nofount,
    }
];

// 路由权限控制
export function RouteWithSubRoutes(route: any) {
    // 登录认证
    document.title = route.title || ''
    return (
        <Route
            exact={route.exact || false}
            path={route.path}
            render={props =>
                <route.component {...props} {...route} />
            }
        />
    )
}