import instance from "./index";

export function getXML(id) {
    return instance({
        url: `/xml/${id}`,
        method: "get"
    })
}