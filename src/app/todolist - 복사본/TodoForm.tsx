'use client'
import TailButton from "@/components/TailButton"; 
import { useRef } from "react";

interface TodoFormProps {
  onAddTodo : (text : string, completed : "O" | "X") => void 
}
export default function TodoForm({ onAddTodo } : TodoFormProps) {
  const refInput = useRef<HTMLInputElement>(null);
  const refSel = useRef<HTMLSelectElement>(null);

  const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (refInput.current?.value == '') {
      alert('할일을 입력하세요.');
      refInput.current.focus();
    }

    if (refInput.current && refSel.current) {
      onAddTodo(refInput.current?.value, refSel.current?.value as "O" | "X");
    }
    
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (refInput.current) {
      refInput.current.value = "";
      refInput.current.focus();
    }
    if (refSel.current) {
      refSel.current.value = "X";
    }
  }

  return (
    <form className="w-10/12 grid grid-cols-5 gap-4">
      <select id="sel1" 
        ref={refSel}
        className="bg-gray-50 border border-gray-300
                               text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 
                                block w-full p-2 m-2">
        <option value="X">X</option> 
        <option value="O">O</option> 
      </select>
      <div className="col-span-2 h-full">
        <input type="text" id="txt1"
          ref={refInput}
          className="bg-gray-50 border border-gray-300
                         text-gray-900 text-lg rounded-lg  text-center
                         focus:ring-blue-500 focus:border-blue-500 block w-full  
                         p-2 m-2"/>
      </div>
      <TailButton caption="확인"
        color="blue"
        onClick={handleClick} />
      <TailButton caption="취소"
        color="orange"
        onClick={handleCancel} />
    </form>
  )
}
