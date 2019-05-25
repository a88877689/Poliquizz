const mobileDevices = {
    Android: () => {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: () => {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: () => {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: () => {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: () => {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: () => {
        return (
            mobileDevices.Android() ||
            mobileDevices.BlackBerry() ||
            mobileDevices.iOS() ||
            mobileDevices.Opera() ||
            mobileDevices.Windows()
        );
    }
};

export default mobileDevices;