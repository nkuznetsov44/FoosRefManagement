import React from 'react';
import { useNavigate } from "react-router-dom";
import TextBox from 'devextreme-react/text-box';
import { Button } from 'devextreme-react/button';
import { login } from '../../auth';


const LoginForm = (props) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    const loginClick = (e) => {
        (async () => {
            try {
                const user = await login(username, password);
                if (props.onLogin) {
                    props.onLogin(user);
                }
                navigate('/', { replace: true });
            }
            catch(e) {
                alert('Login failed');
                console.log(e);
            }
        })();
    };

    const loginFormStyle = {
        width: '300px'
    };

    return (
        <div style={loginFormStyle}>
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
        </div>
    );
};


export default LoginForm;