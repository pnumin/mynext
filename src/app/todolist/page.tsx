import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const baseUrl = "http://localhost:3005/todos"

// SSR 방식으로 todo 불러오기
async function getTodos() {
  const res = await fetch(baseUrl, {
    // SSR을 위해 캐시 없이
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export default async function Todolist() {
  const todos = await getTodos();
 
  return (
    <>
      <div className="w-full h-40 min-h-40 bg-amber-50 mt-5
                          flex flex-col justify-center items-center">
        <h1 className='w-full text-2xl font-bold mb-5 text-center'>Todo List</h1>
        <TodoForm />
      </div>
      <ul className="w-10/12 flex flex-col p-5"> 
        {
          todos.map((item:any) => <TodoItem key={item.id} 
                                        todo = {item}
                              /> )
        }
      </ul>
    </>
  )
}
