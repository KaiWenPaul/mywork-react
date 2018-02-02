/**
 * Created by shenjiabo on 16/8/22.
 */
/**
 * Created by shenjiabo on 16/8/17.
 */
import React,{Component} from 'react'

import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var ListView=require('./../../widget/ListView');
var BaseComponent=require('./../BaseComponent');

import { DateField, Calendar } from 'react-date-picker'
var Toolbar=require("./../../widget/Toolbar");
import Upload from 'rc-upload';
var Widget=require("./../../widget/WidgetComponent");


class RewardsmMoneyDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var rewardsMoneyBean =JSON.parse(decodeURIComponent(this.props.params.rewardsMoneyBean));
        var myDate = new Date();
        this.state = {
            rewardsMoneyBean:rewardsMoneyBean,
            rewards_id:rewardsMoneyBean.rewards_id,
            money_id:rewardsMoneyBean.money_id,
            rule_id:rewardsMoneyBean.rule_id,
            rewards_times:rewardsMoneyBean.rewards_times,
            order_times:rewardsMoneyBean.order_times,
            top_money:rewardsMoneyBean.top_money,
            bottom_money:rewardsMoneyBean.bottom_money,
        };
    }

    doSuccess(index,data){
        switch(index){
            case 1:
                toast.show("添加成功");
                this.props.history.goBack();
                break;
            case 2:
                toast.show("修改成功");
                this.props.history.goBack();
                break;
        }
    }

    insertBean(){
        if(!this.state.rewardsMoneyBean.money_id) {
            this.getDataByPost(1, homeurl + "swController.api?insertRewardsMoney",
                {
                    rule_id:this.state.rule_id,
                    rewards_times:this.state.rewards_times,
                    order_times:this.state.order_times,
                    top_money:this.state.top_money,
                    bottom_money:this.state.bottom_money,
                })
        }else{
            this.getDataByPost(2, homeurl + "swController.api?updateRewardsMoney",
                {
                    money_id:this.state.money_id,
                    rewards_times:this.state.rewards_times,
                    order_times:this.state.order_times,
                    top_money:this.state.top_money,
                    bottom_money:this.state.bottom_money,
                })
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title="规则编辑" history={this.props.history}/>
                <Widget.Editor
                    marginTop={20}
                    title="参与该活动次数的次数要求"
                    value={this.state.rewards_times}
                    onChange={(value)=>{
                        this.setState({
                            rewards_times:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="该用户已下单数的次数要求"
                    value={this.state.order_times}
                    onChange={(value)=>{
                        this.setState({
                            order_times:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="红包上限（包含）"
                    value={this.state.top_money}
                    onChange={(value)=>{
                        this.setState({
                            top_money:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="红包下限（包含）"
                    value={this.state.bottom_money}
                    onChange={(value)=>{
                        this.setState({
                            bottom_money:value
                        })
                    }}/>
                <Widget.Button
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.insertBean();
                    }}/>
            </div>
        )
    }
}

const styles = {
    input:{
        width:300,
        height:30,
    },
    font:{
        fontSize:15,
        width:100,
        marginLeft:20,
    },
    button:{
        paddingLeft:20,
        paddingRight:20,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        background:'blue'
    },
    buttonFont:{
        fontSize:15,
        color:'#ffffff'
    }
}

module.exports=RewardsmMoneyDetailComponent;
