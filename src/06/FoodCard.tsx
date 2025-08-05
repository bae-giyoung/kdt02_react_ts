import { useState } from 'react'
import busan from  '../assets/busan.png'
import bank from '../assets/bank.png'
import market from '../assets/market.png'
import type { FoodCardT } from '../types/FoodCard'

type FoodCardProps = {
    item: FoodCardT,
}

export default function FoodCard({item} : FoodCardProps) {
    const [flag=false, setFlag] = useState<boolean>();
    const clickToggle = () => {
        setFlag(!flag);
    }
    
  return (
    <div onClick={clickToggle} className="w-full h-50 flex justify-between rounded-2xl border-gray-400 border-2 p-5 box-border overflow-hidden">
        <div className="w-1/3"><img src={item["구분"] == "광역지원센터" 
                                        ? busan
                                        : item["구분"] == "기초푸드뱅크"
                                        ? bank
                                        : market} alt={item["구분"]} /></div>
        <div className="w-3/5 flex flex-col justify-between">
            <p className="text-left">
                <span className="block text-xl font-extrabold">{item["사업장명"]}</span>
                <span className="block text-sl font-bold my-1">{item["운영주체명"]}</span>
                <span className="block text-sl text-gray-700">{item["사업장 소재지"]}</span>
            </p>
            {
                !flag 
                ? <p className="w-full h-6 bg-gray-300"></p> 
                : <p className="bg-gray-300">{item["연락처(대표번호)"]}</p>
            }
        </div>
    </div>
  )
}
