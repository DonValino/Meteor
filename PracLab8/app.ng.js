if (Meteor.isClient) {
  angular.module('products', ['angular-meteor','accounts.ui'])
		.controller('ProductsCtrl', function ($scope, $meteor) {

    $scope.productsList = $meteor.collection(Products);

    // newProduct will used with the Add product form
    $scope.newProduct = {};
    // existingProduct will used with the update product form
    $scope.existingProduct = {};


    // Add a new product to the list
    $scope.addProduct = function(){

        // Generate the next ID (count products in array, then increment by 1)
        var pIndex = $scope.productsList.length + 1;

        // set the product id
        $scope.newProduct.id = pIndex;

        // Add product to the DB collection
        $meteor.call('addProduct',$scope.newProduct);
        // delete product to unbind from form
        $scope.reset();
    }

    // Select product for editing
    $scope.editProduct = function(p) {
        // Deep copy the selected p to $scope.existingProduct (bound to the edit form)
        $scope.existingProduct = angular.copy(p);
    }

    // Save updates to an existing product
    $scope.updateProduct = function(p){

        // Use a dialog to confirm update
        if (confirm("Are you sure you want to save changes to product id " + p.id + "?")) {
            // Update the product in the DB collection
	    $meteor.call('updateProduct',$scope.existingProduct);
        }
        // delete reference to form bound product objects
        $scope.reset();

    }

    // Remove product from list
    $scope.deleteProduct = function(p){
        // Use a dialog to confirm delete
        if (confirm("Are you sure you want to delete product id " + p.id + "?")) {
            // Delete object from Db - parameter is the collection _id
	    $meteor.call('deleteProduct',p._id);
        }
    }

    // Deselect product objects
    $scope.reset = function () {
        $scope.newProduct = {};
        $scope.existingProduct = {};
    }

  });

}
