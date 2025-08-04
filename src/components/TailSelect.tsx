import type { ChangeEvent, RefObject } from "react"

interface TailSelectProps {
    refName: RefObject<HTMLSelectElement | null>, // 유니온 타입: HTMLSelectElement 외에도 null도 올 수 있다! 
    opKeys: string[], 
    opValues: string[], 
    caption: string,
    onHandle? : (e:ChangeEvent<HTMLSelectElement>) => void,
}

export default function TailSelect({refName, opKeys, opValues, caption, onHandle}: TailSelectProps) {
    
    const optionTags = opKeys.map((item: string, idx: number) => 
        <option key={opValues[idx] + idx} value={opValues[idx]}>{item}</option>
    )
    
    return (
        <select ref={refName} onChange={onHandle}
            className='block p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <option value="">{caption}</option>
            {optionTags}
        </select>
    )
}