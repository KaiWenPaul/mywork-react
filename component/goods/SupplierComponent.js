/**
 * Created by shenjiabo on 16/8/17.
 */
import React,{Component} from 'react'

import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var ListViewComponent=require("./../../widget/ListViewComponent");
var TipComponent=require('./../../widget/TipComponent');
var Widget=require("./../../widget/WidgetComponent");
var ButtonComponent =require("./../../widget/ButtonComponent");
class BrandComponent extends Widget.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible:false,
            brand_index:1,
            baseData:[],
            detailBean:{},
            page:1,
            total:0,
            selectBrandBean:{},
            selectVendorsGoodBeans:[],
            goods_brand_name:"",
            goods_brand_id:"",
            flag:true,
            goods_id:'',
            vendors_code:'',
            vendors_id:'',
            VendorsGoodBeans:[],

        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"批次",flex:1,key:'batch_id'},
                {name:"供货商ID",flex:1,key:'vendors_id'},
                {name:"商品ID",flex:1,key:"goods_id"},
                {name:"PC端现价",flex:1,key:'goods_pc_price'},
                {name:"移动端现价",flex:1,key:"goods_now_price"},
                {name:"规格ID",flex:1,key:'parameter_id'},
                {name:"PC端规格溢价现价",flex:1,key:'parameter_pc_price'},
                {name:"移动端规格溢价现价",flex:1,key:'parameter_price'},
                {name:"创建时间",flex:1,key:'create_time'},
                {name:"操作",flex:1.5,key:"-1"}
            ]
        })
        this.getVendorsGoods(1);
    }

    getVendorsGoods(page){
        this.getDataByPost(1,homeurl+"goodsController.api?getVendorsGoods",
            {page:page,goods_id:this.state.goods_id,vendors_code:this.state.vendors_code,vendors_id:this.state.vendors_id},{type:2});
    }
    deleteVendorsGoods(arr){
        this.setState({
                    visible:false
            });
         this.getDataByPost(2,homeurl+"goodsController.api?updateVendorsGoods",
                {
                    batch_id:this.state.VendorsGoodBeans[this.state.brand_index].batch_id,
                    vendors_id:'',
                    goods_id:'',
                    goods_now_price:'',
                    goods_pc_price:'',
                    parameter_id:'',
                    parameter_price:'',
                    parameter_pc_price:'',
                    parameter_origin_price:'',
                    create_time:'',  
                    is_delete:arr
                });
         this.getVendorsGoods(1);
    }
    exportVendorsGoods(page){
        this.getDataByPost(3,homeurl+"goodsController.api?exportVendorsGoods",
            {page:page,goods_id:this.state.goods_id,vendors_code:this.state.vendors_code,vendors_id:this.state.vendors_id});
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                    this.setState({
                        VendorsGoodBeans:data.data,
                        total:data.total,
                    });
                    console.log(data)
                break;
            case 2:
                toast.show("删除成功");
                break;
            case 3:
                toast.show("导出成功");
                window.open(homeurl+data);
                break;
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
               
                <Widget.Toolbar title="商品供货管理" history={this.props.history}></Widget.Toolbar>
                <div style={{marginTop:20,display:'flex',flex:1,alignItems:'center'}}>
                <Widget.EditorComponent
                        title='供应商ID'
                        value={this.state.vendors_id}
                        onChange={(value)=>{
                            this.setState({
                                vendors_id:value
                            })
                        }}/>
                <Widget.EditorComponent
                        title='供应商代号'
                        value={this.state.vendors_code}
                        onChange={(value)=>{
                            this.setState({
                                vendors_code:value
                            })
                        }}/>
                <Widget.EditorComponent
                        title='商品ID'
                        value={this.state.goods_id}
                        onChange={(value)=>{
                            this.setState({
                                goods_id:value
                            })
                        }}/>
                    <ButtonComponent
                        marginLeft={10}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1,
                            })
                            this.getVendorsGoods(this.state.page);
                        }}>
                    </ButtonComponent>
                </div>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                              onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                              }}
                              onPress={()=>{
                                  this.deleteVendorsGoods(1)
                              }}></Widget.Tip>
                <TipComponent visible={this.state.exportVisible} msg="确认导出？"
                              onClose={()=>{
                                  this.setState({
                                      exportVisible:false
                                  })
                              }}
                              onPress={()=>{
                                  this.exportVendorsGoods(this.state.page);
                                  this.setState({
                                      exportVisible:false
                                  })
                              }}/>
                            
                <div style={{marginTop:20,display:'flex',justifyContent:'flex-end',flex:1,alignItems:'center'}}>
                    <Widget.Button
                        visible={this.state.detailBean.export}
                        marginRight={20}
                        value="导出筛选列表"
                        onClick={()=>{
                            //this.exportGoodsExcel(this.state.merchants_id,1);
                            this.setState({
                                exportVisible:true
                            });
                        }}/>
                    {/*<Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/brand_editor/"+encodeURIComponent(JSON.stringify({})))
                        }}/>*/}
                </div>
                {/*<Widget.ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.VendorsGoodBeans}
                    page={this.state.page}
                    total={this.state.total}
                    operationData={[{title:"编辑",type:1},{title:"删除",type:1}]}
                    checked={this.state.checked}
                    onChecked={(i,checked)=>{
                        if(i===-1){
                            for(let j=0;j<this.state.VendorsGoodBeans.length;j++){
                                this.state.VendorsGoodBeans[j].is_select=checked;
                            }
                            this.setState({
                                checked:checked
                            })
                        }else{
                            this.state.VendorsGoodBeans[i].is_select=checked;
                            this.setState({
                                VendorsGoodBeans:this.state.VendorsGoodBeans,
                                checked:checked==="0"?checked:this.state.checked,
                            });
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        });
                        this.getVendorsGoods(page)
                    }}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/supplier_detail/"+encodeURIComponent(JSON.stringify(this.state.VendorsGoodBeans[rowID])));
                            break
                            case 1:
                                this.setState({
                                    visible:true,
                                    brand_index:rowID
                                })
                            break;
                        }
                    }}/>*/}


                <ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.VendorsGoodBeans}
                    page={this.state.page}
                    total={this.state.total}
                    renderOperation={(rowID)=>{
                        return(
                            <div style={{display:'flex',flex:1}}>
                                <div style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <Link to={("/supplier_detail/")+encodeURIComponent(JSON.stringify(this.state.VendorsGoodBeans[rowID]))}
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
                    this.getVendorsGoods(page)
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

module.exports=BrandComponent;
