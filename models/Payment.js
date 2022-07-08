
    const mongoose = require('mongoose');

    const PaymentSchema = new mongoose.Schema({

        ID:{
            type: Number,
            required: [true, 'please provide your unique ID'],
          
        },
        Amount:{
            type: Number,
            required: [true, 'please provide the amount']
        },

        Currency:{
            type: String
        },

        CustomerEmail:{
            type : String,
            required:[true, 'Please provide your email'],
          
        },

        SplitInfo:[
            {
                SplitType:{type: String},
                SplitValue:{type: Number},
                SplitEntityId:{type:String}
            },
        ]

    });

    module.exports = mongoose.model('Payment', PaymentSchema);

    