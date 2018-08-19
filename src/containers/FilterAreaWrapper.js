import FilterArea from "../components/FilterArea";
import {setAllVisibility} from "../actions";
import {setFocusedLoc} from "../actions";
import {connect} from "react-redux";
const mapStateToProps = state=>{
	return {
		locations:state.locations,
		markersArr:state.markersArr
	}
}
const mapDispatchToProps=dispatch=>{
	return {
		setAllVisibility:(visibleArr)=>{
			dispatch(setAllVisibility(visibleArr));
		},
		setFocusedLoc:()=>{
			dispatch(setFocusedLoc());
		}
	}
}
const FilterAreaWrapper=connect(mapStateToProps,mapDispatchToProps)(FilterArea);
export default FilterAreaWrapper;