if (Meteor.isClient) {
  angular.module('messages', ['angular-meteor', 'accounts.ui'])
		.controller('MessageCtrl', function ($scope, $meteor) {

            // Scope productList linked to the meteor mongo collection

    // newProduct will used with the Add message form
    $scope.newMessage = {
                'email':'',
                'timestamp': '',
                'text': '',
		};

            // Add a new message to the list
                // set the message id

          // Remove product from list

            // Deselect message objects
	         'email':'',
                'timestamp': '',
                'text': '',};

  });
}