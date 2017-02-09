if (Meteor.isClient) {
  angular.module('messages', ['angular-meteor', 'accounts.ui'])
		.controller('MessageCtrl', function ($scope, $meteor) {

            // Scope productList linked to the meteor mongo collection            $scope.messageList = $meteor.collection(Messages);

    // newProduct will used with the Add message form
    $scope.newMessage = {
                'email':'',
                'timestamp': '',
                'text': '',
		};

            // Add a new message to the list            $scope.addProduct = function(){                // Generate the next ID                var pIndex = $scope.messageList.length + 1;
                // set the message id                $scope.newMessage.id = pIndex;                // Add message to the Db collection                $meteor.call('addMessage',$scope.newMessage);                // delete message to unbind from form                $scope.reset();            }

          // Remove product from list            $scope.deleteMessage = function(p){                // Use a dialog to confirm delete                if (confirm("Are you sure you want to delete message id " + p.id + "?")) {                // Delete object from DB - parameter is the collection                $meteor.call('deleteMessage',p._id);                }            }

            // Deselect message objects            $scope.reset = function () {                $scope.newMessage = {                
	         'email':'',
                'timestamp': '',
                'text': '',};            }

  });
}
