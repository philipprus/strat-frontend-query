import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { getJobsApiMethod } from "./utils/fetchServicies";
import Printer from "./components/Printer/Printer";
import Queue from "./components/Queue/Queue";
import ActionBar from "./components/shared-ui/ActionBar/ActionBar";
import { useQuery } from "react-query";
import { JobType, StatusJob } from "./components/shared-ui/Job/Job";

function App() {
  const [intervalMs, setIntervalMs] = React.useState<number>(5000);

  const { data: jobs, isLoading, isFetching } = useQuery<JobType[]>(
    "jobs",
    getJobsApiMethod,
    {
      refetchInterval: intervalMs,
    }
  );

  useEffect(() => {
    if (jobs?.length && jobs[0].status === StatusJob.Printing) {
      setIntervalMs(30000);
    } else {
      setIntervalMs(5000);
    }
  }, [jobs]);

  const processJob = jobs?.filter(
    (job) =>
      job.status === StatusJob.Printing || job.status === StatusJob.Stopped
  )?.[0];

  const waitJobs = jobs?.filter((job) => job.status !== StatusJob.Printing);

  return (
    <Container fluid="md" className="app-manager-jobs">
      <Row>
        <Col xs="12" md="6">
          {processJob ? (
            <Printer
              job={processJob}
              onEnd={() => {
                setIntervalMs(1000);
              }}
            />
          ) : (
            <ActionBar
              title={`Printer waiting job`}
              extra={
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: ".5rem",
                    width: 10,
                    height: 10,
                    background: isFetching ? "green" : "transparent",
                    transition: !isFetching ? "all .3s ease" : "none",
                    borderRadius: "100%",
                    transform: "scale(2)",
                  }}
                />
              }
            />
          )}
        </Col>
        <Col xs="12" md="6">
          {waitJobs && <Queue jobs={waitJobs} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
