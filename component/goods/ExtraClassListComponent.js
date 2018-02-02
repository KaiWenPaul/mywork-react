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

class ExtraClassListComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            classBeans: [],
            page: 1,
            total: 0,
            list_index: -1
        };
    }

    componentDidMount() {
        this.getExtraClassList(this.state.page);
    }

    getExtraClassList(page) {
        this.getDataByPost(1, homeurl + "goodsController.api?getAdditionClassRelationList", {page: page}, {type: 2});
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                this.setState({
                    classBeans: data.data,
                    total: data.total,
                })
                break;
            case 2:
                this.showTip("删除成功");
                this.getExtraClassList(this.state.page);
                break;
        }
    }

    deleteExtraClass() {
        this.getDataByPost(2, homeurl + "goodsController.api?updateAdditionClassRelation",
            {additional_id: this.state.classBeans[this.state.list_index].additional_id,
                parent_id:this.state.classBeans[this.state.list_index].parent_id,
                goods_id:this.state.classBeans[this.state.list_index].goods_id,
                is_delete:1});
    }

    render() {
        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Toolbar title="分类映射管理" history={this.props.history}></Toolbar>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={() => {
                            this.props.history.push("/extra_class_detail/" + encodeURIComponent(JSON.stringify({})));
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
                                this.deleteExtraClass();
                            }}/>
                <ListViewComponent
                    data={[
                        {name: "ID", flex: 1, key: 'additional_id'},
                        {name: "父类ID", flex: 1, key: 'parent_id'},
                        {name: "父类名", flex: 1, key: 'parent_name'},
                        {name: "父类层级", flex: 1, key: 'parent_layer'},
                        {name: "子类ID", flex: 1, key: 'goods_id'},
                        {name: "子类名", flex: 1, key: 'goods_name'},
                        {name: "子类商品数", flex: 1, key: 'goods_count'},
                        {name: "子类层级", flex: 1, key: 'layer'},
                        {name: "操作", flex: 2, key: "-1"}
                    ]}
                    dataSource={this.state.classBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID) => {
                        return (
                            <div style={{display: 'flex', flex: 1}}>
                                <LinkComponent
                                    to={"/extra_class_detail/" + encodeURIComponent(JSON.stringify(this.state.classBeans[rowID]))}
                                    value="详情" key="link"/>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                     onClick={() => {
                                         this.setState({
                                             visible: true,
                                             list_index: rowID
                                         })
                                     }} key="delete">
                                    <p1 style={{fontSize: 13, color: 'blue'}}>[删除]</p1>
                                </div>
                            </div>
                        )
                    }}
                    onPage={(page) => {
                        this.setState({
                            page: page
                        });
                        this.getExtraClassList(page)
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
    div:{
        display:'flex',
        marginTop:20,
        alignItems:'center'
    }
}
module.exports = ExtraClassListComponent;
