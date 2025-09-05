function solution(s) {
    let count = 0;  // 변환 횟수
    let removed = 0; // 제거한 0의 개수

    while (s !== "1") {
        // 0 개수 세기
        let zeroCount = (s.match(/0/g) || []).length;
        removed += zeroCount;

        // 0 제거 후 길이 구하기
        let len = s.length - zeroCount;

        // 2진수 변환
        s = len.toString(2);
        count++;
    }

    return [count, removed];
}
