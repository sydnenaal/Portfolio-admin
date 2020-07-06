import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Icon, Input, Button } from "semantic-ui-react";

import "../style.sass";
import { changePassword } from "api";

const ChangePassword = ({ locale }) => {
  let source = axios.CancelToken.source();
  const dispatch = useDispatch();

  const [isPasswordChangeShow, setIsPasswordChangeShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, [source]);

  const handleChangePassword = useCallback(
    (e) => setPassword(e.target.value),
    []
  );
  const handleChangeOldPassword = useCallback(
    (e) => setOldPassword(e.target.value),
    []
  );
  const handleChangeRepeatPassword = useCallback(
    (e) => {
      error && setError(false);
      setRepeatPassword(e.target.value);
    },
    [error]
  );
  const handleSubmit = useCallback(() => {
    if (password !== repeatPassword) {
      setError(true);
    } else {
      dispatch(
        changePassword({
          title: "changePassword",
          cancelToken: source.token,
          password: password,
          oldPassword: oldPassword,
        })
      );
      setPassword("");
      setRepeatPassword("");
      setIsPasswordChangeShow(false);
    }
  }, [password, repeatPassword, oldPassword, dispatch, source.token]);
  const handleOpenPasswordChange = useCallback(
    () => setIsPasswordChangeShow(!isPasswordChangeShow),
    [isPasswordChangeShow]
  );

  const contentStyle = useMemo(
    () => ({
      maxHeight: `${isPasswordChangeShow ? 300 : 0}px`,
    }),
    [isPasswordChangeShow]
  );

  const chevronStyle = useMemo(
    () => ({
      transform: `rotate(${isPasswordChangeShow ? 180 : 0}deg)`,
    }),
    [isPasswordChangeShow]
  );

  return (
    <div>
      <div className="passwordChangeHeader" onClick={handleOpenPasswordChange}>
        <p>{locale.settings.password}</p>

        <div className="chevronIcon" style={chevronStyle}>
          <Icon name="chevron down"></Icon>
        </div>
      </div>

      <div className="passwordChange" style={contentStyle}>
        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            type="password"
            onChange={handleChangeOldPassword}
            value={oldPassword}
            placeholder={locale.settings.enterOldPasswordPlaceholder}
          />
        </div>
      </div>

      <div className="passwordChange" style={contentStyle}>
        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            type="password"
            onChange={handleChangePassword}
            value={password}
            placeholder={locale.settings.enterPasswordPlaceholder}
          />
        </div>

        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            type="password"
            error={error}
            onChange={handleChangeRepeatPassword}
            value={repeatPassword}
            placeholder={locale.settings.repeatPasswordPlaceholder}
          />
        </div>

        <div className="passwordChange-button">
          <Button onClick={handleSubmit}>{locale.settings.savePassword}</Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
