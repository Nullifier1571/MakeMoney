import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Button, Text ,Image} from '@tarojs/components';

interface LoginProps{

}

interface LoginState{

}

class Login extends Component<LoginProps, LoginState> {
  state = {
    userInfo: null,
  };


  fetchData(code:string) {

    Taro.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session', // 替换为您要请求的 API 地址
      data:{
        appid:'xx',
        secret:'xxx',
        js_code:code,
        grant_type:'authorization_code'
      },
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        // 请求成功，处理返回的数据
        console.log('请求成功=====', res.data);
      },
      fail: (error) => {
        // 请求失败，处理错误信息
        console.error('请求失败=====', error);
      },
    });
  }

  handleLogin = () => {
    Taro.login({
      success: (res) => {
        if (res.code) {
          // 获取到登录凭证 res.code，发送到服务器进行验证
          // 假设服务器验证成功后返回用户信息
          console.log('微信用户信息 res.code', res.code);

          this.fetchData(res.code)

         /* // 以下是模拟的用户信息
          const userInfo = {
            nickName: 'John',
            avatarUrl: 'https://example.com/avatar.jpg',
          };
          this.setState({
            userInfo,
          });

          // 获取用户信息
          Taro.getUserInfo({
            success: (infoRes) => {
              const wxUserInfo = infoRes.userInfo;
              // 在这里可以将微信用户信息上传到服务器或进行其他操作
              console.log('微信用户信息', wxUserInfo);
            },
            fail: (infoErr) => {
              console.error('获取微信用户信息失败', infoErr);
            },
          });*/
        } else {
          console.error('微信登录失败', res.errMsg);
        }
      },
      fail: (err) => {
        console.error('微信登录接口调用失败', err);
      },
    });
  };

  render() {
    const { userInfo } = this.state;

    return (
      <View>
        {userInfo ? (
          <View>
            <Image src={userInfo.avatarUrl} />
            <Text>{userInfo.nickName}</Text>
          </View>
        ) : (
          <Button onClick={this.handleLogin}>微信登录</Button>
        )}
      </View>
    );
  }
}

export default Login;
