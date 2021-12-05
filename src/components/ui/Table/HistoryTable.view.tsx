import React, { ChangeEvent, ReactElement } from "react";

import icons from "../../../assets/icons";

import Svg from "../Svg/Svg";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import classes from "./HistoryTable.module.scss";

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly onUpload: (value: ChangeEvent<HTMLInputElement>) => void;
  readonly onSubmit: (event: React.FormEvent) => void;
  readonly processEnabledState: boolean;
  readonly checkServerResponseUploadState: boolean;
  readonly WEXSpinnerLoaderState: boolean;
  readonly WEXErrorResponseState: boolean;
  readonly DRVSpinnerLoaderState: boolean;
  readonly DRVErrorResponseState: boolean;
  readonly processState: boolean;
  readonly processErrorResponseState: boolean;
  readonly processSuccessResponseState: boolean;
}

const HistoryTableView: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const createData = (
    name: string,
    date: string,
    WEX: string,
    DVR: string,
    matched: number,
    unmatched: number,
    unknown: number,
    complete: number | string | ReactElement<any, any>,
    derivatives: string | ReactElement<any, any>
  ) => {
    return {
      name,
      date,
      WEX,
      DVR,
      matched,
      unmatched,
      unknown,
      complete,
      derivatives,
    };
  };

  const rows = [
    createData(
      "name",
      "02/23/2021",
      "Makor.wex",
      "Makor.wex",
      24,
      4.0,
      3.0,
      3.0 + "%",
      <div>
        <Svg className={classes["attachSvg"]} name="attach" />
        Makor.wex
      </div>
    ),
    createData(
      "name",
      "02/23/2021",
      "Makor.wex",
      "Makor.wex",
      24,
      4.0,
      3.0,
      3.0 + "%",
      <div>
        <Svg className={classes["attachSvg"]} name="attach" />
        Makor.wex
      </div>
    ),
    createData(
      "name",
      "02/23/2021",
      "Makor.wex",
      "Makor.wex",
      24,
      4.0,
      3.0,
      <Svg name="complete" />,
      <span className={classes["divider"]}>_____</span>
    ),
    createData(
      "name",
      "02/23/2021",
      "Makor.wex",
      "Makor.wex",
      24,
      4.0,
      3.0,
      <Svg name="complete" />,
      <span className={classes["divider"]}>_____</span>
    ),
    createData(
      "name",
      "02/23/2021",
      "Makor.wex",
      "Makor.wex",
      24,
      4.0,
      3.0,
      3.0 + "%",
      <div>
        <Svg className={classes["attachSvg"]} name="attach" />
        Makor.wex
      </div>
    ),
    createData(
      "name",
      "02/23/2021",
      "Makor.wex",
      "Makor.wex",
      24,
      4.0,
      3.0,
      <Svg name="complete" />,
      <span className={classes["divider"]}>_____</span>
    ),
    createData(
      "name",
      "02/23/2021",
      "Makor.wex",
      "Makor.wex",
      24,
      4.0,
      3.0,
      <Svg name="complete" />,
      <span className={classes["divider"]}>_____</span>
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1450, marginLeft: 37 }}>
        <TableHead>
          <TableRow>
            <TableCell className={classes["tableCellHeader"]}>Date</TableCell>
            <TableCell className={classes["tableCellHeader"]}>WEX</TableCell>
            <TableCell className={classes["tableCellHeader"]}>DVR</TableCell>
            <TableCell className={classes["tableCellHeader"]} align="center">
              Matched
            </TableCell>
            <TableCell className={classes["tableCellHeader"]} align="center">
              Unmatched
            </TableCell>
            <TableCell className={classes["tableCellHeader"]} align="center">
              Unknown
            </TableCell>
            <TableCell className={classes["tableCellHeader"]} align="center">
              Complete
            </TableCell>
            <TableCell className={classes["tableCellHeader"]}>
              Derivatives
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{ color: "#8a8a8a" }}>{row.date}</TableCell>
              <TableCell style={{ color: "#3E2F71" }} align="left">
                <Svg className={classes["attachSvg"]} name="attach" />
                {row.WEX}
              </TableCell>
              <TableCell style={{ color: "#3E2F71" }} align="left">
                <Svg className={classes["attachSvg"]} name="attach" />
                {row.DVR}
              </TableCell>
              <TableCell style={{ color: "#238D38" }} align="center">
                {row.matched}
              </TableCell>
              <TableCell style={{ color: "#E59813" }} align="center">
                {row.unmatched}
              </TableCell>
              <TableCell style={{ color: "#E4461F" }} align="center">
                {row.unknown}
              </TableCell>
              <TableCell style={{ color: "#3E2F71" }} align="center">
                {row.complete}
              </TableCell>
              <TableCell style={{ color: "#3E2F71" }} align="left">
                {row.derivatives}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

HistoryTableView.displayName = "HistoryTableView";
HistoryTableView.defaultProps = {};

export default HistoryTableView;
