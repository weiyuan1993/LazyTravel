export default function(state=[],action){
	switch(action.type){
		case 'PLACE_DATA':
			//console.log(action.content);
			return action.payload;
		default:
			return state;
	}
}
