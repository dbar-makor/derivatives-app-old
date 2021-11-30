import React, { ChangeEvent, useEffect, useState } from "react";

import { AxiosResponse, AxiosError } from "axios";

import { backendAPIAxios } from "../../../utils/http";

import { IHistory } from "../../../models/history";

import { IUploadCSVResponse } from "../../../models/response/response";

import icons from "../../../assets/icons";

import DerivativesView from "./Derivatives.view";

interface Props {
  readonly iconName?: keyof typeof icons;
}

const Derivatives: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const [checkServerResponseUploadState, setServerResponseUploadState] =
    useState<boolean>(false);

  const [DVRSpinnerLoaderState, setDVRSpinnerLoaderState] =
    useState<boolean>(false);
  const [DVRErrorResponseState, setDVRErrorRsponseState] =
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

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const CVSFile = new FormData();
    CVSFile.append("file", event.target.files![0]);

    setWEXSpinnerLoaderState(() => true);
    setDVRSpinnerLoaderState(() => true);

    backendAPIAxios
      .post("/", {
        files: CVSFile,
      })
      .then((response: AxiosResponse<IUploadCSVResponse>) => {
        if (!response.data) {
          return alert("Failed to upload CSV");
        }

        if (response.data) {
          setDVRErrorRsponseState(() => true); // need to manage by server response
        }

        if (response.data) {
          setWEXErrorRsponseState(() => true); // need to manage by server response
        }

        if (response.status === 200) {
          setServerResponseUploadState(() => true);
        }
      })
      .catch((e: AxiosError) => {
        alert(`Failed to upload CSV with error: ${e}`);
      })
      .finally(() => {
        setWEXSpinnerLoaderState(() => false);
        setDVRSpinnerLoaderState(() => false);
      });
  };

  const onUploadWEX = (event: ChangeEvent<HTMLInputElement>) => {
    const WEXFile = new FormData();
    WEXFile.append("file", event.target.files![0]);

    console.log(event.target.files![0]);
  };

  const onUploadDVR = (event: ChangeEvent<HTMLInputElement>) => {
    const DVRFile = new FormData();
    DVRFile.append("file", event.target.files![0]);

    console.log(event.target.files![0]);
  };

  const onUploadToServer = (event: ChangeEvent<HTMLInputElement>) => {};

  return (
    <DerivativesView
      iconName={props.iconName}
      onUploadWEX={onUploadWEX}
      onUploadDVR={onUploadDVR}
      onUploadToServer={onUploadToServer}
      checkServerResponseUploadState={checkServerResponseUploadState}
      WEXSpinnerLoaderState={WEXSpinnerLoaderState}
      WEXErrorResponseState={WEXErrorResponseState}
      DVRSpinnerLoaderState={DVRSpinnerLoaderState}
      DVRErrorResponseState={DVRErrorResponseState}
      processState={processState}
      processErrorResponseState={processErrorResponseState}
      processSuccessResponseState={processSuccessResponseState}
    >
      {props.children}
    </DerivativesView>
  );
};

Derivatives.displayName = "Derivatives";
Derivatives.defaultProps = {};

export default Derivatives;
