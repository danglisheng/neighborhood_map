
/*global AMap */
import React, { Component } from "react";
import "./App.css";
import Utils from "../utils";
import FilterAreaWrapper from "../containers/FilterAreaWrapper";
import AppHeader from "./AppHeader";
import LocationListWrapper from "../containers/LocationListWrapper"
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLocsLoaded: false, //地点数据是否被加载
            isMapLoaded: false, //地图是否被加载
            isMarkersAdded: false, //标记是否被添加
            locsError: null, //地点数据加载错误
           
        };
        this.map = null;
    }
    /* 在App组件安装后，同时异步加载位置数据和地图API,并在它们的回调函数中做判断，仅当两者都加载完成，才在地图上添加标记。*/
    componentDidMount() {
        /* 获取位置数据 */
        Utils.fetchData("./data/poi.json", (data, error) => {
            if (data) {
                const { isMapLoaded, isMarkersAdded } = this.state;
                const locations = Utils.getLocations(data);
                locations.forEach((location)=>{
                    this.props.addLoc(location);
                })
                this.setState({
                    isLocsLoaded: true
                });
                /* 若已加载地图，但还未添加标记，则添加标记*/
                if (isMapLoaded && !isMarkersAdded) {
                    console.log("地图加载，未添加标记 locations",locations);
                    const markersArr = Utils.initAllMarkers(locations);
                    markersArr.forEach(marker=>{
                        this.props.addMarker(marker);
                    })
                    this.setState({ isMarkersAdded: true });
                }
            } 
             if (error) {
                this.setState({ locsError: error });
            }
        });
        /* 地图初始化函数，在加载完高德地图API后被调用 */
        window.initMap = () => {
            /* 把指示地图加载完成的状态设为真 */
            this.setState({ isMapLoaded: true });
            const { isMarkersAdded } = this.state;
            window.map = new AMap.Map("map", {
                zoom: 12, //地图缩放级别
                center: [116.397428, 39.90923], //中心点坐标
                viewMode: "3D" //使用3D视图
            });

            window.map.plugin(["AMap.ToolBar"], function() {
                window.map.addControl(new AMap.ToolBar());
            });
            window.infoWindow = new AMap.InfoWindow({
                isCustom: true,
                offset: new AMap.Pixel(30, -40)
            });
            /* 地点数据已被加载但还未添加标记 */
            if (this.props.locations.length && !isMarkersAdded) {
                const markersArr = Utils.initAllMarkers(this.props.locations);
                this.setState({ isMarkersAdded: true });
                markersArr.forEach(marker=>{
                        this.props.addMarker(marker);
                    })
            }
            /* 使用tab键切换焦点时，忽略#map元素中的object元素*/

            if (this.map.querySelector("object")) {
                this.map
                    .querySelector("object")
                    .setAttribute("tabindex", "-1");
            }
        };
        /* 加载高德地图API */
        Utils.loadAmapAPI();
        /* 当改变窗口宽度时，重置菜单状态*/
        Utils.resetMenuWhileResizeWin();
    }
    render() {
        const { isLocsLoaded, locsError } = this.state;
        return (
            <div className="App">
                <AppHeader />
                <div className="control-panel">
                    <FilterAreaWrapper/>
                    <LocationListWrapper
                        error={locsError}
                        isLoaded={isLocsLoaded}
                        locations={this.props.locations}
                        locsVisi={this.props.locsVisi}
                        markers={this.props.markersArr}
                    />
                </div>
                <div id="map-wrapper">
                    <div id="map" ref={(ele)=>{this.map=ele;}} role="application" />
                </div>
            </div>
        );
    }
}

export default App;
