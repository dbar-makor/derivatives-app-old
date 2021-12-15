import React, { ChangeEvent, ReactElement } from "react";

import icons from "../../../assets/icons";

// import HistoryTable from "../../ui/Table/HistoryTable";
import Svg from "../../ui/Svg/Svg";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import classes from "./Derivatives.module.scss";
import { IDerivative } from "../../../models/derivatives";

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly derivativeState?: IDerivative[];
  readonly spinnerState?: number;
  readonly openModalState: boolean;
  readonly handleModalOpen: () => void;
  readonly handleModalClose: () => void;
  readonly onUpload: (value: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  onDownload: (event: any) => void;
}

const DerivativesView: React.FC<Props> = (
  props: React.PropsWithChildren<Props>,
) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 780,
    height: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={classes["container"]}>
      <nav className={classes["nav"]}>
        <div className={classes["innerNav"]}>
          <span className={classes["navHeader"]}>History</span>
          <Button
            className={classes["navLinkButton"]}
            onClick={props.handleModalOpen}
          >
            NEW RECONCILIATION
          </Button>
        </div>
      </nav>
      <TableContainer component={Paper}>
        <Table
          sx={{
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 1500,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes["tableCellHeader"]}>
                Username
              </TableCell>
              <TableCell className={classes["tableCellHeader"]}>Date</TableCell>
              <TableCell className={classes["tableCellHeader"]}>WEX</TableCell>
              <TableCell className={classes["tableCellHeader"]}>DRV</TableCell>
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
            {props.derivativeState &&
              props.derivativeState.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ color: "#3E2F71", fontWeight: 700 }}>
                    {row.username}
                  </TableCell>
                  <TableCell style={{ color: "#8a8a8a", fontWeight: 700 }}>
                    {row.date}
                  </TableCell>
                  <TableCell align="left">
                    <Svg className={classes["attachSvg"]} name="attach" />
                    <button
                      className={classes["downloadButton"]}
                      onClick={() => props.onDownload(row.wex)}
                    >
                      {row.wex}
                    </button>
                  </TableCell>
                  <TableCell align="left">
                    <Svg className={classes["attachSvg"]} name="attach" />
                    <button
                      className={classes["downloadButton"]}
                      onClick={() => props.onDownload(row.drv)}
                    >
                      {row.drv}
                    </button>
                  </TableCell>
                  <TableCell
                    style={{ color: "#238D38", fontWeight: 700 }}
                    align="center"
                  >
                    {row.matched}
                  </TableCell>
                  <TableCell
                    style={{ color: "#E59813", fontWeight: 700 }}
                    align="center"
                  >
                    {row.unmatched}
                  </TableCell>
                  <TableCell
                    style={{ color: "#E4461F", fontWeight: 700 }}
                    align="center"
                  >
                    {row.unknown}
                  </TableCell>
                  <TableCell
                    style={{ color: "#3E2F71", fontWeight: 700 }}
                    align="center"
                  >
                    {row.complete}
                  </TableCell>
                  <TableCell align="left">
                    <Svg className={classes["attachSvg"]} name="attach" />
                    <button
                      className={classes["downloadButton"]}
                      onClick={() => props.onDownload(row.derivatives)}
                    >
                      {row.derivatives}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={props.openModalState} onClose={props.handleModalClose}>
        <Box sx={style}>
          <span className={classes["modalHeader"]}>
            Derivatives reconciliation
          </span>
          <div className={classes["uploadFilesContainer"]}>
            <div className={classes["uploadFilesContainer__headers"]}>
              <span
                className={classes["uploadFilesContainer__headers--header"]}
              >
                1. Upload Files
              </span>
              <span
                className={classes["uploadFilesContainer__headers--content"]}
              >
                After uploading files proccessing will start automaticaly
              </span>
            </div>
            <form
              className={classes["uploadFilesContainer__form"]}
              onSubmit={props.onSubmit}
            >
              <div className={classes["buttonContainer"]}>
                <Button className={classes["buttonContainer__button"]}>
                  <label>
                    <Svg className={classes["addFileSvg"]} name="addFile" />
                    <input
                      style={{ display: "none" }}
                      onChange={props.onUpload}
                      type="file"
                      accept=".csv"
                      id="WEX"
                    />
                  </label>
                </Button>
                <span className={classes["buttonContainer__text"]}>WEX</span>
              </div>
              <div className={classes["buttonContainer"]}>
                <Button className={classes["buttonContainer__button"]}>
                  <label>
                    <Svg className={classes["addFileSvg"]} name="addFile" />
                    <input
                      style={{ display: "none" }}
                      onChange={props.onUpload}
                      type="file"
                      accept=".csv"
                      id={"DRV"}
                    />
                  </label>
                </Button>
                <span className={classes["buttonContainer__text"]}>DRV</span>
              </div>
              <Button
                className={classes["processContainer__button"]}
                variant="contained"
                color="info"
                type="submit"
              >
                Process
              </Button>
            </form>
          </div>
          {/* <div className={classes["uploadFilesSpinnerContainer"]}>
            <CircularProgress
              style={{ color: "#3E2F72", padding: 68 }}
              size={150}
              variant="determinate"
              value={props.spinnerState}
            />
          </div> */}
          <div className={classes["derivativesContainer"]}>
            <div className={classes["derivativesContainer__headers"]}>
              <span
                className={classes["derivativesContainer__headers--header"]}
              >
                2. Derivatives
              </span>
              <span
                className={classes["derivativesContainer__headers--content"]}
              >
                Unresolved is summary of Unmatched rows and Unknown errors
              </span>
            </div>
            <div className={classes["derivativesTableContainer"]}>
              <div className={classes["derivativesTableContainer__table"]}>
                <div className={classes["derivativesTableContainer__text"]}>
                  <div
                    className={
                      classes["derivativesTableContainer__text--matchedRows"]
                    }
                  >
                    Matched Rows
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--unmatchedRows"]
                    }
                  >
                    Unmatched Rows
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--unknownErrors"]
                    }
                  >
                    Unknown Errors
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--unresolved"]
                    }
                  >
                    Unresolved
                  </div>
                </div>
                <div className={classes["derivativesTableContainer__data"]}>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                  >
                    200
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                  >
                    50
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                  >
                    10
                  </div>
                  <div
                    className={
                      classes[
                        "derivativesTableContainer__data--unresolvedNumber"
                      ]
                    }
                  >
                    60
                  </div>
                </div>
              </div>
              <div className={classes["derivativesTableContainer__calculator"]}>
                <div
                  className={
                    classes["derivativesTableContainer__calculator--text"]
                  }
                >
                  Complete
                </div>
                <div
                  className={
                    classes["derivativesTableContainer__calculator--percentage"]
                  }
                >
                  70%
                </div>
              </div>
            </div>
          </div>
          <div className={classes["downloadFileContainer"]}>
            <div className={classes["downloadFileContainer__headers"]}>
              <span
                className={classes["downloadFileContainer__headers--header"]}
              >
                3. Download File
              </span>
              <span
                className={classes["downloadFileContainer__headers--content"]}
              >
                File with Unresolved Derivatives is attached here
              </span>
            </div>
            <div className={classes["downloadFileContainer__box"]}>
              <Svg name="attach" />
              <span className={classes["downloadFileContainer__box--text"]}>
                unresoled.drv
              </span>
              <Svg
                className={classes["downloadFileContainer__box--download"]}
                name="download"
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

DerivativesView.displayName = "DerivativesView";
DerivativesView.defaultProps = {};

export default DerivativesView;
