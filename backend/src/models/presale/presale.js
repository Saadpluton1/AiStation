import mongoose from "mongoose";

const presaleSchema = new mongoose.Schema({

    Logo_URL: {
        type: String,
        required: true
    },
    Token_info: {
        type: {
            Token_Address: { type: String, required: true },
            Token_Symbol: { type: String, required: true },
            Token_Name: { type: String, required: true },
            Token_Decimal: { type: Number, required: true }
        }
    },
    Presale_rate: {
        type: Number
        , required: true
    },
    Contribution: {
        type: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        }
    },
    Time: {
        type: {
            Start: { type: String, required: true },
            End: { type: String, required: true }
        }
    },
    Vesting: {
        type: Boolean,
        default: false
    },
    Vesting_Period_Days: {
        type: Number,
        default: 0
    },

    Rewards_Per_Vesting_Period: {
        type: Number,
        default: 0
    },

    // Liquidity: {
    //     type: Boolean,
    //     default: false
    // },
    // Locking_Days: {
    //     type: Number,
    //     default: 0
    // },

    // Liquidity_Rate_Per_BNB: {
    //     type: Number,
    //     default: 0
    // },
    // Pancakeswap_Liquidity: {
    //     type: Number,
    //     default: 0
    // },

    Links: {
        Website_Link: { type: String, required: true },
        Twitter_Link: { type: String },
        Telegram_Link: { type: String },
        Facebook_Link: { type: String }
    },

    Description: {
        type: String
    },

    Whitelisted_sale: {
        type: Boolean,
        default: false
    },
    Status: {
        type: String
    },
    Access_type: {
        type: String
    },
    Total_Users_Participated: {
        type: Number,
        default: 0
    },
    Total_Funds_Swapped: {
        type: Number,
        default: 0
    },
    Approval: {
        type: String,
        default: "Pending"
    },
    Softcap: {
        type: Number,
        required: true
    },
    Hardcap: {
        type: Number,
        required: true
    }
});


export default mongoose.model("Presale", presaleSchema)
