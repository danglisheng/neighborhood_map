import { combineReducers } from "redux";
const focusedId=(state="",action)=>{
	switch(action.type){
		case "SET_FOCUSED_LOC":
			if((action.id===undefined)||(state===action.id)){
				return "";
			}
			else {
				return action.id;
			}
		default:
			return state;
	}
}
const addLoc=(state=[],action)=>{
	switch(action.type) {
		case "ADD_LOC":
			return [...state,action.loc];
		default:
			return state;
	}
}
const addMarker=(state=[],action)=>{
	switch(action.type) {
		case "ADD_MARKER":
			return [...state,action.marker];
		default:
			return state;
	}
}
var initialLocVisi=new Array(8).fill(true);
const setVisibility=(state=initialLocVisi,action)=>{
	switch(action.type) {
		case "SET_ALL_VISIBILITY":
			return action.visibleArr;
		default:
			return state;
	}
}
const reducer=combineReducers({
	focusedId,
	locations:addLoc,
	locsVisi:setVisibility,
	markersArr:addMarker
});
export default reducer;