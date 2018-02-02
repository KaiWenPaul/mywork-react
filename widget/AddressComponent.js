/**
 * Created by hy.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var PageComponent=require("./PageComponent");
var Widget = require("./WidgetComponent");
class AddressComponent extends Component{

    constructor(props) {
        super(props);
        this.state={
            have_props : 1,
            load:0,
        }
        //console.log(this.props.id_city)
        console.log('nameORDER = ' + this.props.name_order)
    }
    componentDidMount(){
        this.setTreAddressjs()
    }
    // 三级地域选择js
    setTreAddressjs(){
        var head= document.getElementsByTagName('head')[0];
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= './treAddress.js';
        head.appendChild(script);
        this.state.load = 1;
    }

    // 获取三级地域选择内容
    setAddr(){
        if(this.props.onSelectChange){
            var getpro=document.getElementById("user.province" + this.props.name_order).value;
            var getcity=document.getElementById("user.city" + this.props.name_order).value;
            var getarea=document.getElementById("user.area" + this.props.name_order).value;
            this.props.onSelectChange(getpro,getcity,getarea)
        }
    }

    render(){
        if(this.state.load&&this.state.have_props&&this.props.flag){
            this.state.have_props =0;
            new PCAS("user.province" + this.props.name_order,"user.city" + this.props.name_order,"user.area" + this.props.name_order,this.props.province,this.props.city,this.props.area);
        }
        return(
            <div style={{width:600}}>
                <div style={{width:this.props.width?this.props.width:(this.props.title?110:0),display:'flex',justifyContent:'flex-end',float:'left'}}>
                    <p1 style={styles.tabP1}>{this.props.title}</p1>
                </div>
                <div styles = {{flex:this.props.flex,display:'flex',float:'left'}}>
                    <select name={"user.province" + this.props.name_order} id={"user.province" + this.props.name_order} onChange={()=>this.setAddr()}></select>
                    <select name={"user.city" + this.props.name_order} id={"user.city" + this.props.name_order} onChange={()=>this.setAddr()}></select>
                    <select name={"user.area" + this.props.name_order} id={"user.area" + this.props.name_order} onChange={()=>this.setAddr()}></select>
                </div>
            </div>
        )
    }

}



const styles = {
    item: {
        flex: 1,
        display: 'flex',
        borderWidth: 1,
        borderTopWidth: 1,
        borderLeftColor: '#c8c8c8',
        borderTopColor: '#c8c8c8',
        borderLeftStyle: 'solid',
        borderTopStyle: 'solid',
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    tabColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: '#c8c8c8',
        borderRightColor: '#c8c8c8',
        borderBottomStyle: 'solid',
        borderRightStyle: 'solid',
        padding: 10,
    },
    tabRow: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: '#c8c8c8',
        borderRightColor: '#c8c8c8',
        borderBottomStyle: 'solid',
        borderRightStyle: 'solid',
        padding: 10,
    },
    tabP1: {
        fontSize: 13,
        wordBreak: 'break-all'
    },
    floatleft:{
        float: 'left',
        display:'inline'
    },
    secBtn:{
        border: 'none',
        color: 'white',
        'font-family':'Arial',
        padding: '10px 24px',
        'text-align': 'center',
        'text-decoration': 'none',
        display: 'inline-block',
        'font-size': '18px',
        margin: '4px 2px',
        cursor: 'pointer'
    }

}


module.exports= AddressComponent;