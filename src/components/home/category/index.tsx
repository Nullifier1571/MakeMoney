import {Component} from "react";
import {Button, Text, View} from "@tarojs/components";
import {AtGrid} from "taro-ui"
import Taro from "@tarojs/taro";

type IProps = {
  data: []
}

class HomeCategory extends Component<IProps> {
  render() {
    console.log('首页大类区域');
    return (
      <View className='index'>
        <AtGrid
          data={this.props.data}
          onClick={(item, index, event) => {
            console.log(`item  ${item}  index  ${index}   event  ${event}`)
            Taro.navigateTo({
              url: item.action
            });
          }}
        />

      </View>
    )
  }
}


export default HomeCategory
