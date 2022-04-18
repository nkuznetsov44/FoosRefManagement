import 'devextreme/dist/css/dx.light.css';
import './App.css';
import React from 'react';
import TextBox from 'devextreme-react/text-box';
import { Button } from 'devextreme-react/button';
import { login } from './auth';


const LoginForm = (props) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const loginClick = (e) => {
        (async () => {
            try {
                const user = await login(username, password);
                if (props.onLogin != undefined) {
                    props.onLogin(user);
                }
            }
            catch(e) {
                alert('Login failed');
                console.log(e);
            }
        })();
    };

    return (
        <div className="dx-fieldset">
            <div className="dx-field">
                <div className="dx-field-label">Username</div>
                <div className="dx-field-value">
                    <TextBox
                        onValueChanged={({ value }) => setUsername(value)}
                    />
                </div>
            </div>
            <div className="dx-field">
                <div className="dx-field-label">Password</div>
                <div className="dx-field-value">
                    <TextBox
                        mode="password"
                        showClearButton={true}
                        onValueChanged={({ value }) => setPassword(value)}
                    />
                </div>
            </div>
            <Button
                width={120}
                text="Login"
                type="normal"
                stylingMode="contained"
                onClick={loginClick}
            />
        </div>
    );
};


const User = (props) => {
    return (
        <div className="dx-field-label">Logged in as {props.user}</div>
    );
};


const UserOrLoginForm = () => {
    const [user, setUser] = React.useState(sessionStorage.getItem('user'));

    if (user == undefined) {
        return (<LoginForm onLogin={setUser} />);
    }
    return (<User user={user} />);
};


const App = () => {
    return (
        <React.Fragment>
            <div><h1>Index</h1></div>
            <UserOrLoginForm />
        </React.Fragment>
    );
}

export default App;