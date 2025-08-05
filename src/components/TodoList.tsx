import { useEffect, useRef, useState, type MouseEvent } from "react"
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import axios from "axios";
import type { Todo, completedT } from "../types/Todo";

export default function TodoList() {
    const [tdata, setTdata] = useState<Todo[]>([]);
    const selRef = useRef<HTMLSelectElement>(null);
    const ipRef = useRef<HTMLInputElement>(null);
    const url = `http://localhost:3005/todos`;

    const handleOk = (e: MouseEvent) => {
        e.preventDefault();
        if(!selRef.current || !ipRef.current) return; // 이렇게 해주면 밑에서 옵셔널 체이닝 안해도 된다!!!!!

        if(selRef.current.value == "") {
            alert("제목을 입력하세요.");
            selRef.current?.focus();
            return;
        }
        if(ipRef.current.value == "") {
            alert("제목을 입력하세요.");
            ipRef.current?.focus();
            return;
        }

        addTodo(ipRef.current.value, selRef.current.value as completedT); // 함수 실행구문에서도 타입을 명확히 해주는 것이 매우 중요!!!!!!
        handleReset(e);
    }

    const addTodo = async (text: string, completed: completedT) => {
        const postData = {
            "text": text,
            "completed": completed
        }

        let { data } = await axios.post(url, postData);
        setTdata([...tdata, data]);
    };

    const modifyTodo = async (id: string, completed: completedT) => {
        const postData = {
            "completed": completed == 'O' ? 'X' : 'O'
        }
        await axios.patch(url+`/${id}`, postData);
        getTodos();
    };

    const deleteTodo = async (id: string) => {
        await axios.delete(url+`/${id}`);
        getTodos();
    };

    const handleReset = (e: MouseEvent) => {
        e.preventDefault();
        if(selRef.current) selRef.current.value = "X";
        if(ipRef.current) ipRef.current.value = "";
    };

    const getTodos = async () => {
        const { data } = await axios.get(url);
        setTdata(data);
    };

    useEffect(() => {
        ipRef.current?.focus();
        getTodos();
    },[]);

  return (
    <div className="w-full">
        <p>TodoList</p>
        <TodoForm selRef={selRef} ipRef={ipRef} addHandle={handleOk} resetHandle={handleReset} />
        <ol className="w-full">
            {
                tdata.map((item, idx) => 
                            <TodoItem key={idx} 
                            item={item} 
                            onDelete={deleteTodo}
                            onUpdate={modifyTodo} />)
            }
        </ol>
    </div>
  )
}
