const formatDate = (date, config) => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    if (config === "DDMonYYYY") {
        mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        return `${da} ${mo} ${ye}`;
    } else if(config === "YYYY-MM-DD") {
        return `${ye}-${mo}-${da}`;
    }
    return `${da}-${mo}-${ye}`;
}
export default formatDate;