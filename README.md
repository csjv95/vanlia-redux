# Reduex

## what

Redux는 "action"이라는 이벤트를 사용하여 애플리케이션 상태를 관리하고 업데이트하기위한 패턴 및 라이브러리입니다. 상태가 예측 가능한 방식으로만 업데이트 될 수 있도록 보장하는 규칙과 함께 전체 애플리케이션에서 사용해야하는 상태에 대한 중앙 저장소 역할을합니다.

## why

Redux는 글로벌 상태를 관리하는데 도움이 됩니다.
Redux에서 사용하는 패턴과 도구를 사용하면 앱의 상태가 언제,어디서,왜, 어떻게 업데이트 되는지, 그리고 이러한 변경이 일어날때 앱의 로직이 어떻게 작동하는지 보다 쉽게 이해할 수 있습니다

## when

모든 앱에서 Redux가 필요하고 무조건 좋은것은 아닙니다 다음과 같이 필요로 할때 사용하는게 좋습니다

- 앱의 여러 위치에 필요한 많은 양의 상태(state)가 있을때
- 상태가 시간이 지남에 따라 자주 업데이트될떄
- 해당 상태를 업데이트하는 논리가 복잡할땨
- 앱 중간에 대형 코드 베이스르 가지고 있고 많은 사람들이 작업을 할때

## # Vanilla reduex

## step 1 

- 앱의 상태 전부는 하나의 저장소인 store 객체 트리에 저장됩니다
- 상태 트리를 변경 하는 유일한 방법은 무엇이 일어날지 서술하는 객체인 action을 보냅니다
- action이 상태 트리를 어떻게 변경할지 reduce에 명시해야 합니다


```
<!-- redux  
{
  dispatch: ƒ dispatch(action)
  getState: ƒ getState()
  replaceReducer: ƒ replaceReducer(nextReducer)
  subscribe: ƒ subscribe(listener)
  Symbol(observable): ƒ observable()
  __proto__: Object
}
-->

import {createStore} from 'redux'; //1. state 저장소를 사용하기 위해 import


//3. reducer 함수는 각각의 action이 state를 어떻게 변경할지 작성합니다
function reducer(state,action) {
  switch(store.type) {
    case 'increase' :
    return state +1;
    case 'decrease' :
    return state -1;
  }
}

//2. 앱의 상태를 보관하는 redux 저장소를 만듭니다
const store = createStore(reducer);

//subscribe 상태변화에 따라 ui를 변경 가능하게 하줍니다
//getState state를 가져옵니다
store.subscribe(()=> {
  return console.log(getState());
})

//dispatch action으로 내부 상태를 변경 
store.dispatch({type : 'increment'}); // reducer에서 increment => state + 1 => state = 1
store.dispath({type : 'decrement'}); //reducer에서 decrement => state -1 => state = 0
```

### step 2

* todo list state 관리하기

```
import { createStore } from "redux";  //1. state 저장소를 사용하기 위해 import

const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");


 // 3. reducer 함수는 각각의 action이 state를 어떻게 변경할지 작성합니다
const reducer = (state = [], action) => {
  switch (action.type) {
    case "add": // dispatch 'add'가 action에 보내지면 
      return [{ text: action.text, id: Date.now() }, ...state]; // state에 받은 text와 id를 저장합니다 
    case "delete": // dispatch 'delete'가 action에 보내지면 
      return state.filter((toDo) => toDo.id !== action.id); // action으로 받은 id와 state에 있는 각각의 id를 비교해서 return 합니다
    default:
      return state;
  }
};

const store = createStore(reducer); // 2. state 저장소를 만듭니다

const paintToDos = () => {
  const toDos = store.getState();
  list.innerHTML = "";
  toDos.map((todo) => {
    const li = document.createElement('li');
    const li__btn = document.createElement('button');
    li__btn.innerHTML = 'DEL';
    li.id = todo.id;
    li.innerHTML = todo.text;
    li.appendChild(li__btn);

    // delete 버튼이 클릭될때 현재의 id값을 action에 업데이트 합니다
    li__btn.addEventListener('click', (event) => {
      const toDoId = parseInt(event.target.parentNode.id);  //HTML로 받은 id는 string형태
      console.log(event.target.parentNode.id);
      console.log(toDoId);
      store.dispatch({type : 'delete', id : toDoId})
    })

    return list.appendChild(li);
  });

};

// 상태가 변화 한다면 paintToDos를 합니다
store.subscribe(paintToDos);


const dispatchAddToDo = (toDo) => {
  store.dispatch({ type: "add", text: toDo });
};

// ADD 버튼이 쿨릭될때 추가 input에 있는 값을 state에 추가해야 되므로 dispatch로 action을 업데이트 합니다
const btnClick = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

btn.addEventListener("click", btnClick);
```
