/**
 * Created by shenjiabo on 16/7/21.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
var LinkComponent = require("./../../widget/LinkComponent");
class BoxView extends Component{
    constructor(props) {
        super(props);
        this.state={
            state:0,//0从未加载过  1:加载更多 2:正在加载中  3:已全部加载
        }
    };
    componentDidMount() {

    };

    componentWillUnmount() {

    }

    loadEnd(state){
        this.setState({
            state:state,
        });
    }
    render(){
        let view=[];
        
        if(this.props.dataSource!=null&&this.props.dataSource.length>0) {
            for (let i = 0; i < this.props.dataSource.length; i++) {
                view.push(
                <Link to={this.props.dataSource[i].route!=""?this.props.dataSource[i].route:this.props.route}
                              style={{textDecoration:'none'}}
                 key={"box_inner_"+i}>
                    <div style={styles.con_box}>
                        <div style={styles.list}>
                             <span style={styles.tabP1}>{this.props.dataSource[i].state_name}</span>
                        </div>
                        <div style={styles.list1}>
                        <span style={{display:this.props.dataSource[i].state_type=='amount'?'inline-block':'none',color:'#4DA0F3',marginLeft:10}}>￥</span><span style={this.props.dataSource[i].state_type=='amount'?{ color:'#4DA0F3'}:{ color:'#4DA0F3',marginLeft:15}}>{this.props.dataSource[i].state_value}</span>
                        </div>
                    </div>
                 </Link>);
            }
        }
        let headerView=<div style={styles.tie} key="box_inner_head"><span style={{marginLeft:10}}>{this.props.title}</span></div>;
        return(
            <div style={this.props.style?this.props.style:{flex:1}}
                 onScroll={this.props.onScroll?this.props.onScroll:this.onScroll}
                 onMouseOut={this.props.onMouseOut?this.props.onMouseOut:this.onMouseOut}
                 id={this.props.id}
                 ref={this.props.ref}>
                {headerView}
                {view}
            </div>
        );
    }

    onScroll(e){

    }
    onMouseOut(){

    }
}
const styles = {
  tabP1:{
    color:'#999'
    },
   tie:{
    display:'block',
    width:'100%',
    height:40,
    lineHeight:'40px',
    background:'#f5f5f5',
    fontSize:18,
    fontWeight:'bold'
   },
   con_box:{
      width:'31%',
      height:60,
    //   border:'1px solid red',
      float:'left',
    //   textAlign:'center',
      marginTop:5,
      paddingLeft:10
   },
   list:{
       width:"100%",
       height:30,
       lineHeight:'25px',
       marginTop:10
   },
    list1:{
       width:"100%",
       height:30,
       lineHeight:'25px',
    //    marginTop:10
   },
}
module.exports= BoxView;