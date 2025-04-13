'use client'
import axios from "axios" 
import { useEffect , useState} from "react"
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const baseUrl = "http://localhost:3005/todos"

interface Todo {
  id : string ;
  text : string ;
  completed : "O" | "X" ;
}
export default function Todolist() {
  const [todos, setTodos] = useState<Todo[]>([]) ;

  const getData = async () => {
    const resp = await axios.get<Todo[]>(baseUrl) ;
    setTodos(resp.data) ;
  }

  const addTodo = async (text : string, completed : "O" | "X")  => {
    await axios.post(baseUrl, {
      text : text ,
      completed : completed
    })
    getData();
  }

  const handleDelete = async(id:string) => {
    await axios.delete(baseUrl+`/${id}`) ;
    getData();
  }

  const handleToggle = async(id:string) => {
    const resp = await axios.get<Todo>(baseUrl+`/${id}`) ;
    const todo = resp.data ;
 
    const done = todo.completed == "O" ? "X" : "O";
    await axios.patch(baseUrl+`/${id}`, {
      completed : done
    }) ;
    getData();
  }

  useEffect(() => {
    getData();
  } , []);

  useEffect(()=>{
    console.log(todos)
  }, [todos]) ;

  return (
    <>
      <div className="w-full h-40 min-h-40 bg-amber-50 mt-5
                          flex flex-col justify-center items-center">
        <h1 className='w-full text-2xl font-bold mb-5 text-center'>Todo List</h1>
        <TodoForm onAddTodo={addTodo} />
      </div>
      <ul className="w-10/12 flex flex-col p-5"> 
        {
          (todos.length == 0)
          ? <li>자료가 존재하지 않습니다.</li>
          : todos.map(item => <TodoItem key={item.id} 
                                        todo = {item}
                                        onDelete = {() => handleDelete(item.id)}
                                        onToggle = {() => handleToggle(item.id)}
                              /> )
        }
      </ul>
    </>
  )
}
