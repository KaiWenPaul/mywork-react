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


class TipsDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var tipsBean =JSON.parse(decodeURIComponent(this.props.params.tipsBean));
        var myDate = new Date();
        let arr = [{name:"促销标签",id:"promotion"}];
        this.state = {
            tipsBean:tipsBean,
            tips_name:tipsBean.tips_name?tipsBean.tips_name:'',
            tips_type:this.isNull(tipsBean.tips_type)?arr[0].id:tipsBean.tips_type,
            tipsTypeBeans:arr
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

    inserTips(){
        if(this.state.tips_name===''){
            toast.show("名称不可为空");
            this.props.history.goBack();
        }

        if(this.state.tips_type===''){
            toast.show("类型不可为空");
            this.props.history.goBack();
        }

        if(!this.state.tipsBean.tips_id) {
            this.getDataByPost(1, homeurl + "goodsController.api?insertTip",
                {
                    tips_name:this.state.tips_name,
                    tips_type:this.state.tips_type,
                })
        }else{
            this.getDataByPost(2, homeurl + "goodsController.api?updateTip",
                {
                    tips_id: this.state.tipsBean.tips_id,
                    tips_name:this.state.tips_name,
                    tips_type:this.state.tips_type,
                })
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title="提示标签编辑" history={this.props.history}/>
                <Widget.Editor
                    marginTop={20}
                    title="内容"
                    value={this.state.tips_name}
                    onChange={(value)=>{
                        this.setState({
                            tips_name:value
                        })
                    }}/>
                <Widget.SelectV2
                    marginTop={20}
                    dataSource={this.state.tipsTypeBeans}
                    init_value={this.state.tips_type}
                    title="类型"
                    select_value="id"
                    show_value="name"
                    onChange={(rowID)=>{
                        this.setState({
                            tips_type:this.state.tipsTypeBeans[rowID].id
                        })
                    }}/>
                <Widget.Button
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.inserTips();
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

module.exports=TipsDetailComponent;
