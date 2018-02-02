/**
 * Created by shenjiabo on 16/8/2.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require("./../../widget/WidgetComponent");
var BaseComponent=require('./../BaseComponent');
import {toast} from 'react-android-style-toast';
var EditorComponent = require("./../../widget/EditorComponent");
class TrustAddComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value:"",
            detailBean:false,
            dataPath:"",
            addMoney:"",
            applyBeans:[],
            total:0,
            page:1,
        };
    }

    componentDidMount() {
        
    }
    addTrust(arr,brr){
       this.getDataByPost(1,homeurl+"swController.api?addTrustItem",{trust_id:arr,apply_price:this.state.addMoney,batch_no:brr});
    }
    doSuccess(index,data){

    switch (index){
    case 1:
        this.setState({
            detailBean:true,
            addMoney:""
        })
        toast.show("追加额度成功");
        if(this.props.onSuccess){
            this.props.onSuccess();
        }
        break;
    }
}
    render(){
        return(
            <div style={{display:this.props.visible?"flex":'none',flex:1,
                position:'fixed',top:0,left:0,right:0,bottom:0,flexDirection:'column'}}>
                <div style={{flex:1,background:'#000000',opacity:0.5}}>

                </div>
                <div style={{display:'flex'}}>
                    <div style={{flex:1,background:'#000000',opacity:0.5}}>

                    </div>
                    <div style={{background:'#ffffff',width:350}}>
                        <div style={{display:'flex',alignItems:'center',
                            justifyContent:'center',outLine:'none',height:40,}}>
                            {this.props.msg}
                        </div>
                        <div style={{display:'flex',alignItems:'center',
                        justifyContent:'center',outLine:'none',height:100,}}>
                            {/*<p1 style={{fontSize:15,wordBreak:'break-all',display:this.state.detailBean?"block":"none"}}>上传成功</p1>*/}
                            <EditorComponent
                                title='金额（万）'
                                value={this.state.addMoney}
                                onChange={(value)=>{
                                    this.setState({
                                        addMoney:isNaN(value)?"":value
                                    })
                                }}/>
                        </div>
                        <div style={{flex:1,height:1,background:'#efefef'}}></div>
                        <div style={{height:40,display:'flex',alignItems:'center'}}>
                            <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}
                                 onClick={()=>{
                                    this.setState({
                                        detailBean:false
                                    })
                                    
                                    this.addTrust(this.props.trust_item_id,this.props.num);
                                    this.state.dataPath='';
                                    this.props.onPress(this.state.value);
                                }}>
                                <p1 style={{fontSize:15}}>确定</p1>
                            </div>
                            <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}
                                 onClick={()=>{
                                    this.setState({
                                        detailBean:false
                                    })
                                        this.state.addMoney='';
                                        this.props.onClose();
                                    }}>
                                <p1 style={{fontSize:15}}>取消</p1>
                            </div>
                        </div>
                    </div>
                    <div style={{flex:1,background:'#000000',opacity:0.5}}>

                    </div>
                </div>
                <div style={{flex:1,background:'#000000',opacity:0.5}}>

                </div>
            </div>
        );
    }
}

module.exports=TrustAddComponent;