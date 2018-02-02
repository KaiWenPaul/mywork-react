/**
 * Created by shenjiabo on 16/8/26.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var ListView=require('./../../widget/ListView');
var BaseComponent=require('./../BaseComponent');

var TipComponent=require('./../../widget/TipComponent');
var Toolbar=require("./../../widget/Toolbar");

var EditorComponent=require('./../../widget/EditorComponent');
var ButtonComponent=require('./../../widget/ButtonComponent');
var ImgComponent=require('./../../widget/ImgComponent');
var TextareaComponent=require('./../../widget/TextareaComponent');
var SelectComponent=require('./../../widget/SelectComponent');
var Widget=require("./../../widget/WidgetComponent");
class GoodsClassEditorComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var goodsBean=JSON.parse(decodeURIComponent(this.props.params.goodsBean));
        this.state = {
            level:this.props.params.level,
            goodsBean:goodsBean,
            goods_name:goodsBean.goods_name?goodsBean.goods_name:"",
            goods_img:goodsBean.goods_img?goodsBean.goods_img:"",
            sort:goodsBean.sort?goodsBean.sort:"0",
            goodsStateBeans:[{id:'0',name:'下架中'},{id:'1',name:'上架中'}],
            goods_state:goodsBean.goods_state?goodsBean.goods_state:"0",
            goodsRecommendBeans:[{id:'0',name:'不推荐'},{id:'1',name:'推荐'}],
            is_recommend:goodsBean.is_recommend?goodsBean.is_recommend:"0",
            l1_id:goodsBean.parent_id_layer1?goodsBean.parent_id_layer1:0,
            l2_id:goodsBean.parent_id_layer2?goodsBean.parent_id_layer2:0,
            l3_id:goodsBean.parent_id_layer3?goodsBean.parent_id_layer3:0,
            l4_id:goodsBean.parent_id_layer4?goodsBean.parent_id_layer4:0,
            sortList:'',
            l2_list:{},
            l3_list:{},
            receive_goods_class:"",
            allClassBeans:[],
            receive_goods_name:"",
        };
    }
    componentDidMount() {
        this.getDataByPost(3,homeurl+"goodsInterfaces.api?getGoodsClassLevel",{goods_id:'-1',level:4});
        this.getDataByPost(4,homeurl+"goodsController.api?getAllGoodsClassNoPage");
    }

    insertMoudle(){
        if(this.state.goods_name===''){
            toast.show("分类名称不可为空");
            return;
        }

        if(!this.state.goodsBean.goods_id){
            this.getDataByPost(1,homeurl+"goodsController.api?insertGoodsClass",
                {goods_name:this.state.goods_name,goods_img:this.state.goods_img,
                    parent_id:this.state.goodsBean.parent_id,goods_type:"1",
                    sort:this.state.sort,
                    goods_state:this.state.goods_state,
                    is_recommend:this.state.is_recommend});
        }else{
            let parent_id=this.state.l4_id!=0?this.state.l4_id:(this.state.l3_id!=0?this.state.l3_id:
            (this.state.l2_id!=0?this.state.l2_id:this.state.l1_id));
            this.getDataByPost(2,homeurl+"goodsController.api?updateGoodsClass",
                {goods_name:this.state.goods_name,goods_img:this.state.goods_img,
                 parent_id:parent_id,goods_type:"1",
                 sort:this.state.sort,
                 goods_id:this.state.goodsBean.goods_id,
                 goods_state:this.state.goods_state,
                 is_recommend:this.state.is_recommend,
                 receive_goods_class:this.state.receive_goods_class
            });
        }
    }
    getSecondSorts(arr){
        let arr1 = this.state.sortList[arr].sonClassList;
        this.addFirstChoice(arr1);
        this.setState({
                    l2_list:arr1,
                    l3_list:'',
                    l2_id:0,
                    l3_id:0,
                    l4_id:0
                })
    }
    getThirdSorts(arr){
        let arr1 = this.state.l2_list[arr].sonClassList;
        this.addFirstChoice(arr1);
        this.setState({
                    l3_list:arr1,
                    l3_id:0,
                    l4_id:0
                })
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                toast.show("添加成功");
                this.props.history.goBack();
                break;
            case 2:
                toast.show("修改成功");
                this.props.history.goBack();
                break;
            case 3:
                let l2_list=[];
                let l3_list=[];
                for(let se in data){
                    if(data[se].goods_id===this.state.l1_id){
                        l2_list=data[se].sonClassList;
                    }
                }
                for(let th in l2_list){
                    if(l2_list[th].goods_id===this.state.l2_id){
                        l3_list=l2_list[th].sonClassList;
                    }
                }
                this.addFirstChoice(l2_list);
                this.addFirstChoice(l3_list);
                if(this.state.goodsBean.parent_id_layer3===0){
                    l3_list=[];
                }
                if(this.state.goodsBean.parent_id_layer2===0){
                    l2_list=[];
                }
                if(this.state.goodsBean.parent_id_layer1===-1){
                    data=[];
                }
                this.setState({
                      sortList:data,
                      l2_list:l2_list,
                      l3_list:l3_list,
                })
                break;
            case 4:
                this.setState({
                    allClassBeans:data
                })
                break;
        }
    }
    addFirstChoice(arr){
        if(Array.isArray(arr)&&arr.length>0&&arr[0].goods_id!=0){
            arr.unshift({goods_id:0,goods_name:"---请选择分类---"});
        }
    }
    render(){
        return(
            <div>
                <Toolbar title={this.isNull(this.state.goodsBean.goods_name)?"新建分类":this.state.goodsBean.goods_name} history={this.props.history}></Toolbar>
                <EditorComponent
                    marginTop={20}
                    title="分类名称"
                    value={this.state.goods_name}
                    onChange={(value)=>{
                        this.setState({
                            goods_name:value
                        })
                    }}/>
                <SelectComponent
                    marginTop={20}
                    dataSource={this.state.goodsStateBeans}
                                 title="商品状态"
                                 init_value={this.state.goods_state}
                                 select_value="id"
                                 show_value="name"
                                 onChange={(rowID)=>{
                                    this.setState({
                                        goods_state:this.state.goodsStateBeans[rowID].id
                                    });
                             }}>
                </SelectComponent>
                <SelectComponent
                    marginTop={20}
                    dataSource={this.state.goodsRecommendBeans}
                    title="是否在首页推荐"
                    init_value={this.state.is_recommend}
                    select_value="id"
                    show_value="name"
                    onChange={(rowID)=>{
                                this.setState({
                                    is_recommend:this.state.goodsRecommendBeans[rowID].id
                                });
                             }}>
                </SelectComponent>
                <ImgComponent
                    marginTop={20}
                    title="图片"
                    src={this.state.goods_img===''?"./images/add.jpg":imgurl+this.state.goods_img}
                    url={homeurl+'goodsController.api?uploadGoodsImg'}
                    onSuccess={(data)=>{
                        this.setState({
                            goods_img:data,
                        })
                    }}/>
                <EditorComponent
                    marginTop={20}
                    title="权重"
                    value={this.state.sort}
                    onChange={(value)=>{
                        this.setState({
                            sort:value
                        })
                    }}/>
                <div style={{display:'flex'}}>
                    {this.renderSort()}
                </div>
                <div style={{display:'flex'}}>
                    <Widget.TextComponent
                        marginTop={20}
                        title="旗下商品数目"
                        value={this.state.goodsBean.goods_count}
                    />
                    <EditorComponent
                        visible={this.state.goodsBean.goods_count>0?"true":"false"}
                        marginTop={25}
                        title="转移商品到分类"
                        value={this.state.receive_goods_class}
                        placeholder="请输入分类ID"
                        onChange={(value)=>{
                            if(value==="0"||value===""){
                                this.setState({
                                    receive_goods_class:"",
                                    receive_goods_name:""
                                })
                            }else{
                                let filterArr = this.state.allClassBeans.filter(function(obj){return obj.goods_id == value});
                                if(filterArr.length==0){
                                    toast.show("该分类不存在");
                                    return;
                                }
                                this.setState({
                                    receive_goods_class:value,
                                    receive_goods_name:filterArr[0].goods_name
                                })
                            }
                        }}/>
                    <Widget.TextComponent
                        visible={this.state.receive_goods_name===""?"false":"true"}
                        marginTop={20}
                        title="分类名"
                        value={this.state.receive_goods_name}
                    />
                </div>
                <div style={{display:'flex'}}>

                </div>
                <ButtonComponent
                    marginTop={20}
                    marginLeft={100}
                    width={100}
                    value="保存"
                    onClick={()=>{
                        this.insertMoudle();
                    }}/>
            </div>
        )
    }

   //  新加分类
     renderSort(){
         return(
           <div style={{ margin: "0 3px",padding: "2px 6px",fontSize: "14px"}}>
               <span style={{float:"left"}}>
                    <SelectComponent dataSource={this.state.sortList}
                          visible={this.state.l1_id=='-1'?"false":"true"}
                          title="顶级父类"
                          init_value={this.state.l1_id}
                          select_value="goods_id"
                          show_value="goods_name"
                          onChange={(rowID)=>{
                              this.state.l1_id=this.state.sortList[rowID].goods_id
                              this.getSecondSorts(rowID)
                          }}>
                    </SelectComponent>
                </span>
                <span style={{float:"left"}}>
                     <SelectComponent dataSource={this.state.l2_list}
                          visible={this.state.l2_list!=''?"true":"false"}
                          title="二级父类"
                          init_value={this.state.l2_id}
                          select_value="goods_id"
                          show_value="goods_name"
                          onChange={(rowID)=>{
                              this.state.l2_id=this.state.l2_list[rowID].goods_id
                              console.log(this.state.l2_list[rowID].goods_id)
                              this.getThirdSorts(rowID)
                          }}>
                    </SelectComponent>
                </span>
                <span style={{float:"left"}}>
                     <SelectComponent dataSource={this.state.l3_list}
                         visible={this.state.l3_list!=''?"true":"false"}
                          title="三级父类"
                          init_value={this.state.l3_id}
                          select_value="goods_id"
                          show_value="goods_name"
                          onChange={(rowID)=>{
                              this.state.l3_id=this.state.l3_list[rowID].goods_id
                          }}>
                    </SelectComponent>
                </span>
           </div>
       )
     }
}
const styles = {
    input:{
        width:300,
        marginLeft:10,
        height:30,
        paddingLeft:10
    },
    font:{
        fontSize:15,
        width:100
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
    }
}
module.exports=GoodsClassEditorComponent;