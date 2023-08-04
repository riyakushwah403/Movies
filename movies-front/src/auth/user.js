import { API } from "../config";
export const signup = (user) => {
    console.log(user);
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
}


export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("Error during API call:", err);
            throw err;
        });
};


export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        next();

        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    };
}