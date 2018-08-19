import LocationList from "../components/LocationList";
import { connect } from 'react-redux';
import {setFocusedLoc} from '../actions'
const mapStateToProps = state=>{
	return {
		focusedLocId:state.focusedId
	}
}
const mapDispatchToProps=dispatch=>{
	return {
		onToggleFocus:(id)=>{
			dispatch(setFocusedLoc(id));
		}
	}
}
//容器组件
const LocationListWrapper=connect(mapStateToProps,mapDispatchToProps)(LocationList);
export default LocationListWrapper;