import React, { Component } from "react";
import Util from "./utils.js";
class LocationList extends Component {
	constructor(props) {
		super(props);
		this.listNode = null;
		
		this.state={
			focusedLoc:''
		}
	}
	locEnterHandler=(e)=>{
		if(e.keyCode===13){
			this.locClickHandler(e);
		}
	}
	locClickHandler=(e)=> {
		e.preventDefault();
		console.log("e.target",e.target);
		console.log("e.target",e.target);
		const markers = this.props.markers;
		let  listNode = this.listNode;

		
		/* 若标记数组的长度不为零 */
		if (markers.length) {
			/* 遍历标记数组 */
			markers.forEach(mk => {
				/* 若该标记不对应列表中被点击的地点项，则取消动画效果 */
				if (mk.id.toString() !== e.target.id) {
					mk.setAnimation("AMAP_ANIMATION_NONE");
				} else {
				/* 若该标记对应列表中被点击的地点项 */
					Util.markerAniForClickedLoc(mk, e.target); //确定标记动画
					Util.populateInfoWindow(mk, e.target); //确定信息窗体状态
				}
			});
		}
		listNode.querySelectorAll(".location-name").forEach(location => {
			/* 若位置未被点击，则移除表示选中的类名 */
			if (location !== e.target) {
				location.classList.remove("location-focus");
			} else {
			/* 若位置被点击，则切换表示选中的类名*/
				location.classList.toggle("location-focus");
			}
		});
	}

	render() {
		const { error, isLoaded, locations } = this.props;
		if (error) {
			return <div>出错了：{error.toString()}</div>;
		} 
		else if (!isLoaded) {
			return (
				<div className="loc-list-wrapper">
					<div className="loader" />
				</div>
			);
		} 
		else {
			const locationsName = locations.map(location => {
				return (
					<li className='location-name'
					id={location.id}
					key={location.id}
					tabIndex="0"
					onKeyDown={(e)=>{this.locEnterHandler(e)}}
					onClick={(e)=>{ this.locClickHandler(e)}}>
					{location.name}</li>
				);
			});
			return (
				<div className="loc-list-wrapper">
					<ul className="locations-list" ref={(ele)=>{this.listNode=ele;}}>
						{locationsName}
					</ul>
				</div>
			);
		}
	}
}
export default LocationList;
