import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var ListView=require('./widget/ListView');
var BaseComponent=require('./Component/BaseComponent');
var LoginComponent=require('./component/LoginComponent');
var MainComponent=require('./component/MainComponent');


/**
 * 权限管理
 * @type {SystemMoudleComponent}
 */
var SystemMoudleComponent=require('./component/system/MoudleComponent');
var SystemMoudleComponent1=require('./component/system/MoudleComponent');
var SystemRoleComponent=require('./component/system/RoleComponent');
var SystemMoudle2Component=require('./component/system/Moudle2Component');
var MoudleEditorComponent=require('./component/system/MoudleEditorComponent');
var RoleEditorComponent=require('./component/system/RoleEditorComponent');
var AuthorityComponent=require('./component/system/AuthorityComponent');
var AuthorityEditorComponent=require('./component/system/AuthorityEditorComponent');
var MerchantsComponent=require('./component/system/MerchantsComponent');
var MerchantsEditorComponent=require('./component/system/MerchantsEditorComponent');
var MerchantsEditorPasswrod=require('./component/system/MerchantsEditorPasswrod');

var UserDetailComponent=require('./component/UserDetailComponent');
var ListShowComponent=require('./component/system/ListShowComponent');
var ListTypeComponent=require('./component/system/ListTypeComponent');
var ListTypeEditorComponent=require('./component/system/ListTypeEditorComponent');
var ListShowEditorComponent=require('./component/system/ListShowEditorComponent');

var DetailShowComponent=require('./component/system/DetailShowComponent');
var DetailShowEditorComponent=require('./component/system/DetailShowEditorComponent');
/**
 * 用户管理
 */
var UserMerchantsComponent=require('./component/user/MerchantsComponent');
var UserSuppliersEditorComponent=require('./component/user/SuppliersEditorComponent');
var UserMerchantsEditorComponent=require('./component/user/MerchantsEditorComponent');
var BusinessComponent=require('./component/user/BusinessComponent');
var BusinessEditorComponent=require('./component/user/BusinessEditorComponent');
var BusinessGoodsComponent=require('./component/user/BusinessGoodsComponent');
var MemberComponent=require('./component/user/MemberComponent');
var MemberDetailComponent=require('./component/user/MemberDetailComponent');

var MemberShopCarGoodsComponent=require('./component/user/MemberShopCarGoodsComponent');
var MerchantsLabelComponent=require('./component/user/MerchantsLabelComponent');
var MerchantsLabelEditorComponent=require('./component/user/MerchantsLabelEditorComponent');
var MerchantsQualificationComponent=require('./component/user/MerchantsQualificationComponent');
var MerchantsQualificationEditorComponent=require('./component/user/MerchantsQualificationEditorComponent');
var MerchantsLabelQualicationComponent=require('./component/user/MerchantsLabelQualicationComponent');
var MerchantsAccoutEditorComponent=require('./component/user/MerchantsAccoutEditorComponent');

/**
 * 商品管理
 */
var MerchantsGoodsListComponent=require('./component/goods/MerchantsGoodsListComponent');
var MerchantsGoodsEditorComponent=require('./component/goods/MerchantsGoodsEditorComponent');//商家端商品编辑
var HBRGoodsEditorComponent=require('./component/goods/HBRGoodsEditorComponent');//何柏瑞商品管理

var GoodsListComponent=require('./component/goods/GoodsListComponent');
var GoodsRecommendComponent=require('./component/goods/GoodsRecommendComponent');
var RecommendGoodsClass1Component=require('./component/goods/RecommendGoodsClass1Component');
var RecommendGoodsClass2Component=require('./component/goods/RecommendGoodsClass2Component');

var GoodsEditorComponent=require('./component/goods/GoodsEditorComponent');
var GoodsClassComponent=require('./component/goods/GoodsClassComponent');
var GoodsClass1Component=require('./component/goods/GoodsClass1Component');
var GoodsClass2Component=require('./component/goods/GoodsClass2Component');
var GoodsClass3Component=require('./component/goods/GoodsClass3Component');

var GoodsClass12Component=require('./component/goods/GoodsClass12Component');

var GoodsClassEditorComponent=require('./component/goods/GoodsClassEditorComponent');

var BrandComponent=require('./component/goods/BrandComponent');
var BrandEditorComponent=require('./component/goods/BrandEditorComponent');
var BrandDetailEditorComponent=require('./component/goods/BrandDetailEditorComponent');

// 供应商管理
var SupplierComponent=require('./component/goods/SupplierComponent');
var SupplierEditorComponent=require('./component/goods/SupplierEditorComponent');

