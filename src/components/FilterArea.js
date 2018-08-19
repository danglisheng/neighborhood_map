import React, { Component } from "react";
class FilterArea extends Component {
    constructor(props) {
        super(props);
        this.textInputNode = null;
        this.selectNode = null;
    }
    showAllMarkers=()=> {
        const markers = this.props.markersArr;
        markers.forEach(marker => {
            marker.show();
        });
    }
    filterLocsBySelect = (isInvokedBySelect, e) => {
        if (e) {
            e.preventDefault();
        }
        var visibleArr = new Array(8);
        const locations = this.props.locations;
        const selectNode = this.selectNode;
        window.infoWindow.close(); //关闭信息窗体
        this.props.setFocusedLoc(); //取消高亮
        const locationType = selectNode[selectNode.selectedIndex].value; //下拉菜单所选选项的值

        if (locationType !== "all") {
            locations.forEach((location, index) => {
                visibleArr[index] = location.type === locationType;
                
            });
            this.filterMarkersBySelect(visibleArr);
        } else {
            visibleArr.fill(true);
            
            this.showAllMarkers();
        }
        /* 如果由下拉菜单的change事件直接触发，则把筛选后的地点显隐数组保存到store的状态中 */
        if (isInvokedBySelect) {
            this.textInputNode.value = "";
            this.props.setAllVisibility(visibleArr);
        }
        return visibleArr;
    };
    
    filterMarkersBySelect=(visibleArr)=> {
        const markers = this.props.markersArr;
        markers.forEach((marker,idx) => {
            marker.setAnimation("AMAP_ANIMATION_NONE"); //取消所有标记动画
            if (visibleArr[idx]) {
                marker.show();
            } else {
                marker.hide();
            }
        });
    }
    /* 筛选按钮的click事件的事件处理程序
     * 它会根据文本输入框的值对地点数组进行筛选
     */
    filterLocsByKeyword = (e) => {
        e.preventDefault();
        const locations = this.props.locations;
        /* 关键词筛选所用地点显隐数组来自下拉菜单筛选所得的结果*/
        var visibleArr = this.filterLocsBySelect();
        var textInputNode = this.textInputNode;
        const keyWord = textInputNode.value.trim();
        visibleArr.forEach((locVisiPointer,idx) => {
            if(locVisiPointer){
                visibleArr[idx]=locations[idx].name.indexOf(keyWord) !== -1;
            }
            
        });
        /* 只显示过滤后地点数组的相关标记 */
        this.filterMarkersByKeyword(visibleArr);
        /* 设置store中地点显隐数组 */
        this.props.setAllVisibility(visibleArr);
    };
    filterMarkersByKeyword=(visibleArr)=>{
        const markers = this.props.markersArr;
        markers.forEach((marker,idx) => {
            marker.hide();
            if(visibleArr[idx]) {
                 marker.show();
            }
            else {
                marker.hide();
            }
        });
    }
    render() {
        
        return (
            <div className="filter-area">
                <div className="filter-select">
                    <label htmlFor="locationSelect">地点类型</label>
                    <select
                        id="locationSelect"
                        ref={ele => {
                            this.selectNode = ele;
                        }}
                        onChange={e => {
                            this.filterLocsBySelect(true, e);
                        }}
                        aria-describedby="locTypeDescription"
                    >
                        <option value="all">所有类型</option>
                        <option value="touristAttraction">旅游景点</option>
                        <option value="subwayStation">地铁站</option>
                        <option value="mall">商场</option>
                    </select>
                    <div id="locTypeDescription" hidden>
                        该下拉菜单用于从地点列表中筛选出指定类型的地点
                    </div>
                </div>
                <div className="filter-input">
                    <input
                        placeholder="请输入关键字查询"
                        id="filterText"
                        ref={ele => {
                            this.textInputNode = ele;
                        }}
                        aria-label="在此输入用于过滤地点列表的关键字"
                    />
                    <button
                        onClick={e => {
                            this.filterLocsByKeyword(e);
                        }}
                        aria-label="点击按钮后用文本框中输入的字符过滤地点列表"
                    >
                        过滤
                    </button>
                </div>
            </div>
        );
    }
}
export default FilterArea;
