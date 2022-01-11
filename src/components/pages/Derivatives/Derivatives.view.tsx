import React, { ChangeEvent } from "react";

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";

import { IDerivative, IFloorBroker } from "../../../models/derivatives";
import { groupByCompany } from "../../../utils/derivatives";

import classes from "./Derivatives.module.scss";

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly derivativesState?: IDerivative[];
  readonly derivativeState?: IDerivative;
  readonly WEXState: boolean;
  readonly DRVState: boolean;
  readonly spinnerState: boolean;
  readonly uploadErrorState: boolean;
  readonly spinnerTimerState?: number;
  readonly openModalState: boolean;
  readonly handleModalOpen: () => void;
  readonly handleModalClose: () => void;
  readonly onUpload: (value: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onDownload: (event: string) => void;
  readonly floorBrokersSelectChangeHandler: (event: SelectChangeEvent) => void;
  readonly floorBrokersDataState?: IFloorBroker[];
  readonly disableFloorBrokersSelectState?: boolean;
  readonly floorBrokerSelectState?: string;
  readonly sourceFileNameState?: string;
  readonly DRVFileNameState?: string;
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
    height: 920,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={classes["container"]}>
      <nav className={classes["nav"]}>
        <div className={classes["innerNav"]}>
          <span className={classes["navHeader"]}>History</span>
          {!props.derivativesState ? (
            ""
          ) : (
            <Button
              className={classes["navLinkButton"]}
              onClick={props.handleModalOpen}
            >
              NEW RECONCILIATION
            </Button>
          )}
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
              <TableCell className={classes["tableCellHeader"]}>
                SOURCE
              </TableCell>
              <TableCell className={classes["tableCellHeader"]}>DRV</TableCell>
              <TableCell className={classes["tableCellHeader"]} align="center">
                Matched
              </TableCell>
              <TableCell className={classes["tableCellHeader"]} align="center">
                Unmatched
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
                      onClick={() => props.onDownload(row.drv!)}
                    >
                      {row.drv}
                    </button>
                  </TableCell>
                  <TableCell
                    style={{ color: "#238D38", fontWeight: 700 }}
                    align="center"
                  >
                    {row.matchedCount}
                  </TableCell>
                  <TableCell
                    style={{ color: "#E59813", fontWeight: 700 }}
                    align="center"
                  >
                    {row.unmatchedCount}
                  </TableCell>
                  <TableCell
                    style={{ color: "#3E2F71", fontWeight: 700 }}
                    align="center"
                  >
                    {row.matchedSumPercentage === 100 ? (
                      <Svg style={{ marginRight: 5 }} name="complete" />
                    ) : (
                      `${row.matchedSumPercentage}%`
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Svg name="attach" />
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
          <div className={classes["uploadFiles"]}>
            <span className={classes["uploadFiles__header"]}>
              1. Upload Files
            </span>
            <span className={classes["uploadFiles__content"]}>
              Choose floor broker and Upload files, processing will start
              automatically
            </span>
          </div>
          {!props.spinnerState ? (
            <div className={classes["uploadFilesContainer"]}>
              <div className={classes["uploadFilesContainer__headers"]}></div>
              {!props.uploadErrorState ? (
                <React.Fragment>
                  <Box sx={{ minWidth: 170, maxWidth: 270.2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="floorBrolersSelectLabel">
                        Floor Broker
                      </InputLabel>
                      {props.disableFloorBrokersSelectState ? (
                        <Select
                          disabled
                          label="Floor Broker"
                          defaultValue=""
                        ></Select>
                      ) : (
                        <Select
                          labelId="floorBrolersSelectLabel"
                          id="floorBrolersSelect"
                          value={props.floorBrokerSelectState ?? ""}
                          label="Floor Broker"
                          onChange={props.floorBrokersSelectChangeHandler}
                        >
                          {groupByCompany(props.floorBrokersDataState!).map(
                            ([company, list]) => {
                              const subItems: IFloorBroker[] = list.map(
                                (element: IFloorBroker) => (
                                  <MenuItem value={element.id}>
                                    {element.name}
                                  </MenuItem>
                                ),
                              );
                              return [
                                <ListSubheader>{company}</ListSubheader>,
                                ...subItems,
                              ];
                            },
                          )}
                        </Select>
                      )}
                    </FormControl>
                  </Box>
                  <form
                    className={classes["uploadFilesContainer__form"]}
                    onSubmit={props.onSubmit}
                  >
                    <div className={classes["buttonContainer"]}>
                      {!props.WEXState ? (
                        <Button className={classes["buttonContainer__button"]}>
                          <label>
                            <Svg
                              className={classes["addFileSvg"]}
                              name="addFile"
                            />
                            <input
                              style={{ display: "none" }}
                              onChange={props.onUpload}
                              type="file"
                              accept=".csv"
                              id="source"
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
                      <span className={classes["buttonContainer__text"]}>
                        {!props.sourceFileNameState
                          ? "SOURCE"
                          : props.sourceFileNameState.substring(0, 20)}
                      </span>
                    </div>
                    <div className={classes["buttonContainer"]}>
                      {!props.DRVState ? (
                        <Button className={classes["buttonContainer__button"]}>
                          <label>
                            <Svg
                              className={classes["addFileSvg"]}
                              name="addFile"
                            />
                            <input
                              style={{ display: "none" }}
                              onChange={props.onUpload}
                              type="file"
                              accept=".csv"
                              id="DRV"
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
                      <span className={classes["buttonContainer__text"]}>
                        {!props.DRVFileNameState ? (
                          "DRV"
                        ) : (
                          <Tooltip
                            title={<h2>{props.DRVFileNameState}</h2>}
                            placement="bottom"
                            arrow
                          >
                            <div>
                              {props.DRVFileNameState.substring(
                                props.DRVFileNameState.length - 20,
                              )}
                            </div>
                          </Tooltip>
                        )}
                      </span>
                    </div>
                  </form>
                </React.Fragment>
              ) : (
                <div className={classes["uploadFilesContainer__error"]}>
                  Uploading files failed, please try again
                </div>
              )}
            </div>
          ) : (
            <div className={classes["uploadFilesSpinnerContainer"]}>
              <CircularProgress
                style={{ color: "#3E2F72", padding: 52 }}
                size={180}
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
                Summary after reconciliation
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
                    Total Count
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--matchedRows"]
                    }
                  >
                    Total Charge
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--matchedRows"]
                    }
                    style={{ color: "#238d38" }}
                  >
                    Match Count
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--matchedRows"]
                    }
                    style={{ color: "#238d38" }}
                  >
                    Matched Sum Charge
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--matchedRows"]
                    }
                    style={{ color: "#e4461f" }}
                  >
                    Unmatched Count
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--matchedRows"]
                    }
                    style={{ color: "#e4461f" }}
                  >
                    Unmatched Group Count
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--matchedRows"]
                    }
                    style={{ color: "#e4461f" }}
                  >
                    Unmatched Sum Charge
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__text--matchedRows"]
                    }
                    style={{ color: "#e4461f" }}
                  >
                    Unmatch Charge Percentage
                  </div>
                </div>
                <div className={classes["derivativesTableContainer__data"]}>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                  >
                    {!props.derivativeState?.totalCount
                      ? "0"
                      : props.derivativeState.totalCount}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                  >
                    {!props.derivativeState?.totalCharge
                      ? "0"
                      : props.derivativeState.totalCharge}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                    style={{ color: "#238d38" }}
                  >
                    {!props.derivativeState?.matchedCount
                      ? "0"
                      : props.derivativeState.matchedCount}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                    style={{ color: "#238d38" }}
                  >
                    {!props.derivativeState?.matchSumCharge
                      ? "0"
                      : props.derivativeState.matchSumCharge}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                    style={{ color: "#e4461f" }}
                  >
                    {!props.derivativeState?.unmatchedCount
                      ? "0"
                      : props.derivativeState.unmatchedCount}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                    style={{ color: "#e4461f" }}
                  >
                    {!props.derivativeState?.unmatchedGroupCount
                      ? "0"
                      : props.derivativeState.unmatchedGroupCount}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                    style={{ color: "#e4461f" }}
                  >
                    {!props.derivativeState?.unmatchedSumCharge
                      ? "0"
                      : props.derivativeState.unmatchedSumCharge}
                  </div>
                  <div
                    className={
                      classes["derivativesTableContainer__data--number"]
                    }
                    style={{ color: "#e4461f" }}
                  >
                    {!props.derivativeState?.unmatchedSumPercentage
                      ? "0"
                      : `${props.derivativeState.unmatchedSumPercentage}%`}
                  </div>
                </div>
              </div>
              <div className={classes["derivativesTableContainer__calculator"]}>
                <div
                  className={
                    classes["derivativesTableContainer__calculator--percentage"]
                  }
                >
                  {!props.spinnerState ? (
                    <React.Fragment>
                      {!props.derivativeState?.matchedSumPercentage ? (
                        <span>-</span>
                      ) : (
                        <div>
                          {+props.derivativeState.matchedSumPercentage + "%"}
                        </div>
                      )}
                      <div
                        className={
                          classes["derivativesTableContainer__calculator--text"]
                        }
                      >
                        Completed
                      </div>
                    </React.Fragment>
                  ) : (
                    <div className={classes["uploadFilesSpinnerContainer"]}>
                      <div
                        className={
                          classes["derivativesTableContainer__calculator--text"]
                        }
                      >
                        Processing
                      </div>
                      <Box sx={{ width: "95%", marginTop: 1 }}>
                        <LinearProgress color="inherit" />
                      </Box>
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
                  <button
                    className={classes["downloadUnresolvedButtonDisabled"]}
                    disabled
                  >
                    <span>unresolved.drv</span>
                  </button>
                </span>
              ) : (
                <div className={classes["downloadFileContainer__box--link"]}>
                  <Svg
                    className={classes["downloadFileContainer__box--text__svg"]}
                    name="attach"
                  />
                  <button
                    className={classes["downloadUnresolvedButton"]}
                    onClick={() =>
                      props.onDownload(props.derivativeState!.unresolved)
                    }
                  >
                    {props.derivativeState?.unresolved}
                  </button>
                </div>
              )}

              {!props.derivativeState?.unresolved ? (
                <button className={classes["disabledDownloadButton"]} disabled>
                  <Svg
                    className={classes["downloadFileContainer__box--download"]}
                    name="download"
                  />
                </button>
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
