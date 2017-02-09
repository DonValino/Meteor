
Messages = new Mongo.Collection("messageCollection");

// Server side code not available on client
if (Meteor.isServer) {

	// Initialise the DB with sample data (if necessary)
	// Note the object syntax has changed from previous labs - number values are not quoted
  Meteor.startup(function () {
    if (Messages.find().count() === 0) {
      var sampleMessages = [
            {
                'email': 'test@test.com',
                'timestamp': new Date(),
                'text': 'A Sample Message',
            }
      ];

			// Insert JS objects into collection
      for (var i = 0; i < sampleMessages.length; i++)
        Messages.insert(sampleMessages[i]);
    }
  });

	//Meteor Methods
	Meteor.methods({
		// Add a new message to the collection
		addMessage: function(message) {
		 // Test if a user is logged in
      		 if(!Meteor.user())
      		 {
			throw new Meteor.Error('not-authorized');
  	   	 }
			var email1 = Meteor.user().emails[0].address;
			message.email = email1;
			message.timestamp = new Date();
		  	Messages.insert(message);         
		},

		// Delete a product by its collection id
		deleteMessage: function(id) {
     		 if(Meteor.user().emails[0].address != "admin@admin.com")
     		 {
      		   throw new Meteor.Error('not-authorized');
      		 }
		  Messages.remove(id);
		}

	});

}

