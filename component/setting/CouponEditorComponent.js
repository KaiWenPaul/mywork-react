/**
 * Created by shenjiabo on 16/12/10.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
var Widget = require('./../../widget/WidgetComponent');
var TabBar=require('./../../widget/TabBar');
var TextComponent=require('./../../widget/TextComponent');
var EditorComponent=require('./../../widget/EditorComponent');
var CheckComponent=require('./../../widget/CheckComponent');
var ButtonComponent=require('./../../widget/ButtonComponent');
var SelectComponent=require('./../../widget/SelectComponent');
var ImgComponent=require('./../../widget/ImgComponent');
var ViewComponent=require('./../../widget/ViewComponent');
var Toolbar=require('./../../widget/Toolbar');

class CouponEditorComponent extends Widget.BaseComponent{
    constructor(props) {
        super(props);
        // 初始状态
        var couponBean=JSON.parse(this.props.params.couponBean);
        this.state = {
            couponBean:couponBean,
            groupCouponBean:{},
            moudleBeans:[],
        };
    }
    componentDidMount() {
        this.getDataByPost(1,homeurl+"couponController.api?getGroupCoupons",{batch_id:this.state.couponBean.batch_id})
    }
    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    groupCouponBean:data,
                 });
                this.updateMoudle(this.state.groupCouponBean);
                break;
        }
    }
    updateMoudle(groupCouponBean) {
        this.setState({
            moudleBeans:[
                {"name":"活动信息",component:this.renderGroup()},
                {"name":"发行批次",component:this.renderNumBatch()},
                {"name":"优惠券详情",component:this.renderSingle()}]
        })
    }
    render(){
        return(
            <div>
                <Toolbar title="活动优惠券编辑" history={this.props.history}></Toolbar>
                <TabBar saveIndex="goodsIndex"
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
    renderGroup(){
        return(
            <GroupCounponBeanComponent
                updateMoudle={this.updateMoudle.bind(this)}
                history={this.props.history} groupCouponBean={this.state.groupCouponBean}></GroupCounponBeanComponent>
        )
    }
    renderNumBatch(){
        return(
            <NumBatchCouponEditorComponent
                updateMoudle={this.updateMoudle.bind(this)}
                history={this.props.history} groupCouponBean={this.state.groupCouponBean}></NumBatchCouponEditorComponent>
        )
    }
    renderSingle(){
        return(
            <SingleCouponEditorComponent
                updateMoudle={this.updateMoudle.bind(this)}
                history={this.props.history} groupCouponBean={this.state.groupCouponBean}></SingleCouponEditorComponent>
        )
    }
}
class GroupCounponBeanComponent extends Widget.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var groupCouponBean=props.groupCouponBean;
        this.state = {
            groupCouponBean:groupCouponBean,
            wayBeans:[{name:"平台内所有店铺",id:"system"},{name:"特定店铺",id:"merchants"}],
            typeBeans:[{name:"店铺内所有商品",id:"all"},{name:"限店铺内某商品",id:"goods"},{name:"限店铺内某分类",id:"class"}],
            modelBeans:[{name:"在平台内下单时减免",id:"1"},{name:"非平台内使用",id:"2"}],
            is_num_depends:[{name:"不限定发放数",id:"0"},{name:"限定发放数",id:"1"}],
            is_limits:[{name:"不限制用户领取数",id:"0"},{name:"限制用户领取数",id:"1"}],
        };
    }
    insertClass() {
        if (this.isNull(this.state.couponBean.coupon_name)) {
            this.showTip("名称不可为空");
            return;
        }

        if (this.isNull(this.state.couponBean.start_time)) {
            this.showTip("开始时间不可为空");
            return;
        }

        if (this.isNull(this.state.couponBean.start_time)) {
            this.showTip("结束时间不可为空");
            return;
        }

        if(isNaN(this.state.couponBean.coupon_price)){
            this.showTip("减免金额非法");
            return;
        }

        if(isNaN(this.state.couponBean.coupon_full_price)){
            this.showTip("满多少减非法");
            return;
        }

        if(isNaN(this.state.couponBean.valid_day)){
            this.showTip("有效天数非法非法");
            return;
        }

        var params={};
        params["coupon_name"]=this.state.couponBean.coupon_name;
        params["coupon_full_price"]=this.state.couponBean.coupon_full_price;
        params["coupon_price"]=this.state.couponBean.coupon_price;
        params["start_time"]=this.state.couponBean.start_time;
        params["end_time"]=this.state.couponBean.end_time;
        params["coupon_type"]=this.isNull(this.state.couponBean.coupon_type)?"platform":this.state.couponBean.coupon_type;
        params["coupon_desc"]=this.state.couponBean.coupon_desc;
        params["valid_day"]=this.state.couponBean.valid_day;
        params["goods_id"]=this.state.selectBean.goods_id;
        params["class_id"]=this.state.selectClassBean.class_id;

        if(this.isNull(this.state.couponBean.coupon_id)){
            this.getDataByPost(1,homeurl+"couponController.api?insertCoupon",params);
        }else{
            params["coupon_id"]=this.state.couponBean.coupon_id;
            this.getDataByPost(2,homeurl+"couponController.api?updateCoupon",params);
        }
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 2:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
            case 3:
                this.setState({
                    allGoodsBeans:data
                })
                break;
            case 4:
                this.setState({
                    allGoodsClassBeans:data
                })
                if(data.length>0) {
                    var d=data.filter(function(item){
                        return item["class_uuid"]+""===this.state.couponBean.class_uuid+"";
                    }.bind(this));

                    if(d.length>0){
                        this.setState({
                            selectClassBean: d[0],
                            goods_class_name:d[0].class_name,
                        })
                    }else{

                    }
                }
                break;
        }
    }
    render(){
        return(
            <div>
                <div style={{marginTop:20,display:'flex'}}>
                    <Widget.Date
                        title="活动开始时间"
                        style={{marginLeft:10}}
                        format="YYYY-MM-DD HH:mm:ss"
                        value={this.state.groupCouponBean.start_time}
                        onChange={(dateString)=>{
                            this.state.groupCouponBean.start_time=dateString;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}
                    />
                    <Widget.Date
                        title="活动结束时间"
                        style={{marginLeft:10}}
                        format="YYYY-MM-DD HH:mm:ss"
                        value={this.state.groupCouponBean.end_time}
                        onChange={(dateString)=>{
                            this.state.groupCouponBean.end_time=dateString;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}
                    />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Widget.SelectV2
                        marginTop={20}
                        dataSource={this.state.modelBeans}
                        title="优惠券使用场景"
                        init_value={this.state.groupCouponBean.coupon_model}
                        select_value="id"
                        show_value="name"
                        onChange={(rowID)=>{
                            this.state.groupCouponBean.coupon_model=this.state.modelBeans[rowID].id;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Widget.SelectV2
                        marginTop={20}
                        dataSource={this.state.wayBeans}
                        title="发放优惠券的店铺"
                        init_value={this.state.groupCouponBean.coupon_way}
                        select_value="id"
                        show_value="name"
                        onChange={(rowID)=>{
                            this.state.groupCouponBean.coupon_way=this.state.wayBeans[rowID].id;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                    <Widget.Editor
                        visible={this.state.groupCouponBean.coupon_way==="merchants"?"true":"false"}
                        marginTop={20}
                        title="店铺ID"
                        inputWidth={40}
                        value={this.state.groupCouponBean.merchants_id}
                        onChange={(value)=>{
                            this.state.groupCouponBean.merchants_id=value;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Widget.SelectV2
                        marginTop={20}
                        dataSource={this.state.typeBeans}
                        title="店铺内覆盖的商品"
                        init_value={this.state.groupCouponBean.coupon_type}
                        select_value="id"
                        show_value="name"
                        onChange={(rowID)=>{
                            this.state.groupCouponBean.coupon_type=this.state.typeBeans[rowID].id;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                    <Widget.Editor
                        visible={this.state.groupCouponBean.coupon_type==="class"?"true":"false"}
                        marginTop={20}
                        title="分类ID"
                        inputWidth={40}
                        value={this.state.groupCouponBean.class_id}
                        onChange={(value)=>{
                            this.state.groupCouponBean.class_id=value;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                    <Widget.Editor
                        visible={this.state.groupCouponBean.coupon_type==="goods"?"true":"false"}
                        marginTop={20}
                        title="商品ID"
                        inputWidth={40}
                        value={this.state.groupCouponBean.goods_id}
                        onChange={(value)=>{
                            this.state.groupCouponBean.goods_id=value;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Widget.SelectV2
                        marginTop={20}
                        dataSource={this.state.is_limits}
                        title="领取规则"
                        init_value={this.state.groupCouponBean.is_limit}
                        select_value="id"
                        show_value="name"
                        onChange={(rowID)=>{
                            this.state.groupCouponBean.is_limit=this.state.is_limits[rowID].id;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                    <Widget.Editor
                        visible={this.state.groupCouponBean.is_limit==="1"?"true":"false"}
                        marginTop={20}
                        title="用户最多领取数"
                        value={this.state.groupCouponBean.limit_times}
                        inputWidth={40}
                        onChange={(value)=>{
                            this.state.groupCouponBean.limit_times=value;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Widget.Editor
                        marginTop={20}
                        title="优惠券有效天数"
                        inputWidth={40}
                        value={this.state.groupCouponBean.valid_day}
                        onChange={(value)=>{
                            this.state.groupCouponBean.valid_day=value;
                            this.setState({
                                groupCouponBean:this.state.groupCouponBean
                            })
                        }}/>
                </div>
                <Widget.Button
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.insertClass();
                    }}/>
            </div>
        )
    }
}
class NumBatchCouponEditorComponent extends Widget.BaseComponent{
    constructor(props) {
        super(props);
        // 初始状态
        var groupCouponBean=props.groupCouponBean;
        this.state = {
           batch_id:groupCouponBean.batch_id,
           is_num_depend: groupCouponBean.is_num_depend,
           is_stand_alone:groupCouponBean.is_stand_alone,
           num_batch_count:groupCouponBean.num_batch_count,
           numBatchCouponBeans:groupCouponBean.couponBeanList,
           is_num_depends:[{name:"不限制每批次的发放数量",id:"0"},{name:"限制每批次的发放数量",id:"1"}],
           is_stand_alones:[{name:"规定同一批次下所有优惠券的发行总数",id:"0"},{name:"规定同一批次下不同优惠券不同的发行数量",id:"1"}],
        };
    }
    render(){
        return (<div>
            <div style={{display:'flex',alignItems:'center'}}>
                <Widget.Editor
                    marginTop={20}
                    title="发行批次"
                    value={this.state.num_batch_count}
                    inputWidth={40}
                    onChange={(value)=>{
                        this.setState({
                            num_batch_count:value
                        })
                    }}/>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
                <Widget.SelectV2
                    marginTop={20}
                    dataSource={this.state.is_num_depends}
                    init_value={this.state.is_num_depend}
                    title="每批次的发行数"
                    select_value="id"
                    show_value="name"
                    onChange={(rowID)=>{
                        this.setState({
                            is_num_depend:this.state.is_num_depends[rowID].id
                        })
                    }}/>
                <Widget.SelectV2
                    marginTop={20}
                    visible={this.state.is_num_depend==="1"?"true":"false"}
                    dataSource={this.state.is_stand_alones}
                    init_value={this.state.is_stand_alone}
                    title="限制方式"
                    select_value="id"
                    show_value="name"
                    onChange={(rowID)=>{
                        this.setState({
                            is_stand_alone:this.state.is_stand_alones[rowID].id
                        })
                    }}/>
            </div>
        </div>)
    }
}
class SingleCouponEditorComponent extends Widget.BaseComponent{
    constructor(props) {
        super(props);
        // 初始状态
        var groupCouponBean=props.groupCouponBean;
        this.state = {
            groupCouponBean:groupCouponBean,
            wayBeans:[{name:"平台内所有店铺 ",id:"system"},{name:"特定 店铺",id:"merchants"}],
            typeBeans:[{name:"店铺内所有商品",id:"all"},{name:"店铺内限某商品",id:"goods"},{name:"店铺内限某分类",id:"class"}],
            modelBeans:[{name:"平台内使用",id:"1"},{name:"非平台内使用",id:"2"}],
            is_num_depends:[{name:"不限定发放数",id:"0"},{name:"限定发放数",id:"1"}],
            is_limits:[{name:"不限制用户领取数",id:"0"},{name:"限制用户领取数",id:"1"}],
        };
    }
    render(){
        return  (<div>


        </div>)
    }
}
module.exports=CouponEditorComponent;