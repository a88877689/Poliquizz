import instance from "./index";

export function getAllQuizzes() {
    return instance({
        url: "/quizz",
        method: "get"
    })
}

export function getQuizz(id) {
    return instance({
        url: `/quizz/${id}`,
        method: "get"
    })
}

export function createQuizz(data) {
    return instance({
        url: "/quizz",
        method: "post",
        data
    })
}

export function updateQuizz(id, data) {
    return instance({
        url: `/quizz/${id}`,
        method: "put",
        data
    })
}

export function deleteQuizz(id) {
    return instance({
        url: `/quizz/${id}`,
        method: "delete"
    })
}