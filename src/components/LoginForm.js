import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = ({onSubmit, setLogin, setPassword}) => {

    return (
        <Form onSubmit={onSubmit} role='form'>
            <h2>Login</h2>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Login</Form.Label>
                <Form.Control type='text' placeholder='Login' onChange={e => setLogin(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='pass' onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant='primary' type='submit'>Zaloguj</Button>
        </Form>
    )
}

export default LoginForm;