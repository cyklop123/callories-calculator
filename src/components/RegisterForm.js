import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RegisterForm = ({onSubmit, setUsername, setPassword, setEmail}) => {

    return (
        <Form onSubmit={onSubmit} role='form'>
            <h2>Register</h2>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='username' onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='pass' onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='email' onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Button variant='primary' type='submit'>Zarejestruj</Button>
        </Form>
    )
}

export default RegisterForm;