var ParameterComponent=require('./component/goods/ParameterComponent');
var ParameterEditorComponent=require('./component/goods/ParameterEditorComponent');
var ServiceComponent=require('./component/goods/ServiceComponent');
var ServiceEditorComponent=require('./component/goods/ServiceEditorComponent');


var GoodsLabelComponent=require('./component/goods/GoodsLabelComponent');
var GoodsLabelEditorComponent=require('./component/goods/GoodsLabelEditorComponent');
var StandardEditorComponent=require('./component/goods/StandardEditorComponent');
var GroupBuyEditorComponent=require('./component/goods/GroupBuyEditorComponent');

var RecipeComponent=require('./component/goods/RecipeComponent');
var RecipeDetailComponent=require('./component/goods/RecipeDetailComponent');
var RecipeFoodsEditorComponent=require('./component/goods/RecipeFoodsEditorComponent');
var RecipeClassComponent=require('./component/goods/RecipeClassComponent');
var RecipeClassEditorComponent=require('./component/goods/RecipeClassEditorComponent');

var SSPClassComponent=require('./component/goods/SSPClassComponent');
var SSPClassEditorComponent=require('./component/goods/SSPClassEditorComponent');


var AssessmentComponent=require('./component/goods/AssessmentComponent');
var AssessmentDetailComponent=require('./component/goods/AssessmentDetailComponent');

var StoreHouseComponent=require('./component/goods/StoreHouseComponent');
var StoreHouseEditorComponent=require('./component/goods/StoreHouseEditorComponent');

var TipsListComponent=require('./component/goods/TipsListComponent');
var TipsDetailComponent=require('./component/goods/TipsDetailComponent');
var GoodsBookListComponent=require('./component/goods/GoodsBookListComponent');
var GoodsBookDetailComponent=require('./component/goods/GoodsBookDetailComponent');

/**
 * 系统设置
 */
var BannerComponent=require("./component/setting/BannerComponent");
var BannerEditorComponent=require("./component/setting/BannerEditorComponent");
var BannerDetailEditorComponent=require("./component/setting/BannerDetailEditorComponent");
var PercentComponent=require("./component/setting/PercentComponent");
var AdviceComponent=require("./component/setting/AdviceComponent");
var AdviceDetailComponent=require("./component/setting/AdviceDetailComponent");
var AboutOurComponent=require("./component/setting/AboutOurComponent");

var PaymentRuleComponent=require("./component/setting/PaymentRuleComponent");//余额支付规则
var TrustRuleComponent = require("./component/setting/TrustRuleComponent"); //信用支付规则
var UnionPayRuleComponent=require("./component/setting/UnionPayRuleComponent"); //银联支付规则
var UserRegisterRuleComponent=require("./component/setting/UserRegisterRuleComponent"); //用户注册协议
var IdnumberRuleComponent=require("./component/setting/IdnumberRuleComponent"); //身份保密协议

var ShopCarComponent=require("./component/setting/ShopCarComponent");
var ProtocolsComponent=require("./component/setting2/ProtocolsComponent");
var BannerComponentV2=require("./component/setting2/BannerComponent");
var BannerEditorComponentV2=require("./component/setting2/BannerEditorComponent");
/**
 * 营销管理
 */
var PromotionComponent=require('./component/activity/PromotionComponent');//限时抢购
var PromotionEditorComponent=require('./component/activity/PromotionEditorComponent');//限时抢购编辑
var PromotionGoodsComponent=require('./component/activity/PromotionGoodsComponent');//限时商品列表
var PromotionGoodsEditorComponent=require('./component/activity/PromotionGoodsEditorComponent');//限时商品编辑
var ActivityHomeComponent=require('./component/activity/HomeComponent');//首页编辑
var ActivityHomeLabelEditorComponent=require('./component/activity/HomeLabelEditorComponent');//首页编辑
var HomeActivityEditorComponent=require('./component/activity/HomeActivityEditorComponent');//首页编辑
var HomeActivityGoodsComponent=require('./component/activity/HomeActivityGoodsComponent');//首页编辑
var HomeGoodsEditorComponent=require('./component/activity/HomeGoodsEditorComponent');//首页编辑
var HomeGoodsGoodsComponent=require('./component/activity/HomeGoodsGoodsComponent');//首页编辑

var ActivityComponent=require('./component/activity/ActivityComponent');//首页编辑
var ActivityDetailComponent=require('./component/activity/ActivityDetailComponent');//首页编辑

