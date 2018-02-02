/**
 * Created by shenjiabo on 16/8/26.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var ListView=require('./../../widget/ListView');
var BaseComponent=require('./../BaseComponent');

var TipComponent=require('./../../widget/TipComponent');
var Toolbar=require("./../../widget/Toolbar");

var EditorComponent=require('./../../widget/EditorComponent');
var ButtonComponent=require('./../../widget/ButtonComponent');
var ImgComponent=require('./../../widget/ImgComponent');

var Widget=require('./../../widget/WidgetComponent');

class BrandEditorComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var goodsBean=JSON.parse(decodeURIComponent(this.props.params.goodsBean));
        this.state = {
            goodsBean:goodsBean,
            batch_id:goodsBean.batch_id?goodsBean.batch_id:"",
            vendors_id:goodsBean.vendors_id?goodsBean.vendors_id:"",
            goods_id:goodsBean.goods_id?goodsBean.goods_id:"",
            goods_now_price:goodsBean.goods_now_price?goodsBean.goods_now_price:"",
            goods_pc_price:goodsBean.goods_pc_price?goodsBean.goods_pc_price:"",
            parameter_id:goodsBean.parameter_id?goodsBean.parameter_id:"",
            parameter_price:goodsBean.parameter_price?goodsBean.parameter_price:"",
            parameter_pc_price:goodsBean.parameter_pc_price?goodsBean.parameter_pc_price:"",
            parameter_origin_price:goodsBean.parameter_origin_price?goodsBean.parameter_origin_price:"",
            create_time:goodsBean.create_time?goodsBean.create_time:"",
        };
    }


    render(){
        return(
            <div>
                <Toolbar title="品牌编辑" history={this.props.history}></Toolbar>
                <EditorComponent
                    marginTop={20}
                    title="批次"
                    value={this.state.batch_id}
                    onChange={(value)=>{
                        this.setState({
                            batch_id:value
                        })
                    }}/>
                <EditorComponent
                    marginTop={20}
                    title="供货商ID"
                    value={this.state.vendors_id}
                    onChange={(value)=>{
                        this.setState({
                            vendors_id:value
                        })
                    }}/>
                     <EditorComponent
                    marginTop={20}
                    title="商品ID"
                    value={this.state.goods_id}
                    onChange={(value)=>{
                        this.setState({
                            goods_id:value
                        })
                    }}/>
                     <EditorComponent
                    marginTop={20}
                    title="手机现价"
                    value={this.state.goods_now_price}
                    onChange={(value)=>{
                        this.setState({
                            goods_now_price:value
                        })
                    }}/>
                     <EditorComponent
                    marginTop={20}
                    title="PC价"
                    value={this.state.goods_pc_price}
                    onChange={(value)=>{
                        this.setState({
                            goods_pc_price:value
                        })
                    }}/>
                     <EditorComponent
                    marginTop={20}
                    title="规格ID"
                    value={this.state.parameter_id}
                    onChange={(value)=>{
                        this.setState({
                            parameter_id:value
                        })
                    }}/>
                     <EditorComponent
                    marginTop={20}
                    title="手机规格价"
                    value={this.state.parameter_price}
                    onChange={(value)=>{
                        this.setState({
                            parameter_price:value
                        })
                    }}/>
                     <EditorComponent
                    marginTop={20}
                    title="PC规格价"
                    value={this.state.parameter_pc_price}
                    onChange={(value)=>{
                        this.setState({
                            parameter_pc_price:value
                        })
                    }}/>
                     <EditorComponent
                    marginTop={20}
                    title="规格原价"
                    value={this.state.parameter_origin_price}
                    onChange={(value)=>{
                        this.setState({
                            parameter_origin_price:value
                        })
                    }}/>
                     <EditorComponent
                    marginTop={20}
                    title="创建时间"
                    value={this.state.create_time}
                    onChange={(value)=>{
                        this.setState({
                            create_time:value
                        })
                    }}/>
                   

                <ButtonComponent
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.insertMoudle();
                    }}/>
            </div>
        )
    }

    deployBrand(){
        if(this.state.goodsBean.brand_id&&this.state.brand_state==="0"){
            this.getDataByPost(3,homeurl+"goodsController.api?deployBrand",
                {brand_id:this.state.goodsBean.brand_id},{type:2});
        }
        if(this.state.goodsBean.brand_id&&this.state.brand_state==="1"){
            this.getDataByPost(4,homeurl+"goodsController.api?unDeployBrand",
                {brand_id:this.state.goodsBean.brand_id},{type:2});
        }
    }

    insertMoudle(){
      
            this.getDataByPost(2,homeurl+"goodsController.api?updateVendorsGoods",
                {
                    batch_id:this.state.batch_id,
                    vendors_id:this.state.vendors_id,
                    goods_id:this.state.goods_id,
                    goods_now_price:this.state.goods_now_price,
                    goods_pc_price:this.state.goods_pc_price,
                    parameter_id:this.state.parameter_id,
                    parameter_price:this.state.parameter_price,
                    parameter_pc_price:this.state.parameter_pc_price,
                    parameter_origin_price:this.state.parameter_origin_price,
                    create_time:this.state.create_time,  
                    is_delete:''

                });

    }

    doSuccess(index,data){
        switch (index){
            case 1:
                toast.show("添加成功");
                this.props.history.goBack();
                break;
            case 2:
                toast.show("修改成功");
                this.props.history.goBack();
                break;
            case 3:
                toast.show(data.data);
                if(data.status==="ok"){
                    this.setState({
                        brand_state:"1"
                    })
                }
                break;
            case 4:
                toast.show(data.data);
                if(data.status==="ok") {
                    this.setState({
                        brand_state: "0"
                    })
                }
                break;
        }
    }
}
const styles = {
    input:{
        width:300,
        marginLeft:10,
        height:30,
        paddingLeft:10
    },
    font:{
        fontSize:15,
        width:100
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
module.exports=BrandEditorComponent;