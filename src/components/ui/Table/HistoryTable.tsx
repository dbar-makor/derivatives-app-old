import React, { ChangeEvent, useEffect, useState } from "react";

import { AxiosResponse, AxiosError } from "axios";

import { backendAPIAxios } from "../../../utils/http";

import { IUploadCSVResponse } from "../../../models/response/response";

import icons from "../../../assets/icons";

import HistoryTableView from "./HistoryTable.view";

interface Props {
  readonly iconName?: keyof typeof icons;
}

const HistoryTable: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const [checkServerResponseUploadState, setServerResponseUploadState] =
    useState<boolean>(false);

  const [DRVSpinnerLoaderState, setDRVSpinnerLoaderState] =
    useState<boolean>(false);
  const [DRVErrorResponseState, setDRVErrorRsponseState] =
    useState<boolean>(false);

  const [WEXSpinnerLoaderState, setWEXSpinnerLoaderState] =
    useState<boolean>(false);
  const [WEXErrorResponseState, setWEXErrorRsponseState] =
    useState<boolean>(false);

  const [processState, setProcessState] = useState<boolean>(false); // need to set process UI

  const [processErrorResponseState, setProcessErrorRsponseState] =
    useState<boolean>(false);
  const [processSuccessResponseState, setProcessSuccessRsponseState] =
    useState<boolean>(false);

  const [CSVFilesState, setCSVFilesState] = useState<
    { id: string; file: string | ArrayBuffer | null }[]
  >([]);

  const [processEnabledState, setProcessEnabledState] =
    useState<boolean>(false);

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    let id = event.target.id;
    let fileReader = new FileReader();
    let file = event.target.files![0];

    fileReader.onload = () => {
      setCSVFilesState([...CSVFilesState, { id, file: fileReader.result }]);
    };

    fileReader.readAsDataURL(file);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(CSVFilesState);

    backendAPIAxios
      .post("/", CSVFilesState)
      .then((response: AxiosResponse<IUploadCSVResponse>) => {
        // if (!response.data) {
        //   return alert("Failed to upload CSV");
        // }

        setWEXSpinnerLoaderState(() => true);
        setDRVSpinnerLoaderState(() => true);

        if (response.data) {
          setDRVErrorRsponseState(() => true); // need to manage by server response
        }

        if (response.data) {
          setWEXErrorRsponseState(() => true); // need to manage by server response
        }

        if (response.status === 200) {
          setServerResponseUploadState(() => true);
        }
      })
      .catch((e: AxiosError) => {
        // alert(`Failed to upload CSV with error: ${e}`);
      })
      .finally(() => {
        setWEXSpinnerLoaderState(() => false);
        setDRVSpinnerLoaderState(() => false);
      });
  };

  useEffect(() => {
    if (CSVFilesState.length === 0) {
      setProcessEnabledState(false);
    }

    setProcessEnabledState(true);
  }, [CSVFilesState]);

  return (
    <HistoryTableView
      iconName={props.iconName}
      onUpload={onUpload}
      onSubmit={onSubmit}
      processEnabledState={processEnabledState}
      checkServerResponseUploadState={checkServerResponseUploadState}
      WEXSpinnerLoaderState={WEXSpinnerLoaderState}
      WEXErrorResponseState={WEXErrorResponseState}
      DRVSpinnerLoaderState={DRVSpinnerLoaderState}
      DRVErrorResponseState={DRVErrorResponseState}
      processState={processState}
      processErrorResponseState={processErrorResponseState}
      processSuccessResponseState={processSuccessResponseState}
    >
      {props.children}
    </HistoryTableView>
  );
};

HistoryTable.displayName = "HistoryTable";
HistoryTable.defaultProps = {};

export default HistoryTable;
