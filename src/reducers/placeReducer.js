const INITIAL_STATE = { placeData:[] };


function placeReducer(state = INITIAL_STATE,action){
	switch(action.type){
		case 'PLACE_DATA':
			console.log(action.payload);
			return {...state,placeData:action.payload}
		default:
			return state;
	}
}
export default placeReducer;
