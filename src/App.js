import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Router, Route, Link, IndexRoute, hashHistory, Redirect } from 'react-router';

const Links = () =>
  <nav style={{backgroundColor : 'grey'}}>
      <Link activeClassName="active2" to="home">Home</Link> <br/>
      <Link activeStyle={{color : 'green'}} to="about">About</Link> <br/>
      <Link activeStyle={{color : 'green'}} to="about/contact">Contact</Link><br />
      <Link to="logout">logout</Link>
  </nav>

const Root = (props) =>
  <div><Links />
    {props.children}
    {props.content}
    {props.footer}
  </div>;
const Welcome = () => <div>Welcome</div>
// const Home = (props) => <div>Home! Hi {props.location.query.name || "cheese"} ({props.location.query.age})</div>;
const About = (props) => <div>About<br />{props.children}</div>;
const Contact = () => <div>Contact</div>;
const BrandView = (props) => <div>This is Brand view for {props.params.id || 'nothing'}</div>;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state =  {
       name : props.location.query.name
    }
  }
  dontleavemealone(nextLocation){
    console.log(nextLocation);
    if(nextLocation.pathname == "logout") {
      return '정말 떠나시겠습니까?'
    }
  }
  componentWillMount(){
  this.context.router.setRouteLeaveHook(
    this.props.route,
    this.dontleavemealone
  )
}
  componentWillReceiveProps(nextprops) {
    this.setState ( {
      name : nextprops.location.query.name
    })
  }
  render () {
    return (
      <div>this is {this.state.name} </div>
    )
  }
}
Home.contextTypes = { router: React.PropTypes.object.isRequired }

// content  + footer
const Content = () => <div> this is Content view </div>
const Footer = () => <div> this is Footer </div>
const NotFound = () => <div>404 notfound </div>

const Logout = () => <div> logout </div>
const New = () => <div> it is New </div>

const App = () => {
  return (
    <Router history={ hashHistory }>
      <Route path="/" component={Root}>
        <IndexRoute component={Welcome} />
        <Route path="mixview" components={{ content : Content, footer :Footer}} />
        <Route path="home" component={Home} />
        <Route path="about" component={About} >
            <Route path="contact" component={Contact} />
        </Route>
        <Route path="brands" component={BrandView} >
            <Route path="(:id)" component={BrandView} />
        </Route>
        <Route path="logout" component={Logout} />
        <Route path="new" component={New} />
        <Redirect from="old" to="new" />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};


export default App;
