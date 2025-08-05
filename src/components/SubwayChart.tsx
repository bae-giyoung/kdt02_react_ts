import { useState, useRef, useEffect } from "react"
import TailSelect from "./TailSelect"
import sarea from "../db/sarea.json"
import scode from "../db/scode.json"
import type { ReactNode } from "react"
import type { TdataItem, TdataItemError } from "../types/Subway"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const chOption = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: '지하철 실내 공기질 정보',
            font: {
                size: 20,
                weight: 'bold' as const, // 보니까 라이브러리 내에서 정의한 타입 대부분이 유니온 타입인 듯.
                color: 'black' as const,
            },
            position: 'bottom' as const,
        },
        legend: {
            position: 'bottom' as const,
        }
    },
    scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                drawOnChartArea: false,
            },
        },
    },
};

type ScodeKey = keyof typeof scode;

export default function SubwayChart() {
    const [tdata, setTdata] = useState<TdataItem[] | TdataItemError[]>([]);
    const [resultTable, setResultTable] = useState<ReactNode>([]);
    const [chart, setChart] = useState<ReactNode[]>([]); // ReactNode[]와 ReactNode가 같은가? 어떤걸 해도 타입에러는 없는데 Array.isArray()로 확인 > 이유 알아보기! ReactNode[]를 파싱하면 ReactNode인것과 관련이 있나?
    const isInit = useRef(true);
    const selRef = useRef<HTMLSelectElement>(null);
    const tableKeys = useRef(Object.keys(scode) as ScodeKey[]);

    // 오늘 날짜
    const date = new Date();
    const today = date.toISOString().slice(0, 10).replaceAll("-", "");

    // 셀렉트 값 변경되면 데이터 요청하기
    const handleSelect = async () => {
        if(selRef.current?.value == "") {
            setTdata([]);
            return;
        }

        const apikey = import.meta.env.VITE_DATA_API;
        const areaCode = selRef.current?.value;
        const baseUrl = "https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?";
        const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=12&resultType=json&controlnumber=${today}&areaIndex=${areaCode}`;

        const resp = await fetch(url);
        const contentType = resp.headers.get("content-type");
        let resultData = [];
        
        if (contentType?.includes('application/json')) { // 자정이 넘어서 해당 일자의 실시간 측정 data가 존재하지 않아서 xml을 응답하는 경우가 있었음
            const data = await resp.json();
        
            if(data.response.header.resultCode == "00") {  
                if(data.response.body["numOfRows"] == "0") {
                    resultData = [{"myTdataError":"no-data"}];
                } else {
                    resultData = (data.response.body.items.item).sort((a: TdataItem, b: TdataItem) => parseInt(a["controlnumber"]) - parseInt(b["controlnumber"])); // 같은 날짜에 시간만 붙어있므로 이렇게 계산해봄
                }
            } else {
                    resultData = [{"myTdataError":"error-data"}];
            }

        } else {
            if((await resp.text()).includes("<resultCode>03</resultCode>"))
                resultData = [{"myTdataError":"no-data"}];
            else
                resultData = [{"myTdataError":"error-data"}];
        }

        if(isInit.current) isInit.current = false;
        setTdata(resultData);
    }

    
    // 차트 그리기
    const drawCharts = (stateCode: number) => { // 차트 그리는 함수도 외부 파일로 빼볼까?
        if(stateCode != 0) {
            setChart([]);
            return;
        }

        const chartColors = ["red", "orange", "yellow", "green", "blue", "black", "violet", "gray", "brown"];
        const labels = [...tdata].map(item => item["controlnumber"].slice(-2) + "시");
        const cate1 = tableKeys.current.filter(item => (!item.includes("no") && item !=  "co"));
        const cate2 = tableKeys.current.filter(item => (item.includes("no") || item == "co"));
        
        const chData1 = {
            labels,
            datasets: cate1.map((cate, idx) => {
                return {
                    label: cate,
                    data: tdata.map(data => data[cate] == "-" ? null : parseFloat(data[cate])),
                    spanGaps: true,
                    borderColor: chartColors[idx],
                    backgroundColor: 'transparent',
                    borderDash: idx % 3 == 0 ? [5,2,2,2] : idx % 3 == 1 ? [] : [5,5],
                    yAxisID: cate != "co2" ? 'y' : 'y1',
                }
            }),
        };
        
        const chData2 = {
            labels,
            datasets: cate2.map((cate, idx) => {
                return {
                    label: cate,
                    data: tdata.map(data => data[cate] == "-" ? null : parseFloat(data[cate])),
                    spanGaps: true,
                    borderColor: chartColors[idx],
                    backgroundColor: 'transparent',
                    borderDash: idx % 3 == 0 ? [5,2,2,2] : idx % 3 == 1 ? [] : [5,5],
                    yAxisID: cate != "co" ? 'y' : 'y1',
                }
            }),
        };
        
        const calculableData1: number[][] = chData1.datasets.map(item => item.data.map(inItem => inItem == null ? 0 : inItem));
        const calculableData2: number[][] = chData2.datasets.map(item => item.data.map(inItem => inItem == null ? 0 : inItem));
        const isCate1DataExists: boolean = calculableData1.map(item => item.reduce((prev, curr) => prev + curr)).reduce((prev, curr) => prev + curr) != 0;
        const isCate2DataExists: boolean = calculableData2.map(item => item.reduce((prev, curr) => prev + curr)).reduce((prev, curr) => prev + curr) != 0;
        //console.log(calculableData2.map(item => item.reduce((prev, curr) => prev + curr)).reduce((prev, curr) => prev + curr));

        setChart(
            [
                isCate1DataExists &&
                <div key={"chData1"} className="w-full flex-1/2 shrink-0 flex justify-center">
                    <Line options={chOption} data={chData1} className="w-full max-w-full" />
                </div>, 
                
                isCate2DataExists &&
                <div key={"chData2"} className="w-full flex-1/2 shrink-0 flex justify-center">
                    <Line options={chOption} data={chData2} className="w-full max-w-full" />
                </div>
            ]
        );
    }
    
    const makeTableUnits = (obj: TdataItem | TdataItemError, objIdx: number) => {
      const tableUnits = tableKeys.current.map((item, idx) => {
          return (
          <div key={idx} className="mt-2 text-center border border-black">
              <p className={
                objIdx % 2 == 0
                ? "bg-green-800 text-white font-extrabold px-1 box-border"
                : "bg-sky-900 text-white font-extrabold px-1 box-border"
              }>
                  {scode[item]["name"]}<br />{item}
              </p>
              <p className="px-1 box-border">
                  {
                    obj[item] != "-" 
                    ? obj[item] + scode[item]["unit"]
                    : "-"
                  }
              </p>
          </div>
          )
      });
      return tableUnits;
    }

    // tdata 변경 되면
    useEffect(() => {
        //if(isInit.current) return;

        const isTdataError = Object.keys(tdata).includes("myTdataError");
        
        // 표 그리기
        let eachTable : ReactNode = null;
        let stateCode = 0;
        
        if (isInit.current) {
            eachTable = <div>구역을 선택해주세요</div>
            stateCode = 1;

        } else if (isTdataError) {
            if(Object.values(tdata[0]).includes("no-data")) { // [{"myTdataError":"no-data"}]
                eachTable = <div>해당하는 데이터가 존재하지 않습니다.</div>
                stateCode = 2;
            }
            if(Object.values(tdata[0]).includes("extra-error")) {
                eachTable = <div>예상치 못한 에러가 발생했습니다.</div>
                stateCode = 3;
            }
        } else {
            eachTable = tdata.map((obj: TdataItem | TdataItemError, idx: number) =>
                <div key={obj["controlnumber"] + idx} className="flex flex-col mt-5">
                    <p className="font-extrabold text-right">
                        ({date.toLocaleDateString() + " " + obj["controlnumber"].slice(-2)}:00)
                    </p>
                    <div className="grid grid-cols-9">
                        {makeTableUnits(obj, idx)}
                    </div>
                </div>
            );
        }
        
        drawCharts(stateCode);
        setResultTable(eachTable);
    }, [tdata]);

    return (
        <>
            <div>
                <TailSelect refName={selRef} 
                            opKeys={sarea.map(item => item["측정소"])} 
                            opValues={sarea.map(item => item["코드"])} 
                            onHandle={handleSelect} 
                            caption="--- 측정소를 선택하세요 ---" />
            </div>
            <div className="w-full flex flex-col gap-5 mt-12">
                <div className="flex flex-col gap-6 max-w-full box-border 
                                lg:flex-row items-center justify-center">
                    {chart}
                </div>
                {resultTable}
            </div>
        </>
    )
}