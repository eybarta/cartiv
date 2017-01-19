import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
 
export const Inventory = new Mongo.Collection('inventory');

if (Meteor.isServer) {
    Meteor.publish('inventory', function inventoryPublication() {
        return Inventory.find();
    })
}

Meteor.methods({
    'inventory.insert'(product) {
        check(product.name, String);
        check(product.price_min, Number);
        check(product.price_max, Number);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        Inventory.insert({
            name:product.name,
            image: product.image,
            price_min: product.price_min,
            price_max: product.price_max,
            amount: product.amount,
            cost: product.cost,
            createdAt: new Date(),
            owner: this.userId            
        })
    },
    'inventory.remove'(productId) {
        check(productId, String);

        Inventory.remove(productId);
    }
})