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


class RewardsRuleDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var rewardsRuleBean =JSON.parse(decodeURIComponent(this.props.params.rewardsRuleBean));
        var myDate = new Date();
        this.state = {
            rewardsRuleBean:rewardsRuleBean,
            rewards_id:rewardsRuleBean.rewards_id,
            rule_id:rewardsRuleBean.rule_id,
            left_level:rewardsRuleBean.left_level,
            right_level:rewardsRuleBean.right_level,
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
        if(!this.state.rewardsRuleBean.rule_id) {
            this.getDataByPost(1, homeurl + "swController.api?insertRewardsRule",
                {
                    rewards_id:this.state.rewards_id,
                    left_level:this.state.left_level,
                    right_level:this.state.right_level
                })
        }else{
            this.getDataByPost(2, homeurl + "swController.api?updateRewardsRule",
                {
                    rule_id:this.state.rule_id,
                    left_level:this.state.left_level,
                    right_level:this.state.right_level
                })
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title="规则编辑" history={this.props.history}/>
                <Widget.Editor
                    marginTop={20}
                    title="订单金额下限（包括）"
                    value={this.state.left_level}
                    onChange={(value)=>{
                        this.setState({
                            left_level:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="订单金额上限（不包括）"
                    value={this.state.right_level}
                    onChange={(value)=>{
                        this.setState({
                            right_level:value
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

module.exports=RewardsRuleDetailComponent;
