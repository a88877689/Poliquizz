import instance from "./index";

export function getUserMe() {
    return instance({
        url: "/user/me",
        method: "get"
    })
}

export function getAllUsers() {
    return instance({
        url: "/user",
        method: "get"
    })
}

export function getUser(id) {
    return instance({
        url: `/user/${id}`,
        method: "get"
    })
}

export function createUser(data) {
    return instance({
        url: "/user",
        method: "post",
        data
    })
}

export function updateUser(id, data) {
    return instance({
        url: `/user/${id}`,
        method: "put",
        data
    })
}

export function deleteUser(id) {
    return instance({
        url: `/user/${id}`,
        method: "delete"
    })
}