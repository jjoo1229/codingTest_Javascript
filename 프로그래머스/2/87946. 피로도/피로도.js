function solution(k, dungeons) {
    let maxCount = 0;
    let visited = Array(dungeons.length).fill(false)
    
    const dfs = (power, count) => {
        maxCount = Math.max(maxCount, count)
        
        for (let i = 0; i < dungeons.length; i++) {
            const [min, cost] = dungeons[i]
            if (!visited[i] && power >= min) {
                visited[i] = true
                dfs(power - cost, count + 1)
                visited[i] = false  // 백트래킹
            }
        }
    }
    
    dfs(k, 0)
    return maxCount
}