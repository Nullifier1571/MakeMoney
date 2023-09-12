import {Component, PropsWithChildren} from "react";
import {View} from "@tarojs/components";
import {Swiper, SwiperItem} from '@tarojs/components'
import {AtSteps} from 'taro-ui'

interface IPropsState {
  step_current: number
  step_data: {
    title: string;
    desc: string;
    status: string;
  }[]
}

interface IProps {

}


class PublishPage extends Component<IProps, IPropsState> {
  constructor(props) {
    super(props);
    this.state = {
      step_current: 0, // 初始步骤为第一个
      step_data: [
        {'title': '步骤一', 'desc': '这里是额外的信息，最多两行', status: 'none'},
        {'title': '步骤二', 'desc': '这里是额外的信息，最多两行', status: 'none'},
        {'title': '步骤三', 'desc': '这里是额外的信息，最多两行', status: 'none'}
      ]
    };
  }

  // Swiper 组件的 onChange 事件回调
  handleSwiperChange = (e) => {
    console.log("Swiper onChange" + this.state.step_current)

    const {step_data} = this.state;
    const currentIndex = e.detail.current;
    const updatedStepData = [...step_data]; // 创建副本以避免直接修改 state
    if (currentIndex == 1) {
      // 更新第一条数据的 status
      updatedStepData[0].status = 'none'; // 在副本中更新第一条数据的 status
      updatedStepData[1].status = 'none'; // 在副本中更新第一条数据的 status
      updatedStepData[2].status = 'none'; // 在副本中更新第一条数据的 status
    }

    if (currentIndex == 1) {
      // 更新第一条数据的 status
      updatedStepData[0].status = 'successful'; // 在副本中更新第一条数据的 status
      updatedStepData[1].status = 'none'; // 在副本中更新第一条数据的 status
      updatedStepData[2].status = 'none'; // 在副本中更新第一条数据的 status
    }

    if (currentIndex == 2) {
      // 更新第一条数据的 status
      updatedStepData[0].status = 'successful';
      updatedStepData[1].status = 'successful';
      updatedStepData[2].status = 'none';
    }

    // e.detail.current 表示当前 Swiper 所在的索引，从 0 开始
    this.setState({
      step_current: currentIndex,
      step_data: updatedStepData
    });
  };

  render() {
    return (
      <View>
        <AtSteps
          items={this.state.step_data}
          current={this.state.step_current}
        />
        <Swiper
          className='test-h'
          vertical
          circular
          current={this.state.step_current}
          onChange={this.handleSwiperChange}
        >
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
      </View>
    );
  }
}


export default PublishPage
