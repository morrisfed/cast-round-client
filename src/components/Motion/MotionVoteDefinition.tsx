import React, { useCallback } from "react";

import {
  ModelResponseDefinition,
  ModelRoleVotesDefinition,
  ModelVoteDefinition,
} from "interfaces/motion";
import MotionRoleVotesDefinition from "./MotionRoleVotesDefinition";
import MotionResponseDefinitions from "./MotionResponseDefinitions";

export interface MotionVoteDefinitionProps {
  voteDefinition: ModelVoteDefinition;
  onDefinitionChanged: (definition: ModelVoteDefinition) => void;
}

const MotionVoteDefinition: React.FC<MotionVoteDefinitionProps> = ({
  voteDefinition,
  onDefinitionChanged,
}) => {
  const roleVotesChangedHandler = useCallback(
    (roleVotes: ModelRoleVotesDefinition[]) => {
      onDefinitionChanged({
        ...voteDefinition,
        roleVotes,
      });
    },
    [onDefinitionChanged, voteDefinition]
  );

  const responsesChangedHandler = useCallback(
    (responses: ModelResponseDefinition[]) => {
      onDefinitionChanged({
        ...voteDefinition,
        responses,
      });
    },
    [onDefinitionChanged, voteDefinition]
  );

  return (
    <>
      <MotionRoleVotesDefinition
        roleVotes={voteDefinition.roleVotes}
        onRoleVotesChanged={roleVotesChangedHandler}
      />
      <MotionResponseDefinitions
        responseDefinitions={voteDefinition.responses}
        onResponseDefinitionsChanged={responsesChangedHandler}
      />
    </>
  );
};

export default MotionVoteDefinition;