var PopupListComponent =require('./component/activity/PopupListComponent');//移动端弹窗列表
var PopupDetailComponent=require('./component/activity/PopupDetailComponent');//移动端弹窗详情编辑
var NewsListComponent=require('./component/activity/NewsListComponent');//波尔快报列表
var NewsDetailComponent=require('./component/activity/NewsDetailComponent');//波尔快报详情编辑


var FuzhuangHomeSettingComponent=require('./component/home/fuzhuang/HomeSettingComponent');//首页编辑
var FuzhuangHomeEditorComponent=require('./component/home/fuzhuang/HomeEditorComponent');
/**
 * 订单管理
 */
var OrderListComponent=require('./component/order/OrderListComponent');//订单列表
var OrderDetailComponent=require('./component/order/OrderDetailComponent');//订单详情
var OrderEditComponent=require('./component/order/OrderEditorComponent');//订单详情
var OrderGoodsDetailComponent=require('./component/order/OrderGoodsDetailComponent');//订单商品详情
var PackageDetailComponent=require('./component/order/PackageDetailComponent');//订单包裹详情信息
var RefundComponent=require('./component/order/RefundComponent');//退款订单
var RefundDetailComponent=require('./component/order/RefundDetailComponent');//退款详情
var RefundReasonComponent=require('./component/order/RefundReasonComponent');//退款原因
var RefundReasonEditorComponent=require('./component/order/RefundReasonEditorComponent');//退款原因编辑

var MerchantsOrderListComponent=require('./component/order/MerchantsOrderlistComponent');//商家订单列表
var MerchantsRefundComponent=require('./component/order/MerchantsRefundComponent');//退款订单

var VendorsListComponent=require('./component/user/VendorsListComponent');//供货商列表
var VendorsDetailComponent=require('./component/user/VendorsDetailComponent');//供货商详情

/**
 * 财务管理
 */
var ProfitComponent=require('./component/finance/ProfitComponent');
var CashApplyComponent=require('./component/finance/CashApplyComponent');
var MerchantsProfitComponent=require('./component/finance/MerchantsProfitComponent');
var MerchantsCashApplyComponent=require('./component/finance/MerchantsCashApplyComponent');
var MerchantsApplyCashComponent=require('./component/finance/MerchantsApplyCashComponent');
var TrustApplyListComponent=require('./component/finance/TrustApplyListComponent');
var TrustPayListComponent=require('./component/finance/TrustPayComponent');
var TrustApplyDetailComponent=require('./component/finance/TrustApplyDetailComponent');
var InvoiceListComponent=require('./component/order/InvoiceListComponent');
var InvoiceDetailComponent=require('./component/order/InvoiceDetailComponent');


/**
 * 分销管理
 */
var CardComponent=require('./component/distribution/CardComponent');
var DistributionPercentComponent=require('./component/distribution/DistributionPercentComponent');
var DistributionCashApplyComponent=require('./component/distribution/CashApplyComponent');
var DistributionMemberComponent=require('./component/distribution/MemberComponent');
var DistributionMemberDetailComponent=require('./component/distribution/MemberDetailComponent');
var DistributionMemberMemberDetail2Component=require('./component/distribution/MemberDetail2Component');
var DistributionProfitComponent=require('./component/distribution/ProfitComponent');

var DistributionDetailComponent=require('./component/distribution/DistributionDetailComponent');
var DistributionDetail1Component=require('./component/distribution/DistributionDetail1Component');


/**
 * 资讯
 */
var InfromationClassComponent=require('./component/information/InfromationClassComponent');
var InformationEditorComponent=require('./component/information/InformationEditorComponent');
var InformationComponent=require('./component/information/InformationComponent');

/**
 * 商品管理2.0
 */
var GoodsClassComponent2=require('./component/goods2/GoodsClassComponent');
var GoodsClass2Component2=require('./component/goods2/GoodsClass2Component');
var GoodsClassEditorComponent2=require('./component/goods2/GoodsClassEditorComponent');
var ClassGoodsListComponent=require('./component/goods2/ClassGoodsListComponent');
var GoodsListComponent2=require('./component/goods2/GoodsListComponent');
var GoodsEditorComponent2=require('./component/goods2/GoodsEditorComponent');
var GoodsDetailComponent=require('./component/goods2/GoodsDetailComponent');

var ExtraClassListComponent=require('./component/goods/ExtraClassListComponent');
var ExtraClassDetailComponent=require('./component/goods/ExtraClassDetailComponent');


var LogisticsComponent=require('./component/order/LogisticsComponent');
var LogisticsEditorComponent=require('./component/order/LogisticsEditorComponent');

var CouponComponent=require('./component/setting/CouponComponent');
var CouponEditorComponent=require('./component/setting/CouponEditorComponent');

