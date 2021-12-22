import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { AxiosResponse, AxiosError } from "axios";

import { backendAPIAxios } from "../../../utils/http";

import { IDerivative } from "../../../models/derivatives";

import {
  IGetDerivativeResponse,
  IGetDerivativesResponse,
} from "../../../models/response";
import { IServerResponseData } from "../../../models/shared/response";

import icons from "../../../assets/icons";

import DerivativesView from "./Derivatives.view";

interface Props {
  readonly iconName?: keyof typeof icons;
}

const Derivatives: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const [derivativesState, setDerivativesState] = useState<
    IDerivative[] | undefined
  >(undefined);

  const [derivativeState, setDerivativeState] = useState<
    IDerivative | undefined
  >(undefined);

  const [WEXState, setWEXState] = useState<boolean>(false);
  const [spinnerState, setSpinnerState] = useState<boolean>(false);

  const [openModalState, setOpenModalState] = useState<boolean>(false);

  const [CSVFilesState, setCSVFilesState] = useState<
    { id: string; file: string | ArrayBuffer | null }[]
  >([]);

  const handleModalOpen = () => setOpenModalState(true);
  const handleModalClose = () => setOpenModalState(false);

  useEffect(() => {
    getDerivatives();
  }, []);

  const getDerivatives = () => {
    backendAPIAxios
      .get("/derivatives", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token") ?? ""}`,
        },
      })
      .then((response: AxiosResponse<IGetDerivativesResponse>) => {
        if (!response.data.data) {
          return console.log("Failed to upload CSV");
        }

        setDerivativesState(() => response.data.data);
      })
      .catch((e: AxiosError) => {
        console.log(`Failed to upload CSV with error: ${e}`);
      });
  };

  const getDerivative = () => {
    backendAPIAxios
      .get("/derivatives/single", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token") ?? ""}`,
        },
      })
      .then((response: AxiosResponse<IGetDerivativeResponse>) => {
        if (!response.data.data) {
          return console.log("Failed to upload CSV");
        }

        setDerivativeState(() => response.data.data);
      })
      .catch((e: AxiosError) => {
        console.log(`Failed to upload CSV with error: ${e}`);
      });
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const id = event.target.id;
    const fileReader = new FileReader();
    const file = event.target.files![0];

    fileReader.onload = () => {
      setCSVFilesState([...CSVFilesState, { id, file: fileReader.result }]);
    };

    fileReader.readAsDataURL(file);

    setWEXState(() => true);
  };

  useEffect(() => {
    if (CSVFilesState.length === 2) {
      onSubmit();
    }
  }, [CSVFilesState]);

  const onSubmit = () => {
    setSpinnerState(() => true);

    backendAPIAxios
      .post("/derivatives", CSVFilesState, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token") ?? ""}`,
        },
      })
      .then((response: AxiosResponse<IServerResponseData>) => {
        if (!response.data.message) {
          return console.log(
            `Failed to upload CSV files because of error ${response.data.message}`
          );
        }

        if (response.status === 200) {
          getDerivatives();
          getDerivative();
        }
      })
      .catch((e: AxiosError) => {
        console.log(`Failed to upload CSV with error: ${e}`);
      })
      .finally(() => {
        setSpinnerState(() => false);
        setWEXState(() => false);
        setCSVFilesState(() => []);
      });
  };

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
      derivativesState={derivativesState}
      derivativeState={derivativeState}
      WEXState={WEXState}
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
