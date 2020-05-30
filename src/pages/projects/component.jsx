import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Card, Input, Button, Radio } from "semantic-ui-react";

import "./style.sass";

import PageWithHeader from "containers/pageWithHeader";
import Table from "containers/table";
import WithLoader from "containers/withLoader";

import { headerNames } from "constants/tableConstants";
import { themeStyle } from "constants/themingStyles";
import { selectTheme, selectProjects } from "redux/selectors";

const ProjectsPageComponent = ({
  compact,
  handleChange,
  handleChangeFilter,
  handleFilterData,
}) => {
  const {
    messages: { titles, projects },
  } = useIntl();

  const theme = useSelector(selectTheme);
  const projectsData = useSelector(selectProjects);

  return (
    <PageWithHeader title={titles.projects}>
      <div className="projectsBody">
        <Card fluid style={themeStyle[theme]}>
          <Card.Content>
            <div className="projectsContent">
              <div className="projectsTitle">{projects.title}</div>

              <div className="projectsActions">
                <div className="projectsButtons">
                  <div className="crudButton">
                    <Button>{projects.add}</Button>
                  </div>

                  <div className="crudButton">
                    <Button>{projects.delete}</Button>
                  </div>

                  <div className="crudButton">
                    <Button>{projects.update}</Button>
                  </div>

                  <div className="crudButton">
                    <p>{projects.dense}</p>

                    <Radio toggle onChange={handleChange} />
                  </div>
                </div>

                <Input
                  icon="search"
                  placeholder={projects.search}
                  onChange={handleChangeFilter}
                />
              </div>

              <div className="projectsTable">
                <WithLoader>
                  {projectsData && (
                    <Table
                      showPagination={true}
                      compact={compact}
                      headerNames={headerNames}
                      tableData={handleFilterData(projectsData)}
                    />
                  )}
                </WithLoader>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </PageWithHeader>
  );
};

export default ProjectsPageComponent;
