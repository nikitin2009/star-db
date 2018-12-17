import React from "react";
import { withRouter } from "react-router-dom";
import Row from "../row";
import { PeopleList, PersonDetails } from "../sw-components";

const PeoplePage = ({ match, history }) => {
  const { id } = match.params;
  return (
    <Row
      left={<PeopleList onItemSelected={id => history.push(id)} />}
      right={<PersonDetails itemId={id} />}
    />
  );
};

export default withRouter(PeoplePage);
