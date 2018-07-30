import React,{ Component } from 'react'
import LocationItem from './LocationItem'
import Util from './utils.js'
class LocationList extends Component {
	constructor(props){
		super(props);
		this.listNode=React.createRef();
		this.locClickHandler=this.locClickHandler.bind(this);
	}
	locClickHandler(clickedLocation,e){
		
		e.preventDefault();
		const markers=this.props.markers;
		var listNode=this.listNode.current;
		/* 若标记数组的长度不为零 */
		if(markers.length) {
			/* 遍历标记数组 */
			markers.forEach((mk)=>{
				/* 若该标记不对应列表中被点击的地点项，则取消动画效果 */
				if(mk.id.toString()!==clickedLocation.id) {
					mk.setAnimation('AMAP_ANIMATION_NONE');
				}
				/* 若该标记对应列表中被点击的地点项 */
				else {
					Util.markerAniForClickedLoc(mk,clickedLocation);//确定标记动画
					Util.populateInfoWindow(mk,clickedLocation); //确定信息窗体状态
				}
			});
		}
		listNode.querySelectorAll(".location-name").forEach((location)=>{
			/* 若位置未被点击，则移除表示选中的类名 */
			if(location!==clickedLocation){
				location.classList.remove("location-focus");
			}
			/* 若位置被点击，则切换表示选中的类名*/
			else {
				location.classList.toggle("location-focus");
				
			}
		})
	}
	
	render(){
		const { error,isLoaded,locations }= this.props;
		if(error) {
			return (<div>出错了：{error.toString()}</div>)
		}
		else if(!isLoaded) {
			return (
				<div className="loc-list-wrapper">
					<div className="loader">

					</div>
				</div>
			)
			
		}
		else {
			const locationsName=locations.map((location)=>{
				return (<LocationItem location={location} 
				 locClickHandler={this.locClickHandler}
				 key={location.id}/>
					)
			})
			return (
			 <div className="loc-list-wrapper">
				<ul className="locations-list" ref={ this.listNode }>
					{locationsName}
				</ul>
			 </div>
				)
		}
	}
}
export default LocationList