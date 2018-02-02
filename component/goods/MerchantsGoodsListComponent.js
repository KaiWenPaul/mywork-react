/**
 * Created by shenjiabo on 16/8/17.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var ListView=require('./../../widget/ListView');
var BaseComponent=require('./../BaseComponent');

var TipComponent=require('./../../widget/TipComponent');
var PutExcelComponent=require('./PutExcelComponent');
var PutUpdateComponent = require('./PutUpdateComponent');

import 'react-date-picker/index.css'
import { DateField, Calendar } from 'react-date-picker'
var PageComponent=require("./../../widget/PageComponent");
var Toolbar=require("./../../widget/Toolbar");

var SearchBar=require("./../../widget/SearchBar");
var SelectComponent=require("./../../widget/SelectComponent");
var ButtonComponent=require("./../../widget/ButtonComponent");
var CheckComponent=require("./../../widget/CheckComponent");
var EditorComponent=require("./../../widget/EditorComponent");
var ListViewComponent=require("./../../widget/ListViewComponent");
var Widget=require("./../../widget/WidgetComponent");

class GoodsListComponent extends  BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var info = Widget.storage.get("merchantsAccountBean");
        this.state = {
            shopSelects:[{id:"0",name:"商品ID"},{id:"0",name:"商品名称"}],
            start_time:'',
            end_time:"",
            goodsBeans:[],
            merchantsBeans:[],
            allMerchantsBeans:[],
            selectBean:{},
            selectVisible:false,
            total:0,
            goods_index:0,
            page:storage.get("goods_page")?storage.get("goods_page"):1,
            merchants_name:"",
            // merchants_id:storage.get("goods_merchants_id")?storage.get("goods_merchants_id"):"",
            merchants_id:JSON.parse((info===null?"{}":info)).merchants_id,
            baseData:[],
            listStateBeans:[{id:"1",name:"上架中"},{id:"0",name:"已下架"},{id:"2",name:"全选"}],
            listAskPriceBeans:[{id:"2",name:"全选"},{id:"0",name:"不需询价"},{id:"1",name:"需询价"}],
            list_state:"1",
            listAskPrice:"2",
            // goods_id:storage.get("goods_goods_id")?storage.get("goods_goods_id"):"",
            // goods_name:storage.get("goods_goods_name")?storage.get("goods_goods_name"):"",
            // goods_sku:storage.get("goods_sku")?storage.get("goods_sku"):"",
            goods_id:"",
            goods_name:"",
            goods_sku:"",
            detailBean:{},
            allGoodsClassBeans:[],
            allBrandBeans:[],
            selectClassBean:{},
            selectBrandBean:{},
            goods_class_name:"",
            goods_now_price:"",
            goods_brand_name:"",
            putExcel:0
        };
    }

    componentDidMount() {
        this.getDataByPost(4,homeurl+"systemController.api?getSystemListShows",{list_type:'goods'});
        this.getDataByPost(1,homeurl+"merchantsController.api?getAllMerchantsNopage",{merchants_type:'2,4'});
        this.getDataByPost(6,homeurl+"systemController.api?getSystemDetailShows",{detail_type:'goods_list_detail'});
        this.getDataByPost(8,homeurl+"goodsController.api?getAllGoodsClassNoPage",{});
        if(this.state.merchants_id){
            this.getDataByPost(9,homeurl+"goodsController.api?getAllBrandByMerchantsId",{merchants_id:this.state.merchants_id})
        }
    }

    doSuccess(index,data){
        switch (index){
            case 9:
                this.setState({
                    allBrandBeans:data
                });
            case 6:
                this.setState({
                    // detailBean:JSON.parse(data)
                    detailBean:data
                })
                break;
            case 4:
                this.setState({
                    baseData:data
                })
                break;
            case 1:
                this.setState({
                    allMerchantsBeans:data
                })
                if(data.length>0) {
                    var d=data.filter(function(item){
                        return item["merchants_id"]+""===this.state.merchants_id+"";
                    }.bind(this))
                    if(d.length>0){
                        this.setState({
                            selectBean: d[0],
                            merchants_name:d[0].merchants_name,
                        })
                        this.getGoods(d[0].merchants_id,this.state.page)
                    }else{
                        if(company_name==='ssp'){
                            this.getGoods("",this.state.page)
                        }else{
                            this.setState({
                                selectBean: data[0],
                                merchants_name:data[0].merchants_name,
                            })
                            this.getGoods(data[0].merchants_id,this.state.page)
                        }
                    }
                }
                break;
            case 2:
                this.setState({
                    goodsBeans:data.data,
                    total:data.total
                })
                break;
            case 3:
                toast.show("删除成功");
                this.getGoods(this.state.selectBean.merchants_id,this.state.page);
                break;
            case 5:
                toast.show("下载中...");
                window.location.href=homeurl+data;
                break;
            case 7:
                this.showTip("删除成功");
                this.setState({
                    page:1
                })
                this.getGoods(this.state.selectBean.merchants_id,1);
                break;
            case 8:
                this.setState({
                    allGoodsClassBeans:data
                })
                break;
            case 9:
                this.showTip("修改成功");
                this.setState({
                    page:1
                })
                this.getGoods(this.state.selectBean.merchants_id,1);
                break;
        }
    }

    getGoods(merchants_id,page){
        storage.set("goods_page",page);
        storage.set("goods_merchants_id",merchants_id);
        storage.set("goods_start_time",this.state.start_time);
        storage.set("goods_end_time",this.state.end_time);
        storage.set("goods_goods_name",this.state.goods_name);
        storage.set("goods_goods_id",this.state.goods_id);
        storage.set("goods_sku",this.state.goods_sku);

        this.getDataByPost(2,homeurl+'goodsController.api?getAllGoodsDetail',
            {merchants_id:merchants_id,page:page,
                start_time:this.state.start_time,end_time:this.state.end_time,
                goods_id:this.isNull(this.state.goods_id)?"0":this.state.goods_id,
                goods_name:this.state.goods_name,
                goods_state:this.state.list_state==="2"?"":this.state.list_state,
                is_ask_price:this.state.listAskPrice==="2"?"":this.state.listAskPrice,
                goods_sku:this.state.goods_sku,
                parent_id:this.isNull(this.state.selectClassBean.goods_id)?"":this.state.selectClassBean.goods_id,layer:this.state.selectClassBean.layer,
                brand_id:this.isNull(this.state.selectBrandBean.brand_id)?"0":this.state.selectBrandBean.brand_id
            },{type:2});
    }

    exportGoodsExcel(merchants_id,page){
        this.getDataByPost(5,homeurl+'goodsController.api?exportGoodsExcel',
            {merchants_id:merchants_id,page:page,
                start_time:this.state.start_time,end_time:this.state.end_time,
                goods_id:this.isNull(this.state.goods_id)?"0":this.state.goods_id,goods_name:this.state.goods_name,
                parent_id:this.isNull(this.state.selectClassBean.goods_id)?"":this.state.selectClassBean.goods_id,
                goods_sku:this.state.goods_sku,
                goods_state:this.state.list_state==="2"?"":this.state.list_state,
                brand_id:this.isNull(this.state.selectBrandBean.brand_id)?"0":this.state.selectBrandBean.brand_id,
                is_ask_price:this.state.listAskPrice==="2"?"":this.state.listAskPrice});
    }
    deleteGoods(){
        this.setState({
            visible:false,
        })
        this.getDataByPost(3,homeurl+"goodsController.api?deleteGoodsDetail",
            {goods_id:this.state.goodsBeans[this.state.goods_index].goods_id})
    }

    deleteAllGoods(merchants_id){
        this.getDataByPost(7,homeurl+"goodsController.api?deleteAllGoods",
            {merchants_id:merchants_id,start_time:this.state.start_time,end_time:this.state.end_time,
                goods_id:this.isNull(this.state.goods_id)?"0":this.state.goods_id,goods_name:this.state.goods_name,
                goods_sku:this.state.goods_sku,brand_id:this.state.brand_id,
                goods_uuid:this.state.selectClassBean.goods_uuid})
    }

    updateAllGoodsPrice(merchants_id){
        if(isNaN(this.state.goods_now_price)){
            this.showTip("折扣非法");
            return;
        }
        this.getDataByPost(9,homeurl+"goodsController.api?updateAllGoodsPrice",
            {merchants_id:merchants_id,start_time:this.state.start_time,end_time:this.state.end_time,
                goods_id:this.isNull(this.state.goods_id)?"0":this.state.goods_id,goods_name:this.state.goods_name,
                goods_sku:this.state.goods_sku,brand_id:this.state.brand_id,
                goods_uuid:this.isNull(this.state.selectClassBean.goods_id)?"0":this.state.selectClassBean.goods_id,
                goods_now_price:this.state.goods_now_price
            })
    }
    render(){
        return(
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <Toolbar title="商品列表" history={this.props.history}></Toolbar>
               
                <div style={{display:'flex',alignItems:'center',marginTop:20}}>
                    {/*<div style={{width:100,display:'flex',justifyContent:'flex-end',}}>
                        <p1 style={styles.font}>商家名</p1>
                    </div>
                    <SearchBar
                        marginLeft={10}
                        item_name="merchants_name"
                        name={this.state.merchants_name}
                        dataSource={this.state.allMerchantsBeans}
                        onPress={(data,value)=>{
                            this.setState({
                                selectBean:data,
                                merchants_name:value,
                            })
                            //this.getGoods(this.state.data.merchants_id,1);
                        }}>
                    </SearchBar>*/}
                    <p1 style={{fontSize:13,marginLeft:10}}>添加时间</p1>
                    <DateField
                        style={{marginLeft:10}}
                        dateFormat="YYYY-MM-DD HH:mm:ss"
                        value={this.state.start_time}
                        onChange={(dateString, {dateMoment, timestamp })=>{
                                       this.setState({
                                           start_time:dateString,
                                       })
                                  }}/>
                    <p1 style={{fontSize:13,marginLeft:10}}>~</p1>
                    <DateField
                        style={{marginLeft:10}}
                        dateFormat="YYYY-MM-DD  HH:mm:ss"
                        value={this.state.end_time}
                        onChange={(dateString, { dateMoment, timestamp })=>{
                                   this.setState({
                                       end_time:dateString,
                                   })
                                }}/>
                    <ButtonComponent
                        marginLeft={10}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1,
                            })
                            this.getGoods(this.state.selectBean.merchants_id,1);
                        }}>
                    </ButtonComponent>
                    <Widget.Button
                        visible={this.state.detailBean.export}
                        marginLeft={10}
                        value="导出筛选列表"
                        onClick={()=>{
                            //this.exportGoodsExcel(this.state.merchants_id,1);
                            this.setState({
                                exportVisible:true
                            });
                        }}/>
                </div>
                <div style={{display:'flex',alignItems:'center',marginTop:20}}>
                    <EditorComponent
                        title='商品ID'
                        value={this.state.goods_id}
                        onChange={(value)=>{
                            this.setState({
                                goods_id:isNaN(value)?"":value
                            })
                        }}/>
                    <EditorComponent
                        visible={this.state.detailBean.goods_sku}
                        title='商品SKU'
                        value={this.state.goods_sku}
                        onChange={(value)=>{
                            this.setState({
                                goods_sku:value
                            })
                        }}/>
                    <EditorComponent
                        title='商品名'
                        value={this.state.goods_name}
                        onChange={(value)=>{
                            this.setState({
                                goods_name:value
                            })
                        }}/>
                </div>
                <div style={{display:'flex',alignItems:'center',marginTop:20}}>
                    <p1 style={{fontSize:13,marginLeft:55,marginRight:20}}>品牌名</p1>
                    <Widget.SearchBar
                        item_name="brand_name"
                        dataSource={this.state.allBrandBeans}
                        name={this.state.goods_brand_name}
                        onPress={(data,value)=>{
                            this.setState({
                                selectBrandBean:data,
                                goods_brand_name:value,
                            })
                        }}/>

                    <p1 style={{fontSize:13,marginLeft:20,marginRight:20}}>所属分类</p1>
                    <Widget.SearchBar
                        item_name="goods_name"
                        dataSource={this.state.allGoodsClassBeans}
                        name={this.state.goods_class_name}
                        onPress={(data,value)=>{
                            this.setState({
                                selectClassBean:data,
                                goods_class_name:value,
                            })
                        }}/>
                    <SelectComponent dataSource={this.state.listStateBeans}
                                     title="商品状态"
                                     init_value={this.state.list_state}
                                     select_value="id"
                                     show_value="name"
                                     onChange={(rowID)=>{
                                         this.state.list_state=this.state.listStateBeans[rowID].id
                                     }}>
                    </SelectComponent>
                    <SelectComponent dataSource={this.state.listAskPriceBeans}
                                     title="询价状态"
                                     init_value={this.state.listAskPrice}
                                     select_value="id"
                                     show_value="name"
                                     onChange={(rowID)=>{
                                         this.state.listAskPrice=this.state.listAskPriceBeans[rowID].id
                                     }}>
                    </SelectComponent>

                </div>
                <TipComponent visible={this.state.exportVisible} msg="确认导出？"
                              onClose={()=>{
                                  this.setState({
                                      exportVisible:false
                                  })
                              }}
                              onPress={()=>{
                                  this.exportGoodsExcel(this.state.merchants_id,this.state.page);
                                  this.setState({
                                      exportVisible:false
                                  })
                              }}/>
               <TipComponent visible={this.state.allVisible} msg="确定全部删除?"
                              onClose={()=>{
                                  this.setState({
                                      allVisible:false
                                  })
                              }}
                              onPress={()=>{
                                  this.setState({
                                      allVisible:false
                                  })
                                  this.deleteAllGoods(this.state.selectBean.merchants_id);
                              }}/>
                <TipComponent visible={this.state.visible} msg="确定删除?"
                              onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                              }}
                              onPress={()=>{
                                  this.deleteGoods();
                              }}/>
              
                 <PutExcelComponent visible={this.state.allVisible1} msg={this.state.putExcel===1?'导入新商品':'批量更新商品'}
                            onClose={()=>{
                                this.setState({
                                    allVisible1:false
                                })
                            }}
                            onPress={()=>{
                                this.setState({
                                    allVisible1:false
                                })
                    }}/>
                <PutUpdateComponent visible={this.state.allVisible2} msg={this.state.putExcel===1?'批量导入规格':'批量更新规格'}
                            onClose={()=>{
                                this.setState({
                                    allVisible2:false
                                })
                            }}
                            onPress={()=>{
                                this.setState({
                                    allVisible2:false
                                })
                    }}/>
            
                <TipComponent visible={this.state.updateVisible} msg="确定修改筛选出来的所有商品的价格?"
                              onClose={()=>{
                                  this.setState({
                                      updateVisible:false
                                  })
                              }}
                              onPress={()=>{
                                  this.updateAllGoodsPrice(this.state.selectBean.merchants_id);
                              }}/>

                <div style={{marginTop:20,display:'flex',justifyContent:'flex-end',flex:1,alignItems:'center'}}>
                    <Widget.Button
                        marginRight={20}
                        value="批量上传商品"
                        onClick={()=>{
                            this.setState({
                                allVisible1:true,
                                putExcel:1
                            })
                        }}/>
                        
                     <Widget.Button
                        marginRight={20}
                        value="批量更新商品"
                        onClick={()=>{
                            this.setState({
                                allVisible1:true,
                                putExcel:2
                            })
                        }}/>
  
                       {/*<Widget.Button
                        marginRight={20}
                        value="批量上传规格"
                        onClick={()=>{
                            this.setState({
                                allVisible2:true,
                                putExcel:1
                            })
                        }}/>
                        
                     <Widget.Button
                        marginRight={20}
                        value="批量更新规格"
                        onClick={()=>{
                            this.setState({
                                allVisible2:true,
                                putExcel:2
                            })
                        }}/>*/}
                    <Widget.ImgButton
                        visible={this.state.detailBean.laodimg}
                        marginRight={20}
                        value="批量导入图片"
                        action={homeurl+"goodsController.api?uploadGoodsImgs"}
                        onSuccess={(data)=>{
                            toast.show("操作成功");
                        }}/>
                    <Widget.Button
                        marginRight={20}
                        visible={company_name==='hbr'||this.state.selectBean.merchants_id?"true":'false'}
                        value="添加商品"
                        onClick={()=>{this.props.history.push((company_name==='hbr'?"/hbr_goods_editor/":"/goods_editor/")+
                            encodeURIComponent(JSON.stringify({merchants_id:this.state.selectBean.merchants_id})));
                        }}/>
                    <Widget.Button
                        visible={this.state.detailBean.down}
                        marginRight={20}
                        value="下载模板"
                        onClick={()=>{
                            window.open(imgurl+"/excel/merchants_templete.xlsx");
                        }}/>

                </div>
                <div style={{marginTop:20,display:'flex',justifyContent:'flex-end',flex:1,alignItems:'center'}}>
                    {/*<Widget.ImgButton
                        visible={this.state.detailBean.load}
                        marginRight={20}
                        value="导入货号列表查询"
                        action={homeurl+"goodsController.api?exportGoodsExcelByLoadSkuExcel"}
                        onSuccess={(data)=>{
                            window.open(homeurl+data.data);
                        }}/>*/}
                    {/*<Widget.Button
                        marginRight={20}
                        visible={company_name==='hbr'||this.state.selectBean.merchants_id?"true":'false'}
                        value="添加商品"
                        onClick={()=>{this.props.history.push((company_name==='hbr'?"/hbr_goods_editor/":"/goods_editor/")+
                            encodeURIComponent(JSON.stringify({merchants_id:this.state.selectBean.merchants_id})));
                        }}/>*/}
                </div>
                <ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.goodsBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID)=>{
                        return(
                            <div style={{display:'flex',flex:1}}>
                                <div style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <Link to={("/goods_editor/")+encodeURIComponent(JSON.stringify(this.state.goodsBeans[rowID]))}
                                            style={{textDecoration:'none'}}>
                                        <p1 style={styles.tabP1}>[编辑]</p1>
                                    </Link>
                                </div>
                                <div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'center'}}
                                            onClick={()=>{
                                            this.setState({
                                                visible:true,
                                                goods_index:rowID
                                            })
                                            }}>
                                    <p1 style={{ fontSize:13,color:'blue'}}>[删除]</p1>
                                </div>
                            </div>
                        )
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        });
                        this.getGoods(this.state.selectBean.merchants_id,page)
                    }}/>
            </div>
        )
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
        fontSize:13,
        wordBreak:'break-all'
    },
    tab:{
        display:'flex',
        height:30,
        alignItems:'center',
    },
    tabTitle:{
        width:100,
        display:'flex',
        justifyContent:'flex-end',
    },
    input:{
        width:200,
        marginLeft:10,
        height:30,
        paddingLeft:10
    },
    font:{
        fontSize:13,
    },
};
module.exports=GoodsListComponent;
