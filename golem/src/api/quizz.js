import instance from "./index";

export function createQuizz(data) {
    return instance({
        url: "/quizz",
        method: "post",
        data
    })
}