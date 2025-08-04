// 매개 변수가 없고, 리턴값도 없는 경우
/* function add1() : void { // 리턴 타입 없다고 명시
    console.log("add1 매개변수 없음 : " + (10 + 20));
} */
const add1 = () : void => {
    console.log("add1 매개변수 없음 : " + (10 + 20));
}
add1();


// 매개 변수가 있고, 리턴 값이 없는 경우
/* function add2(x: number, y: number) : void {
    console.log("add2 매개변수 있고, 리턴 타입 없음: " + (x + y));
} */
const add2 = (x: number, y: number) : void => {
    console.log("add2 매개변수 있고, 리턴 타입 없음: " + (x + y));
}
add2(10, 20);


// 매개 변수가 있고, 리턴 값이 있는 경우
/* function add3(x: number, y: number): number {
    return x + y;
} */
const add3 = (x: number, y: number): number => {
    return x + y;
}
console.log(add3(10, 20));



// [함수 타입 별도 지정]
type Add = (x: number, y: number) => number;
const add4 : Add = (x, y) => {
    return x + y;
}
console.log(add4(100, 200));



// 리터럴 타입 => 하나의 구체적인 값만 허용하는 타입 (그냥 상수 사용하면 된다.)
const dLeft: string = 'left';
console.log(dLeft);

//const dRight: 'right';
//dRight = 'left';
//console.log(dRight);

// 유니온 타입 => 이것이 중요! 여러 타입 중 하나를 허용
let direction: 'right' | 'left' | 'up' | 'down';
direction = 'left';
console.log(direction);


// 제너릭 타입
interface G<T> {
    value : T
}

// 제너릭 선언
let g1: G<number> = {value: 10};
console.log(g1.value);

let g2: G<string> = {value: 'PNU'};
console.log(g2.value);