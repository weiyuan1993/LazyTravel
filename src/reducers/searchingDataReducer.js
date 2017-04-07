const INITIAL_STATE = { searchingData:[],nextPage:false,pagination:''};


function searchingDataReducer(state = INITIAL_STATE,action){
	switch(action.type){
		case 'SEARCHING_DATA':
			console.log("SEARCHING_DATA",action.payload);
			return {...state,searchingData:action.payload}
		case 'HAS_NEXT_PAGE':
			console.log("HAS_NEXT_PAGE",action.payload);
			return {...state,nextPage:action.payload}
		case 'PAGINATION':
			console.log("PAGINATION",action.payload);
			return {...state,pagination:action.payload}
		default:
			return state;
	}
}
export default searchingDataReducer;
