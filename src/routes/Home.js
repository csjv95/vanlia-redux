import React, { useState } from "react";
import { connect } from "react-redux";
import Todo from "../componets/Todo";
import { actionCreators } from "../store";

const Home = ({ toDos, addToDo }) => {
  console.log(toDos);
  const [text, setText] = useState("");
  const onChange = (event) => {
    setText(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setText("");
    addToDo(text);
  };
  return (
    <>
      <h1>ToDo</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <Todo {...toDo} key={toDo.id}/>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state, hasOwn) => {
  return { toDos: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
