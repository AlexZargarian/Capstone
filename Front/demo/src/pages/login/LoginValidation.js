function validation(values) {

    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{2,}$/;


    if (values.email === "") {
        error.email = "Email is required";
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email address";
    }
    else {
        error.email = ""
    }


    if (values.password === "") {
        error.password = "Password is required";
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Invalid password";
    }
    else {
        error.password = ""
    }

    return error;

}
export default validation