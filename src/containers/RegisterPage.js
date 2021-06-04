import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
//import fetchApi from '../utils/fetchApi';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';

const LoginPage = ({setLogged/*setCookie*/}) => {
    
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("Zaloguj")
        //logowanie
    }

    return (
        <>
            <Row>
                <Col sm='8' md='6' lg='4' >
                    <LoginForm onSubmit={onSubmit} setLogin={setLogin} setPassword={setPassword} />
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