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

step 1

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

import {createStore} from 'redux';


//2. reduce 함수는 각각의 action이 state를 어떻게 변경할지 작성합니다
function reducer(state,action) {
  switch(store.type) {
    case 'increase' :
    return state +1;
    case 'decrease' :
    return state -1;
  }
}

//1. 앱의 상태를 보관하는 redux 저장소를 만듭니다
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
