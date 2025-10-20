function solution(number, k) {
    let stack = []
    
    for (let n of number) {
        while (stack.length && stack[stack.length - 1] < n && k > 0) {
            stack.pop()
            k--
        }
        stack.push(n)
    }
    
    // k가 남아 있으면 뒤에서 제거(내림차순이거나 모두 동일한 숫자일 때)
    while (k-- > 0) stack.pop()
    
    return stack.join("")
}