'use client'

import { useAtom } from "jotai" ;
import { isLogin } from "@/atoms/IsLoginAtom";
import Login from "@/app/login/page";
import { useEffect, useState } from "react";
 
export default function Home() {
  const [login, setLogin] = useAtom(isLogin) ; 

  /**
   localStorage.getItem('email')을 렌더링 시점에 직접 사용할 때 문제점
      - Next.js의 SSR/SSG 동작 중 서버에서 먼저 렌더링이 시도될 수 있음
      - React Strict Mode에서 useAtom(isLogin)의 값은 true인데도, 렌더링 시점에 localStorage.getItem(...)이 아직 undefined일 수 있음
      - 렌더링 중 localStorage 접근이 예상치 못한 타이밍에 발생하면 hydration mismatch 경고 발생
   */
  const [email, setEmail] = useState<string | null>(null) ;
  useEffect(() =>{    
    const locEmail = localStorage.getItem('email') ;
    if (locEmail) {
      setEmail(locEmail) ;
      setLogin(true);
    }  
  }, []);

  return (
    <div className="w-full h-full">
      {login ? <div className="flex min-h-full
                               text-2xl font-bold items-center
                               justify-center px-6 py-12 lg:px-8"> 
               <span className="text-blue-700">{email}</span>
               님이 로그인 되었습니다.
               </div>
              : <Login />}
    </div>
  )
}

