import { useState, useEffect } from "react";
function MyClockTime() {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(()=>{ // 컴포넌트가 닫혀도 내부에서 계속해서 돌기 때문에 return문으로 처리해준다!
        const tm = setInterval(() => setCurrentTime(new Date()), 1000)
        return(()=>{ // 컴포넌트가 닫히면 return문을 실행한다!
            clearInterval(tm)
        })
    })

    return (
        <>
            <p className="text-3xl font-extrabold text-shadow-black">
                현재 시각 : {currentTime.toLocaleTimeString()}
            </p>
        </>
    )
}

export default MyClockTime;