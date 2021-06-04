import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import DashboardPage from './containers/DashboardPage'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import Navbar from './components/Navbar'
import AdminPanelPage from './containers/AdminPanelPage'

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['access', 'refresh'])

    const logout = (e) => {
        e.preventDefault()
        axios.delete('http://localhost:3001/users/logout',{ 
                data: { token: cookies.refresh},
                withCredentials: true },
            )
            .then(res => {
                removeCookie('role')
                removeCookie('refresh')
            })
            .catch(err => {
                if(err.response){
                    console.log(err.response.code)
                }
            })
    }

    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/login">
                        {cookies.refresh ? <Redirect to='/' /> : <LoginPage setCookie={setCookie} /> }
                    </Route>
                    <Route exact path="/register">
                        {cookies.refresh ? <Redirect to='/' /> : <RegisterPage /> }
                    </Route>
                    <Route exact path="/">
                        {cookies.refresh ? 
                        <>
                            <Navbar role={cookies} logout={logout} />
                            <DashboardPage cookies={cookies} removeCookie={removeCookie} />
                        </>: <Redirect to='/login' />}
                    </Route>
                    <Route exact path="/admin">
                        {cookies.refresh ? 
                        <>
                            <Navbar role={cookies} logout={logout} />
                            <AdminPanelPage />
                        </>: <Redirect to='/login' />}
                    </Route>
                    <Route path='/'>
                        <h1>404 - Not Found</h1>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
