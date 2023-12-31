const express = require("express");
const {
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
  addVehicleFeatureset,
  editVehicleFeatureset,
  getVehicleFeatureset,
} = require("../../controller/Admin/featureset.controller");
const featuresetRouter = express.Router();

//list the featuresets
featuresetRouter.get("/featureset-list", featuresetList);

//add featureset
featuresetRouter.post("/featureset-add", featuresetAdd);

//edit featureset
featuresetRouter.put("/featureset-edit/:featureSetId", featuresetEdit);

//delete featureset
featuresetRouter.put("/featureset-delete/:featureSetId", featuresetDelete);

//assign featureset to customer
featuresetRouter.put(
  "/featureset-assign-customer/:featureSetId",
  featuresetAssignCustomer
);

//unassign featureset
featuresetRouter.put(
  "/featureset-unassign-customer/:featureSetId",
  featuresetUnassignCustomer
);

//get featureset of particular customer
featuresetRouter.get(
  "/featureset-get-customer/:userId",
  featuresetDetailsOfCustomer
);

//get list of customers assign to particular featureset

featuresetRouter.get(
  "/featureset-assign-customerlist/:featureSetId",
  featuresetCustomerAssignList
);

//get list of customers which are not assign to particular featureset

featuresetRouter.get(
  "/featureset-not-assign-customerlist/:featureSetId",
  featuresetCustomerNotAssignList
);
//
featuresetRouter.get("/featureset/:featureSetId", featureset);

//to get all customer list
featuresetRouter.get(
  "/featureset-get-all-customers",
  featuresetAllCustomerList
);

//api to add vehicleFeatureset
featuresetRouter.post(
  "/featureset-addto-vehicle/:vehicle_Id/:featureSetId",
  addVehicleFeatureset
);

//api to edit vehicleFeatureset
featuresetRouter.put(
  "/featureset-edit-vehiclefeatureset/:vehicle_Id",
  editVehicleFeatureset
);

//api to get vehcleFeaturesetDeails
featuresetRouter.get(
  "/featureset-vehicleFeaturest-details/:vehicle_Id",
  getVehicleFeatureset
);

module.exports = { featuresetRouter };
