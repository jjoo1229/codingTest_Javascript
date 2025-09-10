function solution(scores) {
    const wanho = scores[0];
    const wanhoSum = wanho[0] + wanho[1];

    // 1. 정렬: 첫 점수 내림차순, 같으면 두 번째 점수 오름차순
    scores.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

    let maxSecond = -1;
    let rank = 1;

    for (const [a, b] of scores) {
        // 2. 이미 a는 내림차순 정렬해서 뒤로 갈수록 낮아지니까, b만 체크해서 기존보다 낮은 경우 -> 탈락
        if (b < maxSecond) {
            if (a === wanho[0] && b === wanho[1]) return -1; // 완호면 -1
            continue; // 다른 사원 탈락(등수에 반영 안 하는 것임)
        }
        maxSecond = Math.max(maxSecond, b);  // 지금까지 중 가장 큰 b값

        // 3. 합이 완호보다 크면 완호 등수가 하나 밀림
        if (a + b > wanhoSum) rank++;
    }

    return rank;
}