'use client'
import TailButton from "@/components/TailButton"
interface Todo {
  id : string ;
  text : string ;
  completed : "O" | "X" ;
}

interface TodoItemProps {
  todo : Todo;
  onDelete : (id:string) => void;
  onToggle : (id:string) => void
}
export default function TodoItem({ todo, onDelete, onToggle } : TodoItemProps) {
  return (
    <li className="w-full border border-gray-300 rounded-lg
                    flex justify-between items-center
                    m-1 px-4 py-1">
      <div>
        <span>
          {todo.completed === 'O' ? '✅ ' : '🔲 '}
        </span>
        <span className={todo.completed === 'O' ? "text-red-500 line-through" : ''}
          onClick={() => onToggle(todo.id)}>{todo.text}</span>
      </div>
      <TailButton caption="삭제"
        color="blue"
        onClick={() => onDelete(todo.id)} />
    </li>
  )
}
