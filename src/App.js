import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/homepage/homepage.component'
import ShowPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'



class App extends React.Component {

        constructor() {
          super() 
          this.state = {
            currentUser: null
          }
        }

        unsubscribreFromAuth = null

      componentDidMount() {
        this.unsubscribreFromAuth = auth.onAuthStateChanged(async userAuth => {
         if (userAuth) {
           const userRef = await createUserProfileDocument(userAuth);

           userRef.onSnapshot(snapShot => {
             this.setState({
               currentUser: {
                 id: snapShot.id,
                 ...snapShot.data()

               }
             })

             console.log(this.state)

           })

           
         } else {
           this.setState({currentUser: userAuth })
         }
        })
      }

      componentWillUnmount() {
        this.unsubscribreFromAuth()
      }

    render() 
      {
        return (
        <div>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route  path='/shop' component={ShowPage} />
            <Route  path='/signin' component={SignInAndSignUpPage} />
          </Switch>
        </div>
      );
    }
  }

export default App;
