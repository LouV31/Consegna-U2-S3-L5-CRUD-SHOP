 function statusErrors(response) {
    if (response.status === 404) throw new Error("Error 404, page not found.");
    if (response.status >= 400 && response.status < 500) throw new Error("Client error.");
    if (response.status >= 500 && response.status <= 600) throw new Error("Server error.");
    if (!response.ok) throw new Error("Couldn't get any datas");
}
