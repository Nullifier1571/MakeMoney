import {Component, PropsWithChildren} from "react";
import {ScrollView, Text, View} from "@tarojs/components";
import {AtGrid} from "taro-ui"
import {connect} from 'react-redux'
import {asyncRequestSubCategoryPageData} from "../../actions/subcategory";

type PageStateProps = {
  subcategory: {
    data: []
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

interface IProps {
  data: []
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
    var data = []
    if (this.props.subcategory != undefined && this.props.subcategory.data != undefined) {
      data = this.props.subcategory.data
    }
    return (
      <ScrollView scrollY
                  scrollWithAnimation>
        {data.map((item, index) => (
          <View key={index}>
            <Text>{item.title}</Text>
            <AtGrid mode='rect' data={item.list}/>
          </View>
        ))}
      </ScrollView>
    );
  }
}


export default SubCategoryPage
