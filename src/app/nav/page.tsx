'use client'
import Image from 'next/image';

// import { Link } from 'react-router-dom' ;
import Link from 'next/link';

import { useAtom } from 'jotai' ;
import { isLogin } from "@/atoms/IsLoginAtom" ;
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation'

export default function Nav() {
  const [login, setLogin] = useAtom(isLogin) ;
  // const navigate = useNavigate();
  const router = useRouter();
 
  const handleLogout = () => {
    localStorage.setItem("email", '') ;
    setLogin(false);
    // navigate("/") ;
    router.push("/") ;
  }
  return (
    <header className="w-full h-24 min-h-24 px-10 bg-emerald-600 flex justify-between items-center">
        <div className='flex'>
        <div className="flex text-sm items-center mx-2">
            {/* <img src={reactLogo} alt="react" className="w-8" /> +  */}
            {/* <img src="/vite.svg" alt="vite" className="w-8" /> */}
            <Image src="/next.svg" alt="next" width={32} height={32} /> + 
            <Image src="/vercel.svg" alt="vercel" width={32} height={32} />
          </div>
          
        </div>
        <ul className='flex justify-center items-center'>
            <li className='font-bold mx-1'>
              {/* <Link to="/" className='w-full p-2 text-white */}
              <Link href="/" className='w-full p-2 text-white
                                      rounded-lg
                                      hover:cursor-pointer hover:bg-emerald-400'>
                  홈으로
              </Link>
            </li>
            <li className='font-bold mx-1'>
            {/* {login && <Link to="/subway" className='w-full p-2  text-white */}
            {/* {login && <Link href="/subway" className='w-full p-2  text-white
                                      rounded-lg
                                      hover:cursor-pointer hover:bg-emerald-400'>
                  지하철대기정보
              </Link>} */}
            </li>
            <li className='font-bold mx-1'>
            {/* {login && <Link to="/todolist" className='w-full p-2  text-white */}
            {login && <Link href="/todolist" className='w-full p-2  text-white
                                      rounded-lg
                                      hover:cursor-pointer hover:bg-emerald-400'>
                  할일목록
              </Link>}
            </li>
          </ul>
        <div  className='p-2  text-white
                         border rounded-sm
                                      hover:cursor-pointer hover:bg-emerald-400'>
          {login ? 
                  <span onClick={handleLogout}>로그아웃</span> 
                 : <span>로그인</span>
          }
        </div>
      </header>
  )
}
