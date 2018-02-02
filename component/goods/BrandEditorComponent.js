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
        var brandBean=JSON.parse(decodeURIComponent(this.props.params.brandBean));
        this.state = {
            brandBean:brandBean,
            brand_name:brandBean.brand_name?brandBean.brand_name:"",
            brand_img:brandBean.brand_img?brandBean.brand_img:"",
            sort:brandBean.sort?brandBean.sort:"1",
            brand_state:brandBean.brand_state,
            discount:brandBean.discount
        };
    }


    render(){
        return(
            <div>
                <Toolbar title="品牌编辑" history={this.props.history}></Toolbar>
                <EditorComponent
                    marginTop={20}
                    title="品牌名称"
                    value={this.state.brand_name}
                    onChange={(value)=>{
                        this.setState({
                            brand_name:value
                        })
                    }}/>
                <Widget.Textarea
                    marginTop={20}
                    height={200}
                    title="品牌描述"
                    value={this.state.brandBean.brand_desc}
                    onChange={(value)=>{
                        this.state.brandBean.brand_desc=value;
                        this.setState({
                            brandBean:this.state.brandBean
                        })
                    }}/>
                <ImgComponent
                    marginTop={20}
                    title="图片(130*60)"
                    src={this.state.brand_img===''?"./images/add.jpg":imgurl+this.state.brand_img}
                    url={homeurl+'goodsController.api?uploadBrandImg'}
                    onSuccess={(data)=>{
                        this.setState({
                            brand_img:data,
                        })
                    }}/>
                <EditorComponent
                    marginTop={20}
                    title="权重"
                    value={this.state.sort}
                    onChange={(value)=>{
                        this.setState({
                            sort:value
                        })
                    }}/>
                <EditorComponent
                    marginTop={20}
                    title="所有商品折扣"
                    value={this.state.discount}
                    onChange={(value)=>{
                        this.setState({
                            discount:value
                        })
                    }}/>
                <ButtonComponent
                    visible={this.state.brand_state==="0"?"false":"true"}
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="下架该品牌"
                    onClick={()=>{
                        this.deployBrand();
                    }}/>
                <ButtonComponent
                    visible={this.state.brand_state==="1"?"false":"true"}
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="上架该品牌"
                    onClick={()=>{
                        this.deployBrand();
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
        if(this.state.brandBean.brand_id&&this.state.brand_state==="0"){
            this.getDataByPost(3,homeurl+"goodsController.api?deployBrand",
                {brand_id:this.state.brandBean.brand_id},{type:2});
        }
        if(this.state.brandBean.brand_id&&this.state.brand_state==="1"){
            this.getDataByPost(4,homeurl+"goodsController.api?unDeployBrand",
                {brand_id:this.state.brandBean.brand_id},{type:2});
        }
    }

    insertMoudle(){
        if(this.state.brand_name===''){
            toast.show("品牌名称不可为空");
            return;
        }

        if(!this.state.brandBean.brand_id){
            this.getDataByPost(1,homeurl+"goodsController.api?insertBrand",
                {brand_name:this.state.brand_name,brand_img:this.state.brand_img,
                    sort:this.state.sort,brand_state:1,
                    brand_desc:this.state.brandBean.brand_desc});
        }else{
            this.getDataByPost(2,homeurl+"goodsController.api?updateBrand",
                {brand_id:this.state.brandBean.brand_id,brand_name:this.state.brand_name,brand_img:this.state.brand_img,
                    sort:this.state.sort,
                    brand_desc:this.state.brandBean.brand_desc,
                    discount:this.state.discount});
        }
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