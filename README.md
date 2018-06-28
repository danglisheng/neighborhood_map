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
![主程序流程图](https://github.com/danglisheng/neighborhood_map/raw/master/program_flow_chart/%E4%B8%BB%E7%A8%8B%E5%BA%8F%E6%B5%81%E7%A8%8B%E5%9B%BE.png)
主程序流程图<br>
![下拉菜单的change事件处理程序流程图](https://github.com/danglisheng/neighborhood_map/raw/master/program_flow_chart/%E4%B8%8B%E6%8B%89%E8%8F%9C%E5%8D%95%E7%9A%84change%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E7%A8%8B%E5%BA%8F%E6%B5%81%E7%A8%8B%E5%9B%BE.png)
下拉菜单的change事件处理程序流程图<br>
![筛选按钮的click事件处理程序流程图](https://github.com/danglisheng/neighborhood_map/raw/master/program_flow_chart/%E7%AD%9B%E9%80%89%E6%8C%89%E9%92%AE%E7%9A%84click%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E7%A8%8B%E5%BA%8F%E6%B5%81%E7%A8%8B%E5%9B%BE%20.png)
筛选按钮的click事件处理程序流程图<br>
![地点列表项的click事件处理程序流程图](https://github.com/danglisheng/neighborhood_map/raw/master/program_flow_chart/%E5%9C%B0%E7%82%B9%E5%88%97%E8%A1%A8%E9%A1%B9%E7%9A%84click%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E7%A8%8B%E5%BA%8F%E6%B5%81%E7%A8%8B%E5%9B%BE.png)
地点列表项的click事件处理程序流程图<br>
![markerAniForClickedLoc()的程序流程图](https://github.com/danglisheng/neighborhood_map/raw/master/program_flow_chart/markerAniForClickedLoc()%E7%9A%84%E7%A8%8B%E5%BA%8F%E6%B5%81%E7%A8%8B%E5%9B%BE.png)
markerAniForClickedLoc()的程序流程图<br>