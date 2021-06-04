import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const LoginPage = () => {
    const [error, setError] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("Zarejestruj")
        
        if (username.trim().length <= 0 || password.trim().length <= 0 || email.trim().length <= 0) {
            setError('Wrong credentials')
            return
        }
        
        axios.post('http://localhost:3001/users/register', {
            username, password, email
          })
          .then(function (response) {
            history.push('/login')
            setError(null)
          })
          .catch(function (error) {
            const status = error.response.status
            
            if (status === 403) {
                setError('User with this credentials exists')
                return
            } else if (status === 400) {
                setError('Incorrect data')
                return
            } else if (status === 500) {
                setError('Cannot add user now. Try later!')
                return
            }
          });
    }

    return (
        <>
            <Row>
                <Col sm='8' md='6' lg='4' >
                    <RegisterForm onSubmit={onSubmit} setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} />
                    <Link to='/login'>Login</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    {error && <Alert variant='danger' className='mt-1'>{error}</Alert>}
                </Col>
            </Row>
        </>
    )
}

export default LoginPage;