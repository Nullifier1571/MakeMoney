import {Component, PropsWithChildren} from 'react'
import {connect} from 'react-redux'
import {View, Button, Text, Map} from '@tarojs/components'
import Taro from '@tarojs/taro'

import {asyncRequestHomePageData} from '../../actions/home'

import './index.scss'
import HomeCategory from "../../components/home/category";
import CLoading from "../../components/loading";
import HomeBanner from "../../components/home/banner";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

//这里参数名字要跟页面注册的名字一致，也就是reducers里的名字
type PageStateProps = {
  home: {
    home_data: {
      data:{
        category: []
        banner: []
      }
    }
  }
}

type PageDispatchProps = {
  asyncRequestHomePageData: (userInfo: {}, locationInfo: {}) => { home_data: {} }
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({home}) => ({
  home
}), (dispatch) => ({
  asyncRequestHomePageData(userInfo: {}, locationInfo: {}) {
    dispatch(asyncRequestHomePageData(userInfo, locationInfo))
  },
}))
class Index extends Component<PropsWithChildren> {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }


  async componentDidMount() {
    try {
      console.log('地理位置信息：======================');
      this.getLocation()

      this.props.asyncRequestHomePageData({"user_id": "1"}, {"lat": 40.0, "lon": 20.0});
    } catch (error) {
      console.error('请求数据失败', error);
    }
  }

  componentDidUpdate(prevProps: IProps) {
    // 在这里检查 prevProps.home_data 和 this.props.home_data 是否有变化
    if (prevProps.home.home_data !== this.props.home.home_data) {
      console.log('数据已更新', this.props.home.home_data);
    }
  }

  onTap() {
  }

  requestLocationPermission = async () => {
    try {
      const res = await Taro.getSetting();
      if (!res.authSetting['scope.userLocation']) {
        await Taro.authorize({
          scope: 'scope.userLocation'
        });
      }
    } catch (error) {
      // 处理权限请求失败的情况
      console.error('请求定位权限失败', error);
    }
  }

  getLocation = async () => {
    try {
      const res = await Taro.getLocation({
        type: 'wgs84', // 坐标类型
      });
      console.log('地理位置信息：', res);
    } catch (error) {
      console.error('获取地理位置失败：', error);
    }
  }

  render() {


    if (this.props.home != undefined && this.props.home.home_data != undefined) {
      var category = []
      if(this.props.home.home_data.data.category!= undefined){
        category=this.props.home.home_data.data.category
      }
      console.log('首页信息 category：', category);
      var banner = []
      if(this.props.home.home_data.data.banner!= undefined){
        banner=this.props.home.home_data.data.banner
      }

      return (
        <View className='index'>
          <HomeCategory data={category}/>
          <HomeBanner bannerData={banner}/>
        </View>
      )
    } else {
      return (
        <View className='index'>
          <CLoading fullPage={true} hide={false}/>
        </View>
      )
    }

  }
}

export default Index

