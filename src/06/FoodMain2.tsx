import { useState } from "react";
import FoodCard from './FoodCard';
import TailButton from "../components/TailButton";
import fooddata from './fooddata.json';

export default function FoodMain2() {
    const [gubunVal, setGubunVal] = useState<string>("0.전체");
    
    // 구분값 설정 함수
    const filterData = (item: string) => setGubunVal(item);
    
    // 버튼 태그 배열 생성
    let group: string[] = fooddata.map(item => item["운영주체 분류"].replaceAll(" ", ""));
    group = [...new Set(group)];
    const buttons = group.map(item => <TailButton key={item} caption={item} color="blue" onHandle={() => filterData(item)} />)

    // json data를 구분값으로 필터링한 리스트 태그 배열 생성
    const tags = fooddata
            .filter(item => gubunVal == "0.전체" ? true : item["운영주체 분류"].replaceAll(" ", "") == gubunVal)
            .map(item => <FoodCard item={item} key={item["사업장명"]} />)

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="flex justify-center gap-2 w-8/10 mb-5 p-5 bg-blue-100">{buttons}</div>
            <div className="w-8/10 grid gap-5 grid-cols-1 lg:grid-cols-2 overflow-y-auto">{tags}</div>
        </div>
    )
}
