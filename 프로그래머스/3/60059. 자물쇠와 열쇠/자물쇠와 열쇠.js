function solution(key, lock) {
    const m = key.length
    const n = lock.length

    // lock 확장 (key가 밖에서 걸쳐 들어올 수도 있으니)
    const expandSize = n + 2 * (m - 1)
    const expandLock = Array.from({ length: expandSize }, () => Array(expandSize).fill(0))

    // 중앙에 원래 lock 배치
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            expandLock[i + m - 1][j + m - 1] = lock[i][j]
        }
    }

    // 4가지 회전
    const keyArr = [key, rotateKey90(key, m), rotateKey180(key, m), rotateKey270(key, m)]

    for (let curKey of keyArr) {
        for (let x = 0; x <= expandSize - m; x++) {
            for (let y = 0; y <= expandSize - m; y++) {
                let newLock = expandLock.map(row => [...row])

                // key 덮어쓰기
                for (let i = 0; i < m; i++) {
                    for (let j = 0; j < m; j++) {
                        newLock[x + i][y + j] += curKey[i][j]
                    }
                }

                // 중앙 lock 부분이 전부 1인지 검사
                let valid = true
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        if (newLock[i + m - 1][j + m - 1] !== 1) {
                            valid = false
                            break
                        }
                    }
                    if (!valid) break
                }

                if (valid) return true
            }
        }
    }

    return false
}


function rotateKey90(key, m) {
    let nKey = Array.from({ length: m }, () => Array(m).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            nKey[i][j] = key[m - 1 - j][i]
        }
    }
    return nKey
}

function rotateKey180(key, m) {
    let nKey = Array.from({ length: m }, () => Array(m).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            nKey[i][j] = key[m - 1 - i][m - 1 - j]
        }
    }
    return nKey
}

function rotateKey270(key, m) {
    let nKey = Array.from({ length: m }, () => Array(m).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            nKey[i][j] = key[j][m - 1 - i]
        }
    }
    return nKey
}
