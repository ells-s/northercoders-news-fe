
function FormattedDate({ timestamp }) {

    const formattedTimestamp = new Date(timestamp).toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })

    return <p>{formattedTimestamp}</p>
}

export default FormattedDate