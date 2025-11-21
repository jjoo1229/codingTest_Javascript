T = int(input())

for t in range(T):
    N = int(input())
    score = list(map(int, input().split()))
    score_visit = [1] + [0] * sum(score)  # 최대 점수만큼의 리스트 생성, 0점은 반드시 존재하므로 인덱스 0의 값은 1
    score2 = [0]  # 가능한 점수들을 모아두는 리스트
    
    for point in score:  # 점수를 뽑아서
        for i in range(len(score2)):  # 결과와 더해 나간다.
            if not score_visit[point + score2[i]]:  # 더한 값이 방문한적 없으면 중복이 아니기에
                score_visit[point + score2[i]] = 1  # 방문 배열에 체크하고
                score2.append(point + score2[i])  # 결과에 더해준다

    print(f'#{t + 1} {len(score2)}')