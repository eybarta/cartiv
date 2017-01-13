Meteor.methods({
	createUsers(email, password) {
	    Accounts.createUser({
	        password: password,
	        email: email,
	        createdAt: new Date(),
	    })
	}
})