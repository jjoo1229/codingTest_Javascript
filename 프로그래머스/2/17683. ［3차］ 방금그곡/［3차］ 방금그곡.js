function solution(m, musicinfos) {
    let map = new Map()

    for (let music of musicinfos) {
        let [start, finish, title, melody] = music.split(",")
        let playtime = calculateTime(start, finish)  // 실제 재생된 시간
        melody = switchMelody(melody)
        let musicLength = melody.length  // 음악의 길이

        if (playtime <= musicLength) {  // 실제 재생이 음악보다 짧았다면
            let newMelody = melody.slice(0, playtime)
            map.set(title, newMelody)
        } else {  // 음악을 반복 재생해야 하는 경우
            let newMelody = ""
            for (let i = 0; i < Math.floor(playtime / musicLength); i++) {
                newMelody += melody
            }
            newMelody += melody.slice(0, playtime % musicLength)
            map.set(title, newMelody)
        }
    }
    console.log(map)
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
    melody = melody.replace(/C#/g, "c")
    melody = melody.replace(/D#/g, "d")
    melody = melody.replace(/E#/g, "e")
    melody = melody.replace(/F#/g, "f")
    melody = melody.replace(/G#/g, "g")
    melody = melody.replace(/A#/g, "a")
    melody = melody.replace(/B#/g, "b")

    return melody
}

function calculateTime(t1, t2) {
    let [h1, m1] = t1.split(":").map(Number)
    let [h2, m2] = t2.split(":").map(Number)

    if (m2 >= m1) {
        return (h2 - h1) * 60 + (m2 - m1)
    } else {
        return (h2 - h1 - 1) * 60 + (60 + m2 - m1)
    }
}
