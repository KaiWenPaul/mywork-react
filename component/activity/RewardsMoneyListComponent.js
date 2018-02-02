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

class RewardsMoneyListComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        var rewardsRuleBean =JSON.parse(decodeURIComponent(this.props.params.rewardsRuleBean));
        // 初始状态
        this.state = {
            rewardsRuleBean:rewardsRuleBean,
            beanList: [],
            page: 1,
            total: 0,
            choosedIndex: -1,
        };
    }

    componentDidMount() {
        this.getBeanList(this.state.page);
    }

    getBeanList(page) {
        this.getDataByPost(1, homeurl + "swController.api?getRewardsMoneyList", {page: page,rule_id:this.state.rewardsRuleBean.rule_id}, {type: 2});
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                this.setState({
                    beanList: data.data,
                    total: data.total,
                })
                break;
            case 2:
                this.showTip("删除成功");
                this.getBeanList(this.state.page);
                break;
        }
    }

    deleteBean() {
        this.getDataByPost(2, homeurl + "swController.api?deleteRewardsMoney",
            {money_id:this.state.beanList[this.state.choosedIndex].money_id});
    }

    render() {
        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Toolbar title="奖金范围" history={this.props.history}></Toolbar>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={() => {
                            this.props.history.push("/rewards_money_detail/" + encodeURIComponent(JSON.stringify({rule_id:this.state.rewardsRuleBean.rule_id})));
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
                                this.deleteBean();
                            }}/>
                <ListViewComponent
                    data={[
                        {name: "ID", flex: 1, key: 'money_id'},
                        {name: "规则ID", flex: 1, key: 'rule_id'},
                        {name: "参与该活动次数的次数要求", flex: 1, key: 'rewards_times'},
                        {name: "该用户已下单数的次数要求", flex: 1, key: 'order_times'},
                        {name: "红包金额上限", flex: 4, key: "top_money"},
                        {name: "红包金额下限", flex: 2, key: "bottom_money"},
                        {name: "创建时间", flex: 2, key: "create_time"},
                        {name: "操作", flex: 2, key: "-1"}
                    ]}
                    dataSource={this.state.beanList}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID) => {
                        return (
                            <div style={{display: 'flex', flex: 1}}>
                                <LinkComponent
                                    to={"/rewards_money_detail/" + encodeURIComponent(JSON.stringify(this.state.beanList[rowID]))}
                                    value="详情"/>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                     onClick={() => {
                                         this.setState({
                                             visible: true,
                                             choosedIndex: rowID
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
                        this.getBeanList(page)
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
module.exports = RewardsMoneyListComponent;
