import React, { useMemo, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import TextInput from '../Form_TextInput';
import NumberInput from '../Form_NumberInput';
import PhoneInput from '../Form_PhoneInput';
import RadioInput from '../Form_RadioInput';
import RegionSelector from '../Form_RegionSelector';
import _ from 'lodash';
import { selectedRegionFix } from '@/utils';
import { isPhone } from '@/utils/pattens';
import { Toast } from 'antd-mobile';
import { awaitTo } from '@/api/http';
import { api } from '@/api';
import ModalAlert from '@/components/ModalAlert';

export default function Comp() {

    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [region, setRegion] = useState<string[]>([]);
    const [address, setAddress] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [learned, setLearned] = useState<number>(0);
    const [showAlert, setAlert] = useState<boolean>(false);

    const canSubmit: boolean = useMemo(() => {
        if (name && age && phone
            && isPhone(phone) && region.length > 0
            && address && code && code.length === 8
        ) {
            return true;
        }
        else return false;
    }, [name, age, phone, region, address, code]);

    const fetch = async (params: any) => {
        const [, data] = await awaitTo(api.POST_SUBMIT_AVIC, { type: 'POST', data: params });
        if (data) {
            setAlert(true);
        }
    };

    const onSubmit = () => {
        if (!canSubmit) {
            if (!name) {
                Toast.fail('请输入姓名');
                return;
            }
            if (!age) {
                Toast.fail('请输入宝贝年龄');
                return;
            }
            if (!phone) {
                Toast.fail('请输入手机号');
                return;
            }
            if (region.length <= 0) {
                Toast.fail('请选择地址');
                return;
            }
            if (!address) {
                Toast.fail('请输入详细地址');
                return;
            }
            if (!code) {
                Toast.fail('请输入领取码');
                return;
            }
            if (!isPhone(phone)) {
                Toast.fail('手机号格式错误');
                return;
            }
            if (code.length !== 8) {
                Toast.fail('领取码格式错误');
                return;
            }
        }
        const regionFix = selectedRegionFix(region);
        const params = {
            name,
            age: Number(age),
            phone,
            province: regionFix[0],
            city: regionFix[1],
            area: regionFix[2],
            address,
            hasBoughtMs: learned,
            code,
        };
        fetch(params);
    }
    const debounceOnSubmit = _.debounce(onSubmit, 2000, { leading: true, trailing: false });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.form}>
                    <TextInput
                        label="姓名："
                        value={name}
                        onChange={(v) => { setName(v); }}
                        placeholder="请输入姓名"
                        maxLength={30}
                    />
                    <NumberInput
                        label="宝贝年龄："
                        value={age}
                        onChange={(v) => { setAge(v); }}
                        placeholder="请输入年龄"
                        max={99}
                        min={1}
                    />
                    <PhoneInput
                        label="收货手机号："
                        value={phone}
                        onChange={(v) => { setPhone(v); }}
                        placeholder="请输入手机号"
                    />
                    <RegionSelector
                        label="收货地区："
                        value={region}
                        onChange={v => setRegion(v as string[])}
                    />
                    <TextInput
                        label="详细地址："
                        value={address}
                        onChange={(v) => { setAddress(v); }}
                        placeholder="请输入详细地址"
                        maxLength={100}
                    />
                    <RadioInput
                        label="是否学过小熊美术："
                        value={learned}
                        onChange={v => setLearned(v)}
                    />
                    <TextInput
                        label="礼盒领取码："
                        value={code}
                        onChange={(v) => { setCode(v); }}
                        placeholder="请输入领取码"
                        maxLength={8}
                        type="noChinese"
                        hasBorder={false}
                    />
                </div>
                <div
                    onClick={debounceOnSubmit}
                    className={classNames(styles.button, { [`${styles.buttonActive}`]: canSubmit })}
                >
                    确定
                </div>
            </div>
            <ModalAlert
                visible={showAlert}
                title='提交成功'
                content='礼盒会尽快安排邮寄哦～'
                okText='好的'
                onCancel={() => setAlert(false)}
                onOk={() => setAlert(false)}
            />
        </>
    )
}