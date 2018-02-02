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
var PackageComponent=require("./PackageComponent");

class OrderDetailComponent extends BaseComponent{
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
        this.setState({
            moudleBeans:[
                {"name":"基本信息",component:this.renderBase()},
                {"name":"商品列表",component:this.renderOrderGoods()},
                {"name":"包裹列表",component:this.renderPackages()},
            ],
        })
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
    renderPackages(){
        return(
            <PackageComponent order_id={this.state.order_id} history={this.props.history}></PackageComponent>
        )
    }
    renderOrderGoods(){
        return(
            <OrderGoodsComponent order_id={this.state.order_id} history={this.props.history}></OrderGoodsComponent>
        )
    }
    // renderDivideOrder(){
    //     return (
    //         <OrderDivideComponnet order_id={this.state.order_id} history={this.props.history}></OrderDivideComponnet>
    //     )
    // }
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
            logistics_pinyin:'',
            express_price:0,
            logistics_name:""
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
                    logistics_pinyin:data.logistics_pinyin,
                    express_price:data.express_price
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
                let name = "";
                for(let obj of data){
                    if(obj.logistics_pinyin===this.state.logistics_pinyin){
                        name=obj.logistics_name;
                    }
                }
                this.setState({
                    logisticsBeans:data,
                    logistics_name:name
                })
                break;
            case 5:
                this.showTip("保存成功");
                break;
            case 6:
                this.getOrderDetail();
                break;
            case 7:
                window.open(homeurl+data.contact_path);
                break;
            case 8:
                this.showTip("操作成功");
                this.state.orderBean.order_state = 'wait_receive';
                this.state.orderBean.is_prepare_order ="1";
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
                order_state:this.state.orderBean.order_state});
    }
    updateOrderDetail(){
        this.getDataByPost(5,homeurl+"orderController.api?updateOrderDetail",
            {order_id:this.state.order_id,
                custom_remark:this.state.orderBean.custom_remark});
    }
    changeExpressPrice(){
        this.getDataByPost(6,homeurl+"orderController.api?changeOrderExpressPrice",
            {order_id:this.state.order_id,express_price:this.state.express_price});
    }
    downloadContact(){
        this.getDataByPost(7,homeurl+"orderController.api?downloadContact",
            {order_id:this.isNull(this.state.orderBean.group_no)?this.state.order_id:this.state.orderBean.group_no});
    }
    prepareOrder(){
        this.getDataByPost(8,homeurl+"orderController.api?prepareOrder",
            {order_id:this.state.order_id});
    }
    render(){
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
        return(
            <div>
                <TipComponent visible={this.state.visible} msg={this.state.click_index===1?"确定发货?":"确认修改?"}
                              onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                              }}
                              onPress={()=>{
                                  this.confirmSendOrder();
                              }}/>
                <div style={styles.div}>
                    <ButtonComponent
                        width={100}
                        marginLeft={100}
                        marginTop={20}
                        value="保存"
                        onClick={()=>{
                            this.updateOrderDetail();
                        }}/>
                    <ButtonComponent
                        width={100}
                        marginLeft={100}
                        marginTop={20}
                        visible={this.state.orderBean.order_state==='wait_receive'
                        ||this.state.orderBean.order_state==='wait_assessment'
                        ||this.state.orderBean.order_state==='end'||this.state.orderBean.order_state==='wait_send'?"true":"false"}
                        value="下载合同"
                        onClick={()=>{
                            this.downloadContact();
                        }}/>
                </div>

                <div style={styles.div}>
                    <TextComponent title="订单号" value={this.state.orderBean.order_no}></TextComponent>
                    <TextComponent title="订单总金额" value={this.state.orderBean.order_total_price}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="付款单号" value={this.state.orderBean.order_pay_no}></TextComponent>
                    <TextComponent title="订单状态" value={order_state}></TextComponent>
                </div>
                <Widget.Textarea
                    value={this.state.orderBean.custom_remark}
                    height={200}
                    widthContent={400}
                    title="商家留言"
                    onChange={(value)=>{
                        this.state.orderBean.custom_remark=value;
                        this.setState({
                            orderBean:this.state.orderBean
                        });
                    }}/>
                   
                {/*<div style={styles.div}>
                    <TextComponent visible={this.state.orderBean.is_prepare_order==="1"?"true":"false"} title="状态" value="正在备货中"></TextComponent>
                    <EditorComponent
                        visible={this.state.orderBean.order_state==='wait_send'
                                        ||this.state.orderBean.order_state==='wait_receive'
                                        ||this.state.orderBean.order_state==='wait_assessment'
                                        ||this.state.orderBean.order_state==='end'?"true":"false"}
                        title="物流单号"
                        value={this.state.orderBean.logistics_no}
                        onChange={(value)=>{
                                this.state.orderBean.logistics_no=value;
                                this.setState({
                                    orderBean:this.state.orderBean
                                })
                            }}>
                    </EditorComponent>
                    <p1 style={{fontSize:13,marginLeft:55,marginRight:20}}>物流公司</p1>
                    <Widget.SearchBar
                        visible={this.state.orderBean.order_state==='wait_receive'
                        ||this.state.orderBean.order_state==='wait_assessment'
                        ||this.state.orderBean.order_state==='end'||this.state.orderBean.order_state=='wait_send'?"true":"false"}
                        item_name="logistics_name"
                        dataSource={this.state.logisticsBeans}
                        name={this.state.logistics_name}
                        onPress={(data,value)=>{
                            this.setState({
                                logistics_pinyin:data.logistics_pinyin,
                                logistics_name:value,
                            })
                        }}/>
                    <ButtonComponent
                        visible={this.state.orderBean.order_state==='wait_receive'
                                        ||this.state.orderBean.order_state==='wait_assessment'
                                        ||this.state.orderBean.order_state==='end'?"true":"false"}
                        value="修改"
                        marginLeft={20}
                        onClick={()=>{
                                if(this.state.orderBean.logistics_no===''){
                                    toast.show("请先填写物流单号");
                                    return;
                                }
                                if(this.state.logistics_index==-1){
                                    toast.show("请先选择物流公司");
                                    return;
                                }
                                this.setState({
                                    click_index:2,
                                    visible:true,
                                })
                        }}/>
                    <ButtonComponent
                        visible={this.state.orderBean.order_state==='wait_send'?"true":"false"}
                        value="确认发货"
                        marginLeft={20}
                        onClick={()=>{
                                if(this.state.orderBean.logistics_no===''){
                                    toast.show("请先填写物流单号");
                                    return;
                                }
                                if(this.state.logistics_index==-1){
                                    toast.show("请先选择物流公司");
                                    return;
                                }
                                this.setState({
                                    visible:true,
                                    click_index:1,
                                })
                        }}/>
                      
                    <ButtonComponent
                        visible={this.state.orderBean.order_state==='wait_receive'
                                        ||this.state.orderBean.order_state==='wait_assessment'
                                        ||this.state.orderBean.order_state==='end'?"true":"false"}
                        value="查看物流"
                        marginLeft={20}
                        onClick={()=>{
                                window.open("https://m.kuaidi100.com/result.jsp?com="+this.state.orderBean.logistics_pinyin+"&nu="+this.state.orderBean.logistics_no);
                            }}>
                    </ButtonComponent>
                     <TipComponent visible={this.state.stocking} msg="确认备货?"
                        onClose={()=>{
                        this.setState({
                            stocking:false
                        })
                        }}
                        onPress={()=>{
                           this.prepareOrder();
                             this.setState({
                            stocking:false
                        })
                        }}/>
                    <ButtonComponent
                        visible={this.state.orderBean.order_state==='wait_send'?"true":"false"}
                        value="备货处理"
                        marginLeft={20}
                        onClick={()=>{
                            this.setState({
                                stocking:true
                            })
                        }}/>
                </div>*/}
                <div style={styles.div}>
                    <TextComponent title="满多少免邮" value={this.state.orderBean.express_free_price}></TextComponent>
                    <EditorComponent
                        visible={this.state.orderBean.order_state==='wait_pay'?"true":"false"}
                        title="总邮费"
                        value={this.state.express_price}
                        onChange={(value)=>{
                            this.setState({
                                express_price:value
                            })
                        }}>
                    </EditorComponent>
                    <TextComponent visible={this.state.orderBean.order_state==='wait_pay'?"false":"true"} title="总邮费" value={this.state.express_price}></TextComponent>
                    <ButtonComponent
                        visible={this.state.orderBean.order_state==='wait_pay'?"true":"false"}
                        value="确认修改物流费用"
                        marginLeft={20}
                        onClick={()=>{
                           this.changeExpressPrice();
                        }}>
                    </ButtonComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="订单类型" value={this.state.orderBean.order_type==='goods'?
                                                "普通商品":(this.state.orderBean.order_type==='time_limit'?
                                                "促销商品":(this.state.orderBean.order_type==='group_buy'?
                                                "团购商品":"普通商品"))}></TextComponent>
                    <TextComponent title="备注" value={this.state.orderBean.remark}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="收货人姓名" value={this.state.orderBean.name}></TextComponent>
                    <TextComponent title="收货人手机号" value={this.state.orderBean.mobile}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="省" value={this.state.orderBean.province}></TextComponent>
                    <TextComponent title="市" value={this.state.orderBean.city}></TextComponent>
                    <TextComponent title="区" value={this.state.orderBean.country}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent title="详情地址" value={this.state.orderBean.detailed_address}></TextComponent>
                    <TextComponent title="邮编" value={this.state.orderBean.zip_code}></TextComponent>
                </div>
                <div style={styles.div}>
                    <TextComponent
                        visible={this.state.detailBean.merchants_name}
                        title="归属"
                        value={this.state.orderBean.merchants_name}></TextComponent>
                    <TextComponent
                        visible={this.state.detailBean.merchants_account_name}
                        title="推广员"
                        value={this.state.orderBean.merchants_account_name}></TextComponent>
                </div>
                <OrderGoodsComponent order_id={this.state.order_id} history={this.props.history}></OrderGoodsComponent>
                <div style={{height:100}}></div>
            </div>
        )
    }
}

const styles = {
    div:{
        display:'flex',
        marginTop:20,
        alignItems:'center'
    }
}
module.exports=OrderDetailComponent;