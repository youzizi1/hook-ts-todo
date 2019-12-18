import { useState, useEffect } from "react";
import { getTodoListRequest } from "../http/api";
import { Todo } from '../todo/components/TodoList';

const useFetchData = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const result = await getTodoListRequest();
        setData(result.data.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export { useFetchData };
