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
        var popupBean =JSON.parse(decodeURIComponent(this.props.params.popupBean));
        var myDate = new Date();
        this.state = {
            popupBean:popupBean,
            popup_name:popupBean.popup_name?popupBean.popup_name:'',
            popup_img:popupBean.popup_img,
            popup_url:popupBean.popup_url,
            start_time:popupBean.start_time?popupBean.start_time.substring(0,popupBean.start_time.length-2).replace(/[\r\n]/g,""):
                myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds(),
            end_time:popupBean.end_time?popupBean.end_time.replace(/[\r\n]/g,""):
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

    insertPopup(){
        debugger;
        if(this.state.popup_name===''){
            toast.show("名称不可为空");
            this.props.history.goBack();
        }

        if(this.state.popup_img===''){
            toast.show("请先上传张图片");
            this.props.history.goBack();
        }

        if(!this.state.popupBean.popup_id) {
            this.getDataByPost(1, homeurl + "activityController.api?insertOnePopupDetail",
                {
                    start_time: this.state.start_time,
                    end_time: this.state.end_time,
                    popup_name:this.state.popup_name,
                    popup_img:this.state.popup_img,
                    popup_url:this.state.popup_url
                })
        }else{
            this.getDataByPost(2, homeurl + "activityController.api?setPopupDetail",
                {
                    popup_id: this.state.popupBean.popup_id,
                    start_time: this.state.start_time,
                    end_time: this.state.end_time,
                    popup_name:this.state.popup_name,
                    popup_img:this.state.popup_img,
                    popup_url:this.state.popup_url
                })
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title="移动弹窗编辑" history={this.props.history}/>
                <Widget.Editor
                    marginTop={20}
                    title="名称"
                    value={this.state.popup_name}
                    onChange={(value)=>{
                        this.setState({
                            popup_name:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="链接URL"
                    value={this.state.popup_url}
                    onChange={(value)=>{
                        this.setState({
                            popup_url:value
                        })
                    }}/>
                <Widget.Img
                    marginTop={20}
                    title="图片"
                    url={homeurl+"activityController.api?uploadPromotionImg"}
                    src={this.state.popup_img}
                    onSuccess={(value)=>{
                        this.setState({
                            popup_img:value,
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
                        this.insertPopup();
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
