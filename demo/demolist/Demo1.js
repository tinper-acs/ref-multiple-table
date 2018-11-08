/**
 *
 * @title ref-multiple-table
 * @description 复杂查询表格参照
 *
 */

import React, { Component } from 'react';
import {RefMultipleTable, RefMultipleTableWithInput, createRefMultipleTable} from 'ref-multiple-table';
import 'ref-multiple-table/dist/index.css';

import Button from 'bee-button';
import Form from "bee-form";
const option = {
    title: '复杂表格参照',
    hasPage:true,
    backdrop:false,
    param:{//url请求参数
        refCode:'test_treeTable',//test_common||test_grid||test_tree||test_treeTable
        tenantId:'xxx',
        sysId:'xxx',
        locale:'en_US',
        refModelUrl: 'http://workbench.yyuap.com/ref/rest/testref_ctr/',
    },
    refModelUrl:{
        tableBodyUrl:'https://mock.yonyoucloud.com/mock/358/blobRefTreeGrid',//表体请求
        tableBarUrl:'https://mock.yonyoucloud.com/mock/358/refInfo',//表头请求
    },
    jsonp: true,
    checkedArray:[
        {
            id: "14e0220f-1a86-4861-8f74-f7134cbedb5b",
            peocode: "li",
            peoname: "李传忠",
            refcode: "li",
            refname: "李传忠",
            refpk: "14e0220f-1a86-4861-8f74-f7134cbedb5b",
        }
    ],
    onCancel: function (p) {
    },
    onSave: function (sels) {
    }
}
class Demo1 extends Component {
    render () {
        const { getFieldError } = this.props.form;
        return (
            <div className="demoPadding">
                <RefMultipleTableWithInput {...option}
                    form={this.props.form}
                /> 
                <span className='error'>
                    {getFieldError('refcode')}
                </span>
                <Button colors="primary" onClick={() => {
                    this.props.form.validateFields((err, values) => {
                        console.log(err, values)
                    });
                }}> submit </Button>
            </div>
        )
    }
}

export default Form.createForm()(Demo1);
