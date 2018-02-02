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

class GoodsBookListComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            goodsBookBeans: [],
            page: 1,
            total: 0,
            book_index: -1
        };
    }

    componentDidMount() {
        this.getGoodsBookList(this.state.page);
    }

    getGoodsBookList(page) {
        this.getDataByPost(1, homeurl + "goodsController.api?getGoodsBookList", {page: page}, {type: 2});
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                let arr = data.data;
                for(let index in arr){
                    arr[index].is_deal_show = arr[index].is_deal==="0"?"未处理":"已处理"
                }
                this.setState({
                    goodsBookBeans: arr,
                    total: data.total,
                })
                break;
            case 2:
                this.showTip("删除成功");
                this.getGoodsBookList(this.state.page);
                break;
            case 3:
                this.showTip("处理成功");
                this.getGoodsBookList(this.state.page);
                break;
        }
    }

    deleteOneBookDetail() {
        this.getDataByPost(2, homeurl + "goodsController.api?updateGoodsBook",
            {book_id: this.state.goodsBookBeans[this.state.book_index].book_id,is_delete:1});
    }

    render() {
        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Toolbar title="商品求购列表" history={this.props.history}></Toolbar>
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
                                this.deleteOneBookDetail();
                            }}/>
                <ListViewComponent
                    data={[
                        {name: "ID", flex: 1, key: 'book_id'},
                        {name: "名称", flex: 2, key: 'goods_name'},
                        {name: "货号", flex: 2, key: "goods_sku"},
                        {name: "CAS", flex: 2, key: "goods_cas"},
                        {name: "商品参数", flex: 2, key: "goods_parameter"},
                        {name: "品牌名", flex: 2, key: "brand_name"},
                        {name: "数量需求", flex: 2, key: "goods_num"},
                        {name: "到货时间", flex: 2, key: "need_time"},
                        {name: "求购时间", flex: 2, key: "create_time"},
                        {name: "是否处理", flex: 1, key: "is_deal_show"},
                        {name: "操作", flex: 2, key: "-1"}
                    ]}
                    dataSource={this.state.goodsBookBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID) => {
                        return (
                            <div style={{display: 'flex', flex: 1}}>
                                <LinkComponent
                                    to={"/goodsBook_detail/" + encodeURIComponent(JSON.stringify(this.state.goodsBookBeans[rowID]))}
                                    value="详情"/>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                     onClick={() => {
                                         this.setState({
                                             visible: true,
                                             book_index: rowID
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
                        this.getGoodsBookList(page)
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
module.exports = GoodsBookListComponent;
