/* utilities class links to session class and dataManager classes
*/

class LoginUtilities {
    _utilities = null;

    _loginButtonID = "loginButton";
    _forgotPasswordID = "forgotPassword";
    _newAccountID = "newAccount";
    _loginDivID = "loginDiv";
    _usernameID = "username";
    _passwordID = "password";
    _loginID = "login";

    constructor (utilities) {
        const self = this;
        this._utilities = utilities;

        $(document).ready(function() {
            $("#" + self._loginButtonID).on("click", function() {

            });
        });
    }

    get utilities() { return this._utilities; }
    get div()       { return this.utilities.div; }
    get lines()     { return this.utilities.lines; }
    get sessions()  { return this.utilities.sessions; }
    get data()      { return this.utilities.data; }
    get buttons()   { return this.utilities.buttons; }
    
    build(element) {
        const loginButton = "<button id = '" + this._loginButtonID + "' type = 'button' class = 'btn btn-dark btn-sm'>Click to log in.</button>";
        const loginDiv = "<div id = '" + this._loginDivID + "' class = 'hidden'></div>";
        const loginDivUsernameInput = "<input id = '" + this._usernameID + "' type = 'text' placeholder = 'username'>";
        const loginDivPasswordInput = "<input id = '" + this._passwordID + "' type = 'text' placeholder = 'password'>";
        const loginDivLoginButton = "<button id = '" + this._loginID + "' type = 'button' class = 'btn btn-dark btn-sm'>Set up new account</button>";
        const loginDivForgotPasswordButton = "<button id = '" + this._forgotPasswordID + "' type = 'button' class = 'btn btn-dark btn-sm'>Forgot password?</button>";
        const loginDivNewAccountButton = "<button id = '" + this._newAccountID + "' type = 'button' class = 'btn btn-dark btn-sm'>Set up new account.</button>";

        element.append(loginButton + loginDiv);
        $("#" + this._loginDivID).append(loginDivUsernameInput + loginDivPasswordInput + loginDivLoginButton + loginDivForgotPasswordButton + loginDivNewAccountButton);
    }
}