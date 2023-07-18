const { featuresetModel } = require("../../models/Admin/featureset.model");

const featuresetList = async (req, res) => {
  try {
    const featuresets = await featuresetModel.find(
      { status: true },
      "featureSetId featureSetName selectOrganisation"
    );

    res.status(200).json(featuresets);
  } catch (err) {
    res.status(500).send("Error in getting the list of featuresets");
  }
};

const featuresetAdd = async (req, res) => {
  const { featureSetId, featureSetName, selectOrganisation, systemType } =
    req.body;

  const checkFeatureSet = await featuresetModel.findOne({
    featureSetName,
  });

  if (checkFeatureSet) {
    res.status(500).send("Feature Set Name already exists");
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
      res.status(200).json(updatedFeatureSet);
    } else {
      res.status(404).send("Feature Set not found");
    }
  } catch (error) {
    res.status(500).send("Error in updating Feature Set");
  }
};

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
      res.status(500).send("Failed to update the status");
    }
  } catch (err) {
    res.status(500).send("Error in updating the status");
  }
};

const featuresetAssignOrganization = async (req, res) => {
  const { featureSetId } = req.params;

  try {
    const addOrganization = await featuresetModel.findOneAndUpdate(
      { featureSetId },
      { $push: { selectOrganisation: req.body.selectOrganisation } }
    );

    if (addOrganization) {
      res.status(200).send(addOrganization);
    } else {
      res.status(500).send("Error in adding organization");
    }
  } catch (err) {
    res.status(500).send("Failed to add organization");
  }
};

const featuresetUnassignOrganization = async (req, res) => {
  const { featureSetId } = req.params;

  try {
    const removeOrganization = await featuresetModel.findOneAndUpdate(
      { featureSetId },
      { $pull: { selectOrganisation: { $in: req.body.selectOrganisation } } }
    );

    if (removeOrganization) {
      res.status(200).send(removeOrganization);
    } else {
      res.status(500).send("Error in unassigning the organization");
    }
  } catch (err) {
    res.status(500).send("Failed to unassign organization");
  }
};

const featuresetDetailsOfCustomer = async (req, res) => {
  const { userId } = req.params;

  try {
    const featuresets = await featuresetModel.find({
      selectedOrganisation: { $in: [userId] },
    });

    if (featuresets.length > 0) {
      res.status(200).json(featuresets);
    } else {
      res.status(404).json({ message: "No featuresets found for the user" });
    }
  } catch (err) {
    console.error("Error retrieving featuresets:", err);
    res.status(500).json({ message: "Failed to get featuresets" });
  }
};

module.exports = {
  featuresetList,
  featuresetAdd,
  featuresetEdit,
  featuresetDelete,
  featuresetAssignOrganization,
  featuresetUnassignOrganization,
  featuresetDetailsOfCustomer,
};
