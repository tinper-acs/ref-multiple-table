
import React, { Component } from 'react';
import Loading from 'rc-loading';
import shallowequal from 'shallowequal';
import RefCoreError from 'ref-core/lib/refs/RefCoreError';
import RefCoreButton from 'ref-core/lib/refs/RefCoreButton';
import RefCoreTab from 'ref-core/lib/refs/RefCoreTab';
import RefCoreSearch from 'ref-core/lib/refs/RefCoreSearch';
import 'ref-core/lib/refs/refcoreerror.css';
import 'ref-core/lib/refs/refcorebutton.css';
import 'ref-core/lib/refs/refcoretab.css';
import 'ref-core/lib/refs/refcoresearch.css';
import {paginationLocale} from 'ref-core/lib/utils/locale.js'
import { Modal, Pagination,Table,Checkbox} from 'tinper-bee';
import multiSelect from 'tinper-bee/lib/multiSelect.js';
import RefSearchPanel from './RefSearchPanel';
import './RefMultipleTableBaseUI.less'


class RefMultipleTableBase extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedDataLength:0,//checkedArray的长度
      tableIsSelecting:true,//tab切换
    }
    this.checkedArray = [];
    this.checkedMap = {};
    this.TableView = props.multiple ? multiSelect(Table, Checkbox) : Table;
  }
  componentWillReceiveProps(nextProps,nextState) {
		//严格模式下每次打开必须重置数据
		if((nextProps.showModal && !this.props.showModal)|| !shallowequal(nextProps.checkedArray, this.props.checkedArray) ){
      //内部缓存已选择值，不通过 state 缓存，表格缓存状态自动实现
      this.checkedArray = Object.assign([],  nextProps.checkedArray || []);
      //内部缓存已选择值，缓存成 Map 便于检索
      this.checkedMap = {};
      this.checkedArray.forEach(item=>{
        this.checkedMap[item.refpk] = item;
      });
      this.setState({selectedDataLength:this.checkedArray.length})
    }
		
	}
  /**start:按钮操作 */
  handleBtnSave = () => {
    console.log('save+this.checkedArray=', this.checkedArray)
    this.props.onSave(Object.assign([], this.checkedArray));
  }

  handleBtnCancel = () => {
    this.props.onCancel()
  }
  onClickBtn = (type) => {
    switch (type) {
      case 'save':
        this.handleBtnSave();
        break;
      case 'cancel':
        this.handleBtnCancel()
        break;
      case 'clear':
        this.checkedArray = [];
        this.checkedMap = {};
        this.setState({
          selectedDataLength: 0,
          mustRender: Math.random()
        });
        break;
    }
  };
  /**end:按钮操作 */
  onSelectTabItem = (a, state) => {
		if(state === 'selecting'){
			// this.pageCount = Math.ceil(this.totalElements / this.pageSize);
			this.setState({
				tableIsSelecting: true,//展示已选择列表
			});
		}else{
			// this.pageCount = 1;
			this.setState({
				tableIsSelecting: false,//不展示已选择列表
			});
		}
	}
  /** start:表格操作 */
  /**
	 * 为数据增加 key
	 * @record {object} 该行数据
	 */
	putRowKey = (record, i) => {
		return record.key
  };
  /**
	 * 为选中行增加背景色，只在单选状态生效
	 * @record {object} 该行数据
	 */
	renderRowClassName = (recode) => {
		if(this.props.multiple) return;
		return recode._checked ? 'ref-multiple-table-row-selected' : '';
  }
  /**
	 * 多选状态下表格只能通过选择 checkbox 来选值，同时触发改方法
	 * @function
	 * @param checkedArray  已勾选值，表格中自动去除未勾选值
	 * @param recode  当前操作的行数据
	 */
	getSelectedDataFunc = (checkedArray, recode) => {
		if(!this.props.multiple) return;
		const _this = this;
		let { valueField = "refpk" } = this.props;
		if(recode){
			//单条操作
			if( recode._checked && !_this.checkedMap[recode[valueField]] ){

				_this.checkedArray.push(recode);
				_this.checkedMap[recode[valueField]] = recode;
	
			}else if( !recode._checked && this.checkedMap[recode[valueField]] ){
	
				delete _this.checkedMap[recode[valueField]];
				_this.checkedArray = [];
				Object.keys(_this.checkedMap).forEach(item => {
					_this.checkedArray.push(this.checkedMap[item])
				});
	
			}
		}else{
			//多条操作
			_this.checkedArray = [];
			let { tableIsSelecting } = this.state;
			if(tableIsSelecting){
				//选择中...
				if(checkedArray.length > 0){
					//全选操作 
					//去重操作
					//直接操作当前页数据
					_this.props.tableData.forEach(item => {
						if(!_this.checkedMap.hasOwnProperty(item[valueField])){
							_this.checkedMap[item[valueField]] = item;
						}
					})
				}else{
					//全取消操作
					//去重操作
					//直接操作当前页数据
					_this.props.tableData.forEach(item => {
						if(_this.checkedMap.hasOwnProperty(item[valueField])){
							delete _this.checkedMap[item[valueField]];
						}
					})
				}
				//组装已选数据
				_this.checkedArray = Object.keys(_this.checkedMap).map(item =>{
					return _this.checkedMap[item];
				});
			}else{
				//查看已选择
				if(checkedArray.length <= 0){
					//查看时只有取消选择操作，全选操作不会出现这里可考虑取消这个判断
					_this.checkedMap = {};
					_this.checkedArray = [];
				}

			}
		}
		_this.setState({
			selectedDataLength: checkedArray.length,
			mustRender: Math.random()
		});
	}
	/**
	 * 双击行选择该行数据，只在单选状态生效
	 * @record {object} 该行数据
	 */
	onRowDoubleClick = (record) => {
		if(this.props.multiple) return;
		let { valueField = "refpk" } = this.props;
		record._checked = true;
		this.checkedArray = [record];
		this.checkedMap = {};
		this.checkedMap[record[valueField]] = record;
		this.handleBtnSave();
	}
	/**
	 * 单击行选择该行数据，只在单选状态生效
	 * @record {object} 该行数据
	 */
	onRowClick = (record) => {
		if(this.props.multiple) return;
		const _this = this;
		let { valueField = "refpk" } = _this.props;

		//点击同一行数据时取消选择
		if(_this.checkedMap.hasOwnProperty(record[valueField])){
			_this.checkedArray = [];
			_this.checkedMap = {};
			_this.setState({
				mustRender: Math.random()
			});
		}else{
			let checkedRecord = Object.assign({_checked: true}, record)
			_this.checkedArray = [checkedRecord];
			_this.checkedMap = {};
			_this.checkedMap[checkedRecord[valueField]] = checkedRecord;
			_this.setState({
				mustRender: Math.random()
			});
		}
	}
  
  /** end:表格操作*/
  render() {
    const _this = this;
    let { className, miniSearch = true, title = '', backdrop, size = 'lg',
      showModal, lang = 'zh_CN', valueField, emptyBut = false, buttons, fliterFormInputs = [],
      showLoading,tableData, pageCount, currPageIndex, 
      columnsData, totalElements } = this.props;
    let {checkedArray,checkedMap} = this;
    let {selectedDataLength,tableIsSelecting} = this.state;
    let _tableData = tableData.map(item => {
      item._checked = checkedMap.hasOwnProperty(item[valueField]);
      return item;
    });
    checkedArray.forEach(item => {
      item._checked = true;
    });
    if (checkedArray.length === 0) {
      emptyBut = false;
    }
    return (
      <Modal
        show={showModal}
        className={`${className} ref-core ref-multiple-table ref-core-modal`}
        backdrop={backdrop}
        size={size}
        onHide={this.handleBtnCancel}
      >
        <Loading spinning={showLoading} type={'fence'} displayType={"block"} >
          <Modal.Header closeButton={true}>
            <Modal.Title > {title}</Modal.Title>
          </Modal.Header >
          <Modal.Body>
            {
              //按字段查询
              fliterFormInputs.length !== 0 && !miniSearch ?
                <RefSearchPanel
                  show={tableIsSelecting}
                  onSearch={this.props.searchFilterInfo}
                >
                  {
                    fliterFormInputs.map(item => item)
                  }
                </RefSearchPanel>
                : ''
            }
            <RefCoreTab
              className="ref-multiple-table-tab"
              selectedData={checkedArray}
              selectedDataLength={selectedDataLength}
              selecteing={tableIsSelecting}
              language={lang}
              onSelectTabItem={_this.onSelectTabItem}
            >
              {/*简单查询 */}
              <RefCoreSearch
                className={`${miniSearch && tableIsSelecting ? '' : 'ref-multiple-table-tab-search-hide'}`}
                onSearch={_this.miniSearchFunc}
                language={lang}
              />
            </RefCoreTab>
            {
              columnsData && columnsData.length ? React.createElement(_this.TableView, {
                bordered: true,
                scroll: { x: false, y: true },
                columns: columnsData,
                rowClassName: _this.renderRowClassName,
                data: tableIsSelecting ? _tableData : checkedArray,
                getSelectedDataFunc: _this.getSelectedDataFunc,
                onRowDoubleClick: _this.onRowDoubleClick,
                onRowClick: _this.onRowClick,
                rowKey: _this.putRowKey,
              }) :
                <RefCoreError show={!Boolean(_tableData.length)} language={lang} />
            }
            {
              tableIsSelecting && (
              <Pagination
                first
                last
                prev
                next
                showJump={true}
                boundaryLinks
                className={pageCount > 1 ? '' : `ref-multiple-table-pagination-hide`}
                items={pageCount}
                maxButtons={5}
                total={totalElements}
                activePage={currPageIndex}
                onDataNumSelect={_this.props.dataNumSelect}
                onSelect={_this.props.handlePagination}
                locale={paginationLocale(lang)}
              />
              )
            }

          </Modal.Body>
          <Modal.Footer className={'ref-core-modal-footer '}>
            <RefCoreButton
              language={lang}
              buttons={buttons}
              emptyBut={emptyBut}
              onClickBtn={_this.onClickBtn}
            />
          </Modal.Footer>
        </Loading>
      </Modal>
    );
  }
}
export default RefMultipleTableBase;