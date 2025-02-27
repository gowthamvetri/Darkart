import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type: String,
    },
    image: { 
        type:Array,
        default : []
    },
    categoryId: [{
        type : mongoose.Schema.ObjectId,
        ref : 'category'
    }],
    subCategory : [
        {
            type: mongoose.Schema.ObjectId,
            ref : "subCategory"     
        }
    ],
    unit :{
        type:String,
        default : ""
    },
    stock :{
        type: Number,
        default : 0
    },
    price : {
        type: Number,
        default: null
    },
    discount : {
        type : Number,
        default : null
    },
    description : {
        type: String,
        default : ""
    },
    more_details: {
        type:Object,
        default : {}
    },
    publish: {
        type: Boolean,
        default : true
    },
},{
    timestamps:true
})

const productModel = mongoose.model('product',productSchema)

export default productModel;