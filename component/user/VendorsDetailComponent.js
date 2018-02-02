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


class VendorsDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var vendorsBean =JSON.parse(decodeURIComponent(this.props.params.vendorsBean));
        var myDate = new Date();
        this.state = {
            vendorsBean:vendorsBean,
            vendors_id:vendorsBean.vendors_id,
            vendors_name:vendorsBean.vendors_name?vendorsBean.vendors_name:'',
            vendors_code:vendorsBean.vendors_code,
            vendors_address:vendorsBean.vendors_address,
            vendors_contact_email:vendorsBean.vendors_contact_email,
            vendors_contact_person:vendorsBean.vendors_contact_person,
            create_time:vendorsBean.create_time,
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
        if(!this.state.vendorsBean.vendors_id) {
            this.getDataByPost(1, homeurl + "merchantsController.api?insertVendorsBean",
                {
                    vendors_name:this.state.vendors_name,
                    vendors_code:this.state.vendors_code,
                    vendors_address:this.state.vendors_address,
                    vendors_contact_email:this.state.vendors_contact_email,
                    vendors_contact_person:this.state.vendors_contact_person,
                })
        }else{
            this.getDataByPost(2, homeurl + "merchantsController.api?updateVendorsBean",
                {
                    vendors_id:this.state.vendors_id,
                    vendors_name:this.state.vendors_name,
                    vendors_code:this.state.vendors_code,
                    vendors_address:this.state.vendors_address,
                    vendors_contact_email:this.state.vendors_contact_email,
                    vendors_contact_person:this.state.vendors_contact_person,
                })
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title="供货商详情编辑" history={this.props.history}/>
                <Widget.Editor
                    marginTop={20}
                    title="名称"
                    value={this.state.vendors_name}
                    onChange={(value)=>{
                        this.setState({
                            vendors_name:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="代码"
                    value={this.state.vendors_code}
                    onChange={(value)=>{
                        this.setState({
                            vendors_code:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="地址"
                    value={this.state.vendors_address}
                    onChange={(value)=>{
                        this.setState({
                            vendors_address:value
                        })
                }}/>
                <Widget.Editor
                    marginTop={20}
                    title="联系人"
                    value={this.state.vendors_contact_person}
                    onChange={(value)=>{
                        this.setState({
                            vendors_contact_person:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="联系邮箱"
                    value={this.state.vendors_contact_email}
                    onChange={(value)=>{
                        this.setState({
                            vendors_contact_email:value
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

module.exports=VendorsDetailComponent;
