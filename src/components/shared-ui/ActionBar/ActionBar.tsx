import React from "react";
import { Progress } from "reactstrap";

export type ActionBarProps = {
  title: JSX.Element | string;
  extra?: JSX.Element | string;
  progressValue?: number;
};
const ActionBar = ({ title, extra, progressValue }: ActionBarProps) => {
  return (
    <div className="actionbar">
      <div className="actionbar__title">{title}</div>
      <div className="actionbar__extra">{extra && extra}</div>
      {progressValue ? (
        <div className="actionbar__progress">
          <Progress value={progressValue} />
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(ActionBar);
