const INITIAL_STATE = { mapData:null };


function mapReducer(state = INITIAL_STATE,action){
	switch(action.type){
		case 'MAP_DATA':
			console.log("Map reducer work!",action.payload);
			return {...state,mapData:action.payload}
		default:
			return state;
	}
}
export default mapReducer;
