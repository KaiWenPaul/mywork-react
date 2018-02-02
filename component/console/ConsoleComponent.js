/**
 * Created by shenjiabo on 16/8/17.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var ListView = require('./../../widget/ListView');
var BaseComponent = require('./../BaseComponent');
var TipComponent = require('./../../widget/TipComponent');
import 'react-date-picker/index.css'
import {DateField, Calendar} from 'react-date-picker'
var PageComponent = require("./../../widget/PageComponent");
var Toolbar = require("./../../widget/Toolbar");
var SearchBar = require("./../../widget/SearchBar");
var ButtonComponent = require("./../../widget/ButtonComponent");
var CheckComponent = require("./../../widget/CheckComponent");
var EditorComponent = require("./../../widget/EditorComponent");
var ListViewComponent = require("./../../widget/ListViewComponent");
var LinkComponent = require("./../../widget/LinkComponent");

var Widget = require("./../../widget/WidgetComponent");
var BoxView = require("./BoxView");

class ConsoleComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            boxBeans: [],
            page: 1,
            total: 0,
            popup_index: -1,
            timeData: [{name: "本日", id: 'today'}, {name: "本周", id: 'week'}, {name: "本月", id: 'month'}, {name: "本年", id: 'year'}],
            timeType:''
        };
    }

    componentDidMount() {
        // this.getDataByPost(1, homeurl + "swController.api?getCurrentStates", {time: "today"});
        this.getData('today')
    }
    getData(arr){
        this.getDataByPost(1, homeurl + "swController.api?getCurrentStates", {time: arr});
    }
    doSuccess(index, data) {
        switch (index) {
            case 1:
                this.setState({
                    boxBeans: data,
                })
                break;
        }
    }

    render() {
        let boxBeans  = this.state.boxBeans;
        let arr = [];
        for(let box of boxBeans){
            arr.push(<BoxView  key={box.box_name} style={{width:'49.9%',borderRight:'1px solid #f5f5f5',borderBottom:'1px solid #f5f5f5',height:200,float:'left'}}
             title={box.box_name} dataSource = {box.stateBeanList} route={box.route} />)
        }
        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column',position:'relative'}}>
                <Toolbar title="控制台" history={this.props.history}></Toolbar>
                <div style={{position:'absolute',top:-5,right:60}} key="console_select">
                   
                        <Widget.SelectV2
                        style={{textAlign:'right'}}
                        title="选择查看"
                        show_value="name"
                        init_value={111}
                        select_value="id"
                        dataSource={this.state.timeData}
                        onChange={(rowID)=>{
                            this.getData(this.state.timeData[rowID].id)
                        }}/>
                </div>
                <div key="console_body">
                    {arr}
                </div>
                <div style={{height:60}} key="console_bottom">

                </div>
            </div>
        )
    }
}
const styles = {
    tab: {
        display: 'flex',
        height: 30,
        alignItems: 'center',
    },
    tabTitle: {
        width: 100,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    input: {
        width: 200 ,
        marginLeft: 10,
        height: 30,
        paddingLeft: 10
    },
    font: {
        fontSize: 13,
    },
}
module.exports = ConsoleComponent;