var GoodsTagComponent=require('./component/goods2/GoodsTagComponent');
var GoodsTag2Component=require('./component/goods2/GoodsTag2Component');
var GoodsTagEditorComponent=require('./component/goods2/GoodsTagEditorComponent');

var IntegralRuleComponent=require('./component/setting2/IntegralRuleComponent');

var FoundGoodAlbum=require('./component/sw/FoundGoodAlbum');
var FoundGoodAlbumEditor=require('./component/sw/FoundGoodAlbumEditor');
var FoundGoodAlbumGoods=require('./component/sw/FoundGoodAlbumGoods');
var FoundGoodExact=require('./component/sw/FoundGoodExact');

var HeadlinesDynamicMerchants=require('./component/sw/HeadlinesDynamicMerchants');
var HeadlinesHotMerchants=require('./component/sw/HeadlinesHotMerchants');

var PictureRuleComponent=require('./component/setting2/PictureRuleComponent');
var TrustEditorComponent=require('./component/setting2/TrustEditorComponent');

var HelpClassComponent=require('./component/setting2/HelpClassComponent');
var HelpClass2Component=require('./component/setting2/HelpClass2Component');
var HelpEditorComponent=require('./component/setting2/HelpEditorComponent');
var HelpHtmlEditorComponent=require('./component/setting2/HelpHtmlEditorComponent');
var TimingModifyPrice=require('./component/goods2/TimingModifyPrice');
var TimingModifyPriceEditor=require('./component/goods2/TimingModifyPriceEditor');

var PercentComponent2=require('./component/setting2/PercentComponent');
var GoodsSalesListComponent=require('./component/goods2/GoodsSalesListComponent');

var OrderStatisticsComponent=require('./component/order/OrderStatisticsComponent');

var InformationAppDetailComponent=require('./component/information/InformationAppDetailComponent');
var WXMenuComponent=require('./component/setting2/WXMenuComponent');
var WXMenu2Component=require('./component/setting2/WXMenu2Component');
var WxMenuEditorComponent=require('./component/setting2/WxMenuEditorComponent');

var ClassBannerComponent=require('./component/goods/ClassBannerComponent');
var ClassBannerEditorComponent=require('./component/goods/ClassBannerEditorComponent');

var SalesReport=require('./component/finance/SalesReport');
var RoleAuthorityComponent=require('./component/system/RoleAuthorityComponent');

/**
 *   商品订单管理
 */
var OrderGoodsList2Component = require('./component/order/OrderGoodsList2Component')
/**
 *   网点管理
 */
var StoreHouse2Component = require('./component/goods/StoreHouse2Component');
var StoreHouseEditor2Component = require('./component/goods/StoreHouseEditor2Component');

/**
 *   物流管理
 */
var InboundComponent = require("./component/logistics/InboundComponent");
var OutboundComponent = require("./component/logistics/OutboundComponent");
var SignComponent = require("./component/logistics/SignComponent");
var StorehouseOrderComponent = require("./component/logistics/StorehouseOrderList");
var StorehousePrintComponent = require("./component/logistics/StorehousePrintList");
var SuppliersComponent = require("./component/user/SuppliersComponent");
/**
 *   控制中心
 */
var ConsoleComponent = require("./component/console/ConsoleComponent");

/**
 * 红包
 */
var RewardsListComponent = require("./component/activity/RewardsListComponent");
var RewardsRuleListComponent = require("./component/activity/RewardsRuleListComponent");
var RewardsMoneyListComponent = require("./component/activity/RewardsMoneyListComponent");
var RewardsDetailComponent = require("./component/activity/RewardsDetailComponent");
var RewardsRuleDetailComponent = require("./component/activity/RewardsRuleDetailComponent");
var RewardsMoneyDetailComponent = require("./component/activity/RewardsMoneyDetailComponent");
/**
 * 积分商城
 */
