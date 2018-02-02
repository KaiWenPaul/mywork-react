/**
 * Created by shenjiabo on 16/8/17.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var Widget=require("./../../widget/WidgetComponent");

class GoodsRecommendComponent extends  Widget.BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        let goodsBean = JSON.parse(decodeURIComponent(this.props.params.goodsBean));
        this.state = {
            goodsBean:goodsBean,
            goodsBeans:[],
            page:1,
            total:0,
            goods_index:0,
            is_show:false,
        };
    }

    componentDidMount() {
        this.getDataByPost(3,homeurl+"systemController.api?getSystemListShows",{list_type:'goods'});
        this.getGoods(this.state.page)
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    goodsBeans:data.data,
                    total:data.total,
                    new_goods_id:"",
                    new_goods:null
                })
                break;
            case 2:
                toast.show("移除成功");
                this.getGoods(this.state.page);
                break;
            case 3:
                this.setState({
                    baseData:data
                })
                break;
            case 4:
                this.setState({
                    new_goods:data
                })
                break;
            case 5:
                toast.show("添加成功");
                this.getGoods(this.state.page);
                break;
        }
    }

    getGoods(page){
        this.getDataByPost(1,homeurl+'goodsController.api?getAllGoodsDetailInDB',
            {page:page,is_recommend:"1",goods_uuid:this.state.goodsBean.goods_id,sort:"bidding_price"},{type:2});
    }

    removeFromRecommendList(){
        this.setState({
            visible:false,
        })
        this.getDataByPost(2,homeurl+'goodsController.api?updateGoodsRecommend',{is_recommend:0,goods_id:this.state.goodsBeans[this.state.goods_index].goods_id})
    }
    findGoods(value){
        this.getDataByPost(4,homeurl+'goodsController.api?getOneGoodsDetail',
            {goods_uuid:this.state.goodsBean.goods_id,goods_id:value});
    }
    updateGoodsRecommend(flag, goodsBean, show) {
        if (show) {
            this.setState({
                visible: false,
            });
        }
        if(goodsBean==null){
            toast.show("必须要输入goods_id");
            return;
        }
        this.getDataByPost(5, homeurl + "goodsController.api?updateGoodsRecommend", {
            is_recommend: flag,
            goods_id: goodsBean.goods_id
        });
    }
    render(){
        return(
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={this.state.goodsBean.goods_name} history={this.props.history}></Widget.Toolbar>
                <Widget.Tip visible={this.state.visible} msg="确定从推荐商品中移除吗?"
                              onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                              }}
                              onPress={()=>{
                                  this.removeFromRecommendList();
                              }}/>
                <div style={{display: 'flex', marginTop: 20}}>
                    <Widget.EditorComponent
                        title="商品ID"
                        value={this.state.new_goods_id}
                        onChange={(value)=>{
                            this.setState({
                                new_goods_id:value
                            });
                            this.findGoods(value);
                        }}>
                    </Widget.EditorComponent>
                    <Widget.TextComponent title="商品名" visible={(this.state.new_goods==null||this.state.new_goods.goods_id==null)?"false":"true"}
                                          value={this.state.new_goods==null?"":this.state.new_goods.goods_name}> </Widget.TextComponent>
                    <Widget.TextComponent title="商品SKU" visible={(this.state.new_goods==null||this.state.new_goods.goods_id==null)?"false":"true"}
                                          value={this.state.new_goods==null?"":this.state.new_goods.goods_sku}> </Widget.TextComponent>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={() => {
                            this.updateGoodsRecommend(1, this.state.new_goods);
                        }}/>
                </div>
                <Widget.ListViewComponent
                    data={this.state.baseData}
                    dataSource={this.state.goodsBeans}
                    page={this.state.page}
                    total={this.state.total}
                    operationData={[{title:"编辑",type:1},{title:"从列表移除",type:2}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_editor/"+encodeURIComponent(JSON.stringify(this.state.goodsBeans[rowID])));
                            break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    goods_index:rowID
                                });
                            break;
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        });
                        this.getGoods(page)
                    }}/>

            </div>
        )
    }
}

module.exports=GoodsRecommendComponent;
