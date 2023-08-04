import React, { useState } from "react";
import Layout from "../All/Layout";
import { signup } from "../auth/user";

const  Signup = () => {
    const [values, setValues] = useState({
        name: "",
        Lastname: "",
        email: "",
        password: '',
        phoneno:"",
        error: '',
        success: false
    });
    const { name, email, Lastname, phoneno, password, error, success } = values
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }




    const clickSubmit = (event) => {
        event.preventDefault()
        signup({ name, Lastname, email, password, phoneno })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        name: '',
                        Lastname:'',
                        email: '',
                        password: '',
                        phoneno:'',
                        error: '',
                        success: true
                    })
                }
            })

    }

    const signUPfrom = () => {
        return (
            <form className="form-control">
                <div className="from-group ">
                    <label className="text-muted">Name</label>
                    <br />
                    <input className="form-item" onChange={handleChange('name')}
                        type="text"
                        
                        value={name}
                    />
                </div>
                <div className="from-group ">
                    <label className="text-muted">Lastname</label>
                    <br />
                    <input onChange={handleChange('Lastname')}
                        type="text"
                        className="form-item"
                        value={Lastname}
                    />
                </div>
                

                <div className="from-group ">
                    <label className="text-muted">Email</label>
                    <br />
                    <input onChange={handleChange('email')}
                        type="email"
                        className="form-item"
                        value={email}
                    />
                </div>

                <div className="from-group ">
                    <label className="text-muted">password</label>
                    <br />
                    <input onChange={handleChange('password')}
                        type="password"
                        className="form-item"
                        value={password}
                    />
                </div>

                <div className="from-group ">
                    <label className="text-muted">Phoneno</label>
                    <br />
                    <input onChange={handleChange('phoneno')}
                        type="number"
                        
                        value={phoneno}
                    />
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">
                    Submit
                </button>

            </form>
        )
    };

    const showError = () => {
        return (<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
        )
    }
    const showSuccess = () => {
        return (<div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            New account is created . Please signin
        </div>
        )
    }
    return (
        <Layout 
        >
            {showSuccess()}
            {showError()}
            {signUPfrom()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
};

export default Signup;