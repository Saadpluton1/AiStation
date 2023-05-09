import Presale from "../../models/presale/presale.js";

//create Presale
export const createPresale = async (req, res) => {
    const info = req.body;
    let presale;
    const tokenDetails = {
        Token_Address: info.Token_Address,
        Token_Symbol: info.Token_Symbol,
        Token_Name: info.Token_Name,
        Token_Decimal: info.Token_Decimal
    }

    const contributionDetails = {
        min: info.min,
        max: info.max
    }

    const timeDetails = {
        Start: info.startTime,
        End: info.endTime
    }

    const links = {
        Website_Link: info.Website_Link,
        Twitter_Link: info.Twitter_Link,
        Telegram_Link: info.Telegram_Link,
        Facebook_Link: info.Facebook_Link
    }

    try {

        if (info.Vesting) {
            if (info.Vesting_Period_Days <= 0) {
                throw new Error("Invalid Vesting Period");
            }
            if (info.Rewards_Per_Vesting_Period <= 0) {
                throw new Error("Invalid Reward per vesting period");
            }
        }
        // if (info.Liquidity) {
        //     if (info.Liquidity_Rate_Per_BNB <= 0) {
        //         throw new Error("Invalid Liquidity Rate per BNB")
        //     }
        //     // if (info.Pancakeswap_Liquidity < 51) {
        //     //     throw new Error("Pancakeswap liquidity cant be less than 51%")
        //     // }
        //     // if (info.Locking_Days <= 0) {
        //     //     throw new Error("Invalid Locking Days")
        //     // }
        // }
        if (info.Presale_rate <= 0) {
            throw new Error("Invalid Presale Rate")
        }
        if (info.min > info.max) {
            throw new Error("Invalid Min Max Values")
        }

        if (info.Softcap < (info.Hardcap / 2)) {
            throw new Error("Softcap must be >= 50% of Hardcap")
        }


        presale = new Presale({
            Logo_URL: info.Logo_URL,

            Token_info: tokenDetails,

            Presale_rate: info.Presale_rate,

            Contribution: contributionDetails,

            Time: timeDetails,

            Vesting: info.Vesting,

            Vesting_Period_Days: info.Vesting_Period_Days,

            Rewards_Per_Vesting_Period: info.Rewards_Per_Vesting_Period,

            // Liquidity: info.Liquidity,

            // Locking_Days: info.Locking_Days,

            // Liquidity_Rate_Per_BNB: info.Liquidity_Rate_Per_BNB,
            // Pancakeswap_Liquidity: info.Pancakeswap_Liquidity,       

            Links: links,

            Description: info.Description,

            Whitelisted_sale: info.Whitelisted_sale,

            Status: info.Status,

            Access_type: info.Access_type,

            Softcap: info.Softcap,

            Hardcap: info.Hardcap

        })
        const temp = await presale.save()
        console.log("added")
        res.status(200).json(temp)
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }


};

//get Presale Site  
export const getPresale = async (req, res) => {
    try {
        // console.log("Getting presale data...");
        let temp = []
        const data = await Presale.find({});
        for (let i = 0; i < data.length; i++) {
            if (data[i].Approval == "Approved") {
                temp.push(data[i])
            }
        }
        // console.log("Retrieved data:", temp);
        res.status(200).json(temp);
    } catch (err) {
        // console.error("Error retrieving presale data:", err);
        res.status(400).send(err);
    }
};

export const getPresaleAdmin = async (req, res) => {
    try {
        const data = await Presale.find();

        console.log("Retrieved data:", data);
        res.status(200).json(data);
    } catch (err) {
        // console.error("Error retrieving presale data:", err);
        res.status(400).send(err);
    }
};

export const deletePresaleAdmin = async (req, res) => {
    try {
        const data = await Presale.findByIdAndDelete(req.params.id);
if(data)
{
    res.status(200).json({ status: true, message: "Updated Successfully" });
}
else{
    
    res.status(400).json({ status: false, message: "Something Error" });
}
     } catch (err) {
        // console.error("Error retrieving presale data:", err);
        res.status(400).send(err);
    }
};

export const updatePresaleStatus = async (req, res) => {
    try {
        const presaleId = req.body._id;
        const data = await Presale.findByIdAndUpdate({
            _id: presaleId
        }, { Approval: req.body.Approval }, { new: true });

        // console.log("Retrieved data:", data);
        res.status(200).json({ status: true, message: "Updated Successfully" });
    } catch (err) {
        // console.error("Error retrieving presale data:", err);
        res.status(400).send(err);
    }
};

export const swapFunds = async (req, res) => {
    try {
        // console.log((req.body.Total_Funds_Swapped))
        // console.log(req.body._id)
        const presaleId = req.body._id;

        const data = await Presale.findByIdAndUpdate({
            _id: presaleId
        }, {
            $inc: {
                Total_Funds_Swapped: req.body.Total_Funds_Swapped,
                Total_Users_Participated: 1
            }
        },
            { new: true });

        // console.log("Retrieved data:", data);
        res.status(200).json(data);
    } catch (err) {
        // console.error("Error retrieving presale data:", err);
        res.status(400).send(err);
    }
}

export const getSaleById = async (req, res) => {
    try {
        console.log("getSaleById")
        // console.log(req.query._id)
        const data = await Presale.findById({ _id: req.query._id });

        res.status(200).json(data);
    } catch (err) {
        // console.error("Error retrieving presale data:", err);
        res.status(400).send(err);
    }
}
