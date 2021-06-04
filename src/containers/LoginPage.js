import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';

const LoginPage = ({setCookie}) => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        
        if (username.trim().length <= 0 || password.trim().length <= 0) {
            setError('Wrong credentials')
            return
        }
        
        axios.post('http://localhost:3001/users/login', {
            username, password
          })
          .then(function (response) {
            setCookie('access' ,response.data.accessToken)
            setCookie('refresh', response.data.refreshToken)
            setError(null)
          })
          .catch(function (error) {
            const status = error.response.status
            
            if (status === 401) {
                setError('Incorrect credentials')
                return
            } else if (status === 400) {
                setError('Incorrect data')
                return
            } else if (status === 500) {
                setError('Cannot login now. Try later!')
                return
            }
          });
    }

    return (
        <>
            <Row>
                <Col sm='8' md='6' lg='4' >
                    <LoginForm onSubmit={onSubmit} setUsername={setUsername} setPassword={setPassword} />
                    <Link to='/register'>Register</Link>
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