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