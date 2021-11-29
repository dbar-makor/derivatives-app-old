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
import Button from '@mui/material/Button';
import { BaseCSSProperties } from "@material-ui/styles";


import { IHistory } from "../../../models/history";


import classes from "./Derivatives.module.scss";

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly hitoryState: IHistory | null;
  readonly onDownload: (reportId: string) => void;
  readonly onRun: () => void;
  readonly onUpload: (value: ChangeEvent<HTMLInputElement>) => void;
  readonly openModalState: boolean;
  readonly handleModalOpen: () => void;
  readonly handleModalClose: () => void;
  readonly downloadLoadingState: boolean;
  readonly runLoadingState: boolean;
  readonly uploadLoadingState: boolean;
  readonly checkUploadState: boolean;
  readonly currentSelectedRowIdState: string;
}

const TableView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {

  return (
      <div className={classes['outerContainer']}>
        <h1 className={classes['outerContainer__title']}>Derivatives</h1>
        <div className={classes['buttonContainer']}>
          <Button className={classes['buttonContainer__button']} variant="contained" color="success">
            <label className={classes['buttonContainer__label']}>
            <input 
              type='file'
              accept='.csv'
              onChange={props.onUpload}
            />
            <Svg
              name='plus'
              className={classes['svg']} 
            /> 
            <h1>WEX</h1>
            </label>
          </Button>
          <Button className={classes['buttonContainer__button']} variant="contained" color="success">
            <label className={classes['buttonContainer__label']}>
              <input 
                type='file'
                accept='.csv'
                onChange={props.onUpload}
              />
              <Svg
                name='plus'
                className={classes['svg']} 
              /> 
              <h1>DRV</h1>
            </label>
          </Button>
        </div>
        <div className={classes['processContainer']}>
          
        </div>
      </div>
  );
};

TableView.displayName = "TableView";
TableView.defaultProps = {};

export default TableView;