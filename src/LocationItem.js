import React,{ Component } from 'react'
class LocationItem extends Component {
	constructor(props) {
		super(props);
		this.locationItem=React.createRef();
		this.locEnterHandler=this.locEnterHandler.bind(this);
	}
	locEnterHandler(e){
		if(e.keyCode===13){
			this.props.locClickHandler(this.locationItem.current);
		}
	}
	render(){
		const location=this.props.location;
		return(
			<li className='location-name'
					id={location.id}
					tabIndex="0"
					ref={this.locationItem}
					onKeyDown={this.locEnterHandler}
					onClick={()=>{this.props.locClickHandler(this.locationItem.current)}}>
					{location.name}</li>

			)
	}
}
export default LocationItem