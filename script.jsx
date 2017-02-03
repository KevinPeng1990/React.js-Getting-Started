var Button = React.createClass({
  localHandleClick: function() {
    this.props.localHandleClick(this.props.increment)
  },
  render: function() {
    return (
      <button onClick={this.localHandleClick}>+{this.props.increment}</button>
    )
  }
});

var Result = React.createClass({
  render: function() {
    return (
      <div>{this.props.localCounter}</div>
    )
  }
});

var Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var component = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data) {
      component.setState(data);
    });
  },
  render: function() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80"/>
        <h3>{this.state.name}</h3>
      </div>
    );
  }
});

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = this.refs.login;
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="github login name" ref="login"/>
        <button>Add</button>
      </form>
    );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {counter: 0,
      logins: []};
  },
  handleClick: function(increment) {
    this.setState({ counter: this.state.counter+increment });
  },
  addCard: function(loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  render: function() {
    var cards = this.state.logins.map(function(login) {
      return (<Card login={login} />)
    });
    return (
      <div>
        <Button localHandleClick={this.handleClick} increment={1}/>
        <Button localHandleClick={this.handleClick} increment={5}/>
        <Button localHandleClick={this.handleClick} increment={10}/>
        <Button localHandleClick={this.handleClick} increment={100}/>
        <Result localCounter={this.state.counter}/>
        <Form addCard={this.addCard}/>
        {cards}
      </div>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById("container"));