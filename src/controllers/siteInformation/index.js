import prisma from "../../app.js";
import * as ResponseHelper from "../../helpers/response.js";
import {
  siteInfoDetailSchema,
  siteInformationSchema,
} from "../../helpers/validation/siteInfoValidation.js";

const dataToFormatDb = async (data) => {
  const formattedData = {
    ...data,
    version: data.version === "V3" ? "new" : "old",
    mppt_type: data.scc === "3" ? "mppt-srne" : "mppt-epveper",
  };

  const siteInformation = {
    nojs: formattedData.nojs,
    siteId: formattedData.site_id_name,
    terminalId: formattedData.terminal_id,
    siteName: formattedData.name,
    ip: formattedData.ip_snmp,
    ipMiniPc: formattedData.mini_pc,
    webapp: formattedData.webapp,
    ehubVersion: formattedData.version || "new",
    panel2Type: formattedData.panel2_type || "new",
    mpptType: formattedData.mppt_type || null,
    talisVersion: formattedData.talis_version || false,
    tvdSite: formattedData.tvd_site || false,
  };

  const siteInfoDetail = {
    nojsId: formattedData.nojs,
    ipGatewayLC: formattedData.ip_gw_lc,
    ipGatewayGS: formattedData.ip_gw_gs,
    subnet: formattedData.subnet,
    cellularOperator: formattedData.cellular_operator,
    lc: formattedData.beam_provider,
    gs: formattedData.provider_gs,
    projectPhase: formattedData.project_phase,
    buildYear: formattedData.build_year,
    onairDate: formattedData.onair_date,
    topoSustainDate: formattedData.topo_sustain_date,
    gsSustainDate: formattedData.gs_sustain_date,
    contactPerson: formattedData.pjs,
    address: formattedData.address,
    subDistrict: formattedData.kecamatan,
    district: formattedData.kabupaten,
    province: formattedData.provinsi,
    latitude: formattedData.latitude,
    longitude: formattedData.longitude,
  };
  return { siteInformation, siteInfoDetail };
};

const validateSchema = async (data) => {
  try {
    const parsedData = await dataToFormatDb(data);
    const validSite = siteInformationSchema.safeParse(
      parsedData.siteInformation
    );
    const validDetail = siteInfoDetailSchema.safeParse(
      parsedData.siteInfoDetail
    );

    if (validSite.success && validDetail.success) {
      return {
        status: "success",
        siteInformation: validSite.data,
        siteInfoDetail: validDetail.data,
      };
    } else {
      return {
        status: "failed",
        siteInformation: validSite.error,
        siteInfoDetail: validDetail.error,
      };
    }
  } catch (error) {
    console.error("Error validating site:", error);
    return { status: "error", error };
  }
};

const createSiteInformation = async (data) => {
  try {
    const validData = await validateSchema(data);
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