var integralBannerComponent = require("./component/integral/integralBannerComponent");
var integralBannerEditorComponent = require("./component/integral/integralBannerEditorComponent");
var integralGoodsListComponent = require("./component/integral/integralGoodsListComponent");
var integralGoodsDetailComponent = require("./component/integral/integralGoodsDetailComponent");
var integralGoodsEditorComponent = require("./component/integral/integralGoodsEditorComponent");
var integralOrdersListComponent  =  require("./component/integral/integralOrdersListComponent");
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={LoginComponent}/>
        <Route path="/information_app_detail/:information_id" component={InformationAppDetailComponent}/>
        <Route path="/main" component={MainComponent}>
            <Route path="/role_authority/:role_id" component={RoleAuthorityComponent}/>

            <Route path="/sales_report" component={SalesReport}/>

            <Route path="/class_banner_editor/:classBannerBean" component={ClassBannerEditorComponent}/>
            <Route path="/class_banner/:goods_id" component={ClassBannerComponent}/>

            <Route path="/setting_wx_menu2/:parent_id/:level" component={WXMenu2Component}/>
            <Route path="/setting_wx_menu/:parent_id/:level" component={WXMenuComponent}/>
            <Route path="/setting_wx_menu_editor/:menuBean" component={WxMenuEditorComponent}/>
            <Route path="/order_statistics" component={OrderStatisticsComponent}/>
            <Route path="/goods_sales" component={GoodsSalesListComponent}/>

            <Route path="/goods_timing_modify" component={TimingModifyPrice}/>
            <Route path="/goods_timing_modify_editor/:timingBean" component={TimingModifyPriceEditor}/>

            <Route path="/setting_help_html/:parent_id/:level" component={HelpClassComponent}/>
            <Route path="/setting_help_html2/:parent_id/:level" component={HelpClass2Component}/>
            <Route path="/setting_help_editor/:htmlBean" component={HelpEditorComponent}/>
            <Route path="/setting_help_html_editor/:url" component={HelpHtmlEditorComponent}/>

            <Route path="/setting_trust_editor" component={TrustEditorComponent}/>
            <Route path="/setting_piture_editor" component={PictureRuleComponent}/>

            <Route path="/sw_headline_dynamic" component={HeadlinesDynamicMerchants}/>
            <Route path="/sw_headline_hot" component={HeadlinesHotMerchants}/>

            <Route path="/sw_album" component={FoundGoodAlbum}/>
            <Route path="/sw_album_editor/:albumBean" component={FoundGoodAlbumEditor}/>
            <Route path="/sw_album_goods/:album_id" component={FoundGoodAlbumGoods}/>
            <Route path="/sw_exact_goods" component={FoundGoodExact}/>

            <Route path="/integral_rule" component={IntegralRuleComponent}/>

            <Route path="/goods_tag/:parent_id/:level" component={GoodsTagComponent}/>
            <Route path="/goods_tag2/:parent_id/:level" component={GoodsTag2Component}/>
            <Route path="/goods_tag_editor/:tagBean" component={GoodsTagEditorComponent}/>

            <Route path="/setting_coupon" component={CouponComponent}/>
            <Route path="/setting_coupon_editor/:couponBean" component={CouponEditorComponent}/>


            <Route path="/order_logistics" component={LogisticsComponent}/>
            <Route path="/order_logistics_editor/:logisticsBean" component={LogisticsEditorComponent}/>

            <Route path="/goods_recommend/:goodsBean" component={GoodsRecommendComponent}/>
            <Route path="/goods_recommend_class1" component={RecommendGoodsClass1Component}/>
            <Route path="/goods_recommend_class2/:goodsBean" component={RecommendGoodsClass2Component}/>

            <Route path="/goods_list2" component={GoodsListComponent2}/>
            <Route path="/goods_editor2/:goodsBean" component={GoodsEditorComponent2}/>
            <Route path="/goods_detail/:goodsBean" component={GoodsDetailComponent}/>

            <Route path="/extra_class_list" component={ExtraClassListComponent}/>
            <Route path="/extra_class_detail/:classBean" component={ExtraClassDetailComponent}/>

            <Route path="/goods_class2/:parent_id/:level" component={GoodsClassComponent2}/>
            <Route path="/goods_class2_editor/:goodsClassBean" component={GoodsClassEditorComponent2}/>
            <Route path="/goods_class3/:parent_id/:level" component={GoodsClass2Component2}/>
            <Route path="/class_goods/:class_id" component={ClassGoodsListComponent}/>

            <Route path="/information_class" component={InfromationClassComponent}/>
            <Route path="/information_editor/:informationBean" component={InformationEditorComponent}/>
            <Route path="/information/:parent_id" component={InformationComponent}/>

            <Route path="/distribution_card" component={CardComponent}/>
            <Route path="/distribution_percent" component={DistributionPercentComponent}/>
            <Route path="/distribution_cash_apply" component={DistributionCashApplyComponent}/>
            <Route path="/distribution_member" component={DistributionMemberComponent}/>
            <Route path="/distribution_member_detail/:member_id/:count" component={DistributionMemberDetailComponent}/>
            <Route path="/distribution_member_detail2/:member_id/:count" component={DistributionMemberMemberDetail2Component}/>
            <Route path="/distribution_profit" component={DistributionProfitComponent}/>
            <Route path="/distribution_detail" component={DistributionDetailComponent}/>
            <Route path="/distribution_detail1/:member_id/:distribution_relation" component={DistributionDetail1Component}/>


            <Route path="/finance_profit" component={ProfitComponent}/>
            <Route path="/finance_merchants_profit" component={MerchantsProfitComponent}/>
            <Route path="/finance_cash_apply" component={CashApplyComponent}/>
            <Route path="/finance_merchants_cash_apply" component={MerchantsCashApplyComponent}/>
            <Route path="/finance_merchants_apply_cash" component={MerchantsApplyCashComponent}/>

            <Route path="/system_detail_show_editor/:detailShowBean" component={DetailShowEditorComponent}/>

            <Route path="/system_detail_show" component={DetailShowComponent}/>
            <Route path="/system_list_type_editor/:listTypeBean" component={ListTypeEditorComponent}/>
            <Route path="/system_list_type/:type_type" component={ListTypeComponent}/>
            <Route path="/system_list_show" component={ListShowComponent}/>
            <Route path="/system_list_show_editor/:listShowBean" component={ListShowEditorComponent}/>

            <Route path="/system_moudle/:parent_id/:level" component={SystemMoudleComponent}/>
            <Route path="/system_moudle_2/:parent_id/:level" component={SystemMoudle2Component}/>
            <Route path="/moudle_editor/:moudleBean" component={MoudleEditorComponent}/>
            <Route path="/system_role" component={SystemRoleComponent}/>
            <Route path="/role_editor/:roleBean" component={RoleEditorComponent}/>
            <Route path="/system_authority" component={AuthorityComponent}/>
            <Route path="/authority_editor/:role_id" component={AuthorityEditorComponent}/>
            <Route path="/system_merchants" component={MerchantsComponent}/>
            <Route path="/merchants_editor/:merchantsBean" component={MerchantsEditorComponent}/>
            <Route path="/merchants_editor_password/:merchantsBean" component={MerchantsEditorPasswrod}/>

            <Route path="/user_detail_component/:type" component={UserDetailComponent}/>

            <Route path="/user_merchants" component={UserMerchantsComponent}/>
            <Route path="/user_suppliers" component={SuppliersComponent}/>
            <Route path="/user_suppliers_editor/:merchantsBean" component={UserSuppliersEditorComponent}/>
            <Route path="/user_merchants_editor/:merchantsBean" component={UserMerchantsEditorComponent}/>
            <Route path="/user_business" component={BusinessComponent}/>
            <Route path="/user_business_editor/:merchantsBean" component={BusinessEditorComponent}/>
            <Route path="/user_business_goods/:merchants_id" component={BusinessGoodsComponent}/>
            <Route path="/user_member" component={MemberComponent}/>
            <Route path="/user_member_detail/:member_id" component={MemberDetailComponent}/>
            <Route path="/user_member_shop_goods_detail/:merchants_id/:member_id" component={MemberShopCarGoodsComponent}/>
            <Route path="/user_merchants_label" component={MerchantsLabelComponent}/>
            <Route path="/user_merchants_label_editor/:merchantsLabelBean" component={MerchantsLabelEditorComponent}/>
            <Route path="/merchants_qualification" component={MerchantsQualificationComponent}/>
            <Route path="/merchants_qualification_editor/:merchantsQualificationBean" component={MerchantsQualificationEditorComponent}/>
            <Route path="/merchants_label_qualification/:label_id" component={MerchantsLabelQualicationComponent}/>
            <Route path="/merchants_account_editor/:merchants_type/:merchantsAccoutBean/:type" component={MerchantsAccoutEditorComponent}/>

            <Route path="/merchants_goods_list" component={MerchantsGoodsListComponent}/>
            <Route path="/merchants_goods_editor/:goodsBean" component={MerchantsGoodsEditorComponent}/>
            <Route path="/hbr_goods_editor/:goodsBean" component={HBRGoodsEditorComponent}/>

            <Route path="/goods_list" component={GoodsListComponent}/>
            <Route path="/goods_editor/:goodsBean" component={GoodsEditorComponent}/>
            <Route path="/goods_class/:parent_id/:level" component={GoodsClassComponent}/>
            <Route path="/goods_class_1/:goodsBean" component={GoodsClass1Component}/>
            <Route path="/goods_class_2/:goodsBean" component={GoodsClass2Component}/>
            <Route path="/goods_class_3/:goodsBean" component={GoodsClass3Component}/>
            {/*新加三级分类*/}
            <Route path="/goods_class_2/:goodsBean/:level" component={GoodsClass12Component}/>

            <Route path="/goods_class_editor/:goodsBean/:level" component={GoodsClassEditorComponent}/>

            <Route path="/brand" component={BrandComponent}/>
            <Route path="/brand_editor/:brandBean" component={BrandEditorComponent}/>
            <Route path="/brand_detail_editor/:brand_url" component={BrandDetailEditorComponent}/>

            <Route path="/goods_storehouse" component={StoreHouseComponent}/>
            <Route path="/goods_storehouse_editor/:storehouseBean" component={StoreHouseEditorComponent}/>

            <Route path="/trust_apply_list" component={TrustApplyListComponent}/>
            <Route path="/trust_pay_list" component={TrustPayListComponent}/>
            <Route path="/trust_item_detail/:trustItem" component={TrustApplyDetailComponent}/>

            <Route path="/goods_parameter/:goods_id" component={ParameterComponent}/>
            <Route path="/goods_parameter_editor/:parameterBean" component={ParameterEditorComponent}/>
            <Route path="/goods_service/:goods_id" component={ServiceComponent}/>
            <Route path="/goods_service_editor/:serviceBean" component={ServiceEditorComponent}/>

            <Route path="/goods_label/:goods_id" component={GoodsLabelComponent}/>
            <Route path="/goods_label_editor/:type/:labelBean" component={GoodsLabelEditorComponent}/>
            <Route path="/goods_standard_editor/:standardBean" component={StandardEditorComponent}/>

            <Route path="/group_buy_editor/:groupBuyGoodsBean" component={GroupBuyEditorComponent}/>

            <Route path="/goods_recipe/:recipe_id" component={RecipeComponent}/>
            <Route path="/goods_detail_recipe/:recipeBean" component={RecipeDetailComponent}/>
            <Route path="/goods_recipe_food/:recipeFoodBean" component={RecipeFoodsEditorComponent}/>
            <Route path="/goods_recipe_class" component={RecipeClassComponent}/>
            <Route path="/goods_recipe_class_editor/:recipeBean" component={RecipeClassEditorComponent}/>
            <Route path="/ssp_class" component={SSPClassComponent}/>
            <Route path="/ssp_class_editor/:sspClassBean" component={SSPClassEditorComponent}/>

            <Route path="/assessment" component={AssessmentComponent}/>
            <Route path="/assessment_detail/:assessment_id" component={AssessmentDetailComponent}/>

            <Route path="/banner_setting2" component={BannerComponentV2}/>
            <Route path="/banner_editor2/:bannerBean" component={BannerEditorComponentV2}/>

            <Route path="/banner_setting" component={BannerComponent}/>
            <Route path="/banner_editor/:bannerBean" component={BannerEditorComponent}/>
            <Route path="/banner_detail_editor/:banner_url" component={BannerDetailEditorComponent}/>
            <Route path="/setting_percent" component={PercentComponent}/>
            <Route path="/setting_percent2" component={PercentComponent2}/>
            <Route path="/setting_advice" component={AdviceComponent}/>
            <Route path="/setting_advice_detail/:advice_id" component={AdviceDetailComponent}/>
            <Route path="/setting_about_our" component={AboutOurComponent}/>
            <Route path="/setting_protocols" component={ProtocolsComponent}/>
            <Route path="/setting_shop_car" component={ShopCarComponent}/>

            <Route path="/html1" component={PaymentRuleComponent}/> {/*余额支付规则*/}
            <Route path="/html2" component={TrustRuleComponent}/>   {/*信用支付规则*/}
            <Route path="/html3" component={UnionPayRuleComponent}/>   {/*银联支付规则*/}
            <Route path="/html4" component={UserRegisterRuleComponent}/>   {/*用户注册规则*/}
            <Route path="/html5" component={IdnumberRuleComponent}/>   {/*身份保密协议*/}

            <Route path="/activity_promotion" component={PromotionComponent}/>
            <Route path="/activity_promotion_editor/:promotionBean" component={PromotionEditorComponent}/>
            <Route path="/activity_promotion_goods/:promotion_id" component={PromotionGoodsComponent}/>
            <Route path="/activity_promotion_goods_editor/:promotionGoodsBean" component={PromotionGoodsEditorComponent}/>
            <Route path="/activity_home" component={ActivityHomeComponent}/>
            <Route path="/activity_home_label_editor/:labelBean" component={ActivityHomeLabelEditorComponent}/>
            <Route path="/activity_home_activity_editor/:activityBean" component={HomeActivityEditorComponent}/>
            <Route path="/activity_home_activity_goods/:parent_id" component={HomeActivityGoodsComponent}/>
            <Route path="/activity_home_goods_editor/:homeGoodsBean" component={HomeGoodsEditorComponent}/>
            <Route path="/activity_home_goods_goods/:parent_id" component={HomeGoodsGoodsComponent}/>
            <Route path="/activity_activity" component={ActivityComponent}/>
            <Route path="/activity_activity_detail/:activityBean" component={ActivityDetailComponent}/>
            <Route path="/fuzhuang_home" component={FuzhuangHomeSettingComponent}/>
            <Route path="/fuzhuang_home_editor/:activityBean" component={FuzhuangHomeEditorComponent}/>

            <Route path="/order_list" component={OrderListComponent}/>
            <Route path="/order_editor" component={OrderEditComponent}/>
            <Route path="/order_detail/:order_id" component={OrderDetailComponent}/>
            <Route path="/order_goods_detail/:order_goods_id" component={OrderGoodsDetailComponent}/>
            <Route path="/order_parcel_detail/:order_parcel_id" component={PackageDetailComponent}/>
            <Route path="/order_refund" component={RefundComponent}/>
            <Route path="/order_refund_detail/:refund_id" component={RefundDetailComponent}/>
            <Route path="/refund_reason" component={RefundReasonComponent}/>
            <Route path="/refund_reason_editor/:refundReasonBean" component={RefundReasonEditorComponent}/>

            <Route path="/merchants_order_list" component={MerchantsOrderListComponent}/>
            <Route path="/merchants_order_refund" component={MerchantsRefundComponent}/>

            <Route path="/order_orderGoodsList2" component={OrderGoodsList2Component}/>
            <Route path="/goods_storehouse2" component={StoreHouse2Component}/>
            <Route path="/goods_storehouse_editor2/:storehouseBean" component={StoreHouseEditor2Component}/>

            <Route path="/logistics_inbound" component={InboundComponent}/>
            <Route path="/logistics_outbound" component={OutboundComponent}/>
            <Route path="/logistics_sign" component={SignComponent}/>
            <Route path="/storehouse_orderList" component={StorehouseOrderComponent}/>
            <Route path="/storehouse_printList" component={StorehousePrintComponent}/>

            <Route path="/invoice_list" component={InvoiceListComponent}/>
            <Route path="/invoice_detail/:order_id" component={InvoiceDetailComponent}/>

            <Route path="/mobile_popup" component={PopupListComponent}/>
            <Route path="/mobile_popup_detail/:popupBean" component={PopupDetailComponent}/>

            <Route path="/news_list" component={NewsListComponent}/>
            <Route path="/news_list_detail/:newsBean" component={NewsDetailComponent}/>

            <Route path="/tips_list" component={TipsListComponent}/>
            <Route path="/tips_detail/:tipsBean" component={TipsDetailComponent}/>

            <Route path="/goodsBook_list" component={GoodsBookListComponent}/>
            <Route path="/goodsBook_detail/:goodsBookBean" component={GoodsBookDetailComponent}/>
            <Route path="/vendors_list" component={VendorsListComponent}/>
            <Route path="/vendors_detail/:vendorsBean" component={VendorsDetailComponent}/>
            {/*控制中心*/}
            <Route path="/console" component={ConsoleComponent}/>
            {/*供应商管理*/}
            <Route path="/supplier" component={SupplierComponent}/>
            <Route path="/supplier_detail/:goodsBean" component={SupplierEditorComponent}/>
            {/*红包管理*/}
            <Route path="/rewards_list" component={RewardsListComponent}/>
            <Route path="/rewards_rule_list/:rewardsBean" component={RewardsRuleListComponent}/>
            <Route path="/rewards_money_list/:rewardsRuleBean" component={RewardsMoneyListComponent}/>
            <Route path="/rewards_detail/:rewardsBean" component={RewardsDetailComponent}/>
            <Route path="/rewards_rule_detail/:rewardsRuleBean" component={RewardsRuleDetailComponent}/>
            <Route path="/rewards_money_detail/:rewardsMoneyBean" component={RewardsMoneyDetailComponent}/>
            {/*积分商城*/}
            <Route path="/integral_banner" component={integralBannerComponent}/>
            <Route path="/integral_banner_editor/:bannerBean" component={integralBannerEditorComponent}/>
            <Route path="/integral_goods_list" component={integralGoodsListComponent}/>
            <Route path="/integral_goods_detail/:goodsBean" component={integralGoodsDetailComponent}/>
            <Route path="/integral_goods_editor/:goodsBean" component={integralGoodsEditorComponent}/>
            <Route path="/integral_orders_list" component={integralOrdersListComponent}/>
        </Route>
    </Router>),
    document.getElementById("container")
);
