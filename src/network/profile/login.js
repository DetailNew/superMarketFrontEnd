import { infoRequest} from "../request";

const baseUrl = "http://istarmarket.com:8080/"

export function insertUsers(config) {
    return infoRequest(baseUrl + "users/insertUsers",config)
}

export function selectUser(config) {
    return infoRequest(baseUrl + "users/selectUser",config)
}
export function getImage(config) {
    return infoRequest(baseUrl + "image/selectImage",config)
}