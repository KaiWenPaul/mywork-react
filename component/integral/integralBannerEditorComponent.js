/**
 * Created by shenjiabo on 16/8/26.
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var ListView = require('./../../widget/ListView');
var BaseComponent = require('./../BaseComponent');

var TipComponent = require('./../../widget/TipComponent');
var Toolbar = require("./../../widget/Toolbar");
import Upload from 'rc-upload';
import 'react-date-picker/index.css'
import { DateField, Calendar } from 'react-date-picker'
var EditorComponent = require("./../../widget/EditorComponent");
var ImgComponent = require("./../../widget/ImgComponent");
var ButtonComponent = require("./../../widget/ButtonComponent");
var SelectComponent = require("./../../widget/SelectComponent");
var SearchBar = require("./../../widget/SearchBar");

var banner_position_index = -1;
class integralBannerEditorComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var bannerBean = JSON.parse(decodeURIComponent(this.props.params.bannerBean));
        this.state = {
            bannerBean: bannerBean,
            banner_name:bannerBean.banner_name ? bannerBean.banner_name : "",
            app_img: bannerBean.app_img ? bannerBean.app_img : "",
            web_img: bannerBean.web_img ? bannerBean.web_img : "",
            sort: bannerBean.sort ? bannerBean.sort : "1",
            app_url: bannerBean.app_url ? bannerBean.app_url : "",
            web_url: bannerBean.web_url ? bannerBean.web_url : "",
            banner_id: bannerBean.banner_id,
            goods_id: bannerBean.goods_id,
            start_time:bannerBean.start_time ? bannerBean.start_time : "",
            end_time:bannerBean.end_time ? bannerBean.end_time : "",
        };
    }

    componentDidMount() {
        this.setState({
            positionBeans: [
                {name: "首页", id: 'home'}
            ]
        })
        console.log(this.state.bannerBean)
    }

    insertMoudle() {
       
        if (!this.state.bannerBean.banner_id) {
            this.getDataByPost(1, homeurl + "intergralController.api?saveIntegralBanner",
                {
                    web_url: this.state.web_url,
                    web_img: this.state.web_img,
                    app_url: this.state.app_url,
                    app_img: this.state.app_img,
                    start_time: this.state.start_time,
                    end_time: this.state.end_time,
                    sort: this.state.sort,
                    banner_name: this.state.banner_name,
                    action_token:'c'
                });
        } else {
            this.getDataByPost(2, homeurl + "intergralController.api?saveIntegralBanner",
                {
                    web_url: this.state.web_url,
                    web_img: this.state.web_img,
                    app_url: this.state.app_url,
                    app_img: this.state.app_img,
                    start_time: this.state.start_time,
                    end_time: this.state.end_time,
                    sort: this.state.sort,
                    banner_name: this.state.banner_name,
                    banner_id:this.state.banner_id,
                    action_token:'u'
                });
        }
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                toast.show("添加成功");
                this.props.history.goBack();
                break;
            case 2:
                toast.show("修改成功");
                this.props.history.goBack();
                break;
            case 3:
                /*this.setState({
                 allGoodsBeans: data
                 })
                 if (data.length > 0) {
                 var d = data.filter(function (item) {
                 return item["goods_id"] + "" === this.state.bannerBean.goods_id + "";
                 }.bind(this))
                 if (d.length > 0) {
                 console.log(d[0].goods_id + "=========");
                 this.setState({
                 selectBean: d[0],
                 goods_name: d[0].goods_name,
                 })
                 } else {
                 // this.setState({
                 //     selectBean:data[0],
                 //     goods_name:data[0].goods_name,
                 // })
                 }
                 }*/
                break;
            case 4:
                /* this.setState({
                 allGoodsClassBeans: data
                 })
                 if (data.length > 0) {
                 var d = data.filter(function (item) {
                 return item["goods_uuid"] + "" === this.state.bannerBean.goods_uuid + "";
                 }.bind(this));

                 if (d.length > 0) {
                 this.setState({
                 selectClassBean: d[0],
                 goods_class_name: d[0].goods_name,
                 })
                 } else {
                 // this.setState({
                 //     selectClassBean:data[0],
                 //     goods_class_name:data[0].class_name,
                 // })
                 }
                 }*/
                break;
        }
    }

    render() {
        return (
            <div>
                <Toolbar title={"banner编辑"} history={this.props.history}></Toolbar>
                {/*<EditorComponent
                    marginTop={20}
                    title="标题"
                    value={this.state.banner_title}
                    onChange={(value) => {
                        this.setState({
                            banner_title: value
                        })
                    }}/>*/}
                <EditorComponent
                    marginTop={20}
                    title="名称"
                    value={this.state.banner_name}
                    onChange={(value) => {
                        this.setState({
                            banner_name: value
                        })
                    }}/>
                <ImgComponent
                    marginTop={20}
                    title="移动端图片"
                    src={this.state.app_img === '' ? "./images/add.jpg" : imgurl + this.state.app_img}
                    url={homeurl + 'bannerController.api?uploadBannerImg'}
                    onSuccess={(data) => {
                        this.setState({
                            app_img: data,
                        })
                    }}/>
                <ImgComponent
                    marginTop={20}
                    title="Web端图片"
                    src={this.state.web_img === '' ? "./images/add.jpg" : imgurl + this.state.web_img}
                    url={homeurl + 'bannerController.api?uploadBannerImg'}
                    onSuccess={(data) => {
                        this.setState({
                            web_img: data,
                        })
                    }}/>
                    <div  style={{display:'flex',alignItems:'center',marginTop:20,marginLeft:30}}>
                    <p1 style={{fontSize:15,marginLeft:10}}>上线时间</p1>
                    <DateField
                        style={{marginLeft:10}}
                        dateFormat="YYYY-MM-DD"
                        defaultValue={this.state.start_time}
                        onChange={(dateString, { dateMoment, timestamp })=>{
                                   this.setState({
                                       start_time:dateString,
                                   })
                                }}
                    />
                   </div>
                   <div  style={{display:'flex',alignItems:'center',marginTop:20,marginLeft:30}}>
                    <p1 style={{fontSize:15,marginLeft:10}}>下线时间</p1>
                    <DateField
                        style={{marginLeft:10}}
                        dateFormat="YYYY-MM-DD"
                        defaultValue={this.state.end_time}
                        onChange={(dateString, { dateMoment, timestamp })=>{
                                   this.setState({
                                       end_time:dateString,
                                   })
                                }}
                    />
                    </div>
                <EditorComponent
                    marginTop={20}
                    title="权重"
                    value={this.state.sort}
                    onChange={(value) => {
                        this.setState({
                            sort: value
                        })
                    }}/>
                <EditorComponent
                    marginTop={20}
                    title="移动端内链地址"
                    value={this.state.app_url}
                    onChange={(value) => {
                        this.setState({
                            app_url: value
                        })
                    }}/>
                <EditorComponent
                    marginTop={20}
                    title="Web端内链地址"
                    value={this.state.web_url}
                    onChange={(value) => {
                        this.setState({
                            web_url: value
                        })
                    }}/>
               
            
                <ButtonComponent
                    marginTop={20}
                    width={100}
                    marginLeft={100}
                    value="保存"
                    onClick={() => {
                        this.insertMoudle();
                    }}/>
            </div>
        )
    }
}
const styles = {
    input: {
        width: 300,
        marginLeft: 10,
        height: 30,
        paddingLeft: 10
    },
    font: {
        fontSize: 15,
        width: 100
    },
    button: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        background: 'blue'
    },
    buttonFont: {
        fontSize: 15,
        color: '#ffffff'
    }
}
module.exports = integralBannerEditorComponent;