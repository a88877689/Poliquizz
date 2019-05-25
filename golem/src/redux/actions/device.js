const isMobile = () => {
    return { type: "IS_MOBILE" }
}

const notMobile = () => {
    return { type: "NOT_MOBILE" }
}

export {
    isMobile,
    notMobile
}