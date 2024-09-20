import { tsFormatter } from "../helpers/timestampFormatter.js";

const siteInformationFormatter = async (data) => {
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
    nojsSite: formattedData.nojs,
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

const pmsLoggersFormatter = async (datas) => {
  return datas.map((el) => {
    const logger = {
      ts: el.ts,
      battVolt: el.batt_volt,
      cpuTemp: el.cpu_temp,
      dockActive: el.dock_active,
      cellMax: el.max_battv[0],
      valueMax: el.max_battv[1],
      cellMin: el.min_battv[0],
      valueMin: el.min_battv[1],
      load1: el.load1,
      load2: el.load2,
      load3: el.load3,
    };
    const energy = {
      edl1: el.edl1,
      edl2: el.edl2,
      edl3: el.edl3,
      eh1: el.eh1,
      eh2: el.eh2,
      eh3: el.eh3,
    };
    const pv = {
      pv1Volt: el.pv1_volt,
      pv2Volt: el.pv2_volt,
      pv3Volt: el.pv3_volt,
      pv1Curr: el.pv1_curr,
      pv2Curr: el.pv2_curr,
      pv3Curr: el.pv3_curr,
    };
    const pmsCell = Object.keys(el.pms_data).map((key) => {
      const pms = el.pms_data[key];
      return {
        ts: tsFormatter(el.ts),
        dock: key,
        voltage: pms.voltage,
        current: pms.current,
        cmosState: pms.cmos_state,
        dmosState: pms.dmos_state,
        tempCmos: pms.temp_cmos,
        tempDmos: pms.temp_dmos,
        tempTop: pms.temp_top,
        tempMid: pms.temp_mid,
        tempBot: pms.temp_bot,
        cell1: pms.cell1_v,
        cell2: pms.cell2_v,
        cell3: pms.cell3_v,
        cell4: pms.cell4_v,
        cell5: pms.cell5_v,
        cell6: pms.cell6_v,
        cell7: pms.cell7_v,
        cell8: pms.cell8_v,
        cell9: pms.cell9_v,
        cell10: pms.cell10_v,
        cell11: pms.cell11_v,
        cell12: pms.cell12_v,
        cell13: pms.cell13_v,
        cell14: pms.cell14_v,
      };
    });
    const tvd =
      el.bspwatt || el.mcb_voltage
        ? {
            bspPower: el.bspwatt || 0,
            lvdVsat: el.batt_volt || 0,
            mcbVoltage: el.mcb_voltage || 0,
          }
        : {};
    return { logger, energy, pv, pmsCell, tvd };
  });
};

const talisLoggersFormatter = async (datas) => {
  return datas.map((el) => {
    const talis = {
      ts: el.ts,
      slaveId: el.slave_id,
      port: el.port,
      errorMessages: el.error_messages,
      pcbCode: el.pcb_code,
      sn1Code: el.sn1_code,
      packVoltage: el.pack_voltage,
      packCurrent: el.pack_current,
      remainingCapacity: el.remaining_capacity,
      averageCellTemperature: el.average_cell_temperature,
      environmentTemperature: el.environment_temperature,
      warningFlag: el.warning_flag,
      protectionFlag: el.protection_flag,
      faultStatus: el.fault_status_flag,
      soc: el.soc,
      soh: el.soh,
      fullChargedCapacity: el.full_charged_capacity,
      cycleCount: el.cycle_count,
      maxCellVoltage: el.max_cell_voltage,
      minCellVoltage: el.min_cell_voltage,
      cellDifference: el.cell_difference,
      maxCellTemperature: el.max_cell_temperature,
      minCellTemperature: el.min_cell_temperature,
      fetTemperature: el.fet_temperature,
      cellTemperature1: el.cell_temperature[0],
      cellTemperature2: el.cell_temperature[1],
      cellTemperature3: el.cell_temperature[2],
      ambientTemperature: el.ambient_temperature,
      remainingChargeTime: el.remaining_charge_time,
      remainingDischargeTime: el.remaining_discharge_time,
    };

    const talisCellPack = el.cell_voltage.reduce((acc, e, i) => {
      acc[`cell${i + 1}`] = e;
      return acc;
    }, {});

    return { talis, talisCellPack };
  });
};

export { siteInformationFormatter, pmsLoggersFormatter, talisLoggersFormatter };
