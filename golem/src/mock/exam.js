
import instance from "./index";

export function getAllExams() {
    return instance({
        url: "/exam",
        method: "get"
    });
}