/**
 *
 * @title 表格参照
 * @description 表格参照
 *
 */
import React, { Component } from 'react';
import RefMultipleTableBaseUI,{ SearchPanelItem } from '../../src/index';
import {FormControl,Button,Form} from 'tinper-bee';
import { refValParse } from './utils';
import request from './request';
const props = {
  placeholder:"自定义placeholder",
  title: '复杂表格参照',
  backdrop: true,
  disabled: false,
  multiple: true,
  strictMode: true,
  miniSearch: false,
  emptyBut: true,
  param: {
      "refCode": "new_bd_staff"
  },
  refModelUrl:{
      tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
      refInfo: '/pap_basedoc/common-ref/refInfo',//表头请求
  },
  matchUrl:'/pap_basedoc/common-ref/matchPKRefJSON',
  filterUrl:'/pap_basedoc/common-ref/filterRefJSON',
  valueField: "refpk",
  displayField: "{refname}",
}
class Demo1 extends Component {
  columnsData = []//表头数据
  tableData = []//表格数据
  pageCount = 1//总页数
  pageSize = '10'//每页数据数
  currPageIndex = 1//激活页码
  fliterFormInputs = []
  filterInfo = {};
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      selectedDataLength: 0,
      mustRender: 0,
      showModal:false
    };
    this.checkedArray = [];
    // this.checkedMap = {};
    this.inited = false;
  }

  componentDidMount() {
    this.initComponent();
  }
  initComponent = () => {
    let { jsonp, headers, param, value, matchUrl, onMatchInitValue, valueField = "refpk" } = props;
    let requestList = [
      this.getTableHeader(),
      this.getTableData({
        'refClientPageInfo.currPageIndex': 0,
        'refClientPageInfo.pageSize': 10
      }),
    ];
    let valueMap = refValParse(value);
    if (this.checkedArray.length == 0 && valueMap.refpk) {
      requestList.push(request(matchUrl, {
        method: 'post',
        data: {
          ...param,
          pk_val: valueMap.refpk.split(',')
        },
        jsonp: jsonp,
        headers

      }))
    };

    Promise.all(requestList).then(([columnsData, bodyData, matchData]) => {
      if (this.onAfterAjax) {
        this.onAfterAjax(bodyData)
      }
      if (matchData) {
        let { data = [] } = matchData;
        // this.checkedMap = {};
        this.checkedArray = data.map(item => {
          item.key = item[valueField];
          item._checked = true;
          // this.checkedMap[item.key] = item;
          return item;
        });
        if (Object.prototype.toString.call(onMatchInitValue) === '[object Function]') {
          onMatchInitValue(data);
        }
        this.setState({
          selectedDataLength: this.checkedArray.length,
          mustRender: Math.random()
        })
      }
      this.launchTableHeader(columnsData);
      this.launchTableData(bodyData);
      this.setState({
        showLoading: false
      });
    }).catch((e) => {
      this.launchTableHeader({});
      this.launchTableData({});
      this.setState({
        showLoading: false
      });
      console.error(e)
    });;
  }

  getTableHeader = () => {
    let { refModelUrl, param, jsonp, headers } = props;
    return request(refModelUrl.refInfo, {
      method: 'get',
      params: param,
      jsonp: jsonp,
      headers
    });
  }

  getTableData = (params) => {
    let { refModelUrl, param, jsonp, headers } = props;
    return request(refModelUrl.tableBodyUrl, {
      method: 'get',
      params: {
        ...param,
        ...params
      },
      jsonp: jsonp,
      headers
    });
  }

	/**
	 * 根据 refinfo 返回结果拆解并渲染表格表头
	 * @param {object} data 
	 */
  launchTableHeader = (data) => {
    if (!data) return;
    let { multiple } = props;
    let keyList = data.strFieldCode || [];
    let titleList = data.strFieldName || [];

    this.fliterFormInputs = [];
    let colunmsList = keyList.map((item, index) => {
      this.fliterFormInputs.push(
        <SearchPanelItem key={item} name={item} text={titleList[index]}>
          <FormControl />
        </SearchPanelItem>
      )
      return {
        key: item,
        dataIndex: item,
        title: titleList[index]
      }
    });
    if (colunmsList.length === 0) {
      colunmsList = [{ title: "未传递表头数据", dataIndex: "nodata", key: "nodata" }];

    } else if (!multiple) {
      //单选时用对号符号标记当前行选中
      colunmsList.unshift({
        title: " ",
        dataIndex: "a",
        key: "a",
        width: 45,
        render(text, record, index) {
          return <div className={`ref-multiple-table-radio ${record._checked ? 'ref-multiple-table-radio-on' : ''}`} />
        }
      })

    }
    this.columnsData = colunmsList;
  }
	/**
	 * 处理并渲染表格数据
	 */
  launchTableData = (response) => {
    if (!response) return;
    let { valueField = "refpk" } = props;
    let { data = [], page = {} } = response;
    data.map((record, k) => {
      record.key = record[valueField];
      return record;
    });
    this.tableData = data;
    this.pageCount = page.pageCount || 0;
    this.currPageIndex = page.currPageIndex + 1 || 0;
    this.totalElements = page.totalElements || 0;
  }
  //加载getTableData
  loadTableData = (param) => {
		this.setState({
			showLoading: true
		});
		const _this = this;

		this.getTableData(param).then(response => {
			_this.launchTableData(response)
			_this.setState({
				showLoading: false
			});
		}).catch(()=>{
			_this.launchTableData({})
			_this.setState({
				showLoading: false
			});
		});
  } 

  // 复杂查询
  searchFilterInfo = (filterInfo) => {
    const _this = this;
    let { refModelUrl: { tableBodyUrl }, param, jsonp, headers } = props;
    this.filterInfo = filterInfo;
    this.setState({
      showLoading: true,
      // tableIsSelecting: true
    }, function () {
      let { pageSize } = _this;
      let paramWithFilter = Object.assign({}, param, { page: 0, pageSize: pageSize, content: '', 'refClientPageInfo.currPageIndex': 0, 'refClientPageInfo.pageSize': pageSize })
      if (Object.keys(filterInfo).length > 0) {
        paramWithFilter.content = JSON.stringify(filterInfo)
      }

      _this.loadTableData(paramWithFilter);
    })
  }
  /** start:分页 */
  	/**
	 * 跳转到制定页数的操作
	 * @param {number} index 跳转页数
	 */
	handlePagination = (index) => {
		let { filterInfo } = this;
		Object.keys(filterInfo).forEach(key => {
			if(!filterInfo[key]){
				delete filterInfo[key];
			}
		});

		let param  = {
			'refClientPageInfo.currPageIndex': index - 1, 
			'refClientPageInfo.pageSize': this.pageSize
		}
		if(Object.keys(filterInfo) > 0){
			param.content = JSON.stringify(filterInfo);
		}
		this.loadTableData(param);
	}
	/**
	 * 选择每页数据个数
	 */
	dataNumSelect = (index, pageSize) => {
		let { filterInfo } = this;
		Object.keys(filterInfo).forEach(key => {
			if(!filterInfo[key]){
				delete filterInfo[key];
			}
		});

		this.currPageIndex = 1;
    let param = {
        'refClientPageInfo.currPageIndex': 0,
        'refClientPageInfo.pageSize': pageSize
    }
		if(Object.keys(filterInfo) > 0){
			param.content = JSON.stringify(filterInfo);
		}
		this.pageSize = pageSize;
		this.loadTableData(param);
	}
  /** end:分页*/

  onSave= (item) =>{
    // console.log('save',item);
    this.checkedArray = item;
    this.setState({showModal:false})
  }
  onCancel= (item) =>{
    this.setState({showModal:false})
  }
  render() {
    const {getFieldError,getFieldProps} = this.props.form;
    let { showLoading,showModal } = this.state;
    let { columnsData, tableData,pageCount, pageSize, currPageIndex, fliterFormInputs, filterInfo, checkedArray } = this;
    let {dataNumSelect,handlePagination,searchFilterInfo} = this;
    let childrenProps = Object.assign(Object.assign({}, props), {
      showModal:showModal,
      showLoading : showLoading,
      columnsData : columnsData,
      tableData : tableData,
      checkedArray:checkedArray,
      pageCount : pageCount,
      pageSize : pageSize,
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

export default Form.createForm()(Demo1);

