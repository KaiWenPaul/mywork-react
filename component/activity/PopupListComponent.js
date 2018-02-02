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

class PopupListComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            popupBeans: [],
            page: 1,
            total: 0,
            popup_index: -1
        };
    }

    componentDidMount() {
        this.getPopupActivitys(this.state.page);
    }

    getPopupActivitys(page) {
        this.getDataByPost(1, homeurl + "activityController.api?getPopupList", {page: page}, {type: 2});
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                this.setState({
                    popupBeans: data.data,
                    total: data.total,
                })
                break;
            case 2:
                this.showTip("删除成功");
                this.getPopupActivitys(this.state.page);
                break;
        }
    }

    deletePopupActivityDetail() {
        this.getDataByPost(2, homeurl + "activityController.api?setPopupDetail",
            {popup_id: this.state.popupBeans[this.state.popup_index].popup_id,is_delete:1});
    }

    render() {
        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Toolbar title="移动端弹窗管理" history={this.props.history}></Toolbar>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={() => {
                            this.props.history.push("/mobile_popup_detail/" + encodeURIComponent(JSON.stringify({})));
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
                        {name: "ID", flex: 1, key: 'popup_id'},
                        {name: "弹窗名称", flex: 1, key: 'popup_name'},
                        {name: "弹窗图片", flex: 1, key: 'popup_img', type: 'img'},
                        {name: "弹窗链接URL", flex: 4, key: "popup_url"},
                        {name: "弹窗活动开始时间", flex: 2, key: "start_time"},
                        {name: "弹窗活动截止时间", flex: 2, key: "end_time"},
                        {name: "操作", flex: 2, key: "-1"}
                    ]}
                    dataSource={this.state.popupBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID) => {
                        return (
                            <div style={{display: 'flex', flex: 1}}>
                                <LinkComponent
                                    to={"/mobile_popup_detail/" + encodeURIComponent(JSON.stringify(this.state.popupBeans[rowID]))}
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
module.exports = PopupListComponent;
