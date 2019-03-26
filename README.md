## ref-multiple-table 表格参照通用ui


## 何时使用
>单选多选表格参照


## 如何使用

```
$ ynpm install ref-multiple-table@2.0.0-beta.0 --save

引入

import RefTreeBaseUI,{SearchPanelItem}from 'ref-multiple-table';

样式

import 'ref-multiple-table/dist/index.css';

```


## 代码演示


```javascript

/**
 *
 * @title 表格参照,不带有input
 * @description 表格参照，不带有input，使用RefMultipleTableBaseUI
 *
 */
import React, { Component } from 'react';
import RefMultipleTableBaseUI from '../../src/index';
import { Button, Form } from 'tinper-bee';
const props = {
    placeholder: "自定义placeholder",
    title: '复杂表格参照',
    backdrop: true,
    disabled: false,
    multiple: true,
    strictMode: false,
    miniSearch: false,
    emptyBut: true,
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
class Demo1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading:false,
            showModal:false,
        };

    }
    componentDidMount(){
    
    }

    // 复杂查询
    searchFilterInfo = (filterInfo) => {
        console.log(filterInfo)
    }
    /** start:分页 */
    /**
     * 跳转到制定页数的操作
     * @param {number} index 跳转页数
     */
    handlePagination = (index) => {
        console.log(index)
    }
	/**
	 * 选择每页数据个数
	 */
    dataNumSelect = (index, pageSize) => {
       console.log(index,pageSize)
    }
    /** end:分页*/
    onSave = (item) => {
        // console.log('save',item);
        this.checkedArray = item;
        this.setState({ showModal: false })
    }
    onCancel = (item) => {
        this.setState({ showModal: false })
    }
    render() {
        this.columnsData = [{"key":"code","dataIndex":"code","title":"组织编码"},{"key":"name","dataIndex":"name","title":"组织名称"}];
        this.tableData = [{"rownum_":1,"code":"001","name":"人员1","mobile":"15011430230","refcode":"001","refpk":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","id":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","refname":"人员1","email":"11@11.com","key":"cc791b77-bd18-49ab-b3ec-ee83cd40012a"},{"rownum_":2,"code":"002","name":"人员2","mobile":"15011323234","refcode":"002","refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","id":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","refname":"人员2","email":"22@11.com","key":"de2d4d09-51ec-4108-8def-d6a6c5393c3b"},{"rownum_":3,"code":"003","name":"人员3","mobile":"15011430232","refcode":"003","refpk":"004989bb-a705-45ce-88f3-662f87ee6e52","id":"004989bb-a705-45ce-88f3-662f87ee6e52","refname":"人员3","email":"33@33.com","key":"004989bb-a705-45ce-88f3-662f87ee6e52"},{"rownum_":4,"code":"004","name":"人员4","mobile":"15011430234","refcode":"004","refpk":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","id":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","refname":"人员4","email":"33@34.com","key":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd"},{"rownum_":5,"code":"005","name":"人员5","mobile":"15011430235","refcode":"005","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","id":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","refname":"人员5","email":"55@26.com","key":"5e3a85ec-5e14-4734-8b3a-1e6168426c89"},{"rownum_":6,"code":"006","name":"人员6","mobile":"15011323232","refcode":"006","refpk":"112621b9-b7ae-41b9-9428-61779334c5d6","id":"112621b9-b7ae-41b9-9428-61779334c5d6","refname":"人员6","email":"66@516.com","key":"112621b9-b7ae-41b9-9428-61779334c5d6"},{"rownum_":7,"code":"007","name":"人员7","mobile":"15011234567","refcode":"007","refpk":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","id":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","refname":"人员7","email":"55@4.com","key":"394bba90-ed0f-4794-a44e-fd9ce6e9257d"},{"rownum_":8,"code":"008","name":"人员8","mobile":"15011327890","refcode":"008","refpk":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","id":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","refname":"人员8","email":"55@556.com","key":"a9f4c869-ca0b-4d12-847e-00eca08bfef6"},{"rownum_":9,"code":"bpm01","name":"张一","mobile":"18777777777","refcode":"bpm01","refpk":"0dc47840-873a-4ed3-8ae7-c2335a76b385","id":"0dc47840-873a-4ed3-8ae7-c2335a76b385","refname":"张一","email":"bpm01@qq.com","key":"0dc47840-873a-4ed3-8ae7-c2335a76b385"},{"rownum_":10,"code":"bpm02","name":"张二","mobile":"18788888888","refcode":"bpm02","refpk":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","id":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","refname":"张二","email":"bpm02@qq.com","key":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550"}];
        this.pageCount = 10;
        this.pageSize= 10;
        this.currPageIndex = 1;
        this.fliterFormInputs = [];
        this.filterInfo='';
        let { showLoading, showModal } = this.state;
        let { columnsData, tableData, pageCount, pageSize, currPageIndex, fliterFormInputs, filterInfo, checkedArray } = this;
        let { dataNumSelect, handlePagination, searchFilterInfo } = this;

        let childrenProps = Object.assign(Object.assign({}, props), {
            showModal: showModal,
            showLoading: showLoading,
            columnsData: columnsData,
            tableData: tableData,
            checkedArray: checkedArray,
            pageCount: pageCount,
            pageSize: pageSize,
            currPageIndex: currPageIndex,
            fliterFormInputs: fliterFormInputs,
            filterInfo: filterInfo,
            dataNumSelect: dataNumSelect,
            handlePagination: handlePagination,
            searchFilterInfo: searchFilterInfo,
            onSave: this.onSave,
            onCancel: this.onCancel,
        });
        return (
            <div className="demoPadding">
                <RefMultipleTableBaseUI
                    {...childrenProps}

                />
                <Button
                    colors="primary"
                    onClick={() => {
                        this.setState({ showModal: true })
                    }}>打开参照</Button>
            </div>
        )
    }
}

export default Form.createForm()(Demo1);



```


