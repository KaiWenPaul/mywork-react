/**
 * Created by shenjiabo on 16/10/18.
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

var TabBar=require("./../../widget/TabBar");
var EditorComponent=require("./../../widget/EditorComponent");
var TextComponent=require("./../../widget/TextComponent");
var CheckComponent=require("./../../widget/CheckComponent");
var ButtonComponent=require("./../../widget/ButtonComponent");
var SelectComponent=require("./../../widget/SelectComponent");

var Widget=require("./../../widget/WidgetComponent");

var OrderGoodsComponent=require("./OrderGoodsListComponent");
var OrderDivideComponnet = require("./OrderDivideComponnet");

class InvoiceDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
    super(props);
    // 初始状态
    this.state = {
        order_id:this.props.params.order_id,
        moudleBeans:[],
        index:0,
        isShow:true,
    };
}

    componentDidMount() {
        this.getDataByPost(1,homeurl+"orderController.api?getOrderGoodss",{order_id:this.state.order_id});
        this.setState({
            moudleBeans:[
                {"name":"基本信息",component:this.renderBase()},
                {"name":"商品列表",component:this.renderOrderGoods()},
            ],
        })
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.state.isShow=false;
                this.forceUpdate();
                break;
        }
    }
    render(){
        return(
            <div>
                <Toolbar title="订单详情" history={this.props.history}></Toolbar>
                <TabBar saveIndex="orderIndex"
                        dataSource={this.state.moudleBeans}
                        component={this.state.moudleBeans.length>0?
                        this.state.moudleBeans[this.state.moudleBeans.length>this.state.index?this.state.index:0].component:null}
                        onPress={(rowID)=>{
                        this.setState({
                            index:rowID
                        })
                    }}></TabBar>
            </div>
        )
    }

    renderBase(){
        return(
            <BaseDetailComponent order_id={this.state.order_id}></BaseDetailComponent>
        )
    }

    renderOrderGoods(){
        return(
            <OrderGoodsComponent order_id={this.state.order_id} history={this.props.history}></OrderGoodsComponent>
        )
    }
}

class BaseDetailComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_id:this.props.order_id,
            orderBean:{},
            detailBean:{},
            logisticsBeans:[],
            click_index:0,
            logistics_index:0,
            logistics_pinyin:''
        };
    }

    componentDidMount() {
        this.getOrderDetail();
        this.getDataByPost(4,homeurl+"orderController.api?getOrderLogisticsNoPage",{});
    }

    getOrderDetail(){
        this.getDataByPost(1,homeurl+"orderController.api?getOrderDetail",{order_id:this.state.order_id});
        this.getDataByPost(3,homeurl+"systemController.api?getSystemDetailShows",{detail_type:'order'});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    orderBean:data,
                    logistics_pinyin:data.logistics_pinyin
                });
                break;
            case 2:
                toast.show("确认成功");
                this.getOrderDetail();
                break;
            case 3:
                this.setState({
                    detailBean:JSON.parse(data)
                })
                break;
            case 4:
                this.setState({
                    logisticsBeans:data
                })
                break;
            case 5:
                this.showTip("保存成功");
                this.state.orderBean.is_give_invoice="yes";
                this.forceUpdate();
                break;
        }
    }

    confirmSendOrder(){
        this.setState({
            visible:false
        })
        this.getDataByPost(2,homeurl+"orderController.api?confirmSendOrder",
            {order_id:this.state.order_id,
                logistics_no:this.state.orderBean.logistics_no,
                logistics_pinyin:this.state.logistics_pinyin,
                order_state:this.state.click_index===1?'wait_receive':""});
    }
    giveInvoice(is_give_invoice){
        this.getDataByPost(5,homeurl+"orderController.api?updateOrderDetail",
            {order_id:this.state.order_id,
                is_give_invoice:is_give_invoice});
    }
    render(){
        return(
            <div>
                <div style={styles.div}>
                    <ButtonComponent
                        visible={this.state.orderBean.is_give_invoice==="no"?"true":"false"}
                        width={100}
                        marginLeft={100}
                        marginTop={20}
                        value="开票处理"
                        onClick={()=>{
                            this.giveInvoice('yes');
                        }}/>
                </div>
                <div style={styles.div}>
                    <TextComponent title="订单号" value={this.state.orderBean.order_no}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="商品总价" value={this.state.orderBean.order_goods_price}></TextComponent>
                    <TextComponent title="总邮费" value={this.state.orderBean.express_price}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="会员折扣" value={this.state.orderBean.member_discount_price}></TextComponent>
                    <TextComponent title="优惠券抵扣" value={this.state.orderBean.coupon_price}></TextComponent>
                    <TextComponent title="积分抵扣" value={this.state.orderBean.deduct_integral_price}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="实付款" value={this.state.orderBean.order_actual_price}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="支付方式" value={this.state.orderBean.pay_way}></TextComponent>
                    <TextComponent title="支付时间" value={this.state.orderBean.pay_time}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="订单类型" value={this.state.orderBean.order_type==='goods'?
                        "普通商品":(this.state.orderBean.order_type==='time_limit'?
                            "促销商品":(this.state.orderBean.order_type==='group_buy'?
                                "团购商品":"普通商品"))}></TextComponent>
                    <TextComponent title="备注" value={this.state.orderBean.remark}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="发票类型" value={this.state.orderBean.invoice_type==="increment"?"增值税专用发票":
                        (this.state.orderBean.invoice_type==="electron"?"电子发票":(this.state.orderBean.invoice_type==="paper"?"纸质发票":"不开发票"))}></TextComponent>
                    <TextComponent title="发票抬头" value={this.state.orderBean.invoice_rise_type}></TextComponent>
                    <TextComponent title="发票内容" value={this.state.orderBean.invoice_content}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="收票人电话" value={this.state.orderBean.invise_ticket_phone}></TextComponent>
                    <TextComponent title="收票人邮箱" value={this.state.orderBean.invise_ticket_email}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="公司名" value={this.state.orderBean.invoice_company_name}></TextComponent>
                    <TextComponent title="纳税人识别码" value={this.state.orderBean.invise_taxpayer_code}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="注册电话" value={this.state.orderBean.invise_register_phone}></TextComponent>
                    <TextComponent title="注册地址" value={this.state.orderBean.invise_register_address}></TextComponent>
                </div>

                <div style={styles.div}>
                    <TextComponent title="银行名称" value={this.state.orderBean.invise_bank_name}></TextComponent>
                    <TextComponent title="银行账号" value={this.state.orderBean.invise_bank_code}></TextComponent>
               </div>
                <OrderGoodsComponent order_id={this.state.order_id} history={this.props.history}></OrderGoodsComponent>
                <div style={{height:100}}></div>
            </div>
        )
        var order_state="";

        switch (this.state.orderBean.order_state){
            case "cancel":
                order_state="取消";
                break;
            case "wait_pay":
                order_state="待付款";
                break;
            case "wait_send":
                order_state="待发货";
                break;
            case "wait_receive":
                order_state="待确认收货";
                break;
            case "wait_assessment":
                order_state="待评价";
                break;
            case "end":
                order_state="已结束";
                break;
        }
    }
}

const styles = {
    div:{
        display:'flex',
        marginTop:20,
        alignItems:'center'
    }
}
module.exports=InvoiceDetailComponent;