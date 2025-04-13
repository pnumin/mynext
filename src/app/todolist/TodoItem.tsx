'use client'
import axios from "axios";
import TailButton from "@/components/TailButton"

interface Todo {
  id : string ;
  text : string ;
  completed : "O" | "X" ;
}

interface TodoItemProps {
  todo : Todo; 
}
const baseUrl = "http://localhost:3005/todos"
export default function TodoItem({ todo } : TodoItemProps) {
  const handleDelete = async(id:string) => {
    await axios.delete(baseUrl+`/${id}`) ;
    window.location.reload(); // SSR이므로 새로고침 필요
  }

  const handleToggle = async(id:string) => {
    const resp = await axios.get<Todo>(baseUrl+`/${id}`) ;
    const todo = resp.data ;
 
    const done = todo.completed == "O" ? "X" : "O";
    await axios.patch(baseUrl+`/${id}`, {
      completed : done
    }) ;
    window.location.reload(); // SSR이므로 새로고침 필요
  }
  return (
    <li className="w-full border border-gray-300 rounded-lg
                    flex justify-between items-center
                    m-1 px-4 py-1">
      <div>
        <span>
          {todo.completed === 'O' ? '✅ ' : '🔲 '}
        </span>
        <span className={todo.completed === 'O' ? "text-red-500 line-through" : ''}
          onClick={() => handleToggle(todo.id)}>{todo.text}</span>
      </div>
      <TailButton caption="삭제"
        color="blue"
        onClick={() => handleDelete(todo.id)} />
    </li>
  )
}
