import prisma from "../../app.js";
import * as ResponseHelper from "../../helpers/responseHelper.js";

const fetchSiteInformation = async () => {
  try {
    const siteInformation = await prisma.siteInformation.findMany();

    if (!siteInformation || siteInformation.length === 0) {
      return ResponseHelper.errorMessage("Site information not found", 404);
    }

    const datas = [];
    siteInformation.map(async (element) => {
      datas.push({
        nojs: element.nojs,
        ip: element.ip,
        siteName: element.siteName,
      })
    })

    return ResponseHelper.successData(datas, 200);
  } catch (error) {
    console.error("Error fetching site information:", error);
    return ResponseHelper.errorMessage("Failed to fetch site information", 500);
  }
};

export default fetchSiteInformation;
