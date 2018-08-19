import { connect } from 'react-redux';
import {addLoc} from '../actions';
import {setAllVisibility} from '../actions';
import {addMarker} from "../actions";
import App from "../components/App"
const mapStateToProps = state=>{
	return {
		locations:state.locations,
		locsVisi:state.locsVisi,
		markersArr:state.markersArr
	}
}
const mapDispatchToProps=dispatch=>{
	return {
		addLoc:(location)=>{
			dispatch(addLoc(location));
		},
		setVisi:(visibleArr)=>{
			dispatch(setAllVisibility(visibleArr));
		},
		addMarker:(marker)=>{
			dispatch(addMarker(marker));
		}
	}
}
const AppWrapper=connect(mapStateToProps,mapDispatchToProps)(App);
export default AppWrapper;