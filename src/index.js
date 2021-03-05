import { createStore } from "redux";

const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");

const reducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [{ text: action.text, id: Date.now() }, ...state];
    case "delete":
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

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

    li__btn.addEventListener('click', (event) => {
      const toDoId = parseInt(event.target.parentNode.id);  //HTML로 받은 id는 string형태
      console.log(event.target.parentNode.id);
      console.log(toDoId);
      store.dispatch({type : 'delete', id : toDoId})
    })

    return list.appendChild(li);
  });

};

store.subscribe(paintToDos);

const dispatchAddToDo = (toDo) => {
  store.dispatch({ type: "add", text: toDo });
};

const btnClick = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

btn.addEventListener("click", btnClick);
