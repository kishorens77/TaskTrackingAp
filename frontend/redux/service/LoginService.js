import { postAPICall } from "./ApiService";

export async function loginUser(loginData) {
    // const t = postAPICall("/login", loginData)
    //     .then(res => { return res })
    //     .then(console.log("authentication error", t))
    //     .then(k => {
    //         if (k === "Error") {
    //             throw new Error("Error");
    //         }
    //         return k;
    //     })

    return postAPICall("/login", loginData)
        .then(res => { return res })
        .then(k => {
            console.log('1');
            console.log("k : ", k);
            if (k === "Error") {
                console.log('2');
                throw new Error("Error");
            }
            return k;
        }).catch(function (error) {
            //Handle error
            console.log(error);
            throw new Error("Login Error");
        });


}

export async function registerUser(userData) {
    return postAPICall("/register", userData);
}