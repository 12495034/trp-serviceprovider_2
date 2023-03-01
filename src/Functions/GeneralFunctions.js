import Form from 'react-bootstrap/Form'

//function to return appropriate UI message if passwords do not match during account signup
export function handlePasswordConfirmation(password, confirmPassword) {
    var passwordMessage;
    if (password === confirmPassword) {
        passwordMessage = <Form.Text className="text-success">Passwords Match!</Form.Text>
    } else if (password !== confirmPassword) {
        passwordMessage = <Form.Text className="text-danger">Passwords Do Not Match!</Form.Text>
    }
    return passwordMessage
}

//used in new clinic form to limit date picker to future dates only
export function currentDate() {
    let d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const today = `${ye}-${mo}-${da}`;
    return today
}



