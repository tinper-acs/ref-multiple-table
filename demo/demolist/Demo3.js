/**
 *
 * @title 表格参照带有input
 * @description 表格参照带有input，简单搜索和单选
 *
 */
import React, { Component } from 'react';
import { FormControl, Form } from 'tinper-bee';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput';
import RefTable from './CommonLogic';
import 'ref-core/lib/refs/refcorewithinput.css';

class TableRender extends Component {
    onSave = (item) => {
        console.log('save', item)
    }
    onCancel = () => {

    }

    render() {
        const { getFieldError, getFieldProps } = this.props.form;
        console.log(this.props);
        // const { cBillName, view } = this.props.viewApplication
        const props = {
            placeholder: "placehholder",
            title: '简单表格',
            backdrop: true,
            disabled: false,
            multiple: true,
            strictMode: true,
            miniSearch: true,
            param: {
                "refCode": "new_bd_staff"
            },
            refModelUrl: {
                tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
                refInfo: '/pap_basedoc/common-ref/refInfo',//表头请求
            },
            matchUrl: '/pap_basedoc/common-ref/matchPKRefJSON',
            filterUrl: '/pap_basedoc/common-ref/filterRefJSON',
            valueField: "refpk",
            displayField: "{refname}",
        }

        return (
            <div>
                <RefWithInput
                    {...props}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                    {...getFieldProps('valueField', {
                        // initialValue:'{\"refname\":\"高级-T3\",\"refpk\":\"level5\"}',
                        rules: [{
                            message: '请输入姓名',
                            pattern: /[^{"refname":"","refpk":""}]/
                        }]
                    })}
                >
                    <RefTable />
                </RefWithInput>
            </div>
        );
    }
}

export default Form.createForm()(TableRender);
