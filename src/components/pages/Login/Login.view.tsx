import React, { ChangeEventHandler } from "react";

import { Button, Input } from "@material-ui/core";

import icons from "../../../assets/icons";

import classes from "./Login.module.scss";

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly username?: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  readonly password?: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  readonly usernameChangeHandler: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  readonly passwordChangeHandler: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  readonly submitHandler: (e: React.FormEvent) => void;
  readonly error: boolean;
}

const LoginView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes["outerContainer"]}>
      <div className={classes["formContainer"]}>
        <form className={classes["form"]} onSubmit={props.submitHandler}>
          <h1 className={classes["form__header"]}>Sign-In</h1>
          <Input
            className={classes["form__input"]}
            placeholder="Username"
            value={props.username}
            onChange={props.usernameChangeHandler}
            type="text"
          />
          <Input
            className={classes["form__input"]}
            placeholder="Password"
            value={props.password}
            onChange={props.passwordChangeHandler}
            type="password"
          />
          <Button
            className={classes["form__button"]}
            type="button"
            variant="contained"
            onClick={props.submitHandler}
          >
            Sign-In
          </Button>
          {props.error === true && (
            <span className={classes["form__error"]}>
              Wrong username or pasword
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

LoginView.displayName = "LoginView";
LoginView.defaultProps = {};

export default LoginView;
