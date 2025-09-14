function solution(want, number, discount) {
    let answer = 0;

    let map = new Map()
    for (let i = 0; i < want.length; i++) {
        map.set(want[i], number[i])
    }

    for (let i = 0; i < discount.length - 8; i++) {
        let arr = discount.slice(i, i + 10)
        for (let i = 0; i < want.length; i++) {
            map.set(want[i], number[i])
        }
        for (let a of arr) {
            map.set(a, map.get(a) - 1)
        }
        if ([...map.values()].filter(e => !isNaN(e)).every(m => m <= 0)) {
            answer++
        }
    }

    return answer;
}