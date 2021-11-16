import React from "react";
import { Button } from "reactstrap";
import Icon from "../Icon/Icon";
import thumbImage from "../../../assets/images/tray-image.jpg";
import { formatSeconds } from "../../../utils/helpers";

export enum StatusJob {
  Printing = "printing",
  Queued = "queued",
  Stopped = "stopped",
}

export type JobType = {
  name: string;
  duration: number;
  status: StatusJob;
};

export type JobProps = JobType & {
  index: number;
  disableUpButton?: boolean;
  disableDownButton?: boolean;
  onMoveHandler: (up: boolean, name: string) => void;
  onDeleteHandler: (name: string) => void;
};
const Job = ({
  name,
  index,
  duration,
  disableUpButton = true,
  disableDownButton = true,
  onMoveHandler,
  onDeleteHandler,
}: JobProps) => {
  return (
    <div key={name} className="job job-card background-web">
      <div className="job-card__action-left">
        <Button
          className="btn-icon"
          disabled={disableUpButton}
          onClick={() => onMoveHandler(true, name)}
        >
          <Icon icon="up" height={32} width={32} />
        </Button>
        <Button
          className="btn-icon"
          disabled={disableDownButton}
          onClick={() => onMoveHandler(false, name)}
        >
          <Icon icon="down" height={32} width={32} />
        </Button>
      </div>
      <div className="job-card__body">
        <div className="job__thumb">
          <img src={thumbImage} alt="thumb" />
        </div>
        <div className="job__content">
          <h2 className="job__title">
            {index}. {name}
          </h2>
          <div className="job__additional">
            <div className="job__duration"><Icon icon="clock"/> {formatSeconds(duration)}</div>
            <div className="job__author"><Icon icon="men"/> Stanyslav Polotovsky</div>
          </div>
        </div>
      </div>
      <div className="job-card__action-right">
        <Button onClick={() => onDeleteHandler(name)} className="btn-icon">
          <Icon icon="delete" width={24} height={28} />
        </Button>
        <Button className="btn-icon">
          <Icon icon="duplicate" width={34} height={34} />
        </Button>
        <Button className="btn-icon">
          <Icon icon="arrowRight" width={13} height={24} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Job);
