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
var TrustAddComponent = require('./TrustAddComponent');

var TipComponent=require('./../../widget/TipComponent');
import 'react-date-picker/index.css'
import { DateField, Calendar } from 'react-date-picker'
var PageComponent=require("./../../widget/PageComponent");
var Toolbar=require("./../../widget/Toolbar");
var SearchBar=require("./../../widget/SearchBar");
var ButtonComponent=require("./../../widget/ButtonComponent");
var CheckComponent=require("./../../widget/CheckComponent");
var EditorComponent=require("./../../widget/EditorComponent");
var ListViewComponent=require("./../../widget/ListViewComponent");
var Widget=require("./../../widget/WidgetComponent");
class TrustApplyListComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var info=storage.get("merchantsAccountBean");
        this.state = {
            applyBeans:[],
            baseData:[],
            total:0,
            page:1,
            click_index:1,
            visible:false,
            merchants_id:JSON.parse((info===null?"{}":info)).merchants_id,
            trust_item_id:"",
            num:""
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:'流水号',flex:1,key:'trust_id'},
                {name:'用户ID',flex:1,key:'member_id'},
                {name:'项目名称',flex:1,key:'item_name'},
                {name:'项目批准号',flex:1,key:'item_code'},
                {name:'项目金额（万元）',flex:1,key:'item_price'},
                {name:'授信额度（万元）',flex:1,key:'trust_price'},
                {name:'审批通过金额（万元）',flex:1,key:'pass_price'},
                {name:'申请状态',flex:1,key:'apply_state_show'},
                {name:'申请日期',flex:1,key:'create_time'},
                {name:'是否删除',flex:1,key:'is_delete',type:"bool",show1:"已删除",show0:"未删除"},
                {name:'赠送/申请',flex:1,key:'is_give_out',type:"bool",show1:"赠送",show0:"申请"},
                {name:'操作',flex:1,key:'-1'}
            ]
        })
        this.getTrustItems(this.state.page);
    }

    getTrustItems(page){
        this.getDataByPost(1,homeurl+"swController.api?getTrustItems",
            {page:page},{type:2});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    applyBeans:data.data,
                    total:data.total,
                });
                break;
            case 2:
                toast.show("操作成功");
                break;
            case 3:
                window.open(data);
                break;
        }
    }
    exportExcel(){
        this.getDataByPost(3,homeurl+"swController.api?exportTrustItems");
    }
    render(){
        return(
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <Toolbar title="信用申请" history={this.props.history}></Toolbar>
                <div style={{display:'flex',marginTop:20,alignItems:'center',justifyContent:'flex-end'}}>
                    <ButtonComponent
                        marginRight={20}
                        value="导出报表"
                        onClick={()=>{
                            this.exportExcel();
                        }}/>
                </div>
                  <TrustAddComponent visible={this.state.allVisible} msg="追加额度" trust_item_id={this.state.trust_item_id} num={this.state.num}
                            onClose={()=>{
                                this.setState({
                                    allVisible:false
                                })
                            }}
                            onPress={()=>{
                                this.setState({
                                    allVisible:false
                                })
                    }}/>
            
                <ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.applyBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID)=>{
                        return(
                            <div>
                                <div style={{float:'left',marginTop:'4'}}>
                                <Link to={"/trust_item_detail/"+encodeURIComponent(JSON.stringify({trustItem:this.state.applyBeans[rowID]}))}
                                      style={{textDecoration:'none'}}>
                                    <p1 style={styles.tabP1}>[详情]</p1>
                                </Link>
                                </div>
                                <div style={{float:'left'}}>
                                <Widget.Button
                                    background={"rgb(200, 200, 200)"}
                                    marginLeft={20}
                                    value="追加"
                                    onClick={()=>{
                                        this.setState({
                                            allVisible:true,
                                            trust_item_id:this.state.applyBeans[rowID].trust_id,
                                            num:Math.random()
                                        })
                                    }}/>
                                </div>
                            </div>
                        )
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        });
                        this.getTrustItems(page)
                    }}>
                </ListViewComponent>
            </div>
        )
    }
}
const styles = {
    tab:{
        display:'flex',
        height:30,
        alignItems:'center',
    },
    tabTitle:{
        width:100,
        display:'flex',
        justifyContent:'flex-end',
    },
    input:{
        width:200,
        marginLeft:10,
        height:30,
        paddingLeft:10
    },
    font:{
        fontSize:13,
    },
}
module.exports=TrustApplyListComponent;
