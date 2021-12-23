import React, { ChangeEvent } from "react";

import moment from "moment";

import icons from "../../../assets/icons";

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
  readonly derivativesState?: IDerivative[];
  readonly derivativeState?: IDerivative;
  readonly WEXState: boolean;
  readonly spinnerState: boolean;
  readonly spinnerTimerState?: number;
  readonly openModalState: boolean;
  readonly handleModalOpen: () => void;
  readonly handleModalClose: () => void;
  readonly onUpload: (value: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onDownload: (event: string) => void;
}

const DerivativesView: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
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
            {props.derivativesState &&
              props.derivativesState.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    style={{ color: "#3E2F71", fontWeight: 700 }}
                    align="center"
                  >
                    {row.username}
                  </TableCell>
                  <TableCell style={{ color: "#8a8a8a", fontWeight: 700 }}>
                    {row.date}
                  </TableCell>
                  <TableCell className={classes["hi"]} align="left">
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
                    {row.complete === 100 ? (
                      <Svg name="complete" />
                    ) : (
                      `${row.complete}%`
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Svg className={classes["attachSvg"]} name="attach" />
                    <button
                      className={classes["downloadButton"]}
                      onClick={() => props.onDownload(row.unresolved)}
                    >
                      {row.unresolved}
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
          {!props.spinnerState ? (
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
                  After uploading files processing will start automaticaly
                </span>
              </div>
              <form
                className={classes["uploadFilesContainer__form"]}
                onSubmit={props.onSubmit}
              >
                <div className={classes["buttonContainer"]}>
                  {!props.WEXState ? (
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
                  ) : (
                    <Button
                      disabled
                      className={classes["buttonContainer__buttonUploaded"]}
                    >
                      <label>
                        <Svg
                          className={classes["addFileSvg"]}
                          name="fileUploaded"
                        />
                      </label>
                    </Button>
                  )}
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
              </form>
            </div>
          ) : (
            <div className={classes["uploadFilesSpinnerContainer"]}>
              <CircularProgress
                style={{ color: "#3E2F72", padding: 68 }}
                size={150}
              />
            </div>
          )}
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
                    {!props.spinnerState ? (
                      <React.Fragment>
                        {!props.derivativeState?.matched
                          ? "0"
                          : props.derivativeState?.matched}
                      </React.Fragment>
                    ) : (
                      <div className={classes["uploadFilesSpinnerContainer"]}>
                        <CircularProgress
                          style={{ color: "#3E2F72" }}
                          size={21.4}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                  >
                    {!props.spinnerState ? (
                      <React.Fragment>
                        {!props.derivativeState?.unmatched
                          ? "0"
                          : props.derivativeState?.unmatched}
                      </React.Fragment>
                    ) : (
                      <div className={classes["uploadFilesSpinnerContainer"]}>
                        <CircularProgress
                          style={{ color: "#3E2F72" }}
                          size={21.2}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                  >
                    {!props.spinnerState ? (
                      <React.Fragment>
                        {!props.derivativeState?.unknown
                          ? "0"
                          : props.derivativeState?.unknown}
                      </React.Fragment>
                    ) : (
                      <div className={classes["uploadFilesSpinnerContainer"]}>
                        <CircularProgress
                          style={{ color: "#3E2F72" }}
                          size={21.2}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      classes[
                        "derivativesTableContainer__data--unresolvedNumber"
                      ]
                    }
                  >
                    {!props.spinnerState ? (
                      <React.Fragment>0</React.Fragment>
                    ) : (
                      <div className={classes["uploadFilesSpinnerContainer"]}>
                        <CircularProgress
                          style={{ color: "#3E2F72" }}
                          size={21.2}
                        />
                      </div>
                    )}
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
                  {!props.spinnerState ? (
                    <React.Fragment>
                      {!props.derivativeState?.complete
                        ? "0%"
                        : +props.derivativeState?.complete + "%"}
                    </React.Fragment>
                  ) : (
                    <div className={classes["uploadFilesSpinnerContainer"]}>
                      <CircularProgress
                        style={{ color: "#3E2F72", marginTop: 15 }}
                        size={50}
                      />
                    </div>
                  )}
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
              {!props.derivativeState?.unresolved ? (
                <span className={classes["downloadFileContainer__box--text"]}>
                  <Svg
                    className={classes["downloadFileContainer__box--text__svg"]}
                    name="attach"
                  />
                  <span style={{ fontWeight: 600 }}>unresolved.drv</span>
                </span>
              ) : (
                <div className={classes["downloadFileContainer__box--link"]}>
                  <Svg name="attach" />
                  <button
                    className={classes["downloadButton"]}
                    onClick={() =>
                      props.onDownload(props.derivativeState!.unresolved)
                    }
                  >
                    {props.derivativeState?.unresolved}
                  </button>
                </div>
              )}

              {!props.derivativeState?.unresolved ? (
                <Svg
                  className={classes["downloadFileContainer__box--download"]}
                  name="download"
                />
              ) : (
                <button
                  className={classes["downloadButton"]}
                  onClick={() =>
                    props.onDownload(props.derivativeState!.unresolved)
                  }
                >
                  <Svg
                    className={classes["downloadFileContainer__box--download"]}
                    name="download"
                  />
                </button>
              )}
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
