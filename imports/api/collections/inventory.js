import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

 _ = lodash;
export const Inventory = new Mongo.Collection('inventory');

if (Meteor.isServer) {
    Meteor.publish('inventory', function inventoryPublication() {
        return Inventory.find();
    })
}

Meteor.methods({
    'inventory.insert'(product) {
        check(product.name, String);
        check(product.pricerange, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized')
        }


        /*
            // Lets map the product..
            product.pricerange to { price: {min,max}}
            product.description to {key: values}
        */
        let product_to_insert = {};
        
        let desc = _.trim(product.description),
            ds = desc.split(','),
            propsFromDescription = {};

            _.forEach(ds, prop => {
                let p = prop.split(':')
                propsFromDescription[_.trim(p[0])] = _.trim(p[1])
            })

        let price = _.trim(product.pricerange),
            p = price.split('-'),
            priceObj = {
                min: p[0],
                max: p[1]
            }

            product_to_insert = _.merge({
                name: product.name,
                image: product.image,
                price: priceObj,
                amount: product.amount,
                createdAt: new Date(),
                owner: this.userId   
            }, propsFromDescription);

        Inventory.insert(product_to_insert)
    },
    'inventory.remove'(productId) {
        check(productId, String);

        Inventory.remove(productId);
    }
})