// GET, POST, PUT, DELETE

const baseURL = "http://localhost:5002"

// const baseUrl = 'http://localhost:3000'
var Headers = { 'Content-Type': 'application/json' }
const Internal_Server_Error = { message: 'Unable to make API calls', status: 500 }
const errorCodes = [400, 402, 404, 500, 401];
const unauthorized = 401;


export async function getAPICall(uri) {

    try {
        let finalURL = baseURL + uri;
        console.log("Making GET API call to : " + finalURL);
        var response;
        console.log(Headers);
        await fetch(finalURL, {
            method: 'GET',
            headers: Headers,
        })
            .then(response => response.json())
            .then((json) => {
                response = json;
            });

        if (errorCodes.includes(response.status))
            throw "Error";
        else
            return response;

    } catch (error) {
        console.log("Error occurred in making GET api call : " + error);
        return Internal_Server_Error;
    }
}

export async function postAPICall(uri, body) {

    // try {
        let finalURL = baseURL + uri;
        console.log("Making POST API call to : " + finalURL);
        var response;
        await fetch(finalURL, {
            method: 'POST',
            headers: Headers,
            body: JSON.stringify(body)
        })
            .then(res => {
                console.log(0);
                if (errorCodes.includes(res.status)) {
                    console.log(res.status)
                    return res.json()
                }
            })
            .then((json) => {
                response = json;
                console.log(response)
            });

        // handle the common error here
        console.log(response);
        if (errorCodes.includes(response.status)) {
            console.log(2);
            return "Error";
        }
        else {
            console.log(3);
            return response;
        }
    // } catch (error) {
    //     console.log("Error occurred in making POST api call : " + error);
    //     //return Internal_Server_Error;
    //     throw Internal_Server_Error
    // }
}


export async function deleteAPICall(uri) {

}