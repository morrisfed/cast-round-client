import React, { useMemo } from "react";

import { pipe } from "fp-ts/lib/function";
import * as ROA from "fp-ts/ReadonlyArray";
import * as ORD from "fp-ts/Ord";
import * as NUM from "fp-ts/number";

import { Motion } from "interfaces/motion";
import MotionItem from "./MotionItem";

export interface MotionListProps {
  motions: readonly Motion[];
}

const motionSequence = pipe(
  NUM.Ord,
  ORD.contramap((motion: Motion) => motion.sequence)
);

const MotionList: React.FC<MotionListProps> = ({ motions }) => {
  const sortedMotions = useMemo(
    () => ROA.sort(motionSequence)(motions),
    [motions]
  );

  const items = useMemo(() => {
    return sortedMotions.map((motion) => {
      return (
        <div key={motion.id} className="">
          <MotionItem motion={motion} />
        </div>
      );
    });
  }, [sortedMotions]);

  return <div className="grid grid-cols-1 gap-2 md:grid-cols-2">{items}</div>;
};

export default MotionList;
