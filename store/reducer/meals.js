import {MEALS} from '../../data/dummy-data'
import {TOGGLE_FAVORITE} from '../action/meals' 
import {SET_FILTERS} from '../action/meals' 

const initialSate = {
	meals: MEALS,
	filterMeals: MEALS,
	favmeals:[],
}

const mealsReducer = (state = initialSate, action) =>{
	switch(action.type){
		case TOGGLE_FAVORITE:
			const index = state.favmeals.findIndex(x => x.id == action.mealId)
			if (index>=0){
				const ul = state.favmeals
				ul.splice(index,1)

				return {...state,favmeals : ul}
			}
			else{
				return{...state, favmeals: state.favmeals.concat(state.meals.find(x => x.id === action.mealId))}
			}
		case SET_FILTERS:
			const appliedfilters = action.filter
			const filteredMeals = state.meals.filter(meal =>{
				if (appliedfilters.g && !meal.isGlutenFree){
					return false
				}
				if (appliedfilters.l && !meal.isLactoseFree){
					return false
				}

				if (appliedfilters.v && !meal.isVegetarian){
					return false
				}

				if (appliedfilters.vegan && !meal.isVegan){
					return false
				}

				return true
			})
			return{...state,filterMeals : filteredMeals}
		default:
			return state
	}
	return state;
}

export default mealsReducer