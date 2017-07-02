
const INITIAL_STATE = { planData:[],planNoteData:{planNote:"來新增一些行程吧!"},nowDay:1};

function planReducer( state = INITIAL_STATE,action){
  switch(action.type){
    case "ADD_PLAN":
      console.log(action.payload);
      return {...state,planData:[...state.planData,action.payload]}
    case "GET_PLAN_NOTE":
      return {...state,planNoteData:action.payload}
    case "NOW_DAY":
      return {...state,nowDay:action.payload}
    default:return state;
  }
}
export default planReducer;
