本项目是用[Create React App](https://github.com/facebookincubator/create-react-app)引导的。由于用create-react-app引导的项目默认不支持缓存动态内容的配置选项，我在项目目录下运行了`npm run eject`命令，移除了项目里的单一构建依赖。

## 内容列表

- [可用脚本](#可用脚本)
  - [yarn start](#yarn-start)
  - [yarn build](#yarn-build)
- [程序流程图](#程序流程图)
- [使用的第三方API](#使用的第三方API)


## 可用脚本

在项目目录下，你可以运行以下指令：

### `npm start`(或`yarn start`)

在开发模式下运行应用。<br>

在浏览器中访问[http://localhost:3000](http://localhost:3000)来查看应用。

在你编辑并保存了代码后，该页面将会重新加载。
<br>
你也将会在控制台中看到所有的lint错误。

### `npm run build`(或`yarn build`)

把适用于生产环境下的应用构建到`build`文件夹。<br>

构建后的代码被压缩，且文件名包含哈希值。<br>

你的应用达到可以部署的条件了。

## 程序流程图