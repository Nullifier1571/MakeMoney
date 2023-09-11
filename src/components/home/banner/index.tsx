import { Image, View, Swiper, SwiperItem} from '@tarojs/components'

import {Component} from "react";
import "./index.scss"

interface SwiperPageProps {
  bannerData: []
}

interface SwiperPageState {
  current: number
  duration: number
  interval: number
  isCircular: boolean
  isAutoplay: boolean
  hasIndicatorDots: boolean
}

class HomeBanner extends Component<SwiperPageProps, SwiperPageState> {

  public constructor(props: any) {
    super(props)
    this.state = {
      current: 1,
      duration: 500,
      interval: 5000,
      isCircular: true,
      isAutoplay: true,
      hasIndicatorDots: true
    }
  }


  render() {
    const {
      current,
      isAutoplay,
      duration,
      isCircular,
      interval,
      hasIndicatorDots,

    } = this.state

    const {
      bannerData
    } = this.props

    return (
      <View>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          current={current}
          duration={duration}
          interval={interval}
          circular={isCircular}
          autoplay={isAutoplay}
          indicatorDots={hasIndicatorDots}
          previousMargin='20'
        >
          {bannerData?.map((item, idx) => (
            <SwiperItem key={idx}>
              <Image src={item.url} className='slide-image'/>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}

export default HomeBanner;
