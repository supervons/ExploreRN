[简体中文](./README.md) | [English](./README_EN.md)

# 项目说明

    由于0.60.0之后有很多毁灭性的升级，从底部升级难度太大（目前来说），所以重新基于高版本开发

老版本地址：（也不老，0.59.8）https://github.com/supervons/commonProject

# 安装依赖

    npm install
    # 如果是 iOS 则需要执行以下操作
    cd ios && pod install 

# 运行

    android: react-native run-android
    ios: Xcode选择AwesomeProject.xcworkspace启动

# 测试账号

    用户名：test
    密码：test

# 功能

| 功能名称      | 简述                             | 使用组件名称及版本                                           |
| ------------- | -------------------------------- | ------------------------------------------------------------ |
| 1.图片选择    | 选择相册中的图片，亦或进行拍照   | react-native-image-picker@2.3.4                              |
| 2.扫一扫      | 扫一扫二维码，获取二维码中的信息 | react-native-camera@3.8.0                                    |
| 3.换肤        | 更换系统导航头部及按钮颜色       | react-navigation@3.11.1                                      |
| 4.Redux全家桶 | redux及中间件的使用              | redux@4.0.4<br />redux-persist@5.10.0<br />redux-logger@3.0.6<br />redux-thunk@2.3.0 |
| 5.网络请求    | 统一封装网络请求                 | axios@0.19.0                                                 |

