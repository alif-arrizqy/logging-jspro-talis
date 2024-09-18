import prisma from "../../app.js";
import * as ResponseHelper from "../../helpers/responseHelper.js";
import validatePmsLoggers from "../../helpers/validationSchema/pmsValidation.js";
import { fetchLogger, deleteLogger } from "../../helpers/fetchApiHelper.js";
import { tsFormatter } from "../../helpers/timestampFormatter.js";

const createPmsLoggers = async (nojsSite) => {
  try {
    const loggerData = await fetchLogger();
    // const loggerData = {
    //   code: 200,
    //   data: [
    //     {
    //       batt_volt: 5433,
    //       bspwatt: 0,
    //       cpu_temp: 61.2,
    //       dock_active: "5ff",
    //       edl1: -0.6,
    //       edl2: -0.0,
    //       edl3: -31.9,
    //       eh1: 0.0,
    //       eh2: 0.0,
    //       eh3: 0.0,
    //       load1: 1.29,
    //       load2: 0.0,
    //       load3: 0.0,
    //       max_battv: [3, 5655],
    //       mcb_voltage: 0,
    //       min_battv: [6, 5126],
    //       plpfill: 0,
    //       pms_data: {
    //         pms8: {
    //           cell10_v: 3664,
    //           cell11_v: 3665,
    //           cell12_v: 3667,
    //           cell13_v: 3661,
    //           cell14_v: 3669,
    //           cell1_v: 3659,
    //           cell2_v: 3659,
    //           cell3_v: 3661,
    //           cell4_v: 3662,
    //           cell5_v: 3662,
    //           cell6_v: 3660,
    //           cell7_v: 3663,
    //           cell8_v: 3662,
    //           cell9_v: 3661,
    //           cmos_state: "ON",
    //           current: 8,
    //           dmos_state: "ON",
    //           temp_bot: 35,
    //           temp_cmos: 39,
    //           temp_dmos: 39,
    //           temp_mid: 36,
    //           temp_top: 35,
    //           voltage: 5127,
    //         },
    //         pms9: {
    //           cell10_v: 3666,
    //           cell11_v: 3657,
    //           cell12_v: 3659,
    //           cell13_v: 3658,
    //           cell14_v: 3660,
    //           cell1_v: 3660,
    //           cell2_v: 3663,
    //           cell3_v: 3663,
    //           cell4_v: 3665,
    //           cell5_v: 3661,
    //           cell6_v: 3664,
    //           cell7_v: 3662,
    //           cell8_v: 3660,
    //           cell9_v: 3665,
    //           cmos_state: "ON",
    //           current: 0,
    //           dmos_state: "ON",
    //           temp_bot: 34,
    //           temp_cmos: 40,
    //           temp_dmos: 39,
    //           temp_mid: 34,
    //           temp_top: 37,
    //           voltage: 5126,
    //         },
    //       },
    //       pv1_curr: 1.32,
    //       pv1_volt: 79.0,
    //       pv2_curr: 0.0,
    //       pv2_volt: 46.0,
    //       pv3_curr: 2.86,
    //       pv3_volt: 76.5,
    //       rxlevel: 0,
    //       software_uptime: 0,
    //       sync: 0,
    //       ts: "20240918T143528+0700",
    //     },
    //     {
    //       batt_volt: 5167,
    //       bspwatt: 0,
    //       cpu_temp: 61.8,
    //       dock_active: "5ff",
    //       edl1: -9.6,
    //       edl2: -0.0,
    //       edl3: -31.9,
    //       eh1: 840.0,
    //       eh2: 0.0,
    //       eh3: 1569.3,
    //       load1: 1.29,
    //       load2: 0.0,
    //       load3: 0.02,
    //       max_battv: [3, 5133],
    //       mcb_voltage: 0,
    //       min_battv: [6, 5126],
    //       plpfill: 0,
    //       pms_data: {
    //         pms1: {
    //           cell10_v: 3665,
    //           cell11_v: 3669,
    //           cell12_v: 3666,
    //           cell13_v: 3664,
    //           cell14_v: 3668,
    //           cell1_v: 3658,
    //           cell2_v: 3669,
    //           cell3_v: 3661,
    //           cell4_v: 3667,
    //           cell5_v: 3662,
    //           cell6_v: 3658,
    //           cell7_v: 3664,
    //           cell8_v: 3672,
    //           cell9_v: 3671,
    //           cmos_state: "ON",
    //           current: 6,
    //           dmos_state: "ON",
    //           temp_bot: 36,
    //           temp_cmos: 39,
    //           temp_dmos: 38,
    //           temp_mid: 35,
    //           temp_top: 37,
    //           voltage: 5131,
    //         },
    //         pms11: {
    //           cell10_v: 3663,
    //           cell11_v: 3664,
    //           cell12_v: 3664,
    //           cell13_v: 3666,
    //           cell14_v: 3662,
    //           cell1_v: 3654,
    //           cell2_v: 3662,
    //           cell3_v: 3663,
    //           cell4_v: 3672,
    //           cell5_v: 3661,
    //           cell6_v: 3663,
    //           cell7_v: 3664,
    //           cell8_v: 3666,
    //           cell9_v: 3666,
    //           cmos_state: "ON",
    //           current: 7,
    //           dmos_state: "ON",
    //           temp_bot: 36,
    //           temp_cmos: 39,
    //           temp_dmos: 38,
    //           temp_mid: 37,
    //           temp_top: 37,
    //           voltage: 5129,
    //         },
    //         pms2: {
    //           cell10_v: 3668,
    //           cell11_v: 3667,
    //           cell12_v: 3668,
    //           cell13_v: 3672,
    //           cell14_v: 3671,
    //           cell1_v: 3643,
    //           cell2_v: 3663,
    //           cell3_v: 3669,
    //           cell4_v: 3669,
    //           cell5_v: 3664,
    //           cell6_v: 3669,
    //           cell7_v: 3665,
    //           cell8_v: 3665,
    //           cell9_v: 3671,
    //           cmos_state: "ON",
    //           current: 5,
    //           dmos_state: "ON",
    //           temp_bot: 34,
    //           temp_cmos: 40,
    //           temp_dmos: 39,
    //           temp_mid: 37,
    //           temp_top: 36,
    //           voltage: 5132,
    //         },
    //         pms3: {
    //           cell10_v: 3665,
    //           cell11_v: 3665,
    //           cell12_v: 3669,
    //           cell13_v: 3667,
    //           cell14_v: 3665,
    //           cell1_v: 3665,
    //           cell2_v: 3668,
    //           cell3_v: 3669,
    //           cell4_v: 3668,
    //           cell5_v: 3668,
    //           cell6_v: 3667,
    //           cell7_v: 3663,
    //           cell8_v: 3664,
    //           cell9_v: 3667,
    //           cmos_state: "ON",
    //           current: 0,
    //           dmos_state: "ON",
    //           temp_bot: 34,
    //           temp_cmos: 40,
    //           temp_dmos: 39,
    //           temp_mid: 36,
    //           temp_top: 35,
    //           voltage: 5133,
    //         },
    //         pms4: {
    //           cell10_v: 3666,
    //           cell11_v: 3663,
    //           cell12_v: 3665,
    //           cell13_v: 3663,
    //           cell14_v: 3663,
    //           cell1_v: 3662,
    //           cell2_v: 3662,
    //           cell3_v: 3666,
    //           cell4_v: 3663,
    //           cell5_v: 3662,
    //           cell6_v: 3662,
    //           cell7_v: 3664,
    //           cell8_v: 3665,
    //           cell9_v: 3667,
    //           cmos_state: "ON",
    //           current: 0,
    //           dmos_state: "ON",
    //           temp_bot: 33,
    //           temp_cmos: 40,
    //           temp_dmos: 39,
    //           temp_mid: 36,
    //           temp_top: 35,
    //           voltage: 5129,
    //         },
    //         pms5: {
    //           cell10_v: 3668,
    //           cell11_v: 3663,
    //           cell12_v: 3664,
    //           cell13_v: 3664,
    //           cell14_v: 3664,
    //           cell1_v: 3661,
    //           cell2_v: 3663,
    //           cell3_v: 3665,
    //           cell4_v: 3664,
    //           cell5_v: 3663,
    //           cell6_v: 3665,
    //           cell7_v: 3667,
    //           cell8_v: 3667,
    //           cell9_v: 3666,
    //           cmos_state: "ON",
    //           current: 0,
    //           dmos_state: "ON",
    //           temp_bot: 35,
    //           temp_cmos: 40,
    //           temp_dmos: 39,
    //           temp_mid: 34,
    //           temp_top: 35,
    //           voltage: 5130,
    //         },
    //         pms6: {
    //           cell10_v: 3664,
    //           cell11_v: 3661,
    //           cell12_v: 3661,
    //           cell13_v: 3662,
    //           cell14_v: 3660,
    //           cell1_v: 3659,
    //           cell2_v: 3660,
    //           cell3_v: 3662,
    //           cell4_v: 3661,
    //           cell5_v: 3662,
    //           cell6_v: 3663,
    //           cell7_v: 3665,
    //           cell8_v: 3665,
    //           cell9_v: 3664,
    //           cmos_state: "ON",
    //           current: 0,
    //           dmos_state: "ON",
    //           temp_bot: 35,
    //           temp_cmos: 40,
    //           temp_dmos: 39,
    //           temp_mid: 34,
    //           temp_top: 35,
    //           voltage: 5126,
    //         },
    //         pms7: {
    //           cell10_v: 3664,
    //           cell11_v: 3658,
    //           cell12_v: 3662,
    //           cell13_v: 3663,
    //           cell14_v: 3662,
    //           cell1_v: 3664,
    //           cell2_v: 3663,
    //           cell3_v: 3664,
    //           cell4_v: 3666,
    //           cell5_v: 3662,
    //           cell6_v: 3662,
    //           cell7_v: 3665,
    //           cell8_v: 3666,
    //           cell9_v: 3665,
    //           cmos_state: "ON",
    //           current: 0,
    //           dmos_state: "ON",
    //           temp_bot: 35,
    //           temp_cmos: 40,
    //           temp_dmos: 39,
    //           temp_mid: 36,
    //           temp_top: 35,
    //           voltage: 5128,
    //         },
    //         pms8: {
    //           cell10_v: 3664,
    //           cell11_v: 3665,
    //           cell12_v: 3667,
    //           cell13_v: 3661,
    //           cell14_v: 3669,
    //           cell1_v: 3659,
    //           cell2_v: 3659,
    //           cell3_v: 3661,
    //           cell4_v: 3662,
    //           cell5_v: 3662,
    //           cell6_v: 3660,
    //           cell7_v: 3663,
    //           cell8_v: 3662,
    //           cell9_v: 3661,
    //           cmos_state: "ON",
    //           current: 8,
    //           dmos_state: "ON",
    //           temp_bot: 35,
    //           temp_cmos: 39,
    //           temp_dmos: 39,
    //           temp_mid: 36,
    //           temp_top: 35,
    //           voltage: 5127,
    //         },
    //         pms9: {
    //           cell10_v: 3666,
    //           cell11_v: 3657,
    //           cell12_v: 3659,
    //           cell13_v: 3658,
    //           cell14_v: 3660,
    //           cell1_v: 3660,
    //           cell2_v: 3663,
    //           cell3_v: 3663,
    //           cell4_v: 3665,
    //           cell5_v: 3661,
    //           cell6_v: 3664,
    //           cell7_v: 3662,
    //           cell8_v: 3660,
    //           cell9_v: 3665,
    //           cmos_state: "ON",
    //           current: 0,
    //           dmos_state: "ON",
    //           temp_bot: 34,
    //           temp_cmos: 40,
    //           temp_dmos: 39,
    //           temp_mid: 34,
    //           temp_top: 37,
    //           voltage: 5126,
    //         },
    //       },
    //       pv1_curr: 1.32,
    //       pv1_volt: 79.0,
    //       pv2_curr: 0.0,
    //       pv2_volt: 46.0,
    //       pv3_curr: 2.86,
    //       pv3_volt: 76.5,
    //       rxlevel: 0,
    //       software_uptime: 0,
    //       sync: 0,
    //       ts: "20240918T143519+0700",
    //     },
    //   ],
    //   message: "success",
    // };

    if (loggerData === null) {
      console.log("No response received from server");
      return ResponseHelper.errorMessage(
        "No response received from server",
        404
      );
    }

    const validData = await validatePmsLoggers(loggerData.data);

    if (validData.status === "error") {
      return ResponseHelper.errorMessage("Failed to validated data", 400);
    }

    // insert pv and get id pv
    const pvIds = await Promise.all(
      validData.data.pv.map(async (element) => {
        const pv = await prisma.pv.create({
          data: element,
          select: { id: true },
        });
        return pv.id;
      })
    );

    // insert energy and get id energy
    const energyIds = await Promise.all(
      validData.data.energy.map(async (element) => {
        const energy = await prisma.energy.create({
          data: element,
          select: { id: true },
        });
        return energy.id;
      })
    );

    // insert pms cell and get id pms cell
    try {
      await Promise.all(
        validData.data.pmsCell.map(async (element, key) => {
          try {
            element.map(async (el) => {
              await prisma.pmsCell.create({
                data: {
                  ...el,
                  nojsSite: nojsSite,
                }
              });
            });
          } catch (error) {
            console.error(`Failed to insert data for pmsCell: ${element}`, error);
            throw new Error("Failed to insert data for pmsCell");
          }
        })
      );
      console.log("All pmsCell data inserted successfully");
    } catch (error) {
      console.error("Error in inserting pmsCell data:", error);
      return ResponseHelper.errorMessage("Failed to insert pmsCell data", 500);
    }

    // insert pms loggers
    try {
      await prisma.pmsLoggers.createMany({
        data: validData.data.pmsLoggers.map((val, key) => {
          return {
            ...val,
            ts: tsFormatter(val.ts),
            nojsSite: nojsSite,
            pvId: pvIds[key],
            energyId: energyIds[key],
          };
        }),
      });
      console.log("All pmsLoggers data inserted successfully");

      // delete logger
      const deleteLoggerResults = await Promise.all(
        validData.data.pmsLoggers.map(async (val) => {
          try {
            const deleteLoggerData = await deleteLogger(val.ts);
            if (deleteLoggerData === null) {
              console.log(`No response received from server for ts: ${val.ts}`);
              return ResponseHelper.errorMessage("No response received from server", 404);
            } else if (deleteLoggerData.code === 200) {
              console.log(`Logger deleted successfully for ts: ${val.ts}`);
              return ResponseHelper.successMessage("Pms loggers created and deleted successfully", 201);
            } else {
              console.log(`Failed to delete logger for ts: ${val.ts}`);
              return ResponseHelper.errorMessage("Failed to delete logger", 500);
            }
          } catch (error) {
            console.error(`Error in deleting logger data for ts: ${val.ts}`, error);
            return ResponseHelper.errorMessage("Failed to delete logger data", 500);
          }
        })
      );

      // Check if any deleteLoggerResults contains an error message
      const hasError = deleteLoggerResults.some(result => result.status === "error");
      if (hasError) {
        return ResponseHelper.errorMessage("Some loggers failed to delete", 500);
      }

      return ResponseHelper.successMessage("Pms loggers created and deleted successfully", 201);
    } catch (error) {
      console.error("Error in inserting pmsLoggers data:", error);
      return ResponseHelper.errorMessage("Failed to insert pmsLoggers data", 500);
    }
  } catch (error) {
    console.log(error);
    return ResponseHelper.errorMessage("Failed to create pms loggers", 500);
  }
};

export { createPmsLoggers };
