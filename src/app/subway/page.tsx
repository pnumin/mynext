'use client'

// import sarea from "../db/sarea.json" ;
import sarea from "@/db/sarea.json" ;

// import scode from "../db/scode.json" ;
import scode from "@/db/scode.json" ;

//import TailSelect from "../ui/TailSelect";
import TailSelect from "@/components/TailSelect";

import { useRef, useState, useEffect } from "react";

interface SArea {
  코드 : string;
  측정소 : string;
}

interface SCode {
  [key : string] : {
    name : string;
    unit : string;
    description : string;
  }
}

interface TDate {
  [key : string] : string ;
}

export default function Subway() {
  const [areaIndex, setAreaIndex] = useState<string | undefined>() ;
  const [tdata, setTdata] = useState<TDate | undefined>() ;
  const [tags, setTags] = useState<React.ReactNode[]>([]) ;

  const selRef = useRef<HTMLSelectElement>(null) ;

  let ops = (sarea as SArea[]).map(item => item["측정소"]) ;
  ops = ['--- 측정소선택 ---', ...ops] ;

  const handleChange = () => {
    if (selRef.current?.value == '--- 측정소선택 ---') {
      alert('측정소를 선택하세요.') ;
      selRef.current?.focus();
      setTags([]) ;
      return;
    }

    console.log("handleChange", selRef.current?.value)
    let tm  = (sarea as SArea[]).filter(item => item["측정소"] == selRef.current?.value )[0]["코드"] ;
    setAreaIndex(tm) ;
  }


  const getFetchData = async (idx : string): Promise<void>  => {
    // const apikey = import.meta.env.VITE_APP_API_KEY ;
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    let url = `https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?`;
    url = `${url}serviceKey=${apikey}&pageNo=1&numOfRows=5&resultType=json`;
    url = `${url}&controlnumber=${new Date().toISOString().slice( 0, 10 ).replaceAll('-','') }06`;
    url = `${url}&areaIndex=${idx}` ;

    console.log(url)
    const resp = await fetch(url) ;
    const data = await resp.json() ;

    setTdata(data.response.body.items.item[0])
  }

  useEffect(() => {
    setTags([]) ;
  }, []);

  useEffect(() => {
    if (!areaIndex) return ;

    console.log("areaIndex", areaIndex)
    getFetchData(areaIndex) ;
  }, [areaIndex]) ;

  useEffect(() => {
    if (!tdata) return ;

    console.log(tdata)
    const scodeMap = scode as SCode ;
    let tm = Object.keys(scodeMap).map(item => 
              <div key={item} className="w-full">                                             
                <div className="bg-emerald-600 pt-2 w-full
                border-r flex justify-center
                text-white font-bold">{scodeMap[item]["name"]}</div>
                <div className="bg-emerald-600 pb-2 w-full flex justify-center
                border-r text-white font-bold">({item})</div> 
                <div className="p-2 font-bold border border-emerald-200">{tdata[item]}
                  {tdata[item] == '-' ? '' : scodeMap[item]["unit"]}
                </div>
              </div>);
    setTags(tm);
  }, [tdata]) ;
  
  return (
    <div className="w-full h-full mt-10  flex flex-col justify-start items-center">
      <div className="w-9/10 grid grid-cols-2 gap-4">
        <h1 className="text-2xl font-bold">측정소 선택</h1>
        <TailSelect  id = "sel1"
                      refSel = {selRef}
                      ops ={ops}
                      handleChange = {handleChange} />
      </div>
      <div className="w-9/10 grid grid-cols-9 gap4 mt-10">
          {tags}
      </div>
    </div>
  )
}
