function solution(topping) {
    let answer = 0
    let leftMap = new Map()  // 토핑을 전부 저장, 앞사람의 Map
    let rightMap = new Map()  // 뒷사람의 토핑 저장

    for (let i = 0; i < topping.length; i++) {
        leftMap.set(topping[i], (leftMap.get(topping[i]) || 0) + 1)
    }

    for (let i = topping.length - 1; i >= 0; i--) {
        rightMap.set(topping[i], (leftMap.get(topping[i]) || 0) + 1)
        leftMap.set(topping[i], (leftMap.get(topping[i]) > 0 ? (leftMap.get(topping[i]) - 1) : 0))

        if (leftMap.get(topping[i]) == 0) leftMap.delete(topping[i])
        if (leftMap.size == rightMap.size) {
            answer++
        }
    }

    return answer
}
