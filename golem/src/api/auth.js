import instance from "./index";

export function auth(data) {
    return instance({
        url: "/auth",
        method: "post",
        data
    })
}