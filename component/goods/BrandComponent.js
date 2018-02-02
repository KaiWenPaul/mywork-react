/**
 * Created by shenjiabo on 16/8/17.
 */
import React,{Component} from 'react'

import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';

var Widget=require("./../../widget/WidgetComponent");
var ButtonComponent =require("./../../widget/ButtonComponent");
class BrandComponent extends Widget.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            brandBeans:[],
            visible:false,
            brand_index:1,
            baseData:[],
            detailBean:{},
            is_delete_showArr:["已下架","上架中"],
            page:1,
            total:0,
            selectBrandBean:{},
            selectBrandBeans:[],
            goods_brand_name:"",
            goods_brand_id:"",
            flag:true,
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'-2'},
                {name:"品牌ID",flex:1,key:'brand_id'},
                {name:"品牌名称",flex:1,key:'brand_name'},
                {name:"图标",flex:1,key:"brand_img",type:'img'},
                {name:"是否下架",flex:1,key:"brand_state_show"},
                {name:"权重",flex:1,key:'sort'},
                {name:"操作",flex:1.5,key:"-1"}
            ]
        })
        this.getBrands(1);
    }

    getBrands(page){
        this.searchBrand(page);
        this.getDataByPost(3,homeurl+"systemController.api?getSystemDetailShows",{detail_type:'brand_list_detail'});
    }
    searchBrand(page){
        this.getDataByPost(1,homeurl+"goodsController.api?getAllBrandsPage",
            {page:page,brand_id:this.isNull(this.state.goods_brand_id)?"0":this.state.goods_brand_id,brand_name:this.state.goods_brand_name},{type:2})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                let brandBeans = data.data;
                console.log(data)
                for(let index in brandBeans){
                    let brandBean = brandBeans[index];
                    brandBean.brand_state_show=brandBean.brand_state==="1"?"上架中":"已下架";
                }
                if(this.state.flag){
                    this.setState({
                        brandBeans:brandBeans,
                        total:data.total,
                        selectBrandBeans:brandBeans,
                        flag:false
                    });
                }else{
                    this.setState({
                        brandBeans:brandBeans,
                        total:data.total,
                    });
                }
                break;
            case 2:
                toast.show("删除成功");
                this.getBrands(this.state.page);
                break;
            case 3:
                this.setState({
                    detailBean:JSON.parse(data)
                })
                break;
        }
    }

    deleteBrand(){
        this.setState({
            visible:false,
        })
        this.getDataByPost(2,homeurl+"goodsController.api?deleteBrand",
            {brand_id:this.state.brandBeans[this.state.brand_index].brand_id});
    }
    deployBrand(){
        this.setState({
            visible1:false,
        })
        this.getDataByPost(2,homeurl+"goodsController.api?deployBrand",
            {brand_id:this.state.brandBeans[this.state.brand_index].brand_id});
    }


    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
               
                <Widget.Toolbar title="品牌管理" history={this.props.history}></Widget.Toolbar>
                <div style={{marginTop:20,display:'flex',flex:1,alignItems:'center'}}>
                <p1 style={{fontSize:13,marginLeft:55,marginRight:20}}>品牌名</p1>
                    <Widget.SearchBar
                        item_name="brand_name"
                        dataSource={this.state.selectBrandBeans}
                        name={this.state.goods_brand_name}
                        onPress={(data,value)=>{
                            this.setState({
                                selectBrandBean:data,
                                goods_brand_name:value,
                            })
                        }}/>
                    <Widget.EditorComponent
                        title='品牌ID'
                        value={this.state.goods_brand_id}
                        onChange={(value)=>{
                            this.setState({
                                goods_brand_id:value
                            })
                        }}/>
                    <ButtonComponent
                        marginLeft={10}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1,
                            })
                            this.searchBrand(this.state.page);
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
                                  this.deleteBrand();
                              }}></Widget.Tip>
                <Widget.Tip visible={this.state.visible1} msg="确定下架该品牌?"
                            onClose={()=>{
                                this.setState({
                                    visible1:false
                                })
                            }}
                            onPress={()=>{
                                this.deployBrand();
                            }}></Widget.Tip>
                            
                <div style={{marginTop:20,display:'flex',justifyContent:'flex-end',flex:1,alignItems:'center'}}>
                    <Widget.ImgButton
                        visible={this.state.detailBean.load}
                        marginRight={20}
                        value="批量导入"
                        action={homeurl+"goodsController.api?loadBrandExcel"}
                        onSuccess={(data)=>{
                             toast.show("操作成功");
                             this.setState({
                                page:1
                             })
                             this.getBrands(this.state.page);
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
                            window.open(imgurl+"/excel/brand.xlsx");
                        }}/>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/brand_editor/"+encodeURIComponent(JSON.stringify({})))
                        }}/>
                </div>
                <Widget.ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.brandBeans}
                    page={this.state.page}
                    total={this.state.total}
                    operationData={[{title:"编辑",type:1},{title:"网页编辑",type:2},{title:"删除",type:1}]}
                    checked={this.state.checked}
                    onChecked={(i,checked)=>{
                        if(i===-1){
                            for(let j=0;j<this.state.brandBeans.length;j++){
                                this.state.brandBeans[j].is_select=checked;
                            }
                            this.setState({
                                checked:checked
                            })
                        }else{
                            this.state.brandBeans[i].is_select=checked;
                            this.setState({
                                brandBeans:this.state.brandBeans,
                                checked:checked==="0"?checked:this.state.checked,
                            });
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        });
                        this.getBrands(page)
                    }}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/brand_editor/"+encodeURIComponent(JSON.stringify(this.state.brandBeans[rowID])));
                            break
                            case 1:
                                this.props.history.push("/brand_detail_editor/"+encodeURIComponent(this.state.brandBeans[rowID].brand_url));
                            break;
                           /* case 2:
                                this.setState({
                                    visible1:true,
                                    brand_index:rowID
                                })
                                break;*/
                            case 2:
                                this.setState({
                                    visible:true,
                                    brand_index:rowID
                                })
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

module.exports=BrandComponent;
