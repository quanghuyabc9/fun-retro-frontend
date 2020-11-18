import { useState } from "react";
import { Redirect } from "react-router-dom";
import SignUp from "../../components/SignUp";
import { APIAuthPostCall } from "../../configs/APIAuth";

export default function SignUpPage() {
    const [newUser, setNewUser] = useState({
        email: "",
        _password: "",
        _name: "",
        registered: ""
    });
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const handleChange = (event) => {
        if (event.target.name === "email") {
            setNewUser({
                email: event.target.value,
                _password: newUser._password,
                _name: newUser._name,
                registered: newUser.registered
            });
        } else if (event.target.name === "password") {
            setNewUser({
                email: newUser._password,
                _password: event.target.value,
                _name: newUser._name,
                registered: newUser.registered
            });
        } else if (event.target.name === "name") {
            setNewUser({
                email: newUser.email,
                _password: newUser._password,
                _name: event.target.value,
                registered: newUser.registered
            });
        }
    }
    const handleSubmit = () => {
        APIAuthPostCall("users/signup", "", newUser)
            .then(res => {
                setOpenSuccessDialog(true);
            }).catch(err => {
                console.log(err);
            })
    }
    const handleCloseSuccessDialog = () => {
        setOpenSuccessDialog(false);
        setSignUpSuccess(true);
    }
    if (signUpSuccess) 
        return <Redirect to={process.env.PUBLIC_URL + "/signin"} />
    else
        return <SignUp newUser={newUser} handleChange={handleChange} handleSubmit={handleSubmit}
            openSuccessDialog={openSuccessDialog}
            handleCloseSuccessDialog={handleCloseSuccessDialog} />
}