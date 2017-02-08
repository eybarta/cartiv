import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

 _ = lodash;
export const Inventory = new Mongo.Collection('inventory');

export const ProductOptions = new Mongo.Collection('product_options')




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

        let product_from_db = Inventory.find({ _id: product._id}).fetch()
        console.log('product_from_db .. ',product_from_db);
        if (product_from_db.length>0) {
            Inventory.update({ _id: product._id}, product)
        }
        else {
        let product_to_insert = _.merge({
            createdAt: new Date(),
            owner: this.userId   
        }, product);

        Inventory.insert(product_to_insert)
        }
    },
    'inventory.delete'(id) {
        check(id, String);

        Inventory.remove(id);
    },
    'fetch_inventory'() {
        return Inventory.find({}, { fields: { 'owner':0, 'createdAt':0 }}).fetch();
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
        let productoptions = ProductOptions.find({_id: "defaultOptionsXy3e3"}).fetch();
        console.log("product options UPDATED >> ", productoptions);
                
    },
    // initialize Product Options defaults
    'product_options.init'() {
        let productoptions = ProductOptions.find({_id: "defaultOptionsXy3e3"}).fetch();
        if (productoptions.length<1) {
            ProductOptions.upsert({
                _id: "defaultOptionsXy3e3"
            }, { 
                $set: {
                    type: [],
                    category: [],
                    brand: [],
                    size: ['Small', 'Medium', 'Large']
                }
            })
        }
    }
    
})