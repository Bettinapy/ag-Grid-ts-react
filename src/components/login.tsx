import React, { Component } from 'react';
import { connect } from 'react-redux';
import {isLoggedIn} from '../actions';
import {login} from '../api';

interface IState {
    username: string;
    password: string;
    isLoading: boolean;
    errMessage: string;
  }
  
  interface IProps {
    history: any
  }
  
  interface MapStateToProps {
    navigation: any;
    isLoggedIn: boolean;
  }
   
  interface MapDispatchToProps {
    setIsLoggedIn: (params: any) => {}
  }

  class Login extends Component<IProps & MapDispatchToProps & MapStateToProps, IState> {
    state = {
      username: '',
      password: '',
      isLoading: false,
      errMessage: ''
    }

    onChange = (e: any, item: string) => {
        const { value } = e.target;
        this.setState({
          // Yuan: why do we need this.state here? Is it because we pass in state as Interface?
          ...this.state,
          [item]: value
        })
      }
    
    componentDidMount = () => {
        debugger;
        const { history, isLoggedIn } = this.props;
        if(isLoggedIn) {
            history.push('./home');
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.setState({
          isLoading: true
        })
        const { history, setIsLoggedIn } = this.props;
        const { username, password } = this.state;
        login(username, password).then((response: any) => {
          
          const { grantedAauthorities, tokens } = response.data;
          const { accessTokenExpiresIn } = tokens;
          /**
           * Yuan:
           * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
           */
          const screens = grantedAauthorities.filter((authority: any) => authority.authorityScope === 'SCREEN');
          debugger;
          screens.push({
            authorityName: 'Dashboard',
            moduleDisplayName: 'Dashboard',
            authorizations: [
              {
                screenName: 'Dashboard',
                screenKey: 'dashboard'
              }
            ]
          })
          console.log('screens', screens);
    
          /**
           * Yuan:
           * setItem: set value in localStorage, keep it for future authentication
           */
          localStorage.setItem('navigation', JSON.stringify(screens))
          localStorage.setItem('tokens', JSON.stringify(tokens))
          localStorage.setItem('expiryTime', `${new Date().getTime() + (accessTokenExpiresIn - 60000)}`);
    
          // Yuan: why do we need setIsLoggedIn here? We have already had isLoggedIn indicating whether the user is successfully logged in
          setIsLoggedIn({ isLoggedIn: true })
          history.push('./home');
          
        }).catch(err => {
          this.setState({
            errMessage: err.response?.data?.message,
            isLoading: false
          });
        })
      }
      
      render() {
        const { username, password, isLoading, errMessage } = this.state;
        debugger;
        return(
            <div>
            <h1>Login</h1>
              <form onSubmit={this.handleSubmit} method="post">
                <label>User Name</label>
                <input className="input" type="text" value={username} onChange={(e) => this.onChange(e, 'username')}/>
                
                <label>Password</label>
                <input className="input" type="password" value={password} onChange={(e) => this.onChange(e, 'password')}/>
              
                <button onSubmit={this.handleSubmit}>Log in</button>
              </form>
              {errMessage && <p>{errMessage}</p>}
            </div>
        )
      }
    
}

const mapStateToProps = (state: any) => ({
    isLoggedIn: state.isLoggedIn
  })
  
  const mapDispatchToProps: MapDispatchToProps  = {
    // change the name of isLoggedIn to setIsLoggedIn
    setIsLoggedIn: isLoggedIn
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);