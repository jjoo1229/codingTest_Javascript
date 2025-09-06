function solution(m, musicinfos) {
    let map = new Map()

    for (let music of musicinfos) {
        let [start, finish, title, melody] = music.split(",")
        let playtime = calculateTime(start, finish)
        melody = switchMelody(melody)
        let musicLength = melody.length  // 음악의 길이

        if (playtime <= musicLength) {  // 실제 재생이 음악보다 짧았다면
            let newMelody = melody.slice(0, playtime)
            map.set(title, newMelody)
        } else {  // 음악을 반복 재생해야 하는 경우
            let newMelody = melody.repeat(Math.ceil(playtime / musicLength)).substr(0, playtime)
            map.set(title, newMelody)
        }
    }
    let answer = []

    for (let [music, melody] of map.entries()) {
        if (melody.includes(switchMelody(m))) {
            answer.push(music)
        }
    }
    // 조건이 일치하는 음악이 여러 개일 때에는 라디오에서 재생된 시간이 제일 긴 음악 제목을 반환한다.

    answer.sort((a, b) => map.get(b).length - map.get(a).length)
    console.log(answer)
    return answer.length > 0 ? answer[0] : "(None)"
}

function switchMelody(melody) {
    return melody.replace(/(C#|D#|E#|F#|G#|A#|B#)/g, match => {
        return match[0].toLowerCase()
    })
}

function calculateTime(t1, t2) {
    let [h1, m1] = t1.split(":").map(Number)
    let [h2, m2] = t2.split(":").map(Number)

    return (h2 * 60 + m2) - (h1 * 60 + m1)
}