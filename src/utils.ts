export const onChange = (context:any, name: string, newValue: any, callback?: any) => {
    context.setState({ [name]: { ...context.state[name], value: newValue }}, callback && callback);
}

export const setError = (context:any, name: string, error: string, callback?: any) => {
    context.setState((prevState: any) => ({
        ...prevState,
        [name]: { ...prevState[name], error: error }
    }), callback);
}

// export const validateForm = (context: any) => {
//     let status = true;

//     const stateCopy = { ...context.state };

//     for (let key in stateCopy) {
//         if (stateCopy.hasOwnProperty(key)) {
//             const field = stateCopy[key];
//             const isRequired = field ? field.required : false;
//             if (isRequired) {
//                 const name = field.name;
//                 const value = field.value;

//                 if (value === null || value === undefined || value.length === 0) {
//                     status = false;
//                     setError(context, name, 'error found');
//                     console.log(name)
//                 } else {
//                     setError(context, name, '');
//                 }
//             }
//         }
//     }
//     return status;
// }

// export const setError = (context: React.Component, fieldName: string, errorMessage: string): void => {
//     // Update the error message in the state using setState
//     context.setState(prevState => ({
//         ...prevState,
//         [fieldName]: {
//             ...prevState[fieldName],
//             error: errorMessage
//         }
//     }));
// };


export const validateForm = (fieldsToValidate: string[], state: any) => {
    let status = true;

    for (let fieldName of fieldsToValidate) {
        const field = state[fieldName];
        if (field) {
            const isRequired = field.required;
            if (isRequired) {
                const value = field.value;
                const type = typeof value;

                if ((value === null || value === undefined || value.length === 0) && type !== 'number') {
                    status = false;
                    setError(state, fieldName, 'Field is required');
                    console.log(value)
                } else {
                    setError(state, fieldName, '');
                }
            }
        }
    }
    return status;
}

export const validateRegistrationForm = (context: any) => {
    let isValid = true; 

    const { password, confirmPassword } = context.state; 

    if (password.value.length < 5) { 
        setError(context, 'password', 'Password is too short');
        isValid = false;
    } else {
        setError(context, 'password', '');
    }

    if (password.value !== confirmPassword.value) {
        setError(context, 'confirmPassword', 'Passwords do not match');
        isValid = false;
    } else {
        setError(context, 'confirmPassword', '');
    }

    return isValid; 
};


