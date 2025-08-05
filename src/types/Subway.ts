export interface TdataItem {
    areaIndex: string,
    city: string,
    co: string,
    co2: string,
    controlnumber: string,
    fad: string,
    no: string,
    no2: string,
    nox: string,
    o3: string,
    office: string,
    pm10: string,
    pm25: string,
    site: string,
    //[key: string]: string, // 정상 데이터 외 상태 데이터 커스텀해줌
}

export interface TdataItemError {
  "myTdataError": string,
  [key: string]: string, // eachTable : ReactNode 에 대한 임시 방편인데 더 생각해보기! Error Type일 경우엔 어떻게 처리해야 할지 생각해보기
}