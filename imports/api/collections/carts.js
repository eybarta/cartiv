import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Carts = new Mongo.Collection('carts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('carts', function cartsPublication() {
    return Carts.find();
  });
}

Meteor.methods({
  'carts.insert'(cart) {
    check(cart.location, String);
    check(cart.thumb, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Carts.insert({
      location:cart.location,
      thumb: cart.thumb,
      createdAt: new Date(),
      owner: this.userId
    });
  },
  'carts.remove'(cartId) {
    check(cartId, String);
 
    Carts.remove(cartId);
  }
});