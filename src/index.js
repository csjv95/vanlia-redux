import {createStore} from 'redux';

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const number = document.querySelector('.number');

const reducer = (state = 0, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement' :
      return state - 1;
    default: return state;
  }

}

const store = createStore(reducer);

store.subscribe(()=> {
  number.innerHTML = store.getState();
})


plus.addEventListener('click', ()=> {
  console.log(store);
  return store.dispatch({type : 'increment'});
})

minus.addEventListener('click', () => {
  return store.dispatch({type : 'decrement'})
})
