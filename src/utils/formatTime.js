function formatTime(time) {
    let text = [];

    const milliseconds = Math.floor((time - Math.floor(time)) * 1000)
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    if (minutes) text.push(`${minutes}m`)
    if (seconds) text.push(`${seconds}s`)
    if (milliseconds) text.push(`${milliseconds}ms`)

    return text.join(' ');
}

exports.formatTime = formatTime;