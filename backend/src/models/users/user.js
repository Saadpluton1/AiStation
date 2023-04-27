import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Address: {
        type: String,
        required: true
    },
    Projects: [
        {
            Project_id: { type: String },
            Allocations: [
                {
                    Allocation: { type: Number },
                    Claimable: { type: Number },
                    Unlock_time: { type: String }
                },
            ],
        }
    ]
});


export default mongoose.model("User", userSchema)
