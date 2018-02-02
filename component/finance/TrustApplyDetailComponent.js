/**
 * Created by shenjiabo on 16/10/18.
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

var TabBar = require("./../../widget/TabBar");
var EditorComponent = require("./../../widget/EditorComponent");
var TextComponent = require("./../../widget/TextComponent");
var CheckComponent = require("./../../widget/CheckComponent");
var ButtonComponent = require("./../../widget/ButtonComponent");
var SelectComponent = require("./../../widget/SelectComponent");

var Widget = require("./../../widget/WidgetComponent");

class TrustApplyDetailComponent extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var trustItem = JSON.parse(decodeURIComponent(this.props.params.trustItem));
        this.state = {
            trustItem: trustItem.trustItem,
            allowedPrice:trustItem.trustItem.trust_price,
            trustBean: {},
            memberBean: {},
            apply_state: trustItem.trustItem.apply_state,
            apply_state_show: trustItem.trustItem.apply_state_show,
        }
        ;
    }

    componentDidMount() {
        this.getDataByPost(1, homeurl + "/swController.api?getTrustByTrustId",
            {trust_id: this.state.trustItem.trust_id, member_id: this.state.trustItem.member_id}, {type: 2});
        this.getDataByPost(2, homeurl + "/memberController.api?getOneMemberDetail",
            {member_id: this.state.trustItem.member_id}, {type: 2})
    }

    passTrustApply(state) {
        this.getDataByPost(3, homeurl + "/swController.api?passTrustApply",
            {trust_item_id: this.state.trustItem.trust_item_id, apply_state: state,
            member_id:this.state.trustItem.member_id,trust_price:this.state.allowedPrice}, {type: 1});
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                this.setState({
                    trustBean: data.data
                });
                break;
            case 2:
                this.setState({
                    memberBean: data.data
                });
                break;
            case 3:
                toast.show(data.msg);
                this.state.trustItem.pass_price=data.pass_price;
                this.setState({
                    apply_state: data.apply_state,
                    trustItem:this.state.trustItem,
                    apply_state_show: data.apply_state_show
                })
                break;
        }
    }

    render() {
        return (
            <div>
                <Toolbar title="信用申请详细资料" history={this.props.history}></Toolbar>
               <div style={styles.div}>
                </div>
               <div style={styles.div}>
                   <EditorComponent
                       marginTop={20}
                       title="申请状态"
                       readOnly="true"
                       value={this.state.apply_state_show}
                   />
                <EditorComponent
                    marginTop={20}
                    title="项目金额(万)"
                    readOnly="true"
                    value={this.state.trustItem.item_price}
                />
                <EditorComponent
                    marginTop={20}
                    title="授信额度(万)"
                    readOnly="true"
                    value={this.state.trustItem.trust_price}
                />
                <EditorComponent
                       visible={(this.state.apply_state === 'wait_review'
                       || this.state.apply_state === 'refuse')?"true":"false"}
                       marginTop={20}
                       title="审核通过金额(万)"
                       value={this.state.allowedPrice}
                       onChange={
                           (value)=>{
                               this.setState({
                                   allowedPrice:value,
                               })
                            }}
                   />
                   <EditorComponent
                       visible={(this.state.apply_state === 'wait_review')?"false":"true"}
                       marginTop={20}
                       title="审核通过的金额(万)"
                       readOnly="true"
                       value={this.state.trustItem.pass_price}
                   />
                   <ButtonComponent
                       visible={(this.state.apply_state === 'wait_review'
                       || this.state.apply_state === 'refuse')?"true":"false"}
                       marginTop={20}
                       width={100}
                       marginLeft={100}
                       value="审核通过"
                       onClick={() => {
                           this.passTrustApply("accept");
                       }}/>
                   <ButtonComponent
                       visible={(this.state.apply_state === 'wait_review')?"true":"false"}
                       marginTop={20}
                       width={100}
                       marginLeft={100}
                       value="拒绝申请"
                       onClick={() => {
                           this.passTrustApply("refuse");
                       }}/>
                </div>
               <div style={styles.div}>
                <EditorComponent
                    marginTop={20}
                    title="用户ID"
                    readOnly="true"
                    value={this.state.trustItem.member_id}
                />
                <EditorComponent
                    marginTop={20}
                    title="用户账号"
                    readOnly="true"
                    value={this.state.memberBean.member_account}
                />
                <EditorComponent
                    marginTop={20}
                    title="申请人姓名"
                    readOnly="true"
                    value={this.state.trustBean.apply_name}
                />
                </div>
               <div style={styles.div}>
                <EditorComponent
                    marginTop={20}
                    title="申请人性别"
                    readOnly="true"
                    value={this.state.trustBean.apply_sex}
                />
                <EditorComponent
                    marginTop={20}
                    title="专业/职称"
                    readOnly="true"
                    value={this.state.trustBean.apply_position}
                />
                <EditorComponent
                    marginTop={20}
                    title="申请人固定电话"
                    readOnly="true"
                    value={this.state.trustBean.apply_fixed_mobile}
                />
                <EditorComponent
                    marginTop={20}
                    title="申请人邮箱"
                    readOnly="true"
                    value={this.state.trustBean.apply_email}
                />
                </div>
               <div style={styles.div}>
                   <EditorComponent
                       marginTop={20}
                       title="申请人手机"
                       readOnly="true"
                       value={this.state.trustBean.apply_mobile}
                   />
                   <EditorComponent
                       marginTop={20}
                       title="专业/职称"
                       readOnly="true"
                       value={this.state.trustBean.is_delete}
                   />
                <EditorComponent
                    marginTop={20}
                    title="申请日期"
                    readOnly="true"
                    value={this.state.trustBean.create_time}
                />
                <EditorComponent
                    marginTop={20}
                    title="单位名称"
                    readOnly="true"
                    value={this.state.trustBean.apply_company}
                />
                </div>
               <div style={styles.div}>
                <EditorComponent
                    marginTop={20}
                    title="项目名称"
                    readOnly="true"
                    value={this.state.trustItem.item_name}
                />
                <EditorComponent
                    marginTop={20}
                    title="项目负责人"
                    readOnly="true"
                    value={this.state.trustItem.item_responsible_name}
                />
                <EditorComponent
                    marginTop={20}
                    title="项目单位名称"
                    readOnly="true"
                    value={this.state.trustItem.company_name}
                />
                </div>
               <div style={styles.div}>
                <EditorComponent
                    marginTop={20}
                    title="项目批准号"
                    readOnly="true"
                    value={this.state.trustItem.item_code}
                />
                <EditorComponent
                    marginTop={20}
                    title="项目开始时间"
                    readOnly="true"
                    value={this.state.trustItem.item_start_time}
                />
                <EditorComponent
                    marginTop={20}
                    title="项目结束时间"
                    readOnly="true"
                    value={this.state.trustItem.item_end_time}
                />
                </div>
                <EditorComponent
                    marginTop={20}
                    title="备注"
                    readOnly="true"
                    value={this.state.trustItem.trust_remark}
                />
                <EditorComponent
                    marginTop={20}
                    title="申请日期"
                    readOnly="true"
                    value={this.state.trustItem.create_time}
                />
            </div>
        )
    }
}
const styles = {
    input:{
        width:300,
        height:30,
    },
    font:{
        fontSize:15,
        width:100,
        marginLeft:20,
    },
    button:{
        paddingLeft:20,
        paddingRight:20,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        background:'blue'
    },
    buttonFont:{
        fontSize:15,
        color:'#ffffff'
    },
    div:{
        display:'flex',
        marginTop:20,
        alignItems:'center'
    }
}
module.exports = TrustApplyDetailComponent;