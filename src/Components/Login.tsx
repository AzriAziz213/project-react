import React from 'react';
import logo from '../assets/logo.png';
import { onChange, validateForm, validateRegistrationForm } from '../utils';

class LoginComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: { name: 'email', value: '', required: true, error: ''},
      password: { name: 'password', value: '', required: true, error: ''},
      rememberMe: { name: 'rememberMe', value: '', required: false, error: ''},
      signInEmail: { name: 'signInEmail', value: '', required: true, error: ''},
      signInPassword: { name: 'signInPassword', value: '', required: true, error: ''},
      confirmPassword: { name: 'confirmPassword', value: '', required: true, error: ''},
      registrationData: null,
      isButtonClicked: false,
      swapPage: true
    }
  }

  handleSignInClick = () => {
    this.setState({ swapPage: true });
  }

  handleRegisterClick = () => {
    this.setState({ swapPage: false });
  }

  render() {
    const {email, password, rememberMe, signInEmail, signInPassword, confirmPassword} = this.state;
    return (
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-4 offset-md-4">
            <div className="text-center">
              <img src={logo} alt="Logo" height="150"/>
            </div>

            {this.state.swapPage ? (
              <form onSubmit={this.onSignIn} className="login-box bg-light br-3">
                <div className="row">
                  <div className="col-12">
                    <div className="p-3">
                      <h1 className="font-weight-bold">Login</h1>
                      <p className="mb-0">Login with your credentials</p>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="px-3">
                      <div className="form-group">
                        <label> Email *</label>
                        <input
                          name={signInEmail.name}
                          value={signInEmail.value}
                          onChange={this.onChange}
                          className={signInEmail.error.length > 0 ? "form-control is-invalid":(signInEmail.value.length > 5 ? "form-control is-valid": "form-control")}
                          type = "email"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-group">
                        <label> Password *</label>
                        <input
                          name={signInPassword.name}
                          value={signInPassword.value}
                          onChange={this.onChange}
                          className={signInPassword.error.length > 0 ? "form-control is-invalid":(signInPassword.value.length > 5 ? "form-control is-valid": "form-control")}
                          type = "password"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="p-3 form-group">
                        <div className="form-check">
                          <label className="form-check-label"></label>
                          <input 
                            name={rememberMe.name}
                            checked={rememberMe.value}
                            onChange={this.onChange}
                            className="form-check-input" 
                            type="checkbox" />
                          Remember me
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="p-3 text-right" >
                      <div className="form-check-label">
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
            </form>
            ): (
              <form onSubmit={this.onRegister} className="login-box bg-light br-3">
                <div className="row">
                  <div className="col-12">
                    <div className="p-3">
                      <h1 className="font-weight-bold">Sign Up</h1>
                      <p className="mb-0">Enter your credentials</p>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="px-3">
                      <div className="form-group">
                        <label> Email *</label>
                        <input
                          name={email.name}
                          value={email.value}
                          onChange={this.onChange}
                          className={email.error.length > 0 ? "form-control is-invalid":(email.value.length > 5 ? "form-control is-valid": "form-control")}
                          type = "email"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-group">
                        <label> Password *</label>
                        <input
                          name={password.name}
                          value={password.value}
                          onChange={this.onChange}
                          className={password.error.length > 0 ? "form-control is-invalid":(password.value.length > 5 ? "form-control is-valid": "form-control")}
                          type = "password"
                          placeholder="Enter your password"
                        />
                      </div>

                      <div className="form-group">
                        <label> Confirm your password *</label>
                        <input
                          name={confirmPassword.name}
                          value={confirmPassword.value}
                          onChange={this.onChange}
                          className={confirmPassword.error.length > 0 ? "form-control is-invalid":(confirmPassword.value.length > 5 ? "form-control is-valid": "form-control")}
                          type = "password"
                          placeholder="Enter your password again"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                  <div className="col-12">
                    <div className="p-3 text-right" >
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </div>
                  </div>
              </form>
            )}

              <div className="row mt-3">
                <div className="col-6">
                  <span className="text-light clickable-text" onClick={this.handleSignInClick}>Sign in</span>
                </div>
                <div className="col-6 text-right">
                  <span className="text-light clickable-text" onClick={this.handleRegisterClick}>Register</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

  onChange = (e:any) => {
    const name = e.target.name;
    let value = e.target.value;

    if(name === this.state.rememberMe.name) {
      value = e.target.checked;
    }

    onChange(this, name, value);
  }

  onSignIn = (e:any) => {
    e.preventDefault();
  
    const { signInEmail, signInPassword, registrationData } = this.state;
    
    if (registrationData && signInEmail.value === registrationData.email && signInPassword.value === registrationData.password) {
      console.log('Email match found');
      window.location.href = 'https://ifca.asia/'; 
    } else {
      console.log('Email does not match');
    }
  }
  
  onRegister = (e:any) => {
    e.preventDefault();
    console.log('Register form submitted');

    const fieldsToValidate = ['email', 'password', 'confirmPassword']

    const isFormValid = validateForm(fieldsToValidate, this);
    const isPasswordValid = validateRegistrationForm(this);


    if (isFormValid && isPasswordValid) {
      const { email, password } = this.state;
      const model = {
        email: email.value,
        password: password.value,
      };
    
    this.setState({ registrationData: model });
    console.log('Registration successful:', model);
    };
  }
}

export default LoginComponent;
