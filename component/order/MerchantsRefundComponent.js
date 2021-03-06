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

class RefundComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var info=storage.get("merchantsAccountBean");
        this.state = {
            refundBeans:[],
            baseData:[],
            total:0,
            page:1,
            click_index:1,
            visible:false,
            apply_index:0,
            merchants_name:"",
            refund_state:[],
            start_time:"",
            end_time:"",
            merchants_id:JSON.parse((info===null?"{}":info)).merchants_id,
            merchants_type:JSON.parse((info===null?"{}":info)).merchants_type,
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'refund_id'},
                {name:"用户id",flex:1,key:'member_id'},
                {name:"订单id",flex:1,key:"order_id"},
                {name:"订单关联商品id",flex:1,key:"order_goods_id"},
                {name:"退款数量",flex:1,key:'refund_count'},
                {name:"退款理由",flex:1,key:'refund_desc'},
                {name:"退款金额",flex:1,key:'refund_price'},
                {name:"退款原因",flex:1,key:'reason_name'},
                {name:"退款状态",flex:1,key:'refund_state_show'},
                {name:"申请时间",flex:1,key:'create_time'},
                {name:"操作",flex:2,key:"-1"}
            ]
        })
        this.getOrderRefunds(this.state.page);
    }

    getOrderRefunds(page){
        this.getDataByPost(1,homeurl+"orderController.api?getOrderRefunds",
            {merchants_id:this.state.merchants_id,merchants_type:this.state.merchants_type,
                refund_state:this.state.refund_state.toString(),
                start_time:this.state.start_time,
                end_time:this.state.end_time,
                page:page},{type:2});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    refundBeans:data.data,
                    total:data.total,
                });
                break;
        }
    }


    render(){
        return(
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <Toolbar title="退款申请" history={this.props.history}></Toolbar>
                <div style={{display:'flex',marginTop:20,alignItems:'center'}}>
                    <p1 style={{fontSize:13,marginLeft:20}}>申请时间</p1>
                    <DateField
                        style={{marginLeft:10}}
                        dateFormat="YYYY-MM-DD HH:mm:ss"
                        defaultValue={this.state.start_time}
                        onChange={(dateString, { dateMoment, timestamp })=>{
                                   this.setState({
                                       start_time:dateString,
                                   })
                                }}
                    />
                    <p1 style={{fontSize:13,marginLeft:10}}>~</p1>
                    <DateField
                        style={{marginLeft:10}}
                        dateFormat="YYYY-MM-DD HH:mm:ss"
                        defaultValue={this.state.end_time}
                        onChange={(dateString, { dateMoment, timestamp })=>{
                                   this.setState({
                                       end_time:dateString,
                                   })
                                }}
                    />
                    <ButtonComponent
                        marginLeft={20}
                        value="搜索"
                        onClick={()=>{
                            this.getOrderRefunds(this.state.page);
                        }}/>
                </div>
                <div style={{display:'flex',alignItems:"center"}}>
                    <div style={{width:100,display:'flex',justifyContent:'flex-end',}}>
                        <p1 style={{fontSize:13}}>退款状态</p1>
                    </div>
                    <Widget.Check
                        title="待审核"
                        checked={this.state.refund1}
                        onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.refund_state.push("wait_review");
                                }else{
                                    var index=this.state.refund_state.indexOf("wait_review");
                                    this.state.refund_state.splice(index,1);
                                }

                                this.setState({
                                    refund_state:this.state.refund_state,
                                    refund1:checked,
                                })
                        }}/>
                    <Widget.Check title="审核通过" checked={this.state.refund2}
                                  onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.refund_state.push("accept");
                                }else{
                                    var index=this.state.refund_state.indexOf("accept");
                                    this.state.refund_state.splice(index,1);
                                }

                                this.setState({
                                    refund_state:this.state.refund_state,
                                    refund2:checked,
                                })
                            }}/>
                    <Widget.Check title="审核拒绝" checked={this.state.refund3}
                                  onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.refund_state.push("refuse");
                                }else{
                                    var index=this.state.refund_state.indexOf("refuse");
                                    this.state.refund_state.splice(index,1);
                                }

                                this.setState({
                                    refund_state:this.state.refund_state,
                                    refund3:checked,
                                })
                            }}/>
                    <Widget.Check title="已退款" checked={this.state.refund4}
                                  onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.refund_state.push("end");
                                }else{
                                    var index=this.state.refund_state.indexOf("end");
                                    this.state.refund_state.splice(index,1);
                                }

                                this.setState({
                                    refund_state:this.state.refund_state,
                                    refund4:checked,
                                })
                            }}/>
                </div>
                <ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.refundBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID)=>{
                        return(
                            <Link to={"/order_refund_detail/"+this.state.refundBeans[rowID].refund_id}
                                            style={{textDecoration:'none'}}>
                                <p1 style={{fontSize:13,wordBreak:'break-all'}}>[详情]</p1>
                            </Link>
                        )
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        });
                        this.getOrderRefunds(page)
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
module.exports=RefundComponent;
