import React, { memo } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const TodoInputStyle = styled.div`
  display: flex;
`;

interface TodoInputProps {
  inputVal: string;
  changeInputVal: (e: React.FormEvent<HTMLInputElement>) => void;
  addTask: () => void;
}

const TodoInput = (props: TodoInputProps) => {
  const { inputVal, changeInputVal, addTask } = props;

  return (
    <TodoInputStyle>
      <Input value={inputVal} onChange={changeInputVal} />
      <Button type="primary" onClick={addTask}>
        Add Task
      </Button>
    </TodoInputStyle>
  );
};

export default memo(TodoInput);
