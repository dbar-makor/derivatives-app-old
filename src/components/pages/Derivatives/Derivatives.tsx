import React, { ChangeEvent, useEffect, useState } from "react";

import { AxiosResponse, AxiosError } from "axios";

import { backendAPIAxios } from "../../../utils/http";

import { IHistory } from "../../../models/history";

import {
  IHistoryResponse,
  IUploadCSVResponse,
  IGetDataResponse,
  IDownloadResponse,
} from "../../../models/response/response";

import icons from "../../../assets/icons";

import DerivativesView from "./Derivatives.view";

interface Props {
  readonly iconName?: keyof typeof icons;
}

const Derivatives: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const [hitoryState, setHistoryState] = useState<IHistory | null>(null);
  const [, setDownloadState] = useState<string>("");
  const [fileState, setFileState] = useState<string>("");

  const [downloadLoadingState, setDownloadLoadingState] =
    useState<boolean>(false);
  const [currentSelectedRowIdState, setCurrentSelectedRowIdState] =
    useState<string>("");
  const [runLoadingState, setRunLoadingState] = useState<boolean>(false);
  const [uploadLoadingState, setUploadLoadingState] = useState<boolean>(false);

  const [checkUploadState, setCheckUploadState] = useState<boolean>(false);

  const [openModalState, setOpenModalState] = useState<boolean>(false);

  const handleModalOpen = () => setOpenModalState(true);
  const handleModalClose = () => setOpenModalState(false);

  // const getHistory = async () => {
  //   try {
  //     const token = sessionStorage.getItem("token");

  //     // Checks if token exist
  //     if (token) {
  //       const response = await backendAPIAxios.get("/history", {
  //         headers: { Authorization: token },
  //       });
  //       backendAPIAxios.defaults.headers.common["Authorization"] = token;

  //       setHistoryState(() => response.data);
  //     }

  //     backendAPIAxios
  //       .get("/history")
  //       .then((response: AxiosResponse<IHistoryResponse>) => {
  //         if (!response.data) {
  //           return alert("Failed to get history");
  //         }

  //         setHistoryState(() => response.data);
  //       })
  //       .catch((e: AxiosError) => {
  //         alert(`Failed to get history with error: ${e}`);
  //       });
  //   } catch (e) {
  //     alert(`Failed to get history with error: ${e}`);
  //   }
  // };

  // useEffect(() => {
  //   getHistory();
  // }, [setHistoryState]);

  const onDownland = (reportId: string) => {
    setDownloadLoadingState(() => true);
    setCurrentSelectedRowIdState(reportId);

    backendAPIAxios
      .get(`/download/${reportId}`)
      .then((response: AxiosResponse<IDownloadResponse>) => {
        if (!response.data.file_link) {
          return alert("Failed to download CSV");
        }

        setDownloadState(() => response.data.file_link);
      })
      .catch((e: AxiosError) => {
        alert(`Failed to download CSV with error: ${e}`);
      })
      .finally(() => {
        setDownloadLoadingState(() => false);
      });
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const CVSFile = new FormData();
    CVSFile.append("file", event.target.files![0]);

    setUploadLoadingState(() => true);

    backendAPIAxios
      .post("/upload", CVSFile)
      .then((response: AxiosResponse<IUploadCSVResponse>) => {
        if (!response.data) {
          return alert("Failed to upload CSV");
        }

        setFileState(() => response.data.report_id);

        if (response.status === 200) {
          setCheckUploadState(() => true);
        }
      })
      .catch((e: AxiosError) => {
        alert(`Failed to upload CSV with error: ${e}`);
      })
      .finally(() => {
        setUploadLoadingState(() => false);
      });
  };

  const onRun = () => {
    setRunLoadingState(() => true);

    backendAPIAxios
      .post(`/run/${fileState}`)
      .then((response: AxiosResponse<IGetDataResponse>) => {
        if (!response.data) {
          return alert("Failed to run");
        }
      })
      .catch((e: AxiosError) => {
        alert(`Failed to run with error: ${e}`);
      })
      .finally(() => {
        setRunLoadingState(() => false);
      });
  };

  return (
    <DerivativesView
      iconName={props.iconName}
      hitoryState={hitoryState}
      onDownload={onDownland}
      onRun={onRun}
      onUpload={onUpload}
      currentSelectedRowIdState={currentSelectedRowIdState}
      openModalState={openModalState}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      downloadLoadingState={downloadLoadingState}
      runLoadingState={runLoadingState}
      uploadLoadingState={uploadLoadingState}
      checkUploadState={checkUploadState}
    >
      {props.children}
    </DerivativesView>
  );
};

Derivatives.displayName = "Derivatives";
Derivatives.defaultProps = {};

export default Derivatives;
