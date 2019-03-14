## ref-multiple-table 表格参照通用ui

> 表格参照通用ui

## 代码演示
```sh
$ npm install ref-multiple-table@2.0.0-beta.0 --save
```

```javascript
/**
 *
 * @title ref-multiple-table-base 复杂查询表格参照的
 * @description 复杂查询表格参照
 *
 */
 import React, { Component } from 'react';
import RefMultipleTableBaseUI,{ SearchPanelItem } from 'ref-multiple-table-ui';
import {FormControl,Button,Form} from 'tinper-bee';
 class Demo1 extends Component{
 
     /** 请求接口获取数据*/
     
    render() {
        const {getFieldError,getFieldProps} = this.props.form;
        let { showLoading,showModal } = this.state;
        let { columnsData, tableData, pageCount, pageSize, currPageIndex, fliterFormInputs, filterInfo, checkedArray, checkedMap } = this;
        let {dataNumSelect,handlePagination,searchFilterInfo} = this;
        let childrenProps = Object.assign(Object.assign({}, this.props), {
          showModal:showModal,
          showLoading : showLoading,
          columnsData : columnsData,
          tableData : tableData,
          pageCount : pageCount,
          pageSize : pageSize,
          checkedArray: checkedArray,
          currPageIndex : currPageIndex,
          fliterFormInputs : fliterFormInputs,
          filterInfo : filterInfo,
          dataNumSelect : dataNumSelect,
          handlePagination : handlePagination,
          searchFilterInfo : searchFilterInfo,
          onSave:this.onSave,
          onCancel:this.onCancel,
    		});
        return (
          <div className="demoPadding">
            <RefMultipleTableBaseUI
              placeholder="placehholder"
              title={'复杂表格参照'}
              backdrop={true}
              disabled={false}
              multiple={true}
              strictMode={true}
              miniSearch={false}
              emptyBut={true}
              {...childrenProps}
              {
              ...getFieldProps('valueField', {
                initialValue: '{"refname":"000","refpk":"c4a06b52-4789-4c1e-86b2-83cca5212007"}',
                rules: [{
                  message: '请输入姓名',
                  pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                }]
              })
              }
    
            />
            <span className='error'>
              {getFieldError('valueField')}
            </span>
            <Button
              colors="primary"
              onClick={() => {
                this.setState({showModal:true})
              }}>打开参照</Button>
            <Button
              colors="primary"
              onClick={() => {
                this.props.form.validateFields((err, values) => {
                  console.log(err, values)
                });
              }}>submit</Button>
          </div>
        )
  }
 }

```

## 表格参照通用ui对外提供的组件有

### RefTreeTableBaseUI
    
      表格参照的纯ui，需要正确的参数传入

### SearchPanelItem
    表格参照搜索面板处的搜索条件


## RefMultipleTableBaseUI  API
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
checkedArray | `Array`| — | 表示选中的数据 (<span style="color:red;">*</span>refcorewithinput可以提供)| 否

> 注意：modalShow和checkedArray在refcorewithinput中有提供。因此若是refcorewithinput和refmultipletablebaseui配合使用，注意showModal onSave onCancel和checkedArray


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
checkedArray | `Array` | [] | 传给树选中的节点| 否
onMatchInitValue| `function(value)` | onMatchInitValue = (checkedArray) => {this.setState({checkedArray})} | 更改checkedArray | 否

> RefWithInput提供的参数可以保证参照组件的checkedArray更新以及参照showModal关闭打开，因此在使用RefWithInput就需要额外手动维护这两个参数

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
## 示例
```javascript
   
```

## 开发调试

```sh

$ npm install

$ npm run dev

```
