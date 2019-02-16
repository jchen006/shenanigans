import React from 'react'
import PropTypes from 'prop-types';
import styles from './styles.js'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
    }

    handleUsernameChange(event) {
        this.setState({
            'username': event.target.value
        })
    }

    render() {
        const { classes } = this.props
        console.log(classes)
        return (
            <div>
                <TextField
                    id="username-field"
                    label="Username"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    margin="normal"
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                />
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)