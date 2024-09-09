import prisma from "../../app.js";
import { validationCreateSite } from "../../helpers/validation/siteInformation.js";
import * as ResponseHelper from "../../helpers/response.js";

// Add Site Information
const creareSiteInformation = async (data) => {
  try {
    // Validate the data
    const siteInformation = validationCreateSite().parse(data);
    if (!siteInformation) {
      return ResponseHelper.errorMessage("Invalid data", 400);
    }

    // Check if nojs already exists
    const isExist = await prisma.nojsUser.findFirst({
      where: {
        nojs: siteInformation.nojs,
      },
    });

    if (isExist !== null) {
      return ResponseHelper.errorMessage("Nojs already exists", 400);
    } else {
      // Create new site information
      const site = await prisma.nojsUser.create({
        data: {
          nojs: siteInformation.nojs,
          site: siteInformation.site,
          ip: siteInformation.ip,
          lc: siteInformation.lc,
          gs: siteInformation.gs,
          mitra: siteInformation.mitra,
          kota: siteInformation.kota,
          provinsi: siteInformation.provinsi,
          latitude: siteInformation.latitude,
          longitude: siteInformation.longitude,
          ehubVersion: siteInformation.ehubVersion,
          panel2Type: siteInformation.panel2Type,
          mpptType: siteInformation.mpptType,
          talisVersion: siteInformation.talisVersion,
        },
      });

      if (!site) {
        return ResponseHelper.errorMessage("Failed to insert a new data site information", 400);
      } else {
        return ResponseHelper.successMessage("Site information created successfully", 200);
      }
    }
  } catch (error) {
    console.error("Error creating site information:", error);
    return ResponseHelper.errorMessage("Failed to create site information", 500);
  }
};

export { creareSiteInformation };
