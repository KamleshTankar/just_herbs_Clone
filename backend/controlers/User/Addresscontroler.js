// import mongoose from "mongoose";

import Addressm from "../../models/Addressmodel.js";


export const Filladdress = async (req, res) => {
    const { Country, Zip, House, Street, Landmark, City, State, Type, Default } = req.body;

    try {
        
        const newAddress = await Addressm.create({
            Country,
            Zip,
            House,
            Street,
            Landmark,
            City,
            State,
            Type,
            Default
        });
        
        res.status(200).json({ result: newAddress });

    } catch (error) {
        res
          .status(500)
          .json({ message: "Something went wrong", error: error.message });
    }
}