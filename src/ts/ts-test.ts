console.log('== Typescript Test ==');

// ========== [ 기본 타입 ] ========== //
// 문자열
let name : string = 'PNU'
console.log(`${name}님 안녕하세요.`);

name = 30; // 개발자들 끼리
console.log(`${name}님 안녕하세요.`);

// 숫자
let age : number;
age = 20;
console.log(`${name}님 안녕하세요. ${age}세`);

// 부울
let isStudent : boolean = false;
isStudent 
? console.log(`[학생]${name}님 안녕하세요. ${age}세`) 
: console.log(`[일반]${name}님 안녕하세요. ${age}세`);




// ========== [ 배열 ] : 같은 데이터 타입 저장 ========== //
let arr1 : number[] = [];
arr1.push(1);
arr1.push(2);
arr1.push('문자'); // => ❌
arr1.map(val => console.log(val));

let arr2 : Array<string> = ['a','b','c']; // 제너릭 타입
arr2.push(1); // ❌
arr2.push('1');
arr2.map(val => console.log(val));




// ========== [ 투플 ] : 다른 데이터 타입 저장, 배열이지만 요소의 수와 순서, 타입이 고정되어 있음! ========== //
let tp : [string, number] = ['PNU', 25];
console.log(`${tp[0]}님 안녕하세요. (${tp[1]}세)`);

tp = [30, '부산대학교']; // ❌
console.log(`${tp[0]}님 안녕하세요. (${tp[1]}세)`);

type User = [string, number];
let tp2 : User;
tp2 = ['tp2', 10]


// ========== [ 오브젝트 ] ========== //
let p1 : {name: string, age: number} = {
    name: '',
    age: 0
};

p1.name = 'PNU';
p1.age = 30;
console.log(`${p1.name}님 안녕하세요. (${p1.age}세)`);

let p2 : {name: string, age: number};
p2 = {
    name: '부산',
    age: 20
};
console.log(`${p2.name}님 안녕하세요. (${p2.age}세)`);

// ========== [ 오브젝트 ]: type으로 선언 ========== //
type PersonType = {
    name : string,
    age: number
}

let p10 : PersonType;
p10 = {name: 'p10', age: 10}

let p20 : PersonType;
p20 = {name: 'p20', age: 20}

console.log(`${p20.name}님 안녕하세요. (${p20.age}세)`);




// ========== [ interface ] ========== //
interface PersonInterface {
    name: string,
    age: number
}

let p30 : PersonInterface;
p30 = {name: 'p30', age:30};

let p40 : PersonInterface;
p40 = {name: 'p40', age:40};

console.log(`${p40.name}님 안녕하세요. (${p40.age}세)`);

Object.keys(p40).map((key)=> { // name, age
    console.log(`${key} : ${p40[key]}`); // ❌
});

(Object.keys(p40) as (keyof PersonInterface)[]) // keyof
.map(key => console.log(key, p40[key]));