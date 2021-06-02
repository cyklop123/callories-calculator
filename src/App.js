import { BrowserRouter as Router, /*Redirect,*/ Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container'

function App() {
    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/">
                        
                    </Route>
                    <Route exact path="/dashboard">
                        
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
