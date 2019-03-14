/**
 *
 * @title 表格参照带有input
 * @description 表格参照带有input
 *
 */
import React, { Component } from 'react';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput';
import 'ref-core/lib/refs/refcorewithinput.css';
import {Button,Form} from 'tinper-bee';
import Table from './CommonLogic';
class RefMultipleTableWithInput extends Component {
    onSave = (item) => {
        console.log('save', item)
    }
    onCancel = () => {
    }
    render() {
        const { getFieldError, getFieldProps } = this.props.form;
        const props = {
            placeholder: "placehholder",
            title: '复杂表格参照',
            backdrop: true,
            disabled: false,
            multiple: false,
            strictMode: true,
            miniSearch: false,
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
                    rules:[{
                        message: '请输入姓名',
                        pattern: /[^{"refname":"","refpk":""}]/
                    }]
                })}
            >
                <Table />
            </RefWithInput>
              <span className='error'>
                    {getFieldError('valueField')}
                </span>

                <Button onClick={() => {
                    this.props.form.validateFields((err, values) => {
                        console.log(err, values)
                    });
                }}>submit</Button>
          </div>
            
        )
    }
}
export default Form.createForm()(RefMultipleTableWithInput);