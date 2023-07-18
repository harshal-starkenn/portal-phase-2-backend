const express = require("express");
const {
  featuresetList,
  featuresetAdd,
  featuresetEdit,
  featuresetDelete,
  featuresetAssignOrganization,
  featuresetUnassignOrganization,
  featuresetDetailsOfCustomer,
} = require("../../controller/Admin/featureset.controller");
const featuresetRouter = express.Router();

featuresetRouter.get("/featureset-list", featuresetList);

featuresetRouter.post("/featureset-add", featuresetAdd);

featuresetRouter.put("/featureset-edit/:featureSetId", featuresetEdit);

featuresetRouter.put("/featureset-delete/:featureSetId", featuresetDelete);

featuresetRouter.put(
  "/featureset-assign-organization/:featureSetId",
  featuresetAssignOrganization
);

featuresetRouter.put(
  "/featureset-unassign-organization/:featureSetId",
  featuresetUnassignOrganization
);

featuresetRouter.get(
  "/featureset-get-organization/:userId",
  featuresetDetailsOfCustomer
);

module.exports = { featuresetRouter };
