import React,{ Component } from 'react'
class LocationItem extends Component {
	constructor(props) {
		super(props);
		this.locationItem=React.createRef();
		this.locEnterHandler=this.locEnterHandler.bind(this);
	}
	locEnterHandler(e){
		if(e.keyCode===13){
			this.props.locClickHandler(this.locationItem.current,e);
		}
	}
	render(){
		const location=this.props.location;
		return(
			<li className='location-name'
					id={location.id}
					tabIndex="0"
					ref={this.locationItem}
					onKeyDown={(e)=>{this.locEnterHandler(e)}}
					onClick={(e)=>{this.props.locClickHandler(this.locationItem.current,e)}}>
					{location.name}</li>

			)
	}
}
export default LocationItem