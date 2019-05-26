import instance from "./index";

export function login(data) {
    return instance({
        url: "/login",
        method: "post",
        data
    })
}