/**
 * Created by shenjiabo on 16/8/17.
 */
import React,{Component} from 'react'

import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var Widget=require("./../../widget/WidgetComponent");

class GoodsClassComponent extends Widget.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        let goodsBean = JSON.parse(decodeURIComponent(this.props.params.goodsBean));
        let level = parseInt(this.props.params.level);
        this.state = {
            goods_id:this.props.params.goodsBean.goods_id,
            goodsBeans:[],
            visible:false,
            goods_index:1,
            level:level,
            tieTxt:this.props.params.goodsBean.goods_name,
            baseData:[],
            detailBean:{},
            show_name:level==3?"四级分类数":"五级分类数"
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'goods_id'},
                {name:"分类名称",flex:1,key:'goods_name'},
                {name:"图标",flex:1,key:"goods_img",type:'img'},
                {name:"是否上架",flex:1,key:'goods_state_show'},
                {name:this.state.show_name,flex:1,key:'class_count'},
                {name:"商品数",flex:1,key:'goods_count'},
                {name:"是否推荐",flex:1,key:'is_recommend_show'},
                {name:"权重",flex:1,key:'sort'},
                {name:"操作",flex:3,key:"-1"}
            ]
        });
        this.getGoodsClass();
        this.getDataByPost(3,homeurl+"systemController.api?getSystemDetailShows",{detail_type:'class_list_detail'});
    }

    getGoodsClass(){
        this.getDataByPost(1,homeurl+"goodsController.api?getGoodsClassByParentId"
            ,{goods_id:this.state.goods_id,goods_type:'1'})
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    goodsBeans:data
                });
                break;
            case 2:
                toast.show("删除成功");
                this.getGoodsClass();
                break;
            case 3:
                this.setState({
                    detailBean:JSON.parse(data)
                })
                break;
        }
    }

    deleteGoods(){
        this.setState({
            visible:false,
        })
        this.getDataByPost(2,homeurl+"goodsController.api?deleteGoodsClass",
            {goods_id:this.state.goodsBeans[this.state.goods_index].goods_id});
    }

    render(){
        return(
            <div>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                              onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                              }}
                              onPress={()=>{
                                  this.deleteGoods();
                              }}></Widget.Tip>
                <Widget.Toolbar title={this.state.tieTxt} history={this.props.history}></Widget.Toolbar>
                <div style={{marginTop:20,display:'flex',justifyContent:'flex-end',flex:1,alignItems:'center'}}>
                    <Widget.ImgButton
                        visible={this.state.detailBean.load}
                        marginRight={20}
                        value="批量导入"
                        action={homeurl+"goodsController.api?loadGoodsClassExcel"}
                        onSuccess={(data)=>{
                             toast.show("操作成功");
                             this.setState({
                                page:1
                             })
                             this.getGoodsClass();
                        }}/>
                    <Widget.ImgButton
                        visible={this.state.detailBean.loadimg}
                        marginRight={20}
                        value="批量图片"
                        action={homeurl+"goodsController.api?uploadBrandImgs"}
                        onSuccess={(data)=>{
                             toast.show("操作成功");
                        }}/>

                    <Widget.Button
                        visible={this.state.detailBean.down}
                        marginRight={20}
                        value="下载模板"
                        onClick={()=>{
                            window.open(imgurl+"/excel/goods_class.xlsx");
                        }}/>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_class_editor/"+encodeURIComponent(JSON.stringify({parent_id:this.props.params.goodsBean.parent_id}))+"/"+this.props.params.level)
                        }}/>
                </div>
                <Widget.ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.goodsBeans}
                    operationData={[{title:(this.state.level+1)+"级分类",type:1},
                                    {title:"广告管理",type:2,visible:this.state.level+""==="1"?"true":"false"},{title:"编辑",type:1},{title:"删除",type:1}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_class_1/"+encodeURIComponent(JSON.stringify(this.state.goodsBeans[rowID]))+"/"+(this.state.level+1));
                                break;
                            case 1:
                                this.props.history.push("/class_banner/"+this.state.goodsBeans[rowID].goods_id);
                                break;
                            case 2:
                                this.props.history.push("/goods_class_editor/"+encodeURIComponent(JSON.stringify(this.state.goodsBeans[rowID]))+"/"+this.props.params.level);
                                break;
                            case 3:
                                this.setState({
                                    visible:true,
                                    goods_index:rowID
                                });
                                break;
                        }
                    }}/>
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

module.exports=GoodsClassComponent;
