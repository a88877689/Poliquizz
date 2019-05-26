import instance from "./index";

export function getUserMe() {
    return instance({
        url: "/user/me",
        method: "get"
    })
}