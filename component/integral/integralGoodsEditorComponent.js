/**
 * Created by shenjiabo on 16/12/29.
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
var Widget = require('./../../widget/WidgetComponent');
var EditorComponent = require("./../../widget/EditorComponent");
var ImgComponent = require("./../../widget/ImgComponent");

class integralGoodsEditorComponent extends Widget.BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var goodsBean = JSON.parse(this.props.params.goodsBean);
        this.state = {
            goods_no: goodsBean.goods_no,
            // goods_id: goodsBean.goods_id,
            goodsBean: {},
            goods_index:-1,//记录选中的商品的下标
            parameterBeans: [],
            goods_parameters: [],
            goodsBeans: [],

            detailBean:{},
            storehouseBeans:[],
            brandBeans:[],
            goodsStateBeans:[{id:'0',name:'下架中'},{id:'1',name:'上架中'}],

            goods_id:goodsBean.goods_id ? goodsBean.goods_id : "",
            goods_name:goodsBean.goods_name ? goodsBean.goods_name : "",
            goods_url:goodsBean.goods_url ? goodsBean.goods_url : "",
            goods_img:goodsBean.goods_img ? goodsBean.goods_img : "",
            integral_num:goodsBean.integral_num ? goodsBean.integral_num : "",
            goods_src:goodsBean.goods_src ? goodsBean.goods_src : "",
            brand_id:goodsBean.brand_id ? goodsBean.brand_id : "",
            class_id:goodsBean.class_id ? goodsBean.class_id : "",
            goods_state:goodsBean.goods_state ? goodsBean.goods_state : "",
            year_sales:goodsBean.year_sales ? goodsBean.year_sales : "",
            month_sales:goodsBean.month_sales ? goodsBean.month_sales : "",
            day_sales:goodsBean.day_sales ? goodsBean.day_sales : "",
            sort:goodsBean.sort ? goodsBean.sort : "1",
            goods_sku:goodsBean.goods_sku ? goodsBean.goods_sku : "",

        };
    }

    componentDidMount() {
        console.log(this.state.goodsBean)
    }
    
    insertGoodsDetail() {
      
        // if(this.isNull(this.state.goodsBean.goods_name)){
        //     this.showTip("名称不可为空");
        //     return;
        // }

        // if(isNaN(this.state.goodsBean.goods_origin_price)){
        //     this.showTip("原价非法");
        //     return;
        // }

        // if(isNaN(this.state.goodsBean.goods_now_price)){
        //     this.showTip("现价非法");
        //     return;
        // }

        // if(isNaN(this.state.goodsBean.goods_pc_price)){
        //     this.showTip("PC价非法");
        //     return;
        // }

        // if(isNaN(this.state.goodsBean.express_price)){
        //     this.showTip("邮费非法");
        //     return;
        // }

        // if(isNaN(this.state.goodsBean.year_sales)){
        //     this.showTip("总销量非法");
        //     return;
        // }
        // if(isNaN(this.state.goodsBean.month_sales)){
        //     this.showTip("月销量非法");
        //     return;
        // }
        // if(isNaN(this.state.goodsBean.day_sales)){
        //     this.showTip("日销量非法");
        //     return;
        // }
        // if(isNaN(this.state.goodsBean.goods_stock)){
        //     this.showTip("库存非法");
        //     return;
        // }

        // if(isNaN(this.state.goodsBean.give_integral_value)){
        //     this.showTip("赠送积分非法");
        //     return;
        // }


        if (!this.state.goods_id) {
            this.getDataByPost(4, homeurl + "intergralController.api?saveIntegralGoods", {
                goods_id:this.state.goods_id,
                goods_name:this.state.goods_name,
                goods_url:this.state.goods_url,
                goods_img:this.state.goods_img,
                integral_num:this.state.integral_num,
                goods_src:this.state.goods_src,
                brand_id:this.state.brand_id,
                class_id:this.state.class_id,
                goods_state:this.state.goods_state,
                action_token:'c',
                year_sales:this.state.year_sales,
                month_sales:this.state.month_sales,
                day_sales:this.state.day_sales,
                sort:this.state.sort,
                goods_sku:this.state.goods_sku
                
            });
        } else {
            this.getDataByPost(5, homeurl + "intergralController.api?saveIntegralGoods", {
                goods_id:this.state.goods_id,
                goods_name:this.state.goods_name,
                goods_url:this.state.goods_url,
                goods_img:this.state.goods_img,
                integral_num:this.state.integral_num,
                goods_src:this.state.goods_src,
                brand_id:this.state.brand_id,
                class_id:this.state.class_id,
                goods_state:this.state.goods_state,
                action_token:'u',
                year_sales:this.state.year_sales,
                month_sales:this.state.month_sales,
                day_sales:this.state.day_sales,
                sort:this.state.sort,
                goods_sku:this.state.goods_sku
            });
        }
    }


    doSuccess(index, data) {
        switch (index) {
            case 9:
                this.setState({
                    storehouseBeans:data
                })
                break;
            case 8:
                this.setState({
                    brandBeans:data
                })
                break;
            case 7:
                this.setState({
                    detailBean:JSON.parse(data)
                })
                break;
            case 6:
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
                    }else{
                        this.setState({
                            selectBean: data[0],
                            merchants_name:data[0].merchants_name,
                        })
                    }
                }
                break;
            case 5:
                this.showTip("修改成功");
                this.state.goodsBeans.splice(this.state.goods_index,1,data);
                this.setState({
                    goodsBeans:this.state.goodsBeans,
                })
                
                break;
            case 4:
                this.showTip("添加成功");
                this.setState({
                    goodsBeans:this.state.goodsBeans.concat([data]),
                    goodsBean:data,
                })
               
                break;
            case 3:
                console.log(JSON.stringify(data))
                if (data != null && data.length > 0) {
                    let is_hava = "0";
                    let goodsBean = {};
                    let goods_parameters = [];
                    let goods_index=-1;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].goods_id === this.state.goods_id) {
                            goods_index=i;
                            is_hava = "1";
                            goodsBean = data[i];
                            goods_parameters = data[i].goods_parameters.split(',')
                            break;
                        }
                    }

                    if (is_hava === '0') {
                        goods_index=0;
                        goodsBean = data[0];
                        goods_parameters = data[0].goods_parameters.split(',')
                    }

                    this.setState({
                        goods_index:goods_index,
                        goodsBeans: data,
                        goodsBean: goodsBean,
                        goods_parameters: goods_parameters
                    })
                } else {
                    this.setState({
                        goods_index:-1,
                        goodsBeans: data
                    })
                }
                this.getParameters(this.state.goods_no);
                break;
            case 2:
                if (data != null) {
                    for (let i = 0; i < data.length; i++) {
                        let goodsParameterBeans = data[i].goodsParameterBeans;
                        if (goodsParameterBeans != null && goodsParameterBeans.length > 0) {
                            var is_hava = '0';
                            for (let j = 0; j < goodsParameterBeans.length; j++) {
                                for (let h = 0; h < this.state.goods_parameters.length; h++) {
                                    if (goodsParameterBeans[j].parameter_id + "" === this.state.goods_parameters[h]) {
                                        is_hava = "1";
                                        data[i].goodsParameterBeans[j].is_select = '1';
                                        break;
                                    }
                                }
                            }

                            if (is_hava === '0') {
                                data[i].goodsParameterBeans[0].is_select = '1';
                            }
                        }
                    }
                }
                this.setState({
                    parameterBeans: data
                })
                break;
            case 1:
                this.showTip("保存成功");
                this.setState({
                    goods_no: data,
                });
                break;

        }
    }

    render() {
        return (
            <div>
                <Widget.Button value="保存"
                               width={80}
                               marginLeft={100}
                               marginTop={20}
                               onClick={()=>{
                                    this.insertGoodsDetail();
                                 }}/>
                <div style={styles.div}>

                <EditorComponent
                    marginTop={20}
                    title="商品名称"
                    value={this.state.goods_name}
                    onChange={(value) => {
                        this.setState({
                            goods_name: value
                        })
                    }}/>
                <ImgComponent
                    marginTop={20}
                    title="移动端图片"
                    src={this.state.goods_img === '' ? "./images/add.jpg" : imgurl + this.state.goods_img}
                    url={homeurl + 'bannerController.api?uploadBannerImg'}
                    onSuccess={(data) => {
                        this.setState({
                            goods_img: data,
                        })
                    }}/>
                </div>
                <div style={styles.div}>
                   <EditorComponent
                    marginTop={20}
                    title="积分值"
                    value={this.state.integral_num}
                    onChange={(value) => {
                        this.setState({
                            integral_num: value
                        })
                    }}/>
                </div>
                <div style={styles.div}>
                  <EditorComponent
                    marginTop={20}
                    title="商品来源"
                    value={this.state.goods_src}
                    onChange={(value) => {
                        this.setState({
                            goods_src: value
                        })
                    }}/>
                </div>     
                <div style={styles.div}>
                    <EditorComponent
                    marginTop={20}
                    title="总销量"
                    value={this.state.year_sales}
                    onChange={(value) => {
                        this.setState({
                            year_sales: value
                        })
                    }}/>
                    <EditorComponent
                    marginTop={20}
                    title="月销量"
                    value={this.state.month_sales}
                    onChange={(value) => {
                        this.setState({
                            month_sales: value
                        })
                    }}/>
                    <EditorComponent
                    marginTop={20}
                    title="日销量"
                    value={this.state.day_sales}
                    onChange={(value) => {
                        this.setState({
                            day_sales: value
                        })
                    }}/>
                </div>
                <div style={styles.div}>
                  <EditorComponent
                    marginTop={20}
                    title="权重"
                    value={this.state.sort}
                    onChange={(value) => {
                        this.setState({
                            sort: value
                        })
                    }}/>
                </div>    
                <div style={{display:'flex',marginTop:20}}>
                    {this.renderGoodsState()}
                 </div> 
            </div>
        
        )
    }

    renderGoodsState(){
        return(
            <Widget.SelectV2 dataSource={this.state.goodsStateBeans}
                             title="商品状态"
                             init_value={this.state.goods_state}
                             select_value="id"
                             show_value="name"
                             onChange={(rowID)=>{
                                this.state.goodsBean.goods_state=this.state.goodsStateBeans[rowID].id;
                                this.setState({
                                    goods_state:this.state.goodsStateBeans[rowID].id
                                })
                             }}/>
        )
    }
}

const styles = {
    div: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center'
    },
}
module.exports = integralGoodsEditorComponent;