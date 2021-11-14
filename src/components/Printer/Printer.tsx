import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import ActionBar from "../shared-ui/ActionBar/ActionBar";
import Icon from "../shared-ui/Icon/Icon";
import { JobType, StatusJob } from "../shared-ui/Job/Job";
import { formatSeconds } from "../../utils/helpers";
import { cancelJobApiMethod } from "../../utils/fetchServicies";
import SingleJob from "../shared-ui/SingleJob/SingleJob";
import PrinterStatus from "../shared-ui/PrinterStatus/PrinterStatus";
import { queryClient } from "../../context/query";

const Printer = ({
  job,
  onEnd,
}: {
  job: JobType | null;
  onEnd?: () => void;
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    job?.duration && setSeconds(job?.duration);
  }, [job]);

  useEffect(() => {
    let interval: number | null = null;
    interval = window.setInterval(() => {
      setSeconds((seconds) => seconds - 1);
      if (seconds === 0) {
        onEnd && onEnd();
        queryClient.refetchQueries("jobs");
      }
    }, 1000);
    return () => {
      window.clearInterval(interval as number);
    };
  }, [seconds, onEnd]);

  const getTimeEndProcent = () => {
    if (seconds <= 0) {
      return 100;
    }
    if (seconds > 0 && job?.duration) {
      return Math.round((1 - seconds / job?.duration) * 100);
    }
  };

  const onHandlerCancelPrinting = async () => {
    try {
      job?.name && (await cancelJobApiMethod(job?.name));
    } catch (error) {}
  };

  const isStopped = job?.status === StatusJob.Stopped ? StatusJob.Stopped : "";
  const ActionTitleBar = () => (
    <div>
      Current printing job {isStopped} |{" "}
      <span style={{ color: "#00A1E0" }}>
        {getTimeEndProcent() || 0}% [{formatSeconds(seconds)} LEFT]
      </span>
    </div>
  );
  return (
    <div className="printer printer__left col">
      <ActionBar
        title={<ActionTitleBar />}
        extra={
          <Button
            onClick={onHandlerCancelPrinting}
            className="btn-icon btn-pause"
          >
            <Icon icon="pause" width={13} height={14} />
          </Button>
        }
        progressValue={getTimeEndProcent()}
      />
      {job?.name && <SingleJob name={job?.name} />}
      <PrinterStatus />
    </div>
  );
};

export default Printer;
