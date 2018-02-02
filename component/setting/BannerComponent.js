/**
 * Created by shenjiabo on 16/8/17.
 */
import React,{Component} from 'react'

import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var Widget=require("./../../widget/WidgetComponent");

class BannerComponent extends Widget.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            bannerBeans:[],
            visible:false,
            banner_index:1,
            page:1,
            baseData:[],
            total:0,
            banner_title:"",
            banner_types:[],
            banner_positions:[],
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'banner_id'},
                {name:"标题",flex:2,key:'banner_title'},
                {name:"图标",flex:2,key:'banner_img',type:'img'},
                {name:"广告类型",flex:2,key:'banner_type_show'},
                {name:"展示位置",flex:2,key:'banner_position_show'},
                {name:"权重",flex:1,key:'sort'},
                {name:"操作",flex:4,key:"-1"}
            ]
        })
        this.getBeannrs(this.state.page);
    }

    getBeannrs(page){
        this.getDataByPost(1,homeurl+"bannerController.api?getAllBanners",
            {page:page,banner_type:this.state.banner_types.toString(),
                banner_position:this.state.banner_positions.toString(),
                banner_title:this.state.banner_title},{type:2})
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    bannerBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                toast.show("删除成功");
                this.getBeannrs();
                break;
        }
    }

    deleteBanner(){
        this.setState({
            visible:false,
        })
        this.getDataByPost(2,homeurl+"bannerController.api?deleteBanner",
            {banner_id:this.state.bannerBeans[this.state.banner_index].banner_id});
    }

    render(){
        let view=[];
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                              onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                              }}
                              onPress={()=>{
                                  this.deleteBanner();
                              }}/>
                <Widget.Toolbar title={"广告列表"} history={this.props.history}></Widget.Toolbar>
                <div style={{marginTop:20,display:'flex'}}>
                    <Widget.Editor
                        title="标题"
                        value={this.state.banner_title}
                        onChange={(value)=>{
                            this.setState({
                                banner_title:value,
                            })
                        }}/>
                    <Widget.Button
                        marginLeft={20}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            })
                            this.getBeannrs(1);
                        }}/>
                </div>
                <div style={{display:'flex',alignItems:'center',marginTop:20,}}>
                    <div style={{width:100,display:'flex',justifyContent:'flex-end',}}>
                        <p1 style={{fontSize:13}}>广告类型</p1>
                    </div>
                    <Widget.Check title="普通广告"
                                    checked={this.state.banner1}
                                    onClick={(checked)=>{
                                        if(checked==='1'){
                                            this.state.banner_types.push("common");
                                        }else{
                                            var index=this.state.banner_types.indexOf("common");
                                            this.state.banner_types.splice(index,1);
                                        }
                                        this.setState({
                                            banner_types:this.state.banner_types,
                                            banner1:checked
                                        })
                                    }}/>
                    <Widget.Check title="商品广告" checked={this.state.banner2}
                                    onClick={(checked)=>{
                                        if(checked==='1'){
                                            this.state.banner_types.push("goods");
                                        }else{
                                            var index=this.state.banner_types.indexOf("goods");
                                            this.state.banner_types.splice(index,1);
                                        }
                                        this.setState({
                                            banner_types:this.state.banner_types,
                                            banner2:checked
                                        })
                                    }}/>
                    <Widget.Check title="分类广告" checked={this.state.banner3}
                                  onClick={(checked)=>{
                                        if(checked==='1'){
                                            this.state.banner_types.push("class");
                                        }else{
                                            var index=this.state.banner_types.indexOf("class");
                                            this.state.banner_types.splice(index,1);
                                        }
                                        this.setState({
                                            banner_types:this.state.banner_types,
                                            banner3:checked
                                        })
                                    }}/>
                    <Widget.Check title="外链广告" checked={this.state.banner4}
                                  onClick={(checked)=>{
                                        if(checked==='1'){
                                            this.state.banner_types.push("chain");
                                        }else{
                                            var index=this.state.banner_types.indexOf("chain");
                                            this.state.banner_types.splice(index,1);
                                        }
                                        this.setState({
                                            banner_types:this.state.banner_types,
                                            banner4:checked
                                        })
                                    }}/>
                </div>
                {view}
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',marginTop:20,}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                    onClick={()=>{
                            this.props.history.push("/banner_editor/"+encodeURIComponent(JSON.stringify({})));
                        }}/>
                </div>
                <Widget.ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.bannerBeans}
                    page={this.state.page}
                    total={this.state.total}
                    operationData={[{title:"编辑",type:1},{title:"图文详情",type:2},{title:"删除",type:1}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/banner_editor/"+encodeURIComponent(JSON.stringify(this.state.bannerBeans[rowID])));
                            break;
                            case 1:
                                this.props.history.push("/banner_detail_editor/"+encodeURIComponent(this.state.bannerBeans[rowID].banner_url));
                            break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    banner_index:rowID
                                })
                            break;
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        });
                        this.getBeannrs(page)
                    }}>
                </Widget.ListViewComponent>
            </div>
        );
    }
}

module.exports=BannerComponent;
