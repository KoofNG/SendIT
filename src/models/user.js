class user {
  constructor(firstname, lastname, othername, email, username, password, registered, isAdmin) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.othername = othername;
    this.email = email;
    this.username = username;
    this.password = password;
    this.registered = registered;
    this.isAdmin = isAdmin;
  }
}

export default user;