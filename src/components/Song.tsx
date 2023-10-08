function Song({ song }) {

    const getTime = (time) => {
        return new Date(parseInt(time.match(/\d+/)[0])).toLocaleTimeString()
    }

    const getDate = (time) => {
        return new Date(parseInt(time.match(/\d+/)[0])).toLocaleDateString()
    }

    return (
        <div className="notification is-success is-light">
            <div className="has-text-weight-bold">{song.channel}</div>
            <div className="is-size-6">{getDate(song.starttimeutc)}, {getTime(song.starttimeutc)}-{getTime(song.stoptimeutc)}</div>
            <div>{song.title}</div>
            <div>{song.artist}</div>           
        </div>
    )
}

export default Song;