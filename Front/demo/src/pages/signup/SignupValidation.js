function validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{2,}$/;

    // Name validation
    if (values.name === ""){
        error.name = "Name is required";
    } else {
        error.name = ""
    }

    // Email validation
    if (values.email === ""){
        error.email = "Email is required";
    } else if (!email_pattern.test(values.email)){
        error.email = "Invalid email address";
    } else if (!values.email.endsWith('@aua.am')) { 
        error.email = "Email must end with @aua.am";
    } else {
        error.email = ""
    }

    // Password validation
    if (values.password === ""){
        error.password = "Password is required";
    } else if (!password_pattern.test(values.password)){
        error.password = "Invalid password. Password must include at least one uppercase letter, one lowercase letter, and one number.";
    } else {
        error.password = ""
    }

    return error;
}

export default validation;
