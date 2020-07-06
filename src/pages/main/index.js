import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { getMainInfo } from "api/main";
import { selectNewMessagesCounter, selectVisits } from "selectors";

import MainPageComponent from "./component";

const MainPageContainer = () => {
  const counter = useSelector(selectNewMessagesCounter);
  const visits = useSelector(selectVisits);
  const dispatch = useDispatch();

  useEffect(() => {
    let source = axios.CancelToken.source();

    dispatch(
      getMainInfo({
        cancelToken: source.token,
        title: "getMainPageInfo",
      })
    );

    return () => {
      source.cancel();
    };
  }, [dispatch]);

  return <MainPageComponent counter={counter} visits={visits} />;
};

export default MainPageContainer;
