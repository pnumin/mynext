import { MouseEvent } from "react";

type ButtonColor = "blue" | "orange" | "lime" ;

interface TailButtonProps {
  caption : string,
  color: ButtonColor,
  onClick? : (e:MouseEvent<HTMLButtonElement>) => void 
}

export default function TailButton({caption, color, onClick}:TailButtonProps) {
  const bg = {
    "blue" : "bg-blue-700",
    "orange" : "bg-orange-700",
    "lime" : "bg-lime-700",
  }

  const bgHover = {
    "blue" : "hover:bg-blue-400",
    "orange" : "hover:bg-orange-400",
    "lime" : "hover:bg-lime-400",
  }
  return (
    <button className={`py-2 px-4 m-2 text-lg hover:font-bold
                       rounded-md text-white 
                       ${bg[color]} ${bgHover[color]}`}
             onClick={onClick}>
      {caption}
    </button>
  )
}
