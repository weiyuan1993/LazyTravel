
const INITIAL_STATE = { planData:[],localData:localStorage.plansArray?localStorage.plansArray:[]};

function planReducer( state = INITIAL_STATE,action){
  switch(action.type){
    case "ADD_PLAN":
      console.log("redux",action.payload);
      return {...state,planData:[...state.planData,action.payload]}
    case "ADD_LOCAL_PLAN":
      console.log("local",action.payload);
      return {...state,localData:[...state.localData,action.payload]}
    default:return state;
  }
}
export default planReducer;
