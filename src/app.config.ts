export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/home/index',
    'pages/ucenter/index',
    'pages/sub_category/index',
    'pages/publish/index',
  ],tabBar: {
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [{
      pagePath: 'pages/index/index',
      text: '测试1',
      iconPath: './assets/tab-bar/home.png',
      selectedIconPath: './assets/tab-bar/home-selected.png'
    },{
      pagePath: 'pages/home/index',
      text: '点餐',
      iconPath: './assets/tab-bar/home.png',
      selectedIconPath: './assets/tab-bar/home-selected.png'
    }, {
      pagePath: 'pages/ucenter/index',
      text: '个人中心',
      iconPath: './assets/tab-bar/home.png',
      selectedIconPath: './assets/tab-bar/home-selected.png'
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }

})
