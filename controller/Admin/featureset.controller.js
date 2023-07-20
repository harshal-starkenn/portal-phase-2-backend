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
  const requestBody = req.body; // Get the entire request body as the payload is already in the correct format

  try {
    const checkFeatureSet = await featuresetModel.findOne({
      featureSetName: requestBody.featureSetName,
    });

    if (checkFeatureSet) {
      return res.status(400).json({ error: "Feature Set Name already exists" });
    }

    const newFeatureSet = new featuresetModel({
      ...requestBody, // Spread the entire requestBody to the newFeatureSet object
      status: "true",
    });

    const savedFeatureSet = await newFeatureSet.save();
    if (savedFeatureSet) {
      res.status(201).json({ message: "Feature Set added successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in adding Feature Set" });
  }
};

//edit the added featureset
const featuresetEdit = async (req, res) => {
  const { featureSetId } = req.params;
  const updateParams = req.body;

  try {
    const existingFeatureSet = await featuresetModel.findOne({
      featureSetId,
    });

    if (!existingFeatureSet) {
      return res.status(404).send("Feature Set not found");
    }

    const checkFeatureSetName = await featuresetModel.findOne({
      featureSetName: updateParams.featureSetName,
      _id: { $ne: existingFeatureSet._id },
    });

    if (checkFeatureSetName) {
      return res
        .status(409)
        .send("Feature Set Name already exists in another feature set");
    }

    const updatedFeatureSet = await featuresetModel.findOneAndUpdate(
      { featureSetId },
      updateParams,
      { new: true }
    );

    res.status(200).send(updatedFeatureSet);
  } catch (error) {
    res.status(500).send("Error in updating Feature Set");
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
    const featureSetCustomers = await featuresetModel.findOne({
      featureSetId,
    });

    if (!featureSetCustomers) {
      res.status(404).send("Feature set not found for user_type=2");
      return;
    }

    const listOfUsers = await User.find({ user_type: "2" }); // Fetch users with user_type="2"

    const listOfAssignCustomer = listOfUsers.filter((customer) =>
      featureSetCustomers.selectCustomer.includes(customer.userId)
    );

    if (listOfAssignCustomer.length > 0) {
      res.status(200).send(listOfAssignCustomer);
    } else {
      res.status(404).send("No assigned customers found");
    }
  } catch (err) {
    res.status(500).send("Failed to retrieve the list of assigned customers");
  }
};

//list of customers which are not assign to this featureset

const featuresetCustomerNotAssignList = async (req, res) => {
  const { featureSetId } = req.params;
  try {
    const getUsersList = await User.find({ user_type: "2" }); // Fetch users with user_type="2"

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

//get particular featureset data
const featureset = async (req, res) => {
  const { featureSetId } = req.params;

  try {
    const data = await featuresetModel.findOne({ featureSetId });

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Error in featureset Data");
    }
  } catch (err) {
    res.status(500).send("Failed to get data of featureset");
  }
};

//get the list of customers to use while adding featureset

const featuresetAllCustomerList = async (req, res) => {
  try {
    const getList = await User.find({ status: true, user_type: "2" });

    if (getList.length > 0) {
      res.status(200).send(getList);
    } else {
      res.status(404).send("No customers found matching the criteria");
    }
  } catch (err) {
    res.status(500).send("Failed to get list of all customers");
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
  featureset,
  featuresetAllCustomerList,
};
