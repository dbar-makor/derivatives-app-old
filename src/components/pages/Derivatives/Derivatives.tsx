import React, { ChangeEvent, useEffect, useState } from "react";

import { AxiosResponse, AxiosError } from "axios";

import { backendAPIAxios } from "../../../utils/http";

import { IUploadCSVResponse } from "../../../models/response/response";

import icons from "../../../assets/icons";

import DerivativesView from "./Derivatives.view";

interface Props {
  readonly iconName?: keyof typeof icons;
}

const Derivatives: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const [openModalState, setOpenModalState] = useState<boolean>(false);

  const handleModalOpen = () => setOpenModalState(true);
  const handleModalClose = () => setOpenModalState(false);

  const [CSVFilesState, setCSVFilesState] = useState<
    { id: string; file: string | ArrayBuffer | null }[]
  >([]);

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
        // setWEXSpinnerLoaderState(() => true);
        // setDRVSpinnerLoaderState(() => true);
        // if (response.data) {
        //   setDRVErrorRsponseState(() => true); // need to manage by server response
        // }
        // if (response.data) {
        //   setWEXErrorRsponseState(() => true); // need to manage by server response
        // }
        // if (response.status === 200) {
        //   setServerResponseUploadState(() => true);
        // }
      })
      .catch((e: AxiosError) => {
        // alert(`Failed to upload CSV with error: ${e}`);
      })
      .finally(() => {
        // setWEXSpinnerLoaderState(() => false);
        // setDRVSpinnerLoaderState(() => false);
      });
  };

  useEffect(() => {
    if (CSVFilesState.length === 0) {
      // setProcessEnabledState(false);
    }

    // setProcessEnabledState(true);
  }, [CSVFilesState]);

  return (
    <DerivativesView
      iconName={props.iconName}
      openModalState={openModalState}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
    >
      {props.children}
    </DerivativesView>
  );
};

Derivatives.displayName = "Derivatives";
Derivatives.defaultProps = {};

export default Derivatives;
