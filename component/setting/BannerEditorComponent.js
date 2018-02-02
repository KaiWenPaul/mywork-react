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

var EditorComponent = require("./../../widget/EditorComponent");
var ImgComponent = require("./../../widget/ImgComponent");
var ButtonComponent = require("./../../widget/ButtonComponent");
var SelectComponent = require("./../../widget/SelectComponent");
var SearchBar = require("./../../widget/SearchBar");

var banner_position_index = -1;
class BannerEditorComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var bannerBean = JSON.parse(decodeURIComponent(this.props.params.bannerBean));
        this.state = {
            bannerBean: bannerBean,
            banner_title: bannerBean.banner_title ? bannerBean.banner_title : "",
            banner_desc: bannerBean.banner_title ? bannerBean.banner_desc : "",
            banner_img: bannerBean.banner_img ? bannerBean.banner_img : "",
            web_banner_img: bannerBean.web_banner_img ? bannerBean.web_banner_img : "",
            sort: bannerBean.sort ? bannerBean.sort : "1",
            typeBeans: [
                {name: "普通广告", id: 'common'},
                {name: "外链广告", id: 'chain'},
                {name: "商品广告", id: 'goods'},
                {name: "分类广告", id: 'class'}
            ],
            positionBeans: [],
            banner_type: bannerBean.banner_type,
            banner_url: bannerBean.banner_url ? bannerBean.banner_url : "",
            web_banner_url: bannerBean.web_banner_url ? bannerBean.web_banner_url : "",
            goods_id: bannerBean.goods_id,
            banner_position:bannerBean.banner_position,
        };
    }

    componentDidMount() {
        this.setState({
            positionBeans: [
                {name: "首页", id: 'home'}
            ]
        })
        /*this.getGoods();
         this.getGoodsClass();*/
    }

    /*getGoods(){
     this.getDataByPost(3,homeurl+"goodsController.api?getAllGoodsDetailNoPage",{})
     }*/

    /* getGoodsClass(){
     this.getDataByPost(4,homeurl+"goodsController.api?getAllGoodsClassNoPage",{})
     }*/
    insertMoudle() {
        if (this.state.banner_title === '') {
            toast.show("名称不可为空");
            return;
        }

        if (this.state.banner_type === 'goods') {
            if (!this.state.goods_id) {
                toast.show("请先选择商品");
                return;
            }
        }
        if (!this.state.bannerBean.banner_id) {
            this.getDataByPost(1, homeurl + "bannerController.api?insertBanner",
                {
                    banner_desc: this.state.banner_desc, banner_title: this.state.banner_title,
                    banner_img: this.state.banner_img, sort: this.state.sort,
                    banner_type: this.state.banner_type,
                    banner_position: this.state.banner_position?this.state.banner_position:"home",
                    goods_id: this.state.goods_id,
                    chain_url: this.state.bannerBean.chain_url,
                    banner_url:this.state.banner_url,
                    web_banner_url:this.state.web_banner_url,
                });
        } else {
            this.getDataByPost(2, homeurl + "bannerController.api?updateBanner",
                {
                    banner_desc: this.state.banner_desc,
                    banner_title: this.state.banner_title,
                    banner_img: this.state.banner_img,
                    sort: this.state.sort,
                    web_banner_img:this.state.web_banner_img,
                    web_banner_url:this.state.web_banner_url,
                    banner_url:this.state.banner_url,
                    banner_id: this.state.bannerBean.banner_id,
                    banner_type: this.state.banner_type,
                    banner_position: this.state.banner_position,
                    goods_id: this.state.goods_id,
                    chain_url: this.state.bannerBean.chain_url
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
                <Toolbar title={"广告编辑"} history={this.props.history}></Toolbar>
                <EditorComponent
                    marginTop={20}
                    title="标题"
                    value={this.state.banner_title}
                    onChange={(value) => {
                        this.setState({
                            banner_title: value
                        })
                    }}/>
                <EditorComponent
                    marginTop={20}
                    title="描述"
                    value={this.state.banner_desc}
                    onChange={(value) => {
                        this.setState({
                            banner_desc: value
                        })
                    }}/>
                <ImgComponent
                    marginTop={20}
                    title="移动端图片"
                    src={this.state.banner_img === '' ? "./images/add.jpg" : imgurl + this.state.banner_img}
                    url={homeurl + 'bannerController.api?uploadBannerImg'}
                    onSuccess={(data) => {
                        this.setState({
                            banner_img: data,
                        })
                    }}/>
                <ImgComponent
                    marginTop={20}
                    title="Web端图片"
                    src={this.state.web_banner_img === '' ? "./images/add.jpg" : imgurl + this.state.web_banner_img}
                    url={homeurl + 'bannerController.api?uploadBannerImg'}
                    onSuccess={(data) => {
                        this.setState({
                            web_banner_img: data,
                        })
                    }}/>
                <EditorComponent
                    marginTop={20}
                    title="权重"
                    value={this.state.sort}
                    onChange={(value) => {
                        this.setState({
                            sort: value
                        })
                    }}/>
                {/*<SelectComponent
                    title="展示位置"
                    show_value="name"
                    init_value={this.state.banner_position}
                    select_value="id"
                    dataSource={this.state.positionBeans}
                    onChange={(rowID) => {
                        this.state.banner_position = this.state.positionBeans[rowID].id
                    }}/>*/}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <SelectComponent
                        title="广告类型"
                        show_value="name"
                        init_value={this.state.bannerBean.banner_type}
                        select_value="id"
                        dataSource={this.state.typeBeans}
                        onChange={(rowID) => {
                            this.setState({
                                banner_type: this.state.typeBeans[rowID].id
                            });
                        }}/>
                </div>
                <EditorComponent
                    visible={this.state.banner_type === "common" ? "true" : (this.state.banner_type?"false":"true")}
                    title="移动端内链地址"
                    value={this.state.banner_url}
                    onChange={(value) => {
                        this.setState({
                            banner_url: value
                        })
                    }}/>
                <EditorComponent
                    visible={this.state.banner_type === "common" ? "true" : (this.state.banner_type?"false":"true")}
                    title="Web端内链地址"
                    value={this.state.web_banner_url}
                    onChange={(value) => {
                        this.setState({
                            web_banner_url: value
                        })
                    }}/>
                <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
                    <EditorComponent
                        visible={this.state.banner_type === "chain" ? "true" : "false"}
                        title="外链地址"
                        value={this.state.bannerBean.chain_url}
                        onChange={(value) => {
                            this.state.bannerBean.chain_url=value;
                            this.forceUpdate();
                        }}/>
                </div>
                <EditorComponent
                    visible={this.state.banner_type === "goods" ? "true" : "false"}
                    marginTop={20}
                    title="商品Id"
                    value={this.state.goods_id}
                    onChange={(value) => {
                        this.setState({
                            goods_id: value
                        })
                    }}/>
                <EditorComponent
                    visible={this.state.banner_type === "class" ? "true" : "false"}
                    marginTop={20}
                    title="分类Id"
                    value={this.state.goods_id}
                    onChange={(value) => {
                        this.setState({
                            goods_id: value
                        })
                    }}/>
                {/* <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
                 <p1 style={{fontSize: 13, marginLeft: 20, marginRight: 20}}>商品名</p1>
                 <SearchBar
                 item_name="goods_name"
                 dataSource={this.state.allGoodsBeans}
                 name={this.state.goods_name}
                 onPress={(data, value) => {
                 this.setState({
                 selectBean: data,
                 goods_name: value,
                 })
                 }}/>
                 </div>
                 <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
                 <p1 style={{fontSize: 13, marginLeft: 20, marginRight: 20}}>商品分类名</p1>
                 <SearchBar
                 item_name="goods_name"
                 dataSource={this.state.allGoodsClassBeans}
                 name={this.state.goods_class_name}
                 onPress={(data, value) => {
                 this.setState({
                 selectClassBean: data,
                 goods_class_name: value,
                 })
                 }}/>
                 </div>*/}
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
module.exports = BannerEditorComponent;