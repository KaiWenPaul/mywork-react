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

class TrustPayComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            shopSelects:[{id:"0",name:"商品ID"},{id:"0",name:"商品名称"}],
            start_time:"",
            end_time:"",
            pay_way:[],
            orderBeans:[],
            order_source_way:"",
            allMerchantsBeans:[],
            selectBean:{},
            total:0,
            source4:1,
            page:1,
            merchants_name:"",
            source1:1,
            order_states:[],
            order_no:"",
            baseData:[],
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'order_id'},
                {name:"订单号",flex:1,key:'order_no'},
                {name:"还款额",flex:1,key:"order_total_price"},
                {name:"用户ID",flex:1,key:"member_id"},
                {name:"支付方式",flex:1,key:'pay_way_alias'},
                {name:"订单类型",flex:1,key:'order_source_way_alias'},
                {name:"还款时间",flex:1,key:'create_time'},
            ]
        })
        this.getDataByPost(1,homeurl+"merchantsController.api?getAllMerchantsNopage",{});
    }


    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    allMerchantsBeans:data,
                });
                // if(data.length>0) {
                //     this.setState({
                //         selectBean: data[0],
                //         merchants_name:data[0].merchants_name,
                //     })
                //     this.getOrderList(data[0].merchants_id,this.state.page)
                // }
                this.getOrderList("",this.state.page)
                break;
            case 2:
                let orderBeans=data.data;
                for(let orderBean of orderBeans){
                    if(orderBean.is_prepare_order==="1"&&orderBean.order_state==="wait_receive"){
                        orderBean.order_state_show="正在备货"
                    }
                    if(orderBean.order_source_way==="goods"){
                        orderBean.order_source_way_alias="商品购买订单";
                    }else if(orderBean.order_source_way==="payForTrust"){
                        orderBean.order_source_way_alias="信用还款订单";
                    }else if(orderBean.order_source_way==="recharge"){
                        orderBean.order_source_way_alias="余额充值订单";
                    }
                    if(orderBean.pay_way=="alipay_pc_direct"){
                        orderBean.pay_way_alias="支付宝";
                    }else  if(orderBean.pay_way=="alipay"){
                        orderBean.pay_way_alias="支付宝手机";
                    }else  if(orderBean.pay_way=="wx_pub_qr"){
                        orderBean.pay_way_alias="微信"
                    }else  if(orderBean.pay_way=="wx"){
                        orderBean.pay_way_alias="微信手机"
                    }else  if(orderBean.pay_way=="china_pay"){
                        orderBean.pay_way_alias="银联"
                    }else  if(orderBean.pay_way=="trust"){
                        orderBean.pay_way_alias="信用"
                    }else  if(orderBean.pay_way=="balance"){
                        orderBean.pay_way_alias="余额"
                    }else  if(orderBean.pay_way=="allot"){
                        orderBean.pay_way_alias="后台分配"
                    }
                }
                this.setState({
                    orderBeans:data.data,
                    total:data.total
                })
                break;
            case 3:
                toast.show("删除成功");
                this.getGoods(this.state.selectBean.merchants_id,this.state.page);
                break;
            case 4:
                toast.show("下载中...");
                window.location.href=homeurl+data;
                break;
            case 5:
                toast.show("下载中...");
                window.location.href=homeurl+data;
                break;
        }
    }

    exportOrderExcel(merchants_id){
        this.getDataByPost(4,homeurl+'orderController.api?exportOrderExcel',
            {merchants_id:merchants_id?merchants_id:"",
                start_time:this.state.start_time,
                end_time:this.state.end_time,
                pay_way:this.state.pay_way.toString(),
                order_states:this.state.order_states.toString(),
                order_source_way:"payForTrust",
                order_no:this.state.order_no})
    }
    exportOrderGoodsExcel(merchants_id){
        this.getDataByPost(5,homeurl+'orderController.api?exportOrderGoodsExcel',
            {merchants_id:merchants_id?merchants_id:"",
                start_time:this.state.start_time,
                end_time:this.state.end_time,
                pay_way:this.state.pay_way.toString(),
                order_states:this.state.order_states.toString(),
                order_source_way:"payForTrust",
                order_no:this.state.order_no})
    }
    getOrderList(merchants_id,page){
        this.getDataByPost(2,homeurl+'orderController.api?getOrderList',
            {merchants_id:merchants_id?merchants_id:"",
                start_time:this.state.start_time,
                end_time:this.state.end_time,
                page:page,
                pay_way:this.state.pay_way.toString(),
                order_states:this.state.order_states.toString(),
                order_source_way:"payForTrust",
                order_no:this.state.order_no},{type:2})
    }

    render(){
        return(
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <Toolbar title="订单列表" history={this.props.history}></Toolbar>
                <div style={{display:'flex',alignItems:'center',marginTop:20}}>
                    <div style={styles.tabTitle}>
                        <p1 style={styles.font}>商家</p1>
                    </div>
                    <SearchBar
                        marginLeft={10}
                        item_name="merchants_name"
                        dataSource={this.state.allMerchantsBeans}
                        name={this.state.merchants_name}
                        onPress={(data,value)=>{
                            this.setState({
                                selectBean:data,
                                merchants_name:value,
                            });
                            //this.getOrderList(data.merchants_id,1);
                        }}>
                    </SearchBar>
                    <p1 style={{fontSize:15,marginLeft:10}}>下单时间</p1>
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
                    <p1 style={{fontSize:15,marginLeft:10}}>~</p1>
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
                    <ButtonComponent
                        value="搜索"
                        marginLeft={10}
                        onClick={()=>{
                            this.setState({
                                page:1
                            });
                            this.getOrderList(this.state.selectBean.merchants_id,1)
                        }}></ButtonComponent>
                </div>
                <div style={{display:'flex',alignItems:'center',marginTop:20}}>
                    <EditorComponent
                        title="订单号"
                        value={this.state.order_no}
                        onChange={(value)=>{
                            this.setState({
                                order_no:value,
                            })
                        }}>
                    </EditorComponent>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <div style={styles.tabTitle}>
                        <p1 style={styles.font}>订单状态</p1>
                    </div>
                    <CheckComponent title="取消" checked={this.state.order1}
                            onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.order_states.push("cancel");
                                }else{
                                    var index=this.state.order_states.indexOf("cancel");
                                    this.state.order_states.splice(index,1);
                                }

                                this.setState({
                                    order_states:this.state.order_states,
                                    order1:checked,
                                })
                            }}/>
                    <CheckComponent title="待付款" checked={this.state.order2}
                            onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.order_states.push("wait_pay");
                                }else{
                                    var index=this.state.order_states.indexOf("wait_pay");
                                    this.state.order_states.splice(index,1);
                                }

                                this.setState({
                                    order_states:this.state.order_states,
                                    order2:checked,
                                })
                            }}/>
                    <CheckComponent title="待发货" checked={this.state.order3}
                            onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.order_states.push("wait_send");
                                }else{
                                    var index=this.state.order_states.indexOf("wait_send");
                                    this.state.order_states.splice(index,1);
                                }

                                this.setState({
                                    order_states:this.state.order_states,
                                    order3:checked,
                                })
                            }}/>
                    <CheckComponent title="待确认收货" checked={this.state.order4}
                            onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.order_states.push("wait_receive");
                                }else{
                                    var index=this.state.order_states.indexOf("wait_receive");
                                    this.state.order_states.splice(index,1);
                                }

                                this.setState({
                                    order_states:this.state.order_states,
                                    order4:checked,
                                })
                            }}/>
                    <CheckComponent title="待评价" checked={this.state.order5}
                            onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.order_states.push("wait_assessment");
                                }else{
                                    var index=this.state.order_states.indexOf("wait_assessment");
                                    this.state.order_states.splice(index,1);
                                }

                                this.setState({
                                    order_states:this.state.order_states,
                                    order5:checked,
                                })
                            }}/>
                    <CheckComponent title="已完成" checked={this.state.order6}
                            onClick={(checked)=>{
                                if(checked==='1'){
                                    this.state.order_states.push("end");
                                }else{
                                    var index=this.state.order_states.indexOf("end");
                                    this.state.order_states.splice(index,1);
                                }

                                this.setState({
                                    order_states:this.state.order_states,
                                    order6:checked,
                                })
                            }}/>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <div style={styles.tabTitle}>
                        <p1 style={styles.font}>支付方式</p1>
                    </div>
                    <Widget.Check title="支付宝支付" checked={this.state.pay1}
                                  onClick={(checked)=>{
                                      if(checked==='1'){
                                          this.state.pay_way.push("alipay_pc_direct,alipay");
                                      }else{
                                          var index=this.state.pay_way.indexOf("alipay_pc_direct,alipay");
                                          this.state.pay_way.splice(index,1);
                                      }

                                      this.setState({
                                          pay_way:this.state.pay_way,
                                          pay1:checked,
                                      })
                                  }}/>
                    <Widget.Check title="微信支付" checked={this.state.pay11}
                                  onClick={(checked)=>{
                                      if(checked==='1'){
                                          this.state.pay_way.push("wx_pub_qr,wx");
                                      }else{
                                          var index=this.state.pay_way.indexOf("wx_pub_qr,wx");
                                          this.state.pay_way.splice(index,1);
                                      }

                                      this.setState({
                                          pay_way:this.state.pay_way,
                                          pay11:checked,
                                      })
                                  }}/>
                    <Widget.Check title="银联支付" checked={this.state.pay111}
                                  onClick={(checked)=>{
                                      if(checked==='1'){
                                          this.state.pay_way.push("china_pay");
                                      }else{
                                          var index=this.state.pay_way.indexOf("china_pay");
                                          this.state.pay_way.splice(index,1);
                                      }
                                      this.setState({
                                          pay_way:this.state.pay_way,
                                          pay111:checked,
                                      })
                                  }}/>
                    <Widget.Check title="余额支付" checked={this.state.pay2}
                                      onClick={(checked)=>{
                                          if(checked==='1'){
                                              this.state.pay_way.push("balance");
                                          }else{
                                              var index=this.state.pay_way.indexOf("balance");
                                              this.state.pay_way.splice(index,1);
                                          }

                                          this.setState({
                                              pay_way:this.state.pay_way,
                                              pay2:checked,
                                          })
                                  }}/>
                    <Widget.Check title="信用额度支付" checked={this.state.pay3}
                                  onClick={(checked)=>{
                                      if(checked==='1'){
                                          this.state.pay_way.push("trust");
                                      }else{
                                          var index=this.state.pay_way.indexOf("trust");
                                          this.state.pay_way.splice(index,1);
                                      }

                                      this.setState({
                                          pay_way:this.state.pay_way,
                                          pay3:checked,
                                      })
                                  }}/>
                    <Widget.Check title="后台分配" checked={this.state.pay4}
                                  onClick={(checked)=>{
                                      if(checked==='1'){
                                          this.state.pay_way.push("allot");
                                      }else{
                                          var index=this.state.pay_way.indexOf("allot");
                                          this.state.pay_way.splice(index,1);
                                      }

                                      this.setState({
                                          pay_way:this.state.pay_way,
                                          pay4:checked,
                                      })
                                  }}/>
                </div>
                <div style={{marginTop:20,display:'flex',justifyContent:'flex-end',flex:1,alignItems:'center'}}>
                    <Widget.Button
                        marginRight={20}
                        value="导出筛选订单表"
                        onClick={()=>{
                            this.exportOrderExcel(this.state.selectBean.merchants_id,1);
                        }}/>
                    <Widget.Button
                        marginRight={20}
                        value="添加还款记录"
                        onClick={()=>{this.props.history.push("/order_editor")}}
                    />
                </div>
                <ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.orderBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID)=>{
                        return(
                            <div style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Link to={"/order_detail/"+this.state.orderBeans[rowID].order_id}
                                            style={{textDecoration:'none'}}>
                                    <p1 style={{fontSize:13,wordBreak:'break-all'}}>[详情]</p1>
                                </Link>
                            </div>
                        )
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        });
                        this.getOrderList(this.state.selectBean.merchants_id,page)
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
module.exports=TrustPayComponent;
