import React, { useCallback, useEffect, useState } from "react";
import { Button } from "reactstrap";
import ActionBar from "../shared-ui/ActionBar/ActionBar";
import Icon from "../shared-ui/Icon/Icon";
import { JobType, StatusJob } from "../shared-ui/Job/Job";
import { formatSeconds } from "../../utils/helpers";
import {
  cancelJobApiMethod,
  getJobsApiMethod,
} from "../../utils/fetchServicies";
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
  const [seconds, setSeconds] = useState(job?.duration || 0);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    if (job?.status === StatusJob.Printing) {
      job?.duration && setSeconds(job?.duration);
    } else {
      intervalId && window.clearInterval(intervalId);
    }
  }, [job, intervalId]);

  const startTimer = useCallback(() => {
    let interval: number;
    interval = window.setInterval(() => {
      setSeconds((seconds) => seconds - 1);
      if (seconds === 0) {
        onEnd && onEnd();
        queryClient.refetchQueries("jobs");
      }
    }, 1000);
    setIntervalId(interval as number);
    return interval;
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = startTimer();
    setIntervalId(interval);
    return () => {
      window.clearInterval(interval as number);
    };
  }, [seconds, onEnd, startTimer]);

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
      if (job?.name) {
        const response = await cancelJobApiMethod(job?.name);
        if (response.status) {
          queryClient.refetchQueries("jobs");
        }
      }
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
          job?.status !== StatusJob.Stopped ? (
            <Button
              onClick={onHandlerCancelPrinting}
              className="btn-icon btn-pause"
            >
              <Icon icon="pause" width={13} height={14} />
            </Button>
          ) : (
            "Stop"
          )
        }
        progressValue={getTimeEndProcent()}
      />
      {job?.name && <SingleJob name={job?.name} />}
      <PrinterStatus />
    </div>
  );
};

export default Printer;
