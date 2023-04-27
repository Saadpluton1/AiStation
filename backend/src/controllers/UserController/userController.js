import User from "../../models/users/user.js";

export const addUser = async (req, res) => {
    // console.log('hittt')
    const userAddress = req.body.Address
    // console.log("itme", userAddress)
    try {
        // console.log("itme2", userAddress)

        const ifExisits = await User.find({ Address: userAddress })
        // console.log(ifExisits.length)
        if (ifExisits.length == 0) {
            // console.log(ifExisits == null)
            const user = new User({
                Address: userAddress
            })
            // console.log("itme3", userAddress)

            await user.save()
            // console.log("itme4", userAddress)

            res.status(200).json({ status: true, message: "User Added" });
        } else {
            res.status(200).json({ status: true, message: "User Exists" });
        }

    } catch (err) {
        res.status(400).send(err)
    }
}

export const addAllocation = async (req, res) => {

    const data = req.body

    const project = {
        Project_id: data?.Project_id,
        Allocations: {
            Allocation: data?.Allocation,
            Claimable: data?.Claimable,
            Unlock_time: data?.Unlock_time
        }
    }

    const allocation = {
        Allocation: data?.Allocation,
        Claimable: data?.Claimable,
        Unlock_time: data?.Unlock_time
    }

    try {
        const user = await User.findOne({ Address: data?.Address })

        let i
        let exists = false
        user?.Projects.forEach((project, index) => {
            if (project.Project_id === data?.Project_id) {
                exists = true
                i = index;
            }
        })
        // console.log()
        if (!exists) {

            const updateUser = await User.findByIdAndUpdate(
                user?._id,
                { $push: { Projects: project } },
                { new: true })

            res.status(200).send({ status: true, message: "updated", updateUser })

        } else {
            // console.log("must add inside")
            const temp = await User.updateOne(
                {
                    _id: user._id, // replace with the ID of the user document
                    "Projects.Project_id": data?.Project_id // replace with the ID of the project to update
                },
                {
                    $push: {
                        "Projects.$.Allocations": allocation
                    }
                }
            )
            res.status(200).send({ status: true, message: "updated", temp })

        }

    } catch (err) {
        console.log(err)
    }
}

export const getAllocationData = async (req, res) => {
    console.log("Call")
    const data = req.query
    try {
        // console.log(data.address)

        const user = await User.findOne({ Address: data?.Address })
        let i
        let exists = false
        user?.Projects.forEach((project, index) => {
            if (project.Project_id === data?.Project_id) {
                exists = true
                i = index;
            }
        })

        console.log(user?.Projects[i].Allocations)


        res.status(200).send({ status: true, message: "success", data: user?.Projects[i].Allocations })
        console.log(user?.Projects, "-------------------")

    } catch (err) {
        console.error("Error retrieving presale data:", err);
        res.status(400).send(err);
    }
}