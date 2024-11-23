const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
    const totalServices = services.reduce((sum, service) => sum + service.price, 0);

    if (totalServices > budget) return false;
    return true;
}

const partyController = {
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            }

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "Insufficient budget to do a party" });
                return;
            }
            const response = await PartyModel.create(party);

            res.status(201).json({ response, msg: "Party created successfully" });
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();
            res.json(parties);
        } catch (error) {
            console.log(error);
        }
    },
    getOne: async (req, res) => {
        try {
            const id = req.params.id;
            const party = await PartyModel.findById(id);

            
            if (!party) {
                res.status(404).json({ msg: "Party not found" });
                return;
            }

            res.json(party);
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const parties = await PartyModel.findById(id);

            if (!parties) {
                res.status(404).json({ msg: "Party not found" })
                return;
            }
            const deletedParty = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({ deletedParty, msg: "Party deleted successfully" });
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            }
            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "Budget is not enough for the services" });
                return;
            }

            const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

            if (!updatedParty) {
                res.status(404).json({ msg: "Party not found" })
                return;
            }

            res.status(200).json({party, msg: "Party updated successfully"})
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = partyController;
