/*global AMap */
import React, { Component } from "react";
import "./App.css";
import LocationList from "./LocationList";
import Utils from './utils'
import FilterArea from './FilterArea'
import AppHeader from './AppHeader'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLocsLoaded: false, //地点数据是否被加载
            isMapLoaded: false, //地图是否被加载
            isMarkersAdded: false, //标记是否被添加
            locsError: null, //地点数据加载错误
            locations: [], //地点数组
            displayedLocations: [], //用于显示的地点数组
            markersArr: [] //标记数组
        };
        this.filterLocsByKeyword = this.filterLocsByKeyword.bind(this);
        this.filterLocsBySelect = this.filterLocsBySelect.bind(this);
        this.map = React.createRef();
    }
    /* 在App组件安装后，同时异步加载位置数据和地图API,并在它们的回调函数中做判断，仅当两者都加载完成，才在地图上添加标记。*/
    componentDidMount() {
        /* 获取位置数据 */
        Utils.fetchData("./data/poi.json", (data, error) => {
            if (data) {
                const { isMapLoaded, isMarkersAdded } = this.state;
                const locations = Utils.getLocations(data);
                this.setState({
                    isLocsLoaded: true,
                    locations: locations,
                    displayedLocations: locations
                });
                /* 若已加载地图，但还未添加标记，则添加标记*/
                if (isMapLoaded && !isMarkersAdded) {
                    const markersArr = Utils.initAllMarkers(locations);
                    this.setState({ isMarkersAdded: true });
                    this.setState({ markersArr: markersArr });
                }
            } else if (error) {
                this.setState({ locsError: error });
            }
        });
        /* 地图初始化函数，在加载完高德地图API后被调用 */
        window.initMap = () => {
            /* 把指示地图加载完成的状态设为真 */
            this.setState({ isMapLoaded: true });
            const { locations, isMarkersAdded } = this.state;
            window.map = new AMap.Map('map', {
                zoom: 12, //地图缩放级别
                center: [116.397428, 39.90923], //中心点坐标
                viewMode: '3D' //使用3D视图
            });

            window.map.plugin(["AMap.ToolBar"], function() {
                window.map.addControl(new AMap.ToolBar());
            });
            window.infoWindow = new AMap.InfoWindow({
                isCustom: true,
                offset: new AMap.Pixel(30, -40)
            });
            /* 地点数据已被加载但还未添加标记 */
            if (locations.length && !isMarkersAdded) {
                const markersArr = Utils.initAllMarkers(locations);
                this.setState({ isMarkersAdded: true });
                this.setState({ markersArr: markersArr });
            }
            /* 使用tab键切换焦点时，忽略#map元素中的object元素*/
            this.map.current.querySelector("object").setAttribute("tabindex", "-1");
        };
        /* 加载高德地图API */
        Utils.loadAmapAPI();
        /* 当改变窗口大小时，重置菜单状态*/
        Utils.resetMenuWhileResizeWin();
    }
    /* 下拉菜单的change事件的事件处理程序
     * 它接收一个布尔值isInvokedBySelect作为参数，
     * 指示此程序是否由下拉列表的change事件直接触发
     * 函数返回筛选后的地点数组。
     */
    filterLocsBySelect(isInvokedBySelect) {
        const locations = this.state.locations;
        const markers = this.state.markersArr;
        const selectNode = document.getElementById("locationSelect");
        var displayedLocations = locations;
        window.infoWindow.close(); //关闭信息窗体
        /*如果由高亮的列表项，则取消高亮*/
        if(document.querySelector(".location-focus")){
            document.querySelector(".location-focus").classList.remove("location-focus");
        }
        const index = selectNode.selectedIndex;
        const locationType = selectNode[index].value; //下拉菜单所选选项的值
        /* 如果该事件处理程序是由下拉列表的change事件直接触发，
         * 而非被其他函数调用，则清空文本输入框。
         */
        if (isInvokedBySelect) {
            document.getElementById("filterText").value = '';
        }
        /* 若下拉菜单所选选项不是“所有类型” */
        if (locationType !== 'all') {
            /* 从包含所有地点的数组中筛选出选中类型的地点，组成新的数组 */
            displayedLocations = locations.filter((location) => {
                return location.type === locationType;
            });
            /* 只显示与所选选项同类型的标记 */
            Utils.filterMarkersBySelect(markers, locationType);
            /* 如果由下拉菜单的change事件直接触发，则把筛选后的地点数组保存到App组件的状态中 */
            if (isInvokedBySelect) {
            this.setState({ displayedLocations: displayedLocations });
        }
        } else {
            /* 把指示要显示地点的状态重置为所有地点数组*/
            this.setState({ displayedLocations: this.state.locations });
            /* 显示所有标记 */
            Utils.showAllMarkers(markers);
        }
        return displayedLocations;
    }
    /* 筛选按钮的click事件的事件处理程序
     * 它会根据文本输入框的值对地点数组进行筛选
     */
    filterLocsByKeyword(textInputNode) {
        const markers = this.state.markersArr;
        /* 关键词筛选所用地点数组来自下拉菜单筛选所得的结果*/
        var displayedLocations = this.filterLocsBySelect();
        /* 若传入了文本框DOM节点 */
        if (textInputNode) {
            const keyWord = textInputNode.value.trim();
            /* 筛选出name属性名中包含关键字的地点，组成一个新数组 */
            displayedLocations = displayedLocations.filter((location) => {
                return location.name.indexOf(keyWord) !== -1;
            });
            /* 只显示过滤后地点数组的相关标记 */
            Utils.filterMarkersByKeyword(markers, displayedLocations);
            /* 设置App组件中指示待显示地点数组的状态 */
            this.setState({ displayedLocations: displayedLocations });
        }

    }
    render() {
            const { isLocsLoaded, locsError } = this.state;
            return (
                <div className = "App" >
                    <AppHeader / >
                    <div className = "control-panel" >
                        <FilterArea filterLocsByKeyword = { this.filterLocsByKeyword } filterLocsBySelect = { this.filterLocsBySelect }/>  
                        <LocationList error = { locsError } isLoaded = { isLocsLoaded } locations = { this.state.displayedLocations } markers = { this.state.markersArr }/>
                    </div> 
                    <div id = "map" ref = { this.map } role = "application" >
                    </div> 
                </div >
            );
    }
}

export default App;