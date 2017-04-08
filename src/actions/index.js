export function saveMapData(map){
  return {
    type:'MAP_DATA',
    payload:map
  }
}
export function savePosData(pos){
  return {
    type:'POS_DATA',
    payload:pos
  }
}

export function getPlaceData(placeData){
  return {
    type:'PLACE_DATA',
    payload:placeData
  }
}

export function nowPosition(pos){
  return {
    type:'NOW_POSITION',
    payload:pos
  }
}

export function action_searchingData(searchingData){
  return {
    type:'SEARCHING_DATA',
    payload:searchingData
  }
}
export function action_nextPage(nextPage){
  return {
    type:'HAS_NEXT_PAGE',
    payload:nextPage
  }
}
export function action_pagination(pagination){
  return {
    type:'PAGINATION',
    payload:pagination
  }
}

export function action_addPlan(plan){
  return{
    type:'ADD_PLAN',
    payload:plan
  }
}
export function action_addLocalPlan(plan){
  return{
    type:'ADD_LOCAL_PLAN',
    payload:plan
  }
}
