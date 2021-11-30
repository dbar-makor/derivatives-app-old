import React, { ChangeEvent } from "react";

import icons from "../../../assets/icons";

import Svg from "../../ui/Svg/Svg";

import {
  ThemeProvider,
  Tooltip,
  Modal,
  Box,
  CircularProgress,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import classes from "./Derivatives.module.scss";

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly onUpload: (value: ChangeEvent<HTMLInputElement>) => void;
  readonly onSubmit?: (event: React.FormEvent) => void;
  readonly checkServerResponseUploadState: boolean;
  readonly WEXSpinnerLoaderState: boolean;
  readonly WEXErrorResponseState: boolean;
  readonly DVRSpinnerLoaderState: boolean;
  readonly DVRErrorResponseState: boolean;
  readonly processState: boolean;
  readonly processErrorResponseState: boolean;
  readonly processSuccessResponseState: boolean;
}

const TableView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes["outerContainer"]}>
      <h1 className={classes["outerContainer__title"]}>Derivatives</h1>
      <form onSubmit={props.onSubmit} className={classes["formContainer"]}>
        <div className={classes["formContainer__buttons"]}>
          {props.WEXErrorResponseState ? (
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
                        // onChange={props.onUploadWEX}
                      />
                      <Svg name="plus" className={classes["plusSvg"]} />
                      <h1>WEX</h1>
                    </span>
                  ) : (
                    <span>
                      <Svg
                        name="checkMark"
                        className={classes["checkMarkSvg"]}
                      />
                      <h1>WEX UPLOADED</h1>
                    </span>
                  )}
                </label>
              ) : (
                <CircularProgress color="inherit" size={140} />
              )}
            </Button>
          ) : (
            <Button
              className={classes["buttonContainer__button"]}
              variant="contained"
              color="error"
            >
              <label className={classes["buttonContainer__label"]}>
                <Svg name="error" className={classes["errorSvg"]} />
                <h1>ERROR</h1>
              </label>
            </Button>
          )}
          {!props.DVRErrorResponseState ? (
            <Button
              className={classes["buttonContainer__button"]}
              variant="contained"
              color="success"
            >
              {!props.DVRSpinnerLoaderState ? (
                <label className={classes["buttonContainer__label"]}>
                  {!props.checkServerResponseUploadState ? (
                    <span>
                      <input
                        type="file"
                        accept=".csv"
                        // onChange={props.onUploadDVR}
                      />
                      <Svg name="plus" className={classes["plusSvg"]} />
                      <h1>DVR</h1>
                    </span>
                  ) : (
                    <span>
                      <Svg
                        name="checkMark"
                        className={classes["checkMarkSvg"]}
                      />
                      <h1>DVR UPLOADED</h1>
                    </span>
                  )}
                </label>
              ) : (
                <CircularProgress color="inherit" size={140} />
              )}
            </Button>
          ) : (
            <Button
              className={classes["buttonContainer__button"]}
              variant="contained"
              color="error"
            >
              <label className={classes["buttonContainer__label"]}>
                <Svg name="error" className={classes["errorSvg"]} />
                <h1>ERROR</h1>
              </label>
            </Button>
          )}
        </div>
        <div className={classes["processContainer"]}>
          {!props.processErrorResponseState ? (
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
    </div>
  );
};

TableView.displayName = "TableView";
TableView.defaultProps = {};

export default TableView;
