
const INITIAL_STATE = { planData:[],localData:[],planNoteData:null};

function planReducer( state = INITIAL_STATE,action){
  switch(action.type){
    case "ADD_PLAN":
      return {...state,planData:[...state.planData,action.payload]}
    case "ADD_LOCAL_PLAN":
      return {...state,localData:action.payload}
    case "GET_PLAN_NOTE":
      return {...state,planNoteData:action.payload}
    case "DELETE_ALL_LOCAL_PLAN":
      return {...state,localData:[]}
    default:return state;
  }
}
export default planReducer;
