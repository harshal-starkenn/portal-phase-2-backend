const User = require("../../models/Admin/adminCustomers");
const { featuresetModel } = require("../../models/Admin/featureset.model");

//get the total list of featuresets
const featuresetList = async (req, res) => {
  try {
    const featuresets = await featuresetModel.find(
      { status: true },
      "featureSetId featureSetName selectOrganisation"
    );

    res.status(200).send(featuresets);
  } catch (err) {
    res.status(500).send("Error in getting the list of featuresets");
  }
};

//add the new featureset
const featuresetAdd = async (req, res) => {
  const { featureSetId, featureSetName, selectOrganisation, systemType } =
    req.body;

  const checkFeatureSet = await featuresetModel.findOne({
    featureSetName,
  });

  if (checkFeatureSet) {
    res.status(404).send("Feature Set Name already exists");
  } else {
    const newFeatureSet = new featuresetModel({ ...req.body, status: true });

    const savedFeatureSet = await newFeatureSet.save();

    if (savedFeatureSet) {
      res.status(201).send("Feature Set added successfully");
    } else {
      res.status(500).send("Error in adding Feature Set");
    }
  }
};

//edit the added featureset
const featuresetEdit = async (req, res) => {
  const { featureSetId } = req.params;
  const updateParams = req.body;

  try {
    const updatedFeatureSet = await featuresetModel.findOneAndUpdate(
      { featureSetId },
      updateParams,
      { new: true }
    );

    if (updatedFeatureSet) {
      res.status(200).send(updatedFeatureSet);
    } else {
      res.status(404).send("Feature Set not found");
    }
  } catch (error) {
    res
      .status(500)
      .send("Featureset Name already exists to another featureset");
  }
};

//delete the featureset/ only updating status to false
const featuresetDelete = async (req, res) => {
  const { featureSetId } = req.params;

  try {
    const deleteFeatureset = await featuresetModel.findOneAndUpdate(
      { featureSetId },
      { status: false }
    );

    if (deleteFeatureset) {
      res.status(200).send(deleteFeatureset);
    } else {
      res.status(404).send("Failed to update the status");
    }
  } catch (err) {
    res.status(500).send("Error in updating the status");
  }
};

//assign created featureset to customer
const featuresetAssignCustomer = async (req, res) => {
  const { featureSetId } = req.params;
  try {
    const checkCustomer = await featuresetModel.find({
      featureSetId,
      selectCustomer: req.body.selectCustomer,
    });
    if (checkCustomer.length > 0) {
      res.status(404).send("Customer already exists");
    } else {
      const addCustomer = await featuresetModel.findOneAndUpdate(
        { featureSetId },
        { $push: { selectCustomer: req.body.selectCustomer } }
      );

      if (addCustomer) {
        res.status(200).send(addCustomer);
      } else {
        res.status(404).send("Error in adding Customer");
      }
    }
  } catch (err) {
    res.status(500).send("Failed to add Customer");
  }
};

//unassign the customer from featureset
const featuresetUnassignCustomer = async (req, res) => {
  const { featureSetId } = req.params;

  try {
    const removeCustomer = await featuresetModel.findOneAndUpdate(
      { featureSetId },
      { $pull: { selectCustomer: { $in: req.body.selectCustomer } } }
    );

    if (removeCustomer) {
      res.status(200).send(removeCustomer);
    } else {
      res.status(404).send("Error in unassigning the Customer");
    }
  } catch (err) {
    res.status(500).send("Failed to unassign Customer");
  }
};

//get the featureset assign to particular customer based on userId
const featuresetDetailsOfCustomer = async (req, res) => {
  const { userId } = req.params;

  try {
    const featuresets = await featuresetModel.find({
      selectCustomer: { $in: [userId] },
    });

    if (featuresets.length > 0) {
      res.status(200).send(featuresets);
    } else {
      res.status(404).send({ message: "No featuresets found for the user" });
    }
  } catch (err) {
    console.error("Error retrieving featuresets:", err);
    res.status(500).send({ message: "Failed to get featuresets" });
  }
};

//list of assign customers
const featuresetCustomerAssignList = async (req, res) => {
  const { featureSetId } = req.params;

  try {
    const featureSetCustomers = await featuresetModel.findOne({ featureSetId });
    const listOfUsers = await User.find({});

    const listOfAssignCustomer = listOfUsers.filter((customer) =>
      featureSetCustomers.selectCustomer.includes(customer.userId)
    );

    if (listOfAssignCustomer) {
      res.status(200).send(listOfAssignCustomer);
    } else {
      res.status(404).send("Error getting assign customer list");
    }
  } catch (err) {
    res.status(500).send("Failed to retrieve the list of assigned customers");
  }
};

//list of customers which are not assign to this featureset

const featuresetCustomerNotAssignList = async (req, res) => {
  const { featureSetId } = req.params;
  try {
    const getUsersList = await User.find({});

    const featuresetCustomers = await featuresetModel.findOne({ featureSetId });
    const filternotAssignCustomers = getUsersList?.filter(
      (customer) =>
        !featuresetCustomers.selectCustomer.includes(customer.userId)
    );

    res.status(200).send(filternotAssignCustomers);
  } catch (err) {
    res.status(500).send("Failed to get list of not assign customers");
  }
};

module.exports = {
  featuresetList,
  featuresetAdd,
  featuresetEdit,
  featuresetDelete,
  featuresetAssignCustomer,
  featuresetUnassignCustomer,
  featuresetDetailsOfCustomer,
  featuresetCustomerAssignList,
  featuresetCustomerNotAssignList,
};
