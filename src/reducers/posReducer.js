const INITIAL_STATE = { posData:null };


function posReducer(state = INITIAL_STATE,action){
	switch(action.type){
		case 'POS_DATA':
			return {...state,posData:action.payload}
		default:
			return state;
	}
}
export default posReducer;
