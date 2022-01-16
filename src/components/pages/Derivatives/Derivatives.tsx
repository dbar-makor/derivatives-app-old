import React, { ChangeEvent, useEffect, useState } from "react";

import { AxiosResponse, AxiosError } from "axios";

import { backendAPIAxios } from "../../../utils/http";

import { SelectChangeEvent } from "@mui/material";

import { IDerivative } from "../../../models/derivatives";
import { IServerResponseData } from "../../../models/shared/response";

import {
  IGetDerivativeResponse,
  IGetDerivativesResponse,
  IGetFloorBrokersResponse,
} from "../../../models/response";

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
  const [CSVFilesState, setCSVFilesState] = useState<
    { id: string; file: string | ArrayBuffer | null }[]
  >([]);

  const [WEXState, setWEXState] = useState<boolean>(false);
  const [DRVState, setDRVState] = useState<boolean>(false);
  const [spinnerState, setSpinnerState] = useState<boolean>(false);
  const [uploadErrorState, setUploadErrorState] = useState<boolean>(false);
  const [openModalState, setOpenModalState] = useState<boolean>(false);
  const [disableFloorBrokersSelectState, setdisableFloorBrokersSelectState] =
    useState<boolean>(true);

  const [floorBrokersDataState, setFloorBrokersDataState] = useState<
    IGetFloorBrokersResponse[] | undefined
  >([]);
  const [floorBrokerSelectState, setFloorBrokerSelectState] =
    useState<string>("");
  const [sourceFileNameState, setSourceFileNameState] = useState<string>("");
  const [DRVFileNameState, setDRVFileNameState] = useState<string>("");

  const handleModalOpen = () => setOpenModalState(true);
  const handleModalClose = () => setOpenModalState(false);
  const floorBrokersStateChangeHandler = (event: SelectChangeEvent) => {
    setFloorBrokerSelectState(event.target.value as string);
  };

  useEffect(() => {
    if (CSVFilesState.length === 2 && floorBrokerSelectState !== "") {
      onSubmit();
    }
    // eslint-disable-next-line
  }, [CSVFilesState, floorBrokerSelectState]);

  useEffect(() => {
    getDerivatives();
    getFloorBrokers();
  }, []);

  const getFloorBrokers = async () => {
    await backendAPIAxios
      .get(
        `${process.env.REACT_APP_MAKOR_X_URL}${process.env.REACT_APP_MAKOR_X_API_KEY}`
      )
      .then((response: AxiosResponse<IGetFloorBrokersResponse[]>) => {
        if (!response.data) {
          return alert("Failed to upload CSV");
        }

        if (response.status === 200) {
          setdisableFloorBrokersSelectState(() => false);
        }

        setFloorBrokersDataState(() => response.data);
      })
      .catch((e: AxiosError) => {
        alert(`Failed to upload CSV with error: ${e}`);
      });
  };

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

  const onSubmit = () => {
    setSpinnerState(() => true);
    setDerivativeState(() => undefined);

    backendAPIAxios
      .post(
        "/derivatives",
        { files: CSVFilesState, floorBrokerId: floorBrokerSelectState },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token") ?? ""}`,
          },
        }
      )
      .then((response: AxiosResponse<IServerResponseData>) => {
        if (!response.data) {
          return console.log("Failed to upload CSV");
        }

        if (response.status === 200) {
          getDerivatives();
          getDerivative();
        }
      })
      .catch((e: AxiosError) => {
        console.log(`Failed to upload CSV with error: ${e}`);
        setUploadErrorState(() => true);
        setTimeout(() => {
          setUploadErrorState(() => false);
        }, 2000);
      })
      .finally(() => {
        setSpinnerState(() => false);
        setWEXState(() => false);
        setDRVState(() => false);
        setCSVFilesState(() => []);
        setFloorBrokerSelectState(() => "");
        setSourceFileNameState(() => "");
        setDRVFileNameState(() => "");
      });
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const id = event.target.id;
    const fileReader = new FileReader();
    const file = event.target.files![0];

    if (id === "source") {
      setSourceFileNameState(() => file.name);
      setWEXState(() => true);
    }

    if (id === "DRV") {
      setDRVFileNameState(() => file.name);
      setDRVState(() => true);
    }

    fileReader.onload = () => {
      setCSVFilesState([...CSVFilesState, { id, file: fileReader.result }]);
    };

    fileReader.readAsDataURL(file);
  };

  const onDownload = (fileName: string) => {
    backendAPIAxios
      .get("/derivatives/download/" + fileName, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token") ?? ""}`,
        },
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
      DRVState={DRVState}
      sourceFileNameState={sourceFileNameState}
      DRVFileNameState={DRVFileNameState}
      spinnerState={spinnerState}
      uploadErrorState={uploadErrorState}
      openModalState={openModalState}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      onUpload={onUpload}
      onSubmit={onSubmit}
      onDownload={onDownload}
      floorBrokerSelectState={floorBrokerSelectState}
      floorBrokersDataState={floorBrokersDataState}
      floorBrokersSelectChangeHandler={floorBrokersStateChangeHandler}
      disableFloorBrokersSelectState={disableFloorBrokersSelectState}
    >
      {props.children}
    </DerivativesView>
  );
};

Derivatives.displayName = "Derivatives";
Derivatives.defaultProps = {};

export default Derivatives;
