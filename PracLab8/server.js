// Server side code not available on client
Products = new Mongo.Collection("productCollection");

if (Meteor.isServer) {

	// Initialise the DB with sample data (if necessary)
	// Note the object syntax has changed from previous labs - number values are not quoted
  Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var sampleProducts = [
            {
                'id': 1,
                'name': 'Kettle',
                'description': 'Steel Electric Kettle',
                'category': 'Kitchen',
                'stock': 100,
                'price': 55.00},
            {
                'id': 2,
                'name': 'Fridge freezer',
                'description': 'Fridge + freezer large',
                'category': 'kitchen',
                'stock': 45,
                'price': 799.00},
            {
                'id': 3,
                'name': 'Portable Music Player',
                'description': '250GB music player (MP3, MP4, WMA, WAV)',
                'category': 'Audio',
                'stock': 5,
                'price': 99.00},
            {
                'id': 4,
                'name': '13inch Laptop',
                'description': 'HP laptop, 8GB RAM, 250GB SSD',
                'category': 'Computer',
                'stock': 45,
                'price': 799.00},
            {
                'id': 5,
                'name': '8inch Tablet',
                'description': 'Android 5.1 Tablet, 32GB storage, 8inch screen',
                'category': 'Computer',
                'stock': 5,
                'price': 99.00},
            {
                'id': 6,
                'name': '46inch TV',
                'description': 'Sony 4K, OLED, Smart TV',
                'category': 'Television',
                'stock': 12,
                'price': 2799.00},
            {
                'id': 7,
                'name': 'Washing Machine',
                'description': '1600rpm spin, A+++ rated, 10KG',
                'category': 'Laundry',
                'stock': 50,
                'price': 699.00},
            {
                'id': 8,
                'name': 'Phone',
                'description': 'Windows 10, 5.2inch OLED, 3GB RAM, 64GB Storage',
                'category': 'Mobile Phone',
                'stock': 45,
                'price': 799.00},
            {
                'id': 9,
                'name': '10inch Tablet',
                'description': 'Windows 10, 128GB storage, 8inch screen',
                'category': 'Computer',
                'stock': 5,
                'price': 299.00},
            {
                'id': 10,
                'name': 'Oven',
                'description': 'Oven + Grill, Stainless Steel',
                'category': 'Kitchen',
                'stock': 10,
                'price': 399.00},
            {
                'id': 11,
                'name': 'Bed',
                'description': 'Super King size, super comfort mattress',
                'category': 'Furniture',
                'stock': 5,
                'price': 899.00},
            {
                'id': 12,
                'name': 'Learning JavaScript',
                'description': 'Become a JavaScript expert in 2 hours!',
                'category': 'Book',
                'stock': 50,
                'price': 29.00}
      ];

      // Insert JS objects into collection
      for (var i = 0; i < sampleProducts.length; i++)
        Products.insert(sampleProducts[i]);
    }
  });

   //Meteor Methods	
   Meteor.methods({
   //Add a new product to the collection
   addProduct: function(product)
   {
	//Test for a particular user
	if(Meteor.user().emails[0].address != "Hola@yahoo.com")
	{
		throw new Meteor.Error('not-authorized');
	}
	Products.insert(product);
   },

   //Update an existing product
   updateProduct: function(product)
   {
	//Check is a user is logged in
	if(!Meteor.user() || Meteor.user().emails[0].address != "Hola@yahoo.com")
	{
		throw new Meteor.Error('not-authorized');
	}
	Products.update(product._id,product);
   },

   //Delete a product by its collection id
   deleteProduct: function(id)
   {
	Products.remove(id);
   }});

   //Prevent users from modifying their accounts
   Meteor.users.deny({
   update: function(){
   return true;
   }
});
   
}



