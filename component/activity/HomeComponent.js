/**
 * Created by shenjiabo on 16/9/6.
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
import Upload from 'rc-upload';
var PageComponent=require("./../../widget/PageComponent");
var TabBar=require('./../../widget/TabBar');

var HomeLabelComponent=require('./HomeLabelComponent');
var HomeLabel2Component=require('./HomeLabel2Component');
var HomeActivityComponent=require('./HomeActivityComponent');
var HomeGoodsComponent=require('./HomeGoodsComponent');//首页编辑
var HomeOthersComponent=require('./HomeOthersComponent');//首页编辑

class HomeComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            moudleBeans:[],
            index:0,
        };
    }

    componentDidMount() {
        this.setState({
            moudleBeans:[
                {"name":"顶级标签设置",component:this.renderLabel()},
                {"name":"移动端二级标签设置",component:this.renderLabel2()},
                {"name":"活动设置",component:this.renderActivity()},
                {"name":"商品设置",component:this.renderGoods()},
                {"name":"其他设置",component:this.renderOthers()}
            ]
        })
    }

    render(){
        return(
            <div>
                <Toolbar title="首页设置" history={this.props.history}></Toolbar>
                <TabBar saveIndex="homeIndex"
                        dataSource={this.state.moudleBeans}
                        component={this.state.moudleBeans.length>0?
                        this.state.moudleBeans[this.state.moudleBeans.length>this.state.index?this.state.index:0].component:null}
                        onPress={(rowID)=>{
                        this.setState({
                            index:rowID
                        })
                    }}></TabBar>
            </div>
        );
    }

    renderOthers(){
        return(
            <HomeOthersComponent
                history={this.props.history}>
                
            </HomeOthersComponent>
        )
    }


    renderLabel(){
        
        return(
            <HomeLabelComponent history={this.props.history}>

            </HomeLabelComponent>
        )
    }
    renderLabel2(){
        
        return(
            <HomeLabel2Component history={this.props.history}>

            </HomeLabel2Component>
        )
    }
    renderActivity(){
        return(
            <HomeActivityComponent history={this.props.history}>

            </HomeActivityComponent>
        )
    }

    renderGoods(){
        return(
            <HomeGoodsComponent history={this.props.history}>

            </HomeGoodsComponent>
        )
    }
}

module.exports=HomeComponent;