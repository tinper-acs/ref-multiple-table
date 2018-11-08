
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import './demo.scss';
const pkg = require('../package.json')




const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" ref-multiple-table","code":"/**\n *\n * @title ref-multiple-table\n * @description 复杂查询表格参照\n *\n */\n\nimport React, { Component } from 'react';\nimport {RefMultipleTable, RefMultipleTableWithInput, createRefMultipleTable} from 'ref-multiple-table';\nimport 'ref-multiple-table/dist/index.css';\n\nimport Button from 'bee-button';\nimport Form from \"bee-form\";\nconst option = {\n    title: '复杂表格参照',\n    hasPage:true,\n    backdrop:false,\n    param:{//url请求参数\n        refCode:'test_treeTable',//test_common||test_grid||test_tree||test_treeTable\n        tenantId:'xxx',\n        sysId:'xxx',\n        locale:'en_US',\n        refModelUrl: 'http://workbench.yyuap.com/ref/rest/testref_ctr/',\n    },\n    refModelUrl:{\n        tableBodyUrl:'https://mock.yonyoucloud.com/mock/358/blobRefTreeGrid',//表体请求\n        tableBarUrl:'https://mock.yonyoucloud.com/mock/358/refInfo',//表头请求\n    },\n    jsonp: true,\n    checkedArray:[\n        {\n            id: \"14e0220f-1a86-4861-8f74-f7134cbedb5b\",\n            peocode: \"li\",\n            peoname: \"李传忠\",\n            refcode: \"li\",\n            refname: \"李传忠\",\n            refpk: \"14e0220f-1a86-4861-8f74-f7134cbedb5b\",\n        }\n    ],\n    onCancel: function (p) {\n    },\n    onSave: function (sels) {\n    }\n}\nclass Demo1 extends Component {\n    render () {\n        const { getFieldError } = this.props.form;\n        return (\n            <div className=\"demoPadding\">\n                <RefMultipleTableWithInput {...option}\n                    form={this.props.form}\n                /> \n                <span className='error'>\n                    {getFieldError('refcode')}\n                </span>\n                <Button colors=\"primary\" onClick={() => {\n                    this.props.form.validateFields((err, values) => {\n                        console.log(err, values)\n                    });\n                }}> submit </Button>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 复杂查询表格参照"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ process.env.NODE_ENV==='development'?code:code.replace('../../src/index.js',pkg.name).replace('../../src/index',pkg.name) }</code></pre>
                </Panel>
            </Col>
        )
    }
}

export default class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

