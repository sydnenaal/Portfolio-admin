import React, { useState, useCallback } from "react";

import PageWithHeaderComponent from "./component";

const PageWithHeaderContainer = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChangeIsVisible = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return (
    <PageWithHeaderComponent
      handleDrawerVisible={handleChangeIsVisible}
      drawerVisible={isVisible}
      {...props}
    />
  );
};

export default React.memo(PageWithHeaderContainer);
