const setFocusedLoc = (id) => {
	return {
		type:"SET_FOCUSED_LOC",
		id:id
	}
}
const addLoc=(loc)=>{
	return {
		type:"ADD_LOC",
		loc:loc
	}
}
const setAllVisibility=(visibleArr)=>{
	return {
		type:"SET_ALL_VISIBILITY",
		visibleArr:visibleArr
	}
}
const addMarker=(marker)=>{
	return {
		type:"ADD_MARKER",
		marker:marker
	}
}
export { setFocusedLoc,addLoc,setAllVisibility,addMarker };