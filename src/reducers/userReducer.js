const INITIAL_STATE = { userData:null };


function userReducer(state = INITIAL_STATE,action){
	switch(action.type){
		case 'USER_DATA':
      // console.log("REDUX",action.payload)
			return {...state,userData:action.payload}
		default:
			return state;
	}
}
export default userReducer;
