import instance from "./index";

export function getAllExams() {
    return instance({
        url: "/exam",
        method: "get"
    })
}

export function getExam(id) {
    return instance({
        url: `/exam/${id}`,
        method: "get"
    })
}

export function createExam(data) {
    return instance({
        url: "/exam",
        method: "post",
        data
    })
}

export function updateExam(id, data) {
    return instance({
        url: `/exam/${id}`,
        method: "put",
        data
    })
}

export function deleteExam(id) {
    return instance({
        url: `/exam/${id}`,
        method: "delete"
    })
}