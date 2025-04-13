import { ChangeEvent, RefObject } from "react" ;

interface TailSelectProps {
  id : string, 
  refSel : RefObject<HTMLSelectElement | null>, 
  ops : string[], 
  handleChange? : (e:ChangeEvent<HTMLSelectElement>) => void
}

export default function TailSelect({id, refSel, ops, handleChange}:TailSelectProps) { 
  return (
    <select id={id} 
            onChange={handleChange}
            ref={refSel}
            className="bg-gray-50 border border-gray-300
                               text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 
                                block w-full p-2.5">
      {
        ops.map(item => <option key={item} value={item}> 
                              {item}
                        </option>)
      }
    </select>
  )
}
