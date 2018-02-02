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


class GoodsBookDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var goodsBookBean =JSON.parse(decodeURIComponent(this.props.params.goodsBookBean));
        var myDate = new Date();
        this.state = {
            goodsBookBean:goodsBookBean,
        };
    }
    doSuccess(index,data){
        switch(index){
            case 1:
                toast.show("标记成功");
                this.props.history.goBack();
                break;
        }
    }
    updateGoodsBook(){
        this.getDataByPost(1,homeurl+"goodsController.api?updateGoodsBook",{book_id:this.state.goodsBookBean.book_id,deal_msg:this.state.goodsBookBean.deal_msg});
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title="求购信息" history={this.props.history}/>
                <div style={{display:'flex',alignItems:'center'}}>
                <Widget.TextComponent
                    marginTop={20}
                    title="姓名"
                    value={this.state.goodsBookBean.name}
                />
                <Widget.TextComponent
                    marginTop={20}
                    title="公司"
                    value={this.state.goodsBookBean.company}
                />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                <Widget.TextComponent
                    marginTop={20}
                    title="电话"
                    value={this.state.goodsBookBean.mobile}
                />
                <Widget.TextComponent
                    marginTop={20}
                    title="邮件"
                    value={this.state.goodsBookBean.email}
                />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                <Widget.TextComponent
                    marginTop={20}
                    title="求购时间"
                    value={this.state.goodsBookBean.create_time}
                />
                <Widget.TextComponent
                    marginTop={20}
                    title="到货时间"
                    value={this.state.goodsBookBean.need_time}
                />
                <Widget.TextComponent
                    marginTop={20}
                    title="商品数量"
                    value={this.state.goodsBookBean.goods_num}
                />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Widget.TextComponent
                        marginTop={20}
                        title="商品名称"
                        value={this.state.goodsBookBean.goods_name}
                        />
                    <Widget.TextComponent
                        marginTop={20}
                        title="商品规格"
                        value={this.state.goodsBookBean.goods_parameters}
                    />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                <Widget.TextComponent
                    marginTop={20}
                    title="商品货号"
                    value={this.state.goodsBookBean.goods_sku}
                />
                <Widget.TextComponent
                    marginTop={20}
                    title="商品CAS"
                    value={this.state.goodsBookBean.goods_cas}
                />
                <Widget.TextComponent
                    marginTop={20}
                    title="品牌名称"
                    value={this.state.goodsBookBean.brand_name}
                    />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                <Widget.TextComponent
                    marginTop={20}
                    title="备注"
                    value={this.state.goodsBookBean.tips}
                    />
                </div>
                <Widget.Editor
                    marginTop={20}
                    title="处理意见"
                    value={this.state.goodsBookBean.deal_msg}
                    onChange={(value)=>{
                        this.state.goodsBookBean.deal_msg=value;
                        this.forceUpdate();
                    }}/>
                <Widget.Button
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.updateGoodsBook();
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

module.exports=GoodsBookDetailComponent;
