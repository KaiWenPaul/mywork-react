/**
 * Created by shenjiabo on 16/8/17.
 */
import React,{Component} from 'react'

import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';

var Widget=require("./../../widget/WidgetComponent");
class RecommendGoodsClass1Component extends Widget.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            goodsBeans:[],
            visible:false,
            goods_index:1,
            level:1,
            baseData:[],
            detailBean:{},
            total:0,
            page:1,
        };
    }

    componentDidMount() {
        let baseData=[
            {name:"ID",flex:1,key:'goods_id'},
            {name:"分类名称",flex:1,key:'goods_name'},
            {name:"图标",flex:1,key:"goods_img",type:'img'},
            {name:"权重",flex:1,key:'sort'},
            {name:"操作",flex:3,key:"-1"}
            ];
        this.setState({
            baseData:baseData
        });
        this.getGoodsClass();
        this.getShow();
        this.getGoods();
    }
    getShow(){
        this.getDataByPost(3,homeurl+"systemController.api?getSystemDetailShows",{detail_type:'class_list_detail'});
    }
    getGoodsClass(){
        this.getDataByPost(1,homeurl+"swInterfaces.api?getHomeClassWeb",{level:1})
    }
    getGoods(){
        this.getDataByPost(4,homeurl+"goodsInterfaces.api?getGoodsClassLevel",{level:1,goods_id:-1});
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    goodsBeans:data,
                    total:data.length,
                    goods_name:"",
                    selectBean:{},
                });
                break;
            case 2:
                toast.show("操作成功");
                this.getGoodsClass();
                break;
            case 3:
                this.setState({
                    detailBean:JSON.parse(data)
                })
                break;
            case 4:
                this.setState({
                    allGoodsBeans:data,
                })
                break;
        }
    }
    updateGoodsRecommend(flag,goodsBean,show){
        if(show){
            this.setState({
                visible:false,
            });
        }
        this.getDataByPost(2,homeurl+"goodsController.api?updateGoodsRecommend",{is_recommend:flag,goods_id:goodsBean.goods_id});
    }
    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title="首页推荐" history={this.props.history}/>
                <Widget.Tip visible={this.state.visible} msg="确定要移除吗?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.updateGoodsRecommend(0,this.state.goodsBeans[this.state.rowID],true);
                            }}/>
                <div style={{display:'flex',marginTop:20}}>
                <Widget.SearchBar
                    marginLeft={20}
                    item_name="goods_name"
                    dataSource={this.state.allGoodsBeans}
                    name={this.state.goods_name}
                    onPress={(data,value)=>{
                        this.setState({
                            goods_name:value,
                            selectBean:data,
                        })
                    }}/>
                <Widget.Button
                    marginLeft={20}
                    value="添加"
                    onClick={()=>{
                        this.updateGoodsRecommend(1,this.state.selectBean);
                    }}/>
                </div>
                <Widget.ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.goodsBeans}
                    total={this.state.total}
                    operationData={[{title:(this.state.level+1)+"级推荐",type:1},{title:"移除",type:1}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_recommend_class2/"+encodeURIComponent(JSON.stringify(this.state.goodsBeans[rowID])));
                            break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    rowID:rowID,
                                });
                                break;
                        }
                    }}
                />
            </div>
        );
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
        fontSize:15,
        wordBreak:'break-all'
    }
};

module.exports=RecommendGoodsClass1Component;
