import React, {memo} from "react";
import styled from "styled-components";
import { List, Button } from "antd";

const TodoItemStyle = styled.div`
  padding-top: 10px;
`;

export interface Todo {
  task: string;
}

interface TodoListProps {
  todoList: Todo[];
  deleteTask: (inedx: number) => void;
}

const TodoList = (props: TodoListProps) => {
  const { todoList, deleteTask } = props;

  return (
    <TodoItemStyle>
      <List
        bordered
        dataSource={todoList}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button
                type="danger"
                size="small"
                onClick={() => deleteTask(index)}
              >
                delete
              </Button>
            ]}
          >
            {todo.task}
          </List.Item>
        )}
      />
    </TodoItemStyle>
  );
};

TodoList.defaultProps = {
  todoList: []
};

export default memo(TodoList);
