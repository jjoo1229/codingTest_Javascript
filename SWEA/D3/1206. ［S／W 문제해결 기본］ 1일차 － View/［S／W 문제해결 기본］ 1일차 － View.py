for i in range(10):
    answer = 0
    n = int(input())
    arr = list(map(int, input().split()))
    for j in range(2, n - 2):
        maxVal = max(arr[j - 2], arr[j - 1], arr[j + 1], arr[j + 2])
        if arr[j] - maxVal > 0:
            answer += arr[j] - maxVal
    print(f"#{i+1} {answer}")