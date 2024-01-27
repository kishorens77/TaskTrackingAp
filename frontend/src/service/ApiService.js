// GET, POST, PUT, DELETE

//const baseURL = "http://localhost:5002"

var Headers = { 'Content-Type': 'application/json' }
const Internal_Server_Error = { message: 'Unable to make API calls', status: 500 }
const errorCodes = [400, 402, 404, 500, 401];
//const unauthorized = 401;


export async function getAPICall(uri, baseURL, token) {

    try {
        let finalURL = baseURL + uri;
        console.log("Making GET API call to : " + finalURL);
        var response;
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        console.log("Headers",Headers);
        await fetch(finalURL, {
            method: 'GET',
            headers: Headers,
        })
            .then(response => response.json())
            .then((json) => {
                response = json;
            });

        if (errorCodes.includes(response.status))
            throw new Error("Error");
        else
            return response;

    } catch (error) {
        console.log("Error occurred in making GET api call : " + error);
        return Internal_Server_Error;
    }
}

export async function postAPICall(uri, body, baseURL, token) {

    try {
        let finalURL = baseURL + uri;
        console.log("Making POST API call to : " + finalURL);
        var response;
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        await fetch(finalURL, {
            method: 'POST',
            headers: Headers,
            body: JSON.stringify(body)
        })
            .then(res => {
                return res.json()
            })
            .then((json) => {
                response = json;
            });

        // handle the common error here
        console.log(response);
        if (errorCodes.includes(response.status)) {
            throw new Error(response.message);
        }
        else {
            return response;
        }
    } catch (error) {
        console.log("Error occurred in making POST api call : " + error);
        return Internal_Server_Error;
    }
}


export async function putAPICall(uri, body, baseURL, token) {
    try {
        console.log("ID3=", uri)
        let finalURL = baseURL + uri;
        console.log("Making PUT API call to : " + finalURL);
        var response;
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        await fetch(finalURL, {
            method: 'PUT',
            headers: Headers,
            body: JSON.stringify(body)
        })
            .then(res => {
                return res.json()
            })
            .then((json) => {
                response = json;
            });

        // handle the common error here
        console.log(response);
        if (errorCodes.includes(response.status)) {
            throw new Error(response.message);
        }
        else {
            return response;
        }
    } catch (error) {
        console.log("Error occurred in making PUT api call : " + error);
        return Internal_Server_Error;
    }

}

export async function deleteAPICall(uri, baseURL, token) {
    try {
        console.log("ID3=", uri)
        let finalURL = baseURL + uri;
        console.log("Making DELETE API call to : " + finalURL);
        var response;
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        await fetch(finalURL, {
            method: 'DELETE',
            headers: Headers
        })
            .then(res => {
                return res.json()
            })
            .then((json) => {
                response = json;
            });

        // handle the common error here
        console.log(response);
        if (errorCodes.includes(response.status)) {
            throw new Error(response.message);
        }
        else {
            return response;
        }
    } catch (error) {
        console.log("Error occurred in making DELETE api call : " + error);
        return Internal_Server_Error;
    }

}