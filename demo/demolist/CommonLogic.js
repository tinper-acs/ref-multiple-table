import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';
import RefMultipleTableBaseUI, { SearchPanelItem } from '../../src/index.js';
import { refValParse } from './utils';
import request from './request';

class Table extends Component {
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
            showModal: true
        };
        this.checkedArray = [];
        this.checkedMap = {};
        this.inited = false;
    }
    componentDidMount() {
        this.initComponent();
    }
    initComponent = () => {
        let { jsonp, headers, param, value, matchUrl, onMatchInitValue, valueField = "refpk" } = this.props;
        let requestList = [
            this.getTableHeader(),
            this.getTableData({
                'refClientPageInfo.currPageIndex': 0,
                'refClientPageInfo.pageSize': 10
            }),
        ];
        let valueMap = refValParse(value);
        if (this.checkedArray.length == 0 && valueMap.refpk) {
            requestList.push(new Promise((resolve, reject) => {
                resolve({ data: [] });
            }));
        };

        Promise.all(requestList).then(([columnsData, bodyData, matchData]) => {
            if (this.onAfterAjax) {
                this.onAfterAjax(bodyData)
            }
            if (matchData) {
                let { data = [] } = matchData;
                this.checkedMap = {};
                this.checkedArray = data.map(item => {
                    item.key = item[valueField];
                    item._checked = true;
                    this.checkedMap[item.key] = item;
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
        let { refModelUrl, param, jsonp, headers } = this.props;
        // let data = { "refUIType": "RefTable", "refCode": "new_bd_staff", "defaultFieldCount": 4, "strFieldCode": ["code", "name", "email", "mobile"], "strFieldName": ["人员编码", "人员名称", "人员邮箱", "人员电话"], "rootName": "人员-平台表", "refName": "人员-平台表", "refClientPageInfo": { "pageSize": 100, "currPageIndex": 0, "pageCount": 0, "totalElements": 0 }, "refVertion": "NewRef" };

        // return new Promise((resolve, reject) => {
        //     resolve(data)
        // });
        return request(refModelUrl.refInfo, {
            method: 'get',
            params: param,
            jsonp: jsonp,
            headers
        });
    }

    getTableData = (params) => {
        let { refModelUrl, param, jsonp, headers } = this.props;
        // let data = { "data": [{ "rownum_": 1, "code": "001", "name": "人员1", "mobile": "15011430230", "refcode": "001", "refpk": "cc791b77-bd18-49ab-b3ec-ee83cd40012a", "id": "cc791b77-bd18-49ab-b3ec-ee83cd40012a", "refname": "人员1", "email": "11@11.com" }, { "rownum_": 2, "code": "002", "name": "人员2", "mobile": "15011323234", "refcode": "002", "refpk": "de2d4d09-51ec-4108-8def-d6a6c5393c3b", "id": "de2d4d09-51ec-4108-8def-d6a6c5393c3b", "refname": "人员2", "email": "22@11.com" }, { "rownum_": 3, "code": "003", "name": "人员3", "mobile": "15011430232", "refcode": "003", "refpk": "004989bb-a705-45ce-88f3-662f87ee6e52", "id": "004989bb-a705-45ce-88f3-662f87ee6e52", "refname": "人员3", "email": "33@33.com" }, { "rownum_": 4, "code": "004", "name": "人员4", "mobile": "15011430234", "refcode": "004", "refpk": "3570cbde-0d43-49ce-ad53-ab27ee6ee7dd", "id": "3570cbde-0d43-49ce-ad53-ab27ee6ee7dd", "refname": "人员4", "email": "33@34.com" }, { "rownum_": 5, "code": "005", "name": "人员5", "mobile": "15011430235", "refcode": "005", "refpk": "5e3a85ec-5e14-4734-8b3a-1e6168426c89", "id": "5e3a85ec-5e14-4734-8b3a-1e6168426c89", "refname": "人员5", "email": "55@26.com" }, { "rownum_": 6, "code": "006", "name": "人员6", "mobile": "15011323232", "refcode": "006", "refpk": "112621b9-b7ae-41b9-9428-61779334c5d6", "id": "112621b9-b7ae-41b9-9428-61779334c5d6", "refname": "人员6", "email": "66@516.com" }, { "rownum_": 7, "code": "007", "name": "人员7", "mobile": "15011234567", "refcode": "007", "refpk": "394bba90-ed0f-4794-a44e-fd9ce6e9257d", "id": "394bba90-ed0f-4794-a44e-fd9ce6e9257d", "refname": "人员7", "email": "55@4.com" }, { "rownum_": 8, "code": "008", "name": "人员8", "mobile": "15011327890", "refcode": "008", "refpk": "a9f4c869-ca0b-4d12-847e-00eca08bfef6", "id": "a9f4c869-ca0b-4d12-847e-00eca08bfef6", "refname": "人员8", "email": "55@556.com" }, { "rownum_": 9, "code": "bpm01", "name": "张一", "mobile": "18777777777", "refcode": "bpm01", "refpk": "0dc47840-873a-4ed3-8ae7-c2335a76b385", "id": "0dc47840-873a-4ed3-8ae7-c2335a76b385", "refname": "张一", "email": "bpm01@qq.com" }, { "rownum_": 10, "code": "bpm02", "name": "张二", "mobile": "18788888888", "refcode": "bpm02", "refpk": "c97b59e2-9fa3-44d7-93b0-1be52f7aa550", "id": "c97b59e2-9fa3-44d7-93b0-1be52f7aa550", "refname": "张二", "email": "bpm02@qq.com" }], "page": { "pageSize": 10, "currPageIndex": 0, "pageCount": 2, "totalElements": 13 }, "allpks": null };

        // return new Promise((resolve, reject) => {
        //     resolve(data);
        // });
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
        let { multiple } = this.props;
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
        let { valueField = "refpk" } = this.props;
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
        }).catch(() => {
            _this.launchTableData({})
            _this.setState({
                showLoading: false
            });
        });
    }

    // 复杂查询
    searchFilterInfo = (filterInfo) => {
        const _this = this;
        let { refModelUrl: { tableBodyUrl }, param, jsonp, headers } = this.props;
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
            if (!filterInfo[key]) {
                delete filterInfo[key];
            }
        });

        let param = {
            'refClientPageInfo.currPageIndex': index - 1,
            'refClientPageInfo.pageSize': this.pageSize
        }
        if (Object.keys(filterInfo) > 0) {
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
            if (!filterInfo[key]) {
                delete filterInfo[key];
            }
        });

        let param = {
            'refClientPageInfo.currPageIndex': this.currPageIndex - 1,
            'refClientPageInfo.pageSize': pageSize
        }
        if (Object.keys(filterInfo) > 0) {
            param.content = JSON.stringify(filterInfo);
        }
        this.pageSize = pageSize;
        this.loadTableData(param);
    }
    /** end:分页*/

    render() {
        let { showLoading } = this.state;
        let { columnsData, tableData, pageCount, pageSize, currPageIndex, fliterFormInputs, filterInfo, checkedArray, checkedMap } = this;
        let { dataNumSelect, handlePagination, searchFilterInfo } = this;
        let childrenProps = Object.assign(Object.assign({}, this.props), {
            showLoading: showLoading,
            columnsData: columnsData,
            tableData: tableData,
            pageCount: pageCount,
            pageSize: pageSize,
            currPageIndex: currPageIndex,
            fliterFormInputs: fliterFormInputs,
            filterInfo: filterInfo,
            dataNumSelect: dataNumSelect,
            handlePagination: handlePagination,
            searchFilterInfo: searchFilterInfo,
            emptyBut: true
        });
        console.log(columnsData,tableData)
        // return (<div style={this.props.showModal?{display:'block'}:{display:'none'}}>12</div>)
        return(
            <RefMultipleTableBaseUI
                    {...childrenProps}    
            />
        )
    }
}

export default Table;
