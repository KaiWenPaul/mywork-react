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


class ExtraClassDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var classBean =JSON.parse(decodeURIComponent(this.props.params.classBean));
        var myDate = new Date();
        this.state = {
            classBean:classBean,
            parent_id:classBean.parent_id?classBean.parent_id:'',
            goods_id:classBean.goods_id,
            is_update:classBean.parent_id?true:false,
            allClassBeans:[],
            parent_name:"",
            son_name:"",
        };
    }
    componentDidMount() {
        this.getDataByPost(3,homeurl+"goodsController.api?getAllGoodsClassNoPage");
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
            case 3:
                let allClassBeans = data;
                let parent_name = "";
                let son_name="";
                let parent_layer="";
                let son_layer="";
                if(this.state.is_update){
                    for(let obj of allClassBeans){
                        if(this.state.parent_id===obj.goods_id){
                            parent_name=obj.goods_name;
                            parent_layer=obj.layer;
                        }
                        if(this.state.goods_id===obj.goods_id){
                            son_name=obj.goods_name;
                            son_layer=obj.layer;
                        }
                    }
                }
                this.setState({
                    allClassBeans:allClassBeans,
                    parent_name:parent_name,
                    son_name:son_name,
                    son_layer:son_layer,
                    parent_layer:parent_layer
                })
                break;
        }
    }

    insertClass(){
        if(this.state.parent_name===''){
            toast.show("父类信息不可为空");
            return;
        }

        if(this.state.son_name===''){
            toast.show("子类信息不能为空");
            return;
        }

        if(this.state.goods_id===this.state.parent_id){
            toast.show("父类不能和子类相同");
            return;
        }

        if(!this.state.classBean.goods_id) {
            this.getDataByPost(1, homeurl + "goodsController.api?insertAdditionClassRelation",
                {
                    parent_id:this.state.parent_id,
                    goods_id:this.state.goods_id,
                    is_delete:0,
                })
        }else{
            this.getDataByPost(2, homeurl + "goodsController.api?updateAdditionClassRelation",
                {
                    additional_id:this.state.classBean.additional_id,
                    is_delete:0,
                })
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title="分类映射编辑" history={this.props.history}/>
                <div style={styles.div}>
                    <Widget.Editor
                        visible = {this.state.classBean.goods_id?"false":"true"}
                        marginTop={20}
                        title="父类ID"
                        value={this.state.parent_id}
                        onChange={(value)=>{
                            let name = "";
                            let layer = "";
                            for(let obj of this.state.allClassBeans){
                                if(value===""+obj.goods_id){
                                    name=obj.goods_name;
                                    layer=obj.layer;
                                }
                            }
                            this.setState({
                                parent_id:value,
                                parent_name:name,
                                parent_layer:layer,
                            })
                        }}/>
                    <Widget.TextComponent
                        visible = {this.state.classBean.goods_id?"true":"false"}
                        marginTop={20}
                        title="父类ID"
                        value={this.state.parent_id}/>
                    <Widget.TextComponent
                        visible={this.state.parent_name===""?"false":"true"}
                        marginTop={20}
                        title="分类名"
                        value={this.state.parent_name}/>
                    <Widget.TextComponent
                        visible={this.state.parent_layer===""?"false":"true"}
                        marginTop={20}
                        title="层级"
                        value={this.state.parent_layer}/>
                </div>
                <div style={styles.div}>
                    <Widget.Editor
                        marginTop={20}
                        title="子类ID"
                        value={this.state.goods_id}
                        visible = {this.state.classBean.goods_id?"false":"true"}
                        onChange={(value)=>{
                            let name = "";
                            let layer = "";
                            for(let obj of this.state.allClassBeans){
                                if(value===""+obj.goods_id){
                                    name=obj.goods_name;
                                    layer=obj.layer;
                                }
                            }
                            this.setState({
                                goods_id:value,
                                son_name:name,
                                son_layer:layer,
                            })
                        }}/>
                    <Widget.TextComponent
                        visible = {this.state.classBean.goods_id?"true":"false"}
                        marginTop={20}
                        title="子类ID"
                        value={this.state.goods_id}/>
                    <Widget.TextComponent
                        visible={this.state.son_name===""?"false":"true"}
                        marginTop={20}
                        title="分类名"
                        value={this.state.son_name}/>
                    <Widget.TextComponent
                        visible={this.state.son_layer===""?"false":"true"}
                        marginTop={20}
                        title="层级"
                        value={this.state.son_layer}/>
                </div>
                <Widget.Button
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.insertClass();
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
    },
    div:{
        display:'flex',
        marginTop:20,
        alignItems:'center'
    }
}

module.exports=ExtraClassDetailComponent;