## API

### RefMultipleTableBaseUI

<span style="color: red; font-size: 15px;">注意:以下参数为 `<RefTreeTableBaseUI/>`需要使用的，为了保证功能的正常使用请传入。</span>

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。 | 否
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_TW` |多语配置，详情查看参数详解 | 否
buttons|`object`| - |{buttons:{cancelText:'',confirmText:'',okText:''}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
miniSearch| `Boolean`|true|默认是简单搜索|否
size|`String`|'lg'|modal的size|否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
searchFilterInfo | `function(value)`| 复杂搜索的查询回调，将搜索条件带回| 否
showLoading | `bool` | false | 是否展示loading，多用于请求中| 否
<span style="color:red;">*</span>fliterFormInputs| `Array`| -- | 查询条件| 否
<span style="color:red;">*</span>tableData | `Array` | — | 表体数据 | 否
<span style="color:red;">*</span>columsData | `Array`| — | 表头数据 | 否
pageCount |`number`| — |总页数 | 否
currPageIndex| `number`| — |当前页数 | 否
totalElements | `number`| — |一共多少条 | 否
dataNumSelect | `function()`| — |选择每页多少条的回调函数 | 否
handlePagination| `functitabon()`| — |切换页的方法 | 否
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示(<span style="color:red;">*</span>refcorewithinput可以提供)| 否
onSave | `function(value)` | -- | 参照确定的回调(<span style="color:red;">*</span>refcorewithinput可以提供)| 否
onCancel | `function(value)` | -- | 参照取消的回调(<span style="color:red;">*</span>refcorewithinput可以提供)| 否
value| ``string``|空|默认值，RefWithInput和参照组件都会使用，可以初始化树选中的节点。例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
matchData | `Array` | [] | 传给树选中的节点(<span style="color: red; font-size: 15px;">macthData优先，其次是value</span>)| 否


## SearchPanelItem  API
<span style="color: red; font-size: 15px;">注意:以下参数为 `<SearchPanelItem/>`需要使用的，为了保证功能的正常使用请传入。</span>

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
key | `String` | --- | key值 | 否
name | `String` | --- | getFieldProps(name, option)的name字段，设置表单元素name，不可以重复| 否
text| `String`| ---|搜索框的标题| 否

## RefWithInput  API
<span style="color: red; font-size: 15px;">注意：RefWithInput（ref-core）可以和RefMultipleTableBaseUI配套使用，下面是RefWithInput可以接收的参数，以及RefWithInput给RefMultipleTableBaseUI提供的参数</span>

### RefWithInput接收的参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
filterUrl| `string`|空|快捷录入接口。|否
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
disabled|`bool`| false |禁用整个参照 | 否
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 

### RefWithInput提供的参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(value)` | -- | 参照确定的回调，会更新checkedArray，showname（input的value），showModal关闭,最后回调RefWithInput接收的参数onSave| 否
onCancel | `function()` | -- | 参照取消的回调，会更新showModal关闭,最后回调RefWithInput接收的参数onCancel| 否
checkedArray | `Array` | [] | 传给参照选中的节点，所以参照中选中节点通过value和matchData来控制| 否
onMatchInitValue| `function(value)` | onMatchInitValue = (checkedArray) => {this.setState({checkedArray})} | 更改checkedArray | 否

## 注意事项
 > RefCoreWithInput提供的参数可以保证参照组件showModal关闭打开，因此在使用RefCoreWithInput就不需要额外手动维护showModal
 
 > RefCoreWithInput使用value来展示input的值，参照组件使用matchData来初始化选中节点，若matchData为空，使用value来初始化参照中checkedArray（树组件可以，表不可以）

> 注意：modalShow在refcorewithinput中有提供。因此若是refcorewithinput和refmultipletablebaseui配合使用，注意showModal onSave onCancel
## 树形参照分类



## 表格参照通用ui对外提供的组件有

### RefMultipleTableBaseUI
    
      表格参照的纯ui，需要正确的参数传入

### SearchPanelItem
    表格参照搜索面板处的搜索条件

### RefMultipleTable
参照弹出窗，没有输入框，使用时可根据自己需要定义具体的文本框。实质是RefCoreGlobal和RefMultipleTableBaseUI的组合

### RefMultipleTableWithInput
  带文本框的参照弹出窗。在 RefMultipleTable 基础上封装实现，RefWithInput和 RefMultipleTable组合。

### createRefMultipleTable 
 非 ReactJS 调用方式，与 RefMultipleTable 相同没有输入框，使用时可根据自己需要定义具体的文本框。
 
### createRefMultipleTableModal

 非 ReactJS 调用方式，与  RefTreeTableWithInput 相同带文本框的参照弹出窗。
 
## 参数详解

```js
eg:
  

    lang:
      "zh_CN" // 中文
      "en_US" // 英文
      "zh_TW" // 繁体中文
      "fr_FR" // 法文
      "de_DE" // 德文
      "ja_JP" // 日文
```


