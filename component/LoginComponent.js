/**
 * Created by shenjiabo on 16/8/23.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

var WidgetComponent=require('./../widget/WidgetComponent');

class LoginComponent extends WidgetComponent.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            merchants_account:"",
            password:"",
        };
    }

    render() {
        return (
            <div style={{display:"flex",height:'100%',width:'100%',flexDirection:'column',
                background:"url(./images/login_background.png)",backgroundSize:'100%'}}>
                <div style={{height:100,display:'flex',alignItems:'center'}}>
                    <p1 style={{marginLeft:10,fontSize:20,color:'#ffffff'}}>管理后台</p1>
                </div>
                <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div style={{width:250,height:280,background:'#E4E8EB',
                                display:'flex',flexDirection:"column"}}>
                        <div style={{height:50,display:'flex',alignItems:"center",justifyContent:'center'}}>
                            <p1 style={{fontSize:18,color:'#034172'}}>登录</p1>
                        </div>
                        <img src="./images/fengexian.png" style={{height:4}}/>
                        <div style={{flex:1,display:'flex',alignItems:"center",flexDirection:'column'}}>
                            <div style={{width:200,height:40,backgroundColor:"#F1F6F9",display:'flex',
                                alignItems:'center',marginTop:20,borderRadius:10}}>
                                <img src='./images/member.png'
                                     style={{width:20,height:20,marginLeft:10}}/>
                                <input style={{height: 30,flex:1,
                                       borderWidth:0,outline:"none",backgroundColor:"#F1F6F9"}}
                                       placeholder="账号"
                                       onChange={(e)=>{
                                            this.setState({
                                                merchants_account:e.target.value,
                                            })
                                       }}/>
                            </div>
                            <div style={{width:200,height:40,backgroundColor:"#F1F6F9",display:'flex',
                                alignItems:'center',marginTop:20,borderRadius:10}}>
                                <img src='./images/password.png'
                                     style={{width:20,height:20,marginLeft:10}}/>
                                <input type="password" style={{height: 30,flex:1,
                                        borderWidth:0,backgroundColor:"#F1F6F9",outline:"none",}}
                                       placeholder="密码"
                                       onChange={(e)=>{
                                            this.setState({
                                                password:e.target.value,
                                            })
                                       }}/>
                            </div>
                            <div  style={{backgroundColor:'#F8935F',width:180,marginTop:10,borderRadius:10,height:40
                                        ,display:'flex',alignItems:"center",justifyContent:'center'}}
                                 onClick={()=>{
                                        this.login();
                                    }}>
                                <p1 style={{fontSize:15,color:'#ffffff'}}>登录</p1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    login(){
        if(this.state.merchants_account===''){
            WidgetComponent.toast.show("账号不可为空1");
            return;
        }
        if(this.state.password===''){
            WidgetComponent.toast.show("密码不可为空");
            return;
        }

        this.getDataByPost(1,homeurl+"/systemController.api?merchantsLogin",
            {merchants_account:this.state.merchants_account,
                password:this.state.password,
                is_default:"0"})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                WidgetComponent.storage.set("merchantsAccountBean",JSON.stringify(data));
                this.props.history.push('/main');
                break;
        }
    }
}

module.exports=LoginComponent;