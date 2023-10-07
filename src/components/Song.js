function Song({ song }) {

    const getTime = (time) => {
        return new Date(parseInt(time.match(/\d+/)[0])).toLocaleTimeString()
    }

    const getDate = (time) => {
        return new Date(parseInt(time.match(/\d+/)[0])).toLocaleDateString()
    }

    return (
        <div className="notification is-success is-light">
            <div>{getDate(song.starttimeutc)}, {getTime(song.starttimeutc)}</div>
            <div>{song.title}</div>
            <div>{song.artist}</div>
        </div>
    )
}

export default Song;