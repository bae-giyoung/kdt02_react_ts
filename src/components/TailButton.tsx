import type { MouseEvent } from "react";
type buttonColor = "blue" | "orange" | "lime"; // 유니온 타입도 타입으로 빼면 좋다는거!

interface TailButtonProps {
    caption: string,
    color: buttonColor,
    onHandle? : (e:MouseEvent<HTMLButtonElement>) => void, // 프로퍼티? : 선택적 프로퍼티!
}

export default function TailButton({caption, color, onHandle} : TailButtonProps) {

    const bg = {
        "blue" : "bg-blue-800",
        "orange" : "bg-orange-800",
        "lime" : "bg-lime-800",
    }
    return (
        <button 
                onClick={onHandle}
                className={`bg-amber-950 ${bg[color]} text-white px-4 
                                        font-extrabold text-ml h-10 rounded-lg
                                        hover:bg-blue-950 cursor-pointer`}>
            {caption}
        </button>
    )
}