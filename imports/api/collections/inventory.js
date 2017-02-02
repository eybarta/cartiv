import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

 _ = lodash;
export const Inventory = new Mongo.Collection('inventory');

export const ProductOptions = new Mongo.Collection('product_options')

// initialize Product Options defaults
ProductOptions.upsert({_id: "defaultOptionsXy3e3"}, { 
        _id: "defaultOptionsXy3e3",
        type: [],
        category: [],
        brand: [],
        size: ['Small', 'Medium', 'Large']
    }
)


if (Meteor.isServer) {
    Meteor.publish('inventory', function inventoryPublication() {
        return Inventory.find();
    })
    Meteor.publish('product_options', function productOptionsPublication() {
        return ProductOptions.find();
    })
}

Meteor.methods({
    'inventory.insert'(product) {
        // check(product.type.value, String);
        check(product.priceMin, Number);
        check(product.amount, Number)

        if (! this.userId) {
            throw new Meteor.Error('not-authorized')
        }


        console.log('PRODUCT TO INSERT >>> ', product);
        let product_to_insert = _.merge({
            createdAt: new Date(),
            owner: this.userId   
        }, product);

        Inventory.insert(product_to_insert)
    },
    'inventory.remove'(productId) {
        check(productId, String);

        Inventory.remove(productId);
    },

    // PRODUCT OPTIONS DEFAULTS
    'product_options.update'(option){
        let prop = option.name;
        ProductOptions.update( 
            { _id: "defaultOptionsXy3e3" },
            { 
                $push: {[prop]: option.tag}
            }

        
        )
    }
    
})