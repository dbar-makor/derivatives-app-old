import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";

import { AxiosError, AxiosResponse } from "axios";

import { backendAPIAxios } from "../../../utils/http";

import { ILoginResponse } from "../../../models/response";

import icons from "../../../assets/icons";

import LoginView from "./Login.view";

interface Props {
  readonly iconName?: keyof typeof icons;
}

const Login: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [usernameState, setUsernameState] = useState<any>("");
  const [passwordState, setPasswordState] = useState<any>("");
  const [errorState, setErrorState] = useState<boolean>(false);

  const history = useHistory();

  const usernameChangeHandler = (username: ChangeEvent<HTMLInputElement>) =>
    setUsernameState(username.target.value);
  const passwordChangeHandler = (password: ChangeEvent<HTMLInputElement>) =>
    setPasswordState(password.target.value);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    backendAPIAxios
      .post("/auth/login", {
        username: usernameState,
        password: passwordState,
      })
      .then((response: AxiosResponse<ILoginResponse>) => {
        sessionStorage.setItem("token", response.data.data!.token);
        backendAPIAxios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.data!.token;
        history.push("/derivatives");
      })
      .catch((e: AxiosError) => {
        setErrorState(() => true);
        alert(`Failed to auth with error: ${e}`);
      });
  };

  return (
    <LoginView
      iconName={props.iconName}
      username={usernameState}
      password={passwordState}
      usernameChangeHandler={usernameChangeHandler}
      passwordChangeHandler={passwordChangeHandler}
      submitHandler={submitHandler}
      error={errorState}
    >
      {props.children}
    </LoginView>
  );
};

Login.displayName = "Login";
Login.defaultProps = {};

export default Login;
