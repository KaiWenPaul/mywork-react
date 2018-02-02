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

class TipsListComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            TipsBeans: [],
            page: 1,
            total: 0,
            Tips_index: -1
        };
    }

    componentDidMount() {
        this.getTipsList(this.state.page);
    }

    getTipsList(page) {
        this.getDataByPost(1, homeurl + "goodsController.api?getTipsList", {page: page}, {type: 2});
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                let arr = data.data;
                for(let index in arr){
                    if(arr[index].tips_type==="promotion"){
                        arr[index].tips_type_show="促销标签";
                    }
                }
                this.setState({
                    TipsBeans:arr ,
                    total: data.total,
                })
                break;
            case 2:
                this.showTip("删除成功");
                this.getTipsList(this.state.page);
                break;
        }
    }

    deleteOneTipsDetail() {
        this.getDataByPost(2, homeurl + "goodsController.api?updateTip",
            {tips_id: this.state.TipsBeans[this.state.Tips_index].tips_id,is_delete:1});
    }

    render() {
        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Toolbar title="提示标签" history={this.props.history}></Toolbar>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={() => {
                            this.props.history.push("/tips_detail/" + encodeURIComponent(JSON.stringify({})));
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
                                this.deleteOneTipsDetail();
                            }}/>
                <ListViewComponent
                    data={[
                        {name: "ID", flex: 1, key: 'tips_id'},
                        {name: "提示消息", flex: 1, key: 'tips_name'},
                        {name: "类型", flex: 1, key: 'tips_type_show'},
                        {name: "创建时间", flex: 2, key: "create_time"},
                        {name: "操作", flex: 2, key: "-1"}
                    ]}
                    dataSource={this.state.TipsBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID) => {
                        return (
                            <div style={{display: 'flex', flex: 1}}>
                                <LinkComponent
                                    to={"/tips_detail/" + encodeURIComponent(JSON.stringify(this.state.TipsBeans[rowID]))}
                                    value="详情"/>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                     onClick={() => {
                                         this.setState({
                                             visible: true,
                                             Tips_index: rowID
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
                        this.getTipsList(page)
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
module.exports = TipsListComponent;
