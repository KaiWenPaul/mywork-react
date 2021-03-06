/**
 * Created by shenjiabo on 16/8/2.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require("./../../widget/WidgetComponent");
var BaseComponent=require('./../BaseComponent');
import {toast} from 'react-android-style-toast';
class PutExcelComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value:"",
            detailBean:false,
            dataPath:""
        };
    }

    componentDidMount() {
        
    }
    putExcel(arr,brr){
//      if(brr==="导入活动商品"){
//          this.getDataByPost(1,homeurl+"/activityController.api?loadActivityGoodsExcel",
//              {path:arr,activity_id:this.props.activity_id})
//      }else{
//   
//      }
         if(brr==="导入新商品"){
        this.getDataByPost(1,homeurl+"/goodsController.api?loadGoodsDetailExcel",
            {path:arr})
        }else{
            this.getDataByPost(2,homeurl+"/goodsController.api?loadUpdatedGoodsDetailExcel",
            {path:this.state.dataPath});
            this.setState({
                dataPath:""
            });
        }
    }
    doSuccess(index,data){
    switch (index){
    case 1:
        this.setState({
            detailBean:true,
        })
        toast.show("上传成功");
        window.open(data);
        if(this.props.onSuccess){
            this.props.onSuccess();
        }
        break;
    case 2:
        this.setState({
            detailBean:true
        });
        toast.show("更新成功");
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
                    <div style={{background:'#ffffff',width:300}}>
                        <div style={{display:'flex',alignItems:'center',
                            justifyContent:'center',outLine:'none',height:40,}}>
                            {this.props.msg}
                        </div>
                        <div style={{display:'flex',alignItems:'center',
                        justifyContent:'center',outLine:'none',height:100,}}>
                            {/*<p1 style={{fontSize:15,wordBreak:'break-all',display:this.state.detailBean?"block":"none"}}>上传成功</p1>*/}
                            <Widget.ImgButton
                                visible={this.state.detailBean}
                                marginRight={20}
                                value="请选择文件"
                                action={homeurl+"goodsController.api?loadExcel"}
                                onSuccess={(data)=>{
                                  this.setState({
                                      dataPath:data.data
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
                                    
                                    this.putExcel(this.state.dataPath,this.props.msg);
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
                                        this.state.dataPath='';
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

module.exports=PutExcelComponent;