const BaseUrl = process.env.REACT_APP_Base_URL;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Access-Control-Allow-Origin", "*");
export function ApiGetCall(endpoint) {
    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    return fetch(`${BaseUrl}${endpoint}`, requestOptions)
        .then((response) => response.text())
        .then((result) => { return result })
        .catch((error) => { return error; });
}
export function ApiPostCall(endpoint, payload) {
    var urlencoded = payload;
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
    };
    return fetch(`${BaseUrl}${endpoint}`, requestOptions)
        .then((response) => response.text())
        .then((result) => { return result })
        .catch((error) => { return error });
}
export function ApiPutCall(endpoint, payload) {
    var urlencoded = payload;
    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
    };
    return fetch(`${BaseUrl}${endpoint}`, requestOptions)
        .then((response) => response.text())
        .then((result) => { return result })
        .catch((error) => { return error });
}
export function ApiDeleteCall(endpoint, payload) {
    var urlencoded = payload;
    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
    };
    return fetch(`${BaseUrl}${endpoint}`, requestOptions)
        .then((response) => response.text())
        .then((result) => { return result })
        .catch((error) => { return error });
}   