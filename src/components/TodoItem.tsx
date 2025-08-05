import type { completedT, Todo } from "../types/Todo";
import TailButton from "./TailButton";

//let tag: ReactNode; => 이 타입 기억해두기!!!!!
//콜백함수로 onClick등을 실행아는 경우 어떻게 효과적으로 ts 마이크레이션 해야 할지! 지금 코드는 뗌빵해둔 상황 
//예시 onClick={() => onUpdate? onUpdate(tid, completed) : ''} -> 매우 이상해보임!

interface TodoItemProps {
  item: Todo,
  onUpdate : (id: string, t: completedT) => void,
  onDelete : (id: string) => void,
}

export default function TodoItem({item, onUpdate, onDelete} : TodoItemProps) {
  return (
    <li className="w-full flex py-2 items-center justify-between">
        <p className="w-9/10 text-left cursor-pointer" onClick={() => onUpdate(item["id"], item["completed"])}>
            <span>{item["completed"] == 'O' ? '✅' : '❌' }</span>
            <span className="px-4">{item["text"]}</span>
        </p>
        <TailButton color="blue" caption="삭제" onHandle={() => onDelete(item["id"])} />
    </li>
  )
}