import React,{ Component } from 'react'
class FilterArea extends Component {
	constructor(props) {
		super(props);
		this.textInputNode=React.createRef();
	}
	render() {
		const filterLocsBySelect=this.props.filterLocsBySelect;
		const filterLocsByKeyword=this.props.filterLocsByKeyword;
		return (
			<div className="filter-area">
				<div className="filter-select">
					<label htmlFor="locationSelect">地点类型</label>
					<select id="locationSelect" 
					onChange={()=>{filterLocsBySelect(true)}}
					aria-describedby="locTypeDescription">
						<option value="all">所有类型</option>
						<option value="touristAttraction">旅游景点</option>
						<option value="subwayStation">地铁站</option>
						<option value="mall">商场</option>
					</select>
					<div id="locTypeDescription" hidden >该下拉菜单用于从地点列表中筛选出指定类型的地点</div>
				</div>
				<div className="filter-input">
					<input placeholder="请输入关键字查询" 
					 id="filterText"
					ref={ this.textInputNode }
					aria-label="在此输入用于过滤地点列表的关键字"></input>
					<button onClick={()=>{filterLocsByKeyword(this.textInputNode.current)}} aria-label="点击按钮后用文本框中输入的字符过滤地点列表">过滤</button>
				</div>
			</div>
			)
	}
}
export default FilterArea