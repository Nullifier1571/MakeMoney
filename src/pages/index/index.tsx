import {Component, PropsWithChildren} from 'react'
import {connect} from 'react-redux'
import {View, Button, Text, Map} from '@tarojs/components'
import Taro from '@tarojs/taro'

import {add, minus, asyncAdd} from '../../actions/counter'

import './index.scss'
import Login from "../../components/login";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({counter}) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component<PropsWithChildren> {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
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
    console.log('地理位置信息：======================');
    this.getLocation()

    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text >Test Login</Text></View>
        <View> <Login /></View>
      </View>
    )
  }
}

export default Index

