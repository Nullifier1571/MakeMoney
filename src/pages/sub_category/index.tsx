import {Component, PropsWithChildren} from "react";
import {ScrollView, Text, View} from "@tarojs/components";
import {AtGrid} from "taro-ui"
import {connect} from 'react-redux'
import {asyncRequestSubCategoryPageData} from "../../actions/subcategory";
import Taro from "@tarojs/taro";

type PageStateProps = {
  subcategory: {
    data: {
      data: {
        category: []
      }
    }
  }
}

type PageDispatchProps = {
  asyncRequestSubCategoryPageData: (userInfo: {}, locationInfo: {}) => { data: [] }
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SubCategoryPage {
  props: IProps;
}

@connect(({subcategory}) => ({
  subcategory
}), (dispatch) => ({
  asyncRequestSubCategoryPageData(userInfo: {}, locationInfo: {}) {
    dispatch(asyncRequestSubCategoryPageData(userInfo, locationInfo))
  },
}))
class SubCategoryPage extends Component<IProps> {

  componentDidMount() {
    this.props.asyncRequestSubCategoryPageData({"user_id": "1"}, {"lat": 40.0, "lon": 20.0})
  }

  render() {
    console.log("++++++++++++++" + JSON.stringify(this.props.subcategory.data.data))
    var data = []
    if (this.props.subcategory != undefined && this.props.subcategory.data != undefined && this.props.subcategory.data.data.category != undefined) {
      data = this.props.subcategory.data.data.category
    }
    return (
      <ScrollView scrollY
                  scrollWithAnimation>
        {data.map((item, index) => (
          <View key={index}>
            <Text>{item.title}</Text>
            <AtGrid mode='rect' data={item.list}
                    onClick={(item, index, event) => {
                      console.log(`item.action  ${item.action} `)
                      Taro.navigateTo({
                        url: item.action
                      });
                    }}/>
          </View>
        ))}
      </ScrollView>
    );
  }
}


export default SubCategoryPage
