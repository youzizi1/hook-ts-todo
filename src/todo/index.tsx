import React, { useState, useCallback, memo, useEffect, useMemo } from "react";
import styled from "styled-components";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Todo as TodoModel } from "./components/TodoList";
import { useFetchData } from "../hooks";
import { Spin, Result } from "antd";

const TodoStyle = styled.div`
  width: 80%;
  min-width: 200px;
  max-width: 500px;
  margin: 100px auto 0;
`;

const TodoTitleStyle = styled.h1`
  display: flex;
  justify-content: center;
`;

const LoadingStyle = styled.div`
  padding-top: 20px;
  text-align: center;
`;

interface TodoProps {
  title: string;
}

const Todo = (props: TodoProps) => {
  const [inputVal, setInputVal] = useState("");
  const [todoList, setTodoList] = useState<TodoModel[]>([]);
  const { data, loading, error } = useFetchData();

  useEffect(() => {
    setTodoList(data);
  }, [data]);

  const { title } = props;

  const changeInputVal = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const addTask = useCallback(() => {
    if (!inputVal) {
      alert("请输入任务");
      return;
    }
    setTodoList([...todoList, { task: inputVal }]);
    setInputVal("");
  }, [todoList, inputVal]);

  const deleteTask = useCallback(
    (index: number) => {
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    },
    [todoList]
  );

  const renderTodoList = () => {
    if (loading) {
      return (
        <LoadingStyle>
          <Spin />
        </LoadingStyle>
      );
    }

    if (error) {
      return <Result status="error" title="数据加载错误" />;
    }

    return <TodoList todoList={todoList} deleteTask={deleteTask} />;
  };

  return (
    <TodoStyle>
      {useMemo(
        () => (
          <TodoTitleStyle>{title}</TodoTitleStyle>
        ),
        [title]
      )}
      <TodoInput
        inputVal={inputVal}
        changeInputVal={changeInputVal}
        addTask={addTask}
      />
      {renderTodoList()}
    </TodoStyle>
  );
};

Todo.defaultProps = {
  title: "Todos"
};

export default memo(Todo);
