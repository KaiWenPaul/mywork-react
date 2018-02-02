/**
 * Created by shenjiabo on 16/8/17.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var ListView = require('./../../widget/ListView');
var BaseComponent = require('./../BaseComponent');
var TipComponent = require('./../../widget/TipComponent');
import 'react-date-picker/index.css'
import {DateField, Calendar} from 'react-date-picker'
var PageComponent = require("./../../widget/PageComponent");
var Toolbar = require("./../../widget/Toolbar");
var SearchBar = require("./../../widget/SearchBar");
var ButtonComponent = require("./../../widget/ButtonComponent");
var CheckComponent = require("./../../widget/CheckComponent");
var EditorComponent = require("./../../widget/EditorComponent");
var ListViewComponent = require("./../../widget/ListViewComponent");
var LinkComponent = require("./../../widget/LinkComponent");

var Widget = require("./../../widget/WidgetComponent");

class VendorsListComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            vendorsBeans: [],
            page: 1,
            total: 0,
            popup_index: -1,
            vendors_code:"",
        };
    }

    componentDidMount() {
        this.getPopupActivitys(this.state.page);
    }

    getPopupActivitys(page) {
        this.getDataByPost(1, homeurl + "merchantsController.api?getVendorsBeanList", {page: page}, {type: 2});
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                this.setState({
                    vendorsBeans: data.data,
                    total: data.total,
                })
                break;
            case 2:
                this.showTip("删除成功");
                this.getPopupActivitys(this.state.page);
                break;
            case 3:
                window.open(homeurl+data.data);
                break;
        }
    }

    deletePopupActivityDetail() {
        this.getDataByPost(2, homeurl + "merchantsController.api?deleteVendorsBean",
            {vendors_id: this.state.vendorsBeans[this.state.popup_index].vendors_id,is_delete:1});
    }

    render() {
        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Toolbar title="供货商管理" history={this.props.history}></Toolbar>
                <div style={{display:'flex',alignItems:'center',marginTop:20}}>
                    <EditorComponent
                        title='供货商代码'
                        value={this.state.vendors_code}
                        onChange={(value)=>{
                            this.setState({
                                vendors_code:value
                            })
                        }}/>
                    <ButtonComponent
                        marginLeft={10}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1,
                            })
                            this.getDataByPost(1, homeurl + "merchantsController.api?getVendorsBeanList", {page: this.state.page,vendors_code:this.state.vendors_code}, {type: 2});
                        }}/>
                    </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
                    <Widget.Button
                        marginRight={20}
                        value="下载"
                        onClick={() => {
                            this.getDataByPost(3, homeurl + "merchantsController.api?exportVendorsBeanList",
                                {vendors_code:this.state.vendors_code}, {type: 2});
                        }}/>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={() => {
                            this.props.history.push("/vendors_detail/" + encodeURIComponent(JSON.stringify({})));
                        }}/>
                </div>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={() => {
                                this.setState({
                                    visible: false
                                })
                            }}
                            onPress={() => {
                                this.setState({
                                    visible: false
                                })
                                this.deletePopupActivityDetail();
                            }}/>
                <ListViewComponent
                    data={[
                        {name: "供货商ID", flex: 1, key: 'vendors_id'},
                        {name: "供货商名称", flex: 1, key: 'vendors_name'},
                        {name: "供货商代码", flex: 1, key: 'vendors_code'},
                        {name: "创建时间", flex: 2, key: "create_time"},
                        {name: "操作", flex: 2, key: "-1"}
                    ]}
                    dataSource={this.state.vendorsBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID) => {
                        return (
                            <div style={{display: 'flex', flex: 1}}>
                                <LinkComponent
                                    to={"/vendors_detail/" + encodeURIComponent(JSON.stringify(this.state.vendorsBeans[rowID]))}
                                    value="详情"/>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                     onClick={() => {
                                         this.setState({
                                             visible: true,
                                             popup_index: rowID
                                         })
                                     }}>
                                    <p1 style={{fontSize: 13, color: 'blue'}}>[删除]</p1>
                                </div>
                            </div>
                        )
                    }}
                    onPage={(page) => {
                        this.setState({
                            page: page
                        });
                        this.getPopupActivitys(page)
                    }}>
                </ListViewComponent>
            </div>
        )
    }
}
const styles = {
    tab: {
        display: 'flex',
        height: 30,
        alignItems: 'center',
    },
    tabTitle: {
        width: 100,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    input: {
        width: 200,
        marginLeft: 10,
        height: 30,
        paddingLeft: 10
    },
    font: {
        fontSize: 13,
    },
}
module.exports = VendorsListComponent;
