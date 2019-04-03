import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss'



import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";
var DemoArray = [{"example":<Demo1 />,"title":" RefMultipleTableBas","code":"/**\n *\n * @title RefMultipleTableBaseUI\n * @description 表格参照，使用RefMultipleTableBaseUI,不带有input\n *\n */\nimport React, { Component } from 'react';\nimport RefMultipleTableBaseUI from '../../src/index';\nimport { Button, Form } from 'tinper-bee';\nconst props = {\n    placeholder: \"自定义placeholder\",\n    title: '复杂表格参照',\n    backdrop: true,\n    disabled: false,\n    multiple: true,\n    strictMode: false,\n    miniSearch: false,\n    emptyBut: true,\n    valueField: \"refpk\",\n    displayField: \"{refname}\",\n}\nclass Demo1 extends Component {\n\n    constructor(props) {\n        super(props);\n        this.state = {\n            showLoading:false,\n            showModal:false,\n        };\n        this.columnsData = [{\"key\":\"code\",\"dataIndex\":\"code\",\"title\":\"组织编码\"},{\"key\":\"name\",\"dataIndex\":\"name\",\"title\":\"组织名称\"}];\n        this.tableData = [{\"rownum_\":1,\"code\":\"001\",\"name\":\"人员1\",\"mobile\":\"15011430230\",\"refcode\":\"001\",\"refpk\":\"cc791b77-bd18-49ab-b3ec-ee83cd40012a\",\"id\":\"cc791b77-bd18-49ab-b3ec-ee83cd40012a\",\"refname\":\"人员1\",\"email\":\"11@11.com\",\"key\":\"cc791b77-bd18-49ab-b3ec-ee83cd40012a\"},{\"rownum_\":2,\"code\":\"002\",\"name\":\"人员2\",\"mobile\":\"15011323234\",\"refcode\":\"002\",\"refpk\":\"de2d4d09-51ec-4108-8def-d6a6c5393c3b\",\"id\":\"de2d4d09-51ec-4108-8def-d6a6c5393c3b\",\"refname\":\"人员2\",\"email\":\"22@11.com\",\"key\":\"de2d4d09-51ec-4108-8def-d6a6c5393c3b\"},{\"rownum_\":3,\"code\":\"003\",\"name\":\"人员3\",\"mobile\":\"15011430232\",\"refcode\":\"003\",\"refpk\":\"004989bb-a705-45ce-88f3-662f87ee6e52\",\"id\":\"004989bb-a705-45ce-88f3-662f87ee6e52\",\"refname\":\"人员3\",\"email\":\"33@33.com\",\"key\":\"004989bb-a705-45ce-88f3-662f87ee6e52\"},{\"rownum_\":4,\"code\":\"004\",\"name\":\"人员4\",\"mobile\":\"15011430234\",\"refcode\":\"004\",\"refpk\":\"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd\",\"id\":\"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd\",\"refname\":\"人员4\",\"email\":\"33@34.com\",\"key\":\"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd\"},{\"rownum_\":5,\"code\":\"005\",\"name\":\"人员5\",\"mobile\":\"15011430235\",\"refcode\":\"005\",\"refpk\":\"5e3a85ec-5e14-4734-8b3a-1e6168426c89\",\"id\":\"5e3a85ec-5e14-4734-8b3a-1e6168426c89\",\"refname\":\"人员5\",\"email\":\"55@26.com\",\"key\":\"5e3a85ec-5e14-4734-8b3a-1e6168426c89\"},{\"rownum_\":6,\"code\":\"006\",\"name\":\"人员6\",\"mobile\":\"15011323232\",\"refcode\":\"006\",\"refpk\":\"112621b9-b7ae-41b9-9428-61779334c5d6\",\"id\":\"112621b9-b7ae-41b9-9428-61779334c5d6\",\"refname\":\"人员6\",\"email\":\"66@516.com\",\"key\":\"112621b9-b7ae-41b9-9428-61779334c5d6\"},{\"rownum_\":7,\"code\":\"007\",\"name\":\"人员7\",\"mobile\":\"15011234567\",\"refcode\":\"007\",\"refpk\":\"394bba90-ed0f-4794-a44e-fd9ce6e9257d\",\"id\":\"394bba90-ed0f-4794-a44e-fd9ce6e9257d\",\"refname\":\"人员7\",\"email\":\"55@4.com\",\"key\":\"394bba90-ed0f-4794-a44e-fd9ce6e9257d\"},{\"rownum_\":8,\"code\":\"008\",\"name\":\"人员8\",\"mobile\":\"15011327890\",\"refcode\":\"008\",\"refpk\":\"a9f4c869-ca0b-4d12-847e-00eca08bfef6\",\"id\":\"a9f4c869-ca0b-4d12-847e-00eca08bfef6\",\"refname\":\"人员8\",\"email\":\"55@556.com\",\"key\":\"a9f4c869-ca0b-4d12-847e-00eca08bfef6\"},{\"rownum_\":9,\"code\":\"bpm01\",\"name\":\"张一\",\"mobile\":\"18777777777\",\"refcode\":\"bpm01\",\"refpk\":\"0dc47840-873a-4ed3-8ae7-c2335a76b385\",\"id\":\"0dc47840-873a-4ed3-8ae7-c2335a76b385\",\"refname\":\"张一\",\"email\":\"bpm01@qq.com\",\"key\":\"0dc47840-873a-4ed3-8ae7-c2335a76b385\"},{\"rownum_\":10,\"code\":\"bpm02\",\"name\":\"张二\",\"mobile\":\"18788888888\",\"refcode\":\"bpm02\",\"refpk\":\"c97b59e2-9fa3-44d7-93b0-1be52f7aa550\",\"id\":\"c97b59e2-9fa3-44d7-93b0-1be52f7aa550\",\"refname\":\"张二\",\"email\":\"bpm02@qq.com\",\"key\":\"c97b59e2-9fa3-44d7-93b0-1be52f7aa550\"}];\n        this.pageCount = 10;\n        this.pageSize= 10;\n        this.currPageIndex = 1;\n        this.fliterFormInputs = [];\n        this.filterInfo='';\n\n    }\n    componentDidMount(){\n    \n    }\n\n    // 复杂查询\n    searchFilterInfo = (filterInfo) => {\n        console.log(filterInfo)\n    }\n    /** start:分页 */\n    /**\n     * 跳转到制定页数的操作\n     * @param {number} index 跳转页数\n     */\n    handlePagination = (index) => {\n        console.log(index)\n    }\n\t/**\n\t * 选择每页数据个数\n\t */\n    dataNumSelect = (index, pageSize) => {\n       console.log(index,pageSize)\n    }\n    /** end:分页*/\n    onSave = (item) => {\n        // console.log('save',item);\n        this.checkedArray = item;\n        this.setState({ showModal: false })\n    }\n    onCancel = (item) => {\n        this.setState({ showModal: false })\n    }\n    render() {\n        let { showLoading, showModal } = this.state;\n        let { columnsData, tableData, pageCount, pageSize, currPageIndex, \n            fliterFormInputs, filterInfo, checkedArray } = this;\n        let { dataNumSelect, handlePagination, searchFilterInfo } = this;\n        let childrenProps = Object.assign(Object.assign({}, props), {\n            showModal: showModal,\n            showLoading: showLoading,\n            columnsData: columnsData,\n            tableData: tableData,\n            checkedArray: checkedArray,\n            pageCount: pageCount,\n            pageSize: pageSize,\n            currPageIndex: currPageIndex,\n            fliterFormInputs: fliterFormInputs,\n            filterInfo: filterInfo,\n            dataNumSelect: dataNumSelect,\n            handlePagination: handlePagination,\n            searchFilterInfo: searchFilterInfo,\n            onSave: this.onSave,\n            onCancel: this.onCancel,\n        });\n        return (\n            <div className=\"demoPadding\">\n                <RefMultipleTableBaseUI\n                    {...childrenProps}\n                />\n                <Button\n                    colors=\"primary\"\n                    onClick={() => {\n                        this.setState({ showModal: true })\n                    }}>打开参照</Button>\n            </div>\n        )\n    }\n}\n\n\n\n","desc":" 表格参照，使用RefMultipleTableBaseUI,不带有input"},{"example":<Demo2 />,"title":" RefMultipleTableWit","code":"/**\n *\n * @title RefMultipleTableWithInput\n * @description 使用RefMultipleTableWithInput，表格参照带有input\n *\n */\nimport React, { Component } from 'react';\n\nimport { FormControl,Button, Form } from 'tinper-bee';\nimport { SearchPanelItem,RefMultipleTableWithInput } from '../../src/index.js';\nlet props = {\n    placeholder: \"placehholder\",\n    title: '复杂表格参照',\n    backdrop: true,\n    disabled: false,\n    multiple: false,\n    strictMode: true,\n    miniSearch: false,\n    valueField: \"refpk\",\n    displayField: \"{refname}\",\n    tableData: [{ \"rownum_\": 1, \"code\": \"001\", \"name\": \"人员1\", \"mobile\": \"15011430230\", \"refcode\": \"001\", \"refpk\": \"cc791b77-bd18-49ab-b3ec-ee83cd40012a\", \"id\": \"cc791b77-bd18-49ab-b3ec-ee83cd40012a\", \"refname\": \"人员1\", \"email\": \"11@11.com\", \"key\": \"cc791b77-bd18-49ab-b3ec-ee83cd40012a\" }, { \"rownum_\": 2, \"code\": \"002\", \"name\": \"人员2\", \"mobile\": \"15011323234\", \"refcode\": \"002\", \"refpk\": \"de2d4d09-51ec-4108-8def-d6a6c5393c3b\", \"id\": \"de2d4d09-51ec-4108-8def-d6a6c5393c3b\", \"refname\": \"人员2\", \"email\": \"22@11.com\", \"key\": \"de2d4d09-51ec-4108-8def-d6a6c5393c3b\" }, { \"rownum_\": 3, \"code\": \"003\", \"name\": \"人员3\", \"mobile\": \"15011430232\", \"refcode\": \"003\", \"refpk\": \"004989bb-a705-45ce-88f3-662f87ee6e52\", \"id\": \"004989bb-a705-45ce-88f3-662f87ee6e52\", \"refname\": \"人员3\", \"email\": \"33@33.com\", \"key\": \"004989bb-a705-45ce-88f3-662f87ee6e52\" }, { \"rownum_\": 4, \"code\": \"004\", \"name\": \"人员4\", \"mobile\": \"15011430234\", \"refcode\": \"004\", \"refpk\": \"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd\", \"id\": \"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd\", \"refname\": \"人员4\", \"email\": \"33@34.com\", \"key\": \"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd\" }, { \"rownum_\": 5, \"code\": \"005\", \"name\": \"人员5\", \"mobile\": \"15011430235\", \"refcode\": \"005\", \"refpk\": \"5e3a85ec-5e14-4734-8b3a-1e6168426c89\", \"id\": \"5e3a85ec-5e14-4734-8b3a-1e6168426c89\", \"refname\": \"人员5\", \"email\": \"55@26.com\", \"key\": \"5e3a85ec-5e14-4734-8b3a-1e6168426c89\" }, { \"rownum_\": 6, \"code\": \"006\", \"name\": \"人员6\", \"mobile\": \"15011323232\", \"refcode\": \"006\", \"refpk\": \"112621b9-b7ae-41b9-9428-61779334c5d6\", \"id\": \"112621b9-b7ae-41b9-9428-61779334c5d6\", \"refname\": \"人员6\", \"email\": \"66@516.com\", \"key\": \"112621b9-b7ae-41b9-9428-61779334c5d6\" }, { \"rownum_\": 7, \"code\": \"007\", \"name\": \"人员7\", \"mobile\": \"15011234567\", \"refcode\": \"007\", \"refpk\": \"394bba90-ed0f-4794-a44e-fd9ce6e9257d\", \"id\": \"394bba90-ed0f-4794-a44e-fd9ce6e9257d\", \"refname\": \"人员7\", \"email\": \"55@4.com\", \"key\": \"394bba90-ed0f-4794-a44e-fd9ce6e9257d\" }, { \"rownum_\": 8, \"code\": \"008\", \"name\": \"人员8\", \"mobile\": \"15011327890\", \"refcode\": \"008\", \"refpk\": \"a9f4c869-ca0b-4d12-847e-00eca08bfef6\", \"id\": \"a9f4c869-ca0b-4d12-847e-00eca08bfef6\", \"refname\": \"人员8\", \"email\": \"55@556.com\", \"key\": \"a9f4c869-ca0b-4d12-847e-00eca08bfef6\" }, { \"rownum_\": 9, \"code\": \"bpm01\", \"name\": \"张一\", \"mobile\": \"18777777777\", \"refcode\": \"bpm01\", \"refpk\": \"0dc47840-873a-4ed3-8ae7-c2335a76b385\", \"id\": \"0dc47840-873a-4ed3-8ae7-c2335a76b385\", \"refname\": \"张一\", \"email\": \"bpm01@qq.com\", \"key\": \"0dc47840-873a-4ed3-8ae7-c2335a76b385\" }, { \"rownum_\": 10, \"code\": \"bpm02\", \"name\": \"张二\", \"mobile\": \"18788888888\", \"refcode\": \"bpm02\", \"refpk\": \"c97b59e2-9fa3-44d7-93b0-1be52f7aa550\", \"id\": \"c97b59e2-9fa3-44d7-93b0-1be52f7aa550\", \"refname\": \"张二\", \"email\": \"bpm02@qq.com\", \"key\": \"c97b59e2-9fa3-44d7-93b0-1be52f7aa550\" }],\n    columnsData: [{ \"key\": \"code\", \"dataIndex\": \"code\", \"title\": \"组织编码\" }, { \"key\": \"name\", \"dataIndex\": \"name\", \"title\": \"组织名称\" }],\n    fliterFormInputs: [],\n    showLoading:false,\n    filterUrl: '/pap_basedoc/common-ref/filterRefJSON',\n}\nclass Demo3 extends Component {\n    onSave = (item) => {\n        console.log('save', JSON.stringify(item))\n    }\n    onCancel = () => {\n    }\n    launchTableHeader = () => {\n        let data = {\n            strFieldCode: [\"code\", \"name\", \"email\", \"mobile\"],\n            strFieldName: [\"人员编码\", \"人员名称\", \"人员邮箱\", \"人员电话\"]\n        }\n        let { multiple } = props;\n        let keyList = data.strFieldCode || [];\n        let titleList = data.strFieldName || [];\n        props[\"fliterFormInputs\"] = [];\n        let colunmsList = keyList.map((item, index) => {\n            props[\"fliterFormInputs\"].push(\n                <SearchPanelItem key={item} name={item} text={titleList[index]}>\n                    <FormControl />\n                </SearchPanelItem>\n            )\n            return {\n                key: item,\n                dataIndex: item,\n                title: titleList[index]\n            }\n        });\n        if (colunmsList.length === 0) {\n            colunmsList = [{ title: \"未传递表头数据\", dataIndex: \"nodata\", key: \"nodata\" }];\n\n        } else if (!multiple) {\n            //单选时用对号符号标记当前行选中\n            colunmsList.unshift({\n                title: \" \",\n                dataIndex: \"a\",\n                key: \"a\",\n                width: 45,\n                render(text, record, index) {\n                    return <div className={`ref-multiple-table-radio ${record._checked ? 'ref-multiple-table-radio-on' : ''}`} />\n                }\n            })\n\n        }\n        props[\"columnsData\"] = colunmsList;\n    }\n    setMatchData = () =>{\n        //设置选中数据\n        props['matchData'] = [{\"_checked\":true,\"rownum_\":2,\"code\":\"002\",\"name\":\"人员2\",\"mobile\":\"15011323234\",\"refcode\":\"002\",\"refpk\":\"de2d4d09-51ec-4108-8def-d6a6c5393c3b\",\"id\":\"de2d4d09-51ec-4108-8def-d6a6c5393c3b\",\"refname\":\"人员2\",\"email\":\"22@11.com\",\"key\":\"de2d4d09-51ec-4108-8def-d6a6c5393c3b\"}];\n    }\n    render() {\n        this.launchTableHeader();\n        this.setMatchData();\n        const { getFieldError, getFieldProps } = this.props.form;\n        return (\n            <div>\n                <RefMultipleTableWithInput\n                    {...props}\n                    onSave={this.onSave}\n                    onCancel={this.onCancel}\n                    {...getFieldProps('valueField', {\n                        initialValue:'{\"refname\":\"人员2\",\"refpk\":\"de2d4d09-51ec-4108-8def-d6a6c5393c3b\"}',\n                        rules: [{\n                            message: '请输入姓名',\n                            pattern: /[^{\"refname\":\"\",\"refpk\":\"\"}]/\n                        }]\n                    })}\n                >\n                </RefMultipleTableWithInput>\n                <span className='error'>\n                    {getFieldError('valueField')}\n                </span>\n\n                <Button onClick={() => {\n                    this.props.form.validateFields((err, values) => {\n                        console.log(err, values)\n                    });\n                }}>submit</Button>\n            </div>\n\n        )\n    }\n}\n","desc":" 使用RefMultipleTableWithInput，表格参照带有input"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
