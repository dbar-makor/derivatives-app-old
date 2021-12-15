import React, { ChangeEvent, useEffect, useState } from "react";

import { AxiosResponse, AxiosError } from "axios";

import { backendAPIAxios } from "../../../utils/http";

import { IDerivative } from "../../../models/derivatives";
import { IGetDerivativesResponse } from "../../../models/response";

import icons from "../../../assets/icons";

import DerivativesView from "./Derivatives.view";

interface Props {
  readonly iconName?: keyof typeof icons;
}

const Derivatives: React.FC<Props> = (
  props: React.PropsWithChildren<Props>,
) => {
  const [derivativeState, setDerivativeState] = useState<
    IDerivative[] | undefined
  >(undefined);
  const [spinnerState, setSpinnerState] = useState<number>(0);
  const [openModalState, setOpenModalState] = useState<boolean>(false);

  const [CSVFilesState, setCSVFilesState] = useState<
    { id: string; file: string | ArrayBuffer | null }[]
  >([]);

  const handleModalOpen = () => setOpenModalState(true);
  const handleModalClose = () => setOpenModalState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpinnerState((prevSpinner) =>
        prevSpinner >= 100 ? 0 : prevSpinner + 10,
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
      .post("/derivatives", CSVFilesState)
      .then((response: AxiosResponse) => {
        // if (!response.data) {
        //   return alert("Failed to upload CSV");
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
    backendAPIAxios
      .get("/derivatives")
      .then((response: AxiosResponse<IGetDerivativesResponse>) => {
        if (!response.data.data) {
          return console.log("Failed to upload CSV");
        }

        setDerivativeState(() => response.data.data);
      })
      .catch((e: AxiosError) => {
        console.log(`Failed to upload CSV with error: ${e}`);
      });
  }, []);

  const onDownload = (fileName: string) => {
    backendAPIAxios
      .get("/derivatives/download/" + fileName, {
        responseType: "blob",
        headers: {},
      })
      .then((response: AxiosResponse) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((e: AxiosError) => {
        console.log(`Failed to download file with error: ${e}`);
      });
  };

  return (
    <DerivativesView
      iconName={props.iconName}
      derivativeState={derivativeState}
      spinnerState={spinnerState}
      openModalState={openModalState}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      onUpload={onUpload}
      onSubmit={onSubmit}
      onDownload={onDownload}
    >
      {props.children}
    </DerivativesView>
  );
};

Derivatives.displayName = "Derivatives";
Derivatives.defaultProps = {};

export default Derivatives;
