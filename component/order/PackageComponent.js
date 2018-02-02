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
var ListViewComponent=require("./../../widget/ListViewComponent");

class PackageComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            orderGoodsBeans:[],
            baseData:[],
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"包裹ID",flex:1,key:'order_parcel_id'},
                {name:"物流状态",flex:1,key:'parcel_state'},
                {name:"物流公司",flex:1,key:'logistics_pinyin'},
                {name:"物流单号",flex:1,key:'logistics_no'},
                {name:"备货时间",flex:1,key:'prepare_time'},
                {name:"发货时间",flex:1,key:'send_time'},
                {name:"收货时间",flex:1,key:'receive_time'},
                {name:"操作",flex:1,key:"-1"}
            ]
        })
        this.getDataByPost(1,homeurl+"orderController.api?getOrderParcelList",{order_id:this.props.order_id});
        console.log(123)
    }


    doSuccess(index,data){
        switch (index){
            case 1:
                for(var parcel of data){
                    switch (parcel.parcel_state){
                        case "cancel":
                            parcel.parcel_state="取消";
                            break;
                        case "wait_pay":
                            parcel.parcel_state="待付款";
                            break;
                        case "wait_send":
                            parcel.parcel_state="待发货";
                            break;
                        case "wait_receive":
                            parcel.parcel_state="待确认收货";
                            break;
                        case "wait_assessment":
                            parcel.parcel_state="待评价";
                            break;
                        case "end":
                            parcel.parcel_state="已结束";
                            break;
                    }
                }
                this.setState({
                    orderGoodsBeans:data,
                });
                break;
        }

    }


    render(){
        return(
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
                                <Link to={"/order_parcel_detail/"+this.state.orderGoodsBeans[rowID].order_parcel_id}
                                                style={{textDecoration:'none'}}>
                                    <p1 style={styles.tabP1}>[详情]</p1>
                                </Link>
                                {view}
                            </div>
                        )
                    }}>
                </ListViewComponent>
            </div>
        )
    }
}
const styles = {
    item:{
        flex:1,
        display:'flex',
        borderLeftWidth:1,
        borderTopWidth:1,
        borderLeftColor:'#efefef',
        borderTopColor:'#efefef',
        borderLeftStyle:'solid',
        borderTopStyle:'solid',
        flexDirection:'column',
        marginLeft:10,
        marginRight:10,
        marginTop:10
    },
    tabColumn: {
        flex: 1,
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderRightWidth:1,
        borderBottomColor:'#efefef',
        borderRightColor:'#efefef',
        borderBottomStyle:'solid',
        borderRightStyle:'solid',
        padding:10,
    },
    tabRow: {
        flex: 1,
        display:'flex',
        flexWrap:'wrap',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderRightWidth:1,
        borderBottomColor:'#efefef',
        borderRightColor:'#efefef',
        borderBottomStyle:'solid',
        borderRightStyle:'solid',
        padding:10,
    },
    tabP1:{
        fontSize:13,
        wordBreak:'break-all'
    }
};
module.exports=PackageComponent;
