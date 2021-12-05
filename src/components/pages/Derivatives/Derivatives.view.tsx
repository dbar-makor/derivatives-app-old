import React, { ChangeEvent, ReactElement } from "react";

import icons from "../../../assets/icons";

import HistoryTable from "../../ui/Table/HistoryTable";
import Svg from "../../ui/Svg/Svg";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import classes from "./Derivatives.module.scss";

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly openModalState: boolean;
  readonly handleModalOpen: () => void;
  readonly handleModalClose: () => void;
}

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

const DerivativesView: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  return (
    <div className={classes["container"]}>
      <nav className={classes["nav"]}>
        <div className={classes["innerNav"]}>
          <span className={classes["navLink"]}>History</span>
          <Button
            className={classes["navLinkButton"]}
            onClick={props.handleModalOpen}
          >
            NEW RECONCILIATION
          </Button>
        </div>
      </nav>
      <HistoryTable />
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
            <div className={classes["uploadFilesContainer__buttons"]}>
              <div className={classes["buttonContainer"]}>
                <Button className={classes["buttonContainer__button"]}>
                  <Svg className={classes["addFileSvg"]} name="addFile" />
                  <span>
                    <input type="file" accept=".csv" id={"WEX"} />
                  </span>
                </Button>
                <span className={classes["buttonContainer__text"]}>WEX</span>
              </div>
              <div className={classes["buttonContainer"]}>
                <Button className={classes["buttonContainer__button"]}>
                  <Svg className={classes["addFileSvg"]} name="addFile" />
                  <span>
                    <input type="file" accept=".csv" id={"WEX"} />
                  </span>
                </Button>
                <span className={classes["buttonContainer__text"]}>DRV</span>
              </div>
            </div>
          </div>
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
                    250
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
                      classes["derivativesTableContainer__data--number"]
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
        </Box>
      </Modal>
    </div>
  );
};

DerivativesView.displayName = "DerivativesView";
DerivativesView.defaultProps = {};

export default DerivativesView;

{
  /* <div className={classes["outerContainer"]}>
      <h1 className={classes["outerContainer__title"]}>Derivatives</h1>
      <form onSubmit={props.onSubmit} className={classes["formContainer"]}>
        <div className={classes["formContainer__buttons"]}>
          <Button
            className={classes["buttonContainer__button"]}
            variant="contained"
            color="success"
          >
            {!props.WEXSpinnerLoaderState ? (
              <label className={classes["buttonContainer__label"]}>
                {!props.checkServerResponseUploadState ? (
                  <span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={props.onUpload}
                      id={"WEX"}
                    />
                    <Svg name="plus" className={classes["plusSvg"]} />
                    <h1>WEX</h1>
                  </span>
                ) : (
                  <span>
                    <Svg name="checkMark" className={classes["checkMarkSvg"]} />
                    <h1>WEX UPLOADED</h1>
                  </span>
                )}
              </label>
            ) : (
              <CircularProgress color="inherit" size={140} />
            )}
          </Button>
          <Button
            className={classes["buttonContainer__button"]}
            variant="contained"
            color="success"
          >
            {!props.DRVSpinnerLoaderState ? (
              <label className={classes["buttonContainer__label"]}>
                {!props.checkServerResponseUploadState ? (
                  <span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={props.onUpload}
                      id={"DRV"}
                    />
                    <Svg name="plus" className={classes["plusSvg"]} />
                    <h1>DRV</h1>
                  </span>
                ) : (
                  <span>
                    <Svg name="checkMark" className={classes["checkMarkSvg"]} />
                    <h1>DRV UPLOADED</h1>
                  </span>
                )}
              </label>
            ) : (
              <CircularProgress color="inherit" size={140} />
            )}
          </Button>
        </div>
        <div className={classes["processContainer"]}>
          {!props.processErrorResponseState ? (
            props.processEnabledState ? (
              <Button
                className={classes["processContainer__button"]}
                variant="contained"
                color="info"
                type="submit"
              >
                {!props.processState ? (
                  <h1>PROCESS</h1>
                ) : (
                  <span>
                    <h1>PROCESS</h1>
                    <LinearProgress
                      className={classes["processContainer__linearProgress"]}
                      color="inherit"
                    />
                  </span>
                )}
              </Button>
            ) : (
              <Button
                className={classes["processContainer__button"]}
                variant="contained"
                color="info"
                type="submit"
                disabled
              >
                {!props.processState ? (
                  <h1>PROCESS</h1>
                ) : (
                  <span>
                    <h1>PROCESS</h1>
                    <LinearProgress
                      className={classes["processContainer__linearProgress"]}
                      color="inherit"
                    />
                  </span>
                )}
              </Button>
            )
          ) : (
            <div className={classes["processContainer__error"]}>
              Error details Error details Error details Error details Error
              Error details Error details Error details Error details details
            </div>
          )}
          <div className={classes["processContainer__report"]}>
            <li className={classes["processContainer__report--green"]}>
              Something
            </li>
            <li className={classes["processContainer__report--orenge"]}>
              Something
            </li>
            <li className={classes["processContainer__report--red"]}>
              Something
            </li>
          </div>
        </div>
      </form>
    </div> */
}
