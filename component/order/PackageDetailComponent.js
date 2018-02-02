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
var ListViewComponent=require("./../../widget/ListViewComponent");
var OrderGoodsComponent=require("./OrderGoodsListComponent");
var OrderDivideComponnet = require("./OrderDivideComponnet");
var PackageComponent=require("./PackageComponent");

class PackageDetailComponent extends BaseComponent{
    // 构造
    constructor(props) {
    super(props);
    // 初始状态
    this.state = {
        order_parcel_id:this.props.params.order_parcel_id,
        order_id:this.props.params.order_id,
        moudleBeans:[],
        index:0,
    };
}

    componentDidMount() {
          this.setState({
              moudleBeans:[
                  {"name": "包裹信息", component: this.renderBase()}
              ]
        });
        this.getDataByPost(1,homeurl+"orderController.api?getOrderParcel",{order_parcel_id:this.state.order_parcel_id});
       
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                if(data.logistics_no===""&&data.orderGoodsBeans.length>1){
                    this.setState({
                        moudleBeans:[
                            {"name": "包裹信息", component: this.renderBase()},
                            {"name": "拆分订单", component: this.renderDivideOrder()},
                        ]
                    });
                }
        }
    }
    render(){
        console.log();
        return(
            <div>
                <Toolbar title="包裹详情" history={this.props.history}></Toolbar>
                <TabBar saveIndex="parcelIndex"
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
            <BaseDetailComponent order_parcel_id={this.state.order_parcel_id}></BaseDetailComponent>
        )
    }
    renderDivideOrder(){
        return (
            <OrderDivideComponnet order_parcel_id={this.state.order_parcel_id} history={this.props.history}></OrderDivideComponnet>
        )
    }
}

class BaseDetailComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_parcel_id:this.props.order_parcel_id,
            order_id:'',
            orderBean:{},
            detailBean:{},
            logisticsBeans:[],
            click_index:0,
            logistics_index:0,
            logistics_pinyin:'',
            express_price:0,
            logistics_name:"",
            orderParcelBean:{},
            baseData:[],
            orderGoodsBeans:[]
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"商品ID",flex:1,key:'goods_id'},
                {name:"商品名",flex:1,key:'goods_name'},
                {name:"商品货号",flex:1,key:'goods_sku'},
                {name:"商品规格",flex:1,key:'goods_parameters_name'},
                {name:"商品单价",flex:1,key:"goods_price"},
                {name:"商品数",flex:1,key:'goods_num'},
                {name:"总价",flex:1,key:"total_price"},
                {name:"操作",flex:1,key:"-1"}
            ]
        })
        this.getOrderDetail();
        this.getDataByPost(4,homeurl+"orderController.api?getOrderLogisticsNoPage",{});
        this.getDataByPost(10,homeurl+"orderController.api?getOrderParcel",{order_parcel_id:this.state.order_parcel_id});
        console.log(this.state.order_parcel_id)
    }

    getOrderDetail(){
        this.getDataByPost(3,homeurl+"systemController.api?getSystemDetailShows",{detail_type:'order'});
    }

    doSuccess(index,data){
        switch (index){
            case 10:
                this.setState({
                    orderParcelBean:data,
                    logistics_pinyin:data.logistics_pinyin,
                    orderGoodsBeans:data.orderGoodsBeans,
                    order_id:data.order_id
                });
                console.log(this.state.orderGoodsBeans)
                break;
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
        this.getDataByPost(2,homeurl+"orderController.api?sendParcel",
            {order_parcel_id:this.state.order_parcel_id,
                logistics_no:this.state.orderParcelBean.logistics_no,
                logistics_pinyin:this.state.logistics_pinyin
             });
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
        this.getDataByPost(8,homeurl+"orderController.api?prepareParcel",
            {order_parcel_id:this.state.order_parcel_id,
            order_id:this.state.order_id
        });
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
                <div>
                <Widget.Textarea
                    value={this.state.orderParcelBean.custom_remark}
                    height={200}
                    widthContent={400}
                    marginTop={20}
                    title="商家留言"
                    onChange={(value)=>{
                        this.state.orderParcelBean.custom_remark=value;
                        this.setState({
                            orderParcelBean:this.state.orderParcelBean
                        });
                    }}/>
                </div>
                <div style={styles.div}>
                    <TextComponent visible={this.state.orderParcelBean.send_time===""&&this.state.orderParcelBean.parcel_state==="wait_receive"?"true":"false"} title="状态" value="正在备货中"></TextComponent>
                    <EditorComponent
                        visible={this.state.orderParcelBean.parcel_state==='wait_send'
                                        ||this.state.orderParcelBean.parcel_state==='wait_receive'
                                        ||this.state.orderParcelBean.parcel_state==='wait_assessment'
                                        ||this.state.orderParcelBean.parcel_state==='end'?"true":"false"}
                        title="物流单号"
                        value={this.state.orderParcelBean.logistics_no}
                        onChange={(value)=>{
                                this.state.orderParcelBean.logistics_no=value;
                                this.setState({
                                    orderParcelBean:this.state.orderParcelBean
                                })
                            }}>
                    </EditorComponent>
                    <p1 style={{fontSize:13,marginLeft:55,marginRight:20}}>物流公司</p1>
                    <Widget.SearchBar
                        visible={this.state.orderParcelBean.parcel_state==='wait_receive'
                        ||this.state.orderParcelBean.parcel_state==='wait_assessment'
                        ||this.state.orderParcelBean.parcel_state==='end'||this.state.orderParcelBean.parcel_state=='wait_send'?"true":"false"}
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
                        visible={this.state.orderParcelBean.parcel_state==='wait_receive'
                                        ||this.state.orderParcelBean.parcel_state==='wait_assessment'
                                        ||this.state.orderParcelBean.parcel_state==='end'?"true":"false"}
                        value="修改"
                        marginLeft={20}
                        onClick={()=>{
                                if(this.state.orderParcelBean.logistics_no===''){
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
                        visible={this.state.orderParcelBean.parcel_state==='wait_send'?"true":"false"}
                        value="包裹发货"
                        marginLeft={20}
                        onClick={()=>{
                                if(this.state.orderParcelBean.logistics_no===''){
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
                        visible={this.state.orderParcelBean.parcel_state==='wait_receive'
                                        ||this.state.orderParcelBean.parcel_state==='wait_assessment'
                                        ||this.state.orderParcelBean.parcel_state==='end'?"true":"false"}
                        value="查看物流"
                        marginLeft={20}
                        onClick={()=>{
                                window.open("https://m.kuaidi100.com/result.jsp?com="+this.state.orderParcelBean.logistics_pinyin+"&nu="+this.state.orderParcelBean.logistics_no);
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
                        visible={this.state.orderParcelBean.parcel_state==='wait_send'?"true":"false"}
                        value="备货处理"
                        marginLeft={20}
                        onClick={()=>{
                            {/*this.prepareOrder();*/}
                            this.setState({
                                stocking:true
                            })
                        }}/>
                </div>
               <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.orderGoodsBeans}
                    renderOperation={(rowID)=>{
                        let view=[];
                        if(this.state.orderGoodsBeans[rowID].is_refund==='1'){
                            view.push(<Link to={"/order_refund_detail/"+this.state.orderGoodsBeans[rowID].refund_id}
                                                style={{textDecoration:'none'}}>
                                        <p1 style={styles.tabP1}>[退款详情]</p1>
                                      </Link>
                                    );
                        }
                        return(
                            <div>
                                <Link to={"/order_goods_detail/"+this.state.orderGoodsBeans[rowID].order_goods_id}
                                                style={{textDecoration:'none'}}>
                                    <p1 style={styles.tabP1}>[详情]</p1>
                                </Link>
                                {view}
                            </div>
                        )
                    }}>
                </ListViewComponent>
            </div>
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
module.exports=PackageDetailComponent;