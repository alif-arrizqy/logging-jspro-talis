import prisma from "../../app.js";
import * as ResponseHelper from "../../helpers/responseHelper.js";
import validateSiteInformation from "../../helpers/validationSchema/siteInfoValidation.js";

const createSiteInformation = async (data) => {
  try {
    const validData = await validateSiteInformation(data);
    if (validData.status !== "success") {
      console.log("Some data failed validation:", validData);
      return ResponseHelper.errorMessage("Some data failed validation", 400);
    }

    const siteInformation = await prisma.siteInformation.create({
      data: validData.siteInformation,
    });

    const siteInfoDetail = await prisma.siteInfoDetail.create({
      data: validData.siteInfoDetail,
    });

    if (!siteInformation || !siteInfoDetail) {
      return ResponseHelper.errorMessage(
        "Failed to create site information",
        500
      );
    }

    return ResponseHelper.successMessage(
      "Site information created successfully",
      201
    );
  } catch (error) {
    if (error.code === "P2002") {
      console.error("Unique constraint failed on the fields: `nojs`", error);
      return ResponseHelper.errorMessage(
        "Unique constraint failed on the fields: `nojs`",
        409
      );
    }
    console.error("Error creating site information:", error);
    return ResponseHelper.errorMessage(
      "Failed to create site information",
      500
    );
  }
};

const fetchSiteInformation = async (nojsId) => {
  try {
    const siteInformation = await prisma.siteInformation.findFirst({
      where: { nojs: nojsId },
      include: {
        siteInfoDetails: {
          select: {
            ipGatewayLC: true,
            ipGatewayGS: true,
            subnet: true,
            cellularOperator: true,
            lc: true,
            gs: true,
            projectPhase: true,
            buildYear: true,
            onairDate: true,
            topoSustainDate: true,
            gsSustainDate: true,
            contactPerson: true,
            address: true,
            subDistrict: true,
            district: true,
            province: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    if (!siteInformation) {
      return ResponseHelper.errorMessage("Site information not found", 404);
    }

    const {
      nojs,
      siteId,
      terminalId,
      siteName,
      ip,
      ipMiniPc,
      webapp,
      ehubVersion,
      panel2Type,
      mpptType,
      talisVersion,
      tvdSite,
      siteInfoDetails,
    } = siteInformation;

    // Parse contactPerson if it is stored as JSON string
    const parsedSiteInfoDetails = siteInfoDetails.map((detail) => ({
      ...detail,
      contactPerson: typeof detail.contactPerson === 'string'
        ? JSON.parse(detail.contactPerson)
        : detail.contactPerson,
    }));

    const response = {
      siteInformation: {
        nojs,
        siteId,
        terminalId,
        siteName,
        ip,
        ipMiniPc,
        webapp,
        ehubVersion,
        panel2Type,
        mpptType,
        talisVersion,
        tvdSite,
      },
      siteInfoDetails: parsedSiteInfoDetails,
    };

    return ResponseHelper.successData(response, 200);
  } catch (error) {
    console.error("Error fetching site information:", error);
    return ResponseHelper.errorMessage("Failed to fetch site information", 500);
  }
};

const updateSiteInformation = async (nojsId, data) => {
  try {
    const validData = await validateSchema(data);
    if (validData.status !== "success") {
      console.log("Some data failed validation:", validData);
      return ResponseHelper.errorMessage("Some data failed validation", 400);
    }

    // update site information table
    const updatedSiteInformation = await prisma.siteInformation.update({
      where: { nojs: validData.siteInformation.nojs },
      data: validData.siteInformation
    })

    // update site information detail table
    const updateSiteDetail = await prisma.siteInfoDetail.update({
      where: { nojsId: validData.siteInfoDetail.nojsId },
      data: validData.siteInfoDetail,
    });

    if (!updatedSiteInformation || !updateSiteDetail) {
      return ResponseHelper.errorMessage(
        "Failed to update site information",
        500
      );
    }

    return ResponseHelper.successMessage(
      "Site information updated successfully",
      200
    );
  } catch (error) {
    console.error("Error updating site information:", error);
    return ResponseHelper.errorMessage(
      "Failed to update site information",
      500
    );
  }
};

const deleteSiteInformation = async (nojsId) => {
  try {
    await prisma.siteInformation.delete({
      where: { nojs: nojsId },
    });

    return ResponseHelper.successMessage(
      "Site information deleted successfully",
      200
    );
  } catch (error) {
    console.error("Error deleting site information:", error);
    return ResponseHelper.errorMessage(
      "Failed to delete site information",
      500
    );
  }
};

export {
  createSiteInformation,
  fetchSiteInformation,
  updateSiteInformation,
  deleteSiteInformation,
};
