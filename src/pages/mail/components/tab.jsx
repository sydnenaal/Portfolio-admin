import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "semantic-ui-react";

import { themeStyle } from "constants/themingStyles";
import { setTab, setMessages } from "ducks";
import { sortMessages } from "utils";
import {
  selectTheme,
  selectActiveTab,
  selectSortedMessages,
  selectMessages,
} from "selectors";

import Card from "containers/card";
import Message from "./message";
import Pagination from "containers/pagination";

export const Content = ({ handleCheck }) => {
  const tabs = useSelector(selectSortedMessages);
  const activeTab = useSelector(selectActiveTab);
  const content = tabs[activeTab];

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [displayedMessages, setDisplayedMessages] = useState([]);

  useEffect(() => {
    if (content) {
      setDisplayedMessages(
        content.slice((page - 1) * pageSize, page * pageSize)
      );
      setPageCount(Math.ceil(content.length / pageSize));
    }
  }, [content, page, pageSize]);

  const handlers = {
    handleChangePageSize: (e, { value }) => {
      setPageSize(value);
      setPage(1);
    },
    handleChangePage: setPage,
  };

  return (
    <Card>
      <>
        <div className="messagesInnerArea">
          {displayedMessages.length > 0 ? (
            displayedMessages.map((item, index) => (
              <Message
                {...item}
                handleCheck={handleCheck}
                index={index}
                key={index}
              />
            ))
          ) : (
            <div className="emptyMessage">Empty</div>
          )}
        </div>
        <div className="messagesPagination">
          <Pagination
            handlers={handlers}
            pageSize={pageSize}
            page={page}
            pageCount={pageCount}
          />
        </div>
      </>
    </Card>
  );
};

export const Tab = ({ title, messagesCounter, locale }) => {
  const activeTab = useSelector(selectActiveTab);
  const theme = useSelector(selectTheme);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  const isActive = useMemo(() => activeTab === title, [activeTab, title]);
  const activeColor = useMemo(() => (theme === "dark" ? "white" : "grey"), [
    theme,
  ]);
  const borderColor = useMemo(() => (isActive ? activeColor : "transparent"), [
    isActive,
    activeColor,
  ]);
  const tabStyle = useMemo(
    () => ({ borderBottom: `2px solid ${borderColor}` }),
    [borderColor]
  );

  const handleClick = useCallback(() => {
    const newMessages = messages.map((item) => ({ ...item, isChecked: false }));
    dispatch(setMessages(newMessages));
    sortMessages({ messages: newMessages, dispatch: dispatch });
    dispatch(setTab(title));
  }, [messages, title, dispatch]);

  return (
    <div style={tabStyle} className="tab" key={title} onClick={handleClick}>
      <span style={themeStyle[theme]}>{locale.tabs[title]}</span>
      {messagesCounter && <Label>{messagesCounter}</Label>}
    </div>
  );
};
