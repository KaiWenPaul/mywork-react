/**
 * Created by shenjiabo on 16/12/10.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
var Widget = require('./../../widget/WidgetComponent');
import { DateField, Calendar } from 'react-date-picker'

class OrderEditorComponent extends Widget.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            bean:{}
        }
    }

    componentDidMount() {

    }

    insertObject() {
        var params={};
        params["member_id"]=this.state.bean.member_id;
        params["order_actual_price"]=this.state.bean.order_actual_price;
        params["order_pay_no"]=this.state.bean.order_pay_no;
        params["pay_time"]=this.state.bean.pay_time;
        this.getDataByPost(1,homeurl+"orderController.api?insertPayForTrustOrder",params);
    }


    doSuccess(index,data){
        switch (index){
            case 1:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
        }
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title="添加信用还款记录" history={this.props.history}/>
                <Widget.Button
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.insertObject();
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="用户ID"
                    value={this.state.bean.member_id}
                    onChange={(value)=>{
                        this.state.bean.member_id=value;
                        this.setState({
                            bean:this.state.bean
                        })
                    }}/>
                <Widget.Editor
                    marginTop={20}
                    title="支付流水号"
                    value={this.state.bean.order_pay_no}
                    onChange={(value)=>{
                        this.state.bean.order_pay_no=value;
                        this.setState({
                            bean:this.state.bean
                        })
                    }}/>
                <p1 style={{fontSize:15,marginLeft:40,marginTop:60}}>还款时间</p1>
                <DateField
                    style={{marginLeft:10}}
                    dateFormat="YYYY-MM-DD"
                    defaultValue={this.state.bean.pay_time}
                    onChange={(dateString, { dateMoment, timestamp })=>{
                        this.state.bean.pay_time=dateString
                        this.setState({
                            bean:this.state.bean
                        })
                    }}
                />
                <Widget.Editor
                    marginTop={20}
                    title="还款金额"
                    value={this.state.bean.order_actual_price}
                    onChange={(value)=>{
                        this.state.bean.order_actual_price=value;
                        this.setState({
                            bean:this.state.bean
                        })
                    }}/>
            </div>
        )
    }


}

module.exports=OrderEditorComponent;