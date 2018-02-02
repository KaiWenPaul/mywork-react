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


class PopupDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var rewardsBean =JSON.parse(decodeURIComponent(this.props.params.rewardsBean));
        var myDate = new Date();
        this.state = {
            rewardsBean:rewardsBean,
            rewards_id:rewardsBean.rewards_id,
            benefits_model:rewardsBean.benefits_model,
            benefits_title:rewardsBean.benefits_title,
            benefits_name:rewardsBean.benefits_name,
            rewards_unopen_title:rewardsBean.rewards_unopen_title,
            benefits_desc:rewardsBean.benefits_desc,
            benefitsModelBeans:[{id:"1",name:"转为用户余额"},{id:"2",name:"仅作为凭证"}],
            start_time:rewardsBean.start_time?rewardsBean.start_time.substring(0,rewardsBean.start_time.length-2).replace(/[\r\n]/g,""):
                myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds(),
            end_time:rewardsBean.end_time?rewardsBean.end_time.replace(/[\r\n]/g,""):
                myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds(),
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
        if(!this.state.rewardsBean.rewards_id) {
            this.getDataByPost(1, homeurl + "swController.api?insertRewards",
                {
                    benefits_model:this.isNull(this.state.benefits_model)?"1":this.state.benefits_model,
                    benefits_title:this.state.benefits_title,
                    benefits_name:this.state.benefits_name,
                    benefits_desc:this.state.benefits_desc,
                    rewards_unopen_title:this.state.rewards_unopen_title,
                    start_time:this.state.start_time,
                    end_time:this.state.end_time
                })
        }else{
            this.getDataByPost(2, homeurl + "swController.api?updateRewards",
                {
                    rewards_id:this.state.rewards_id,
                    benefits_model:this.state.benefits_model,
                    benefits_title:this.state.benefits_title,
                    benefits_name:this.state.benefits_name,
                    benefits_desc:this.state.benefits_desc,
                    rewards_unopen_title:this.state.rewards_unopen_title,
                    start_time:this.state.start_time,
                    end_time:this.state.end_time
                })
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title="红包编辑" history={this.props.history}/>
                <Widget.Editor
                    marginTop={20}
                    title="名称"
                    value={this.state.benefits_name}
                    onChange={(value)=>{
                        this.setState({
                            benefits_name:value
                        })
                    }}/>
                <Widget.SelectComponent dataSource={this.state.benefitsModelBeans}
                      title="红包用途"
                      init_value={this.state.benefits_model}
                      select_value="id"
                      show_value="name"
                      onChange={(rowID)=>{
                          this.state.benefits_model=this.state.benefitsModelBeans[rowID].id
                      }}/>
                <Widget.Editor
                    marginTop={20}
                    title="未开启时标题"
                    value={this.state.rewards_unopen_title}
                    onChange={(value)=>{
                        this.setState({
                            rewards_unopen_title:value
                        })
                    }}/>
                    <Widget.Editor
                    marginTop={20}
                    title="开启后标题"
                    value={this.state.benefits_title}
                    onChange={(value)=>{
                        this.setState({
                            benefits_title:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="描述"
                    value={this.state.benefits_desc}
                    onChange={(value)=>{
                        this.setState({
                            benefits_desc:value
                        })
                    }}/>
                <Widget.Date
                    marginTop={20}
                    title="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value={this.state.start_time}
                    onChange={(value)=>{
                        this.setState({
                            start_time:value,
                        })
                    }}/>
                <Widget.Date
                    marginTop={20}
                    title="结束时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value={this.state.end_time}
                    onChange={(value)=>{
                        this.setState({
                            end_time:value,
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

module.exports=PopupDetailComponent;
