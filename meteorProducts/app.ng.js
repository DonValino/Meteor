// Client side codeif (Meteor.isClient) {    // Use angular-meteor    angular.module('products', ['angular-meteor'])        .controller('ProductsCtrl', function ($scope, $meteor) {            // Scope productList linked to the meteor mongo collection            $scope.productsList = $meteor.collection(Products);            // newProduct will used with the Add product form            $scope.newProduct = {};            // existingProduct will used with the update product form            $scope.existingProduct = {};            // Add a new product to the list            $scope.addProduct = function(){                // Generate the next ID (count products in array, then increment by 1)                var pIndex = $scope.productsList.length + 1;                // set the product id                $scope.newProduct.id = pIndex;                // Add product to the list                $scope.productsList.push($scope.newProduct);                // delete product to unbind from form                $scope.reset();            }            // Select product for editing            $scope.editProduct = function(p) {                // Deep copy the selected p to $scope.existingProduct (bound to the edit form)                $scope.existingProduct = angular.copy(p);            }            // Save updates to an existing product            $scope.updateProduct = function(p){                // Use a dialog to confirm update                if (confirm("Are you sure you want to save changes to product id " + p.id + "?")) {                    // Get the index of this product in the products array                    var index = $scope.productsList.indexOf(p);                    // Replace the existing product with the updated one                    $scope.productsList[index] = angular.copy($scope.existingProduct);                }                // delete reference to form bound product objects                $scope.reset();            }            // Remove product from list            $scope.deleteProduct = function(p){                // Use a dialog to confirm delete                if (confirm("Are you sure you want to delete product id " + p.id + "?")) {                    // Find the object index in the array                    var index = $scope.productsList.indexOf(p);                    // Use JavaScript Splice function to remove the product from the array                    $scope.productsList.splice(index, 1);                }            }            // Deselect product objects            $scope.reset = function () {                $scope.newProduct = {};                $scope.existingProduct = {};            }        });}