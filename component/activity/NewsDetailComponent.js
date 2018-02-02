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


class NewsDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var newsBean =JSON.parse(decodeURIComponent(this.props.params.newsBean));
        var myDate = new Date();
        this.state = {
            newsBean:newsBean,
            news_name:newsBean.news_name?newsBean.news_name:'',
            news_html:newsBean.news_html,
            news_web_html:newsBean.news_web_html,
            sort:newsBean.sort,
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

    insertNews(){
        if(this.state.news_name===''){
            toast.show("名称不可为空");
            this.props.history.goBack();
        }

        if(this.state.news_html===''){
            toast.show("url不能为空");
            this.props.history.goBack();
        }

        if(!this.state.newsBean.news_goods_id) {
            this.getDataByPost(1, homeurl + "activityController.api?insertOneNewsItem",
                {
                    news_name:this.state.news_name,
                    news_html:this.state.news_html,
                    news_web_html:this.state.news_web_html,
                    sort:this.state.sort
                })
        }else{
            this.getDataByPost(2, homeurl + "activityController.api?setNewsItem",
                {
                    news_goods_id: this.state.newsBean.news_goods_id,
                    news_name:this.state.news_name,
                    news_html:this.state.news_html,
                    news_web_html:this.state.news_web_html,
                    sort:this.state.sort
                })
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title="沃快报编辑" history={this.props.history}/>
                <Widget.Editor
                    marginTop={20}
                    title="名称"
                    value={this.state.news_name}
                    onChange={(value)=>{
                        this.setState({
                            news_name:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="网页端链接"
                    value={this.state.news_web_html}
                    onChange={(value)=>{
                        this.setState({
                            news_web_html:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="移动端链接"
                    value={this.state.news_html}
                    onChange={(value)=>{
                        this.setState({
                            news_html:value
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="权重"
                    value={this.state.sort}
                    onChange={(value)=>{
                        this.setState({
                            sort:value
                        })
                    }}/>
                <Widget.Button
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.insertNews();
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

module.exports=NewsDetailComponent;
