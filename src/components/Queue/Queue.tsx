import React from "react";
import AddJobForm from "../AddJobForm/AddJobForm";
import JobList from "../JobList/JobList";
import ActionBar from "../shared-ui/ActionBar/ActionBar";
import { JobType } from "../shared-ui/Job/Job";
import ModalWithButton from "../shared-ui/ModalWithButton/ModalWithButton";

const ModalForm = () => (
  <ModalWithButton textOpenModalButton="Add a job">
    <AddJobForm />
  </ModalWithButton>
);

const Queue = ({ jobs }: { jobs: JobType[] }) => {
  const countJobs = jobs.length;
  return (
    <div className="app-manager-jobs-right  col">
      <ActionBar
        title={`Queue ${!countJobs ? "empty" : ""}`}
        extra={<ModalForm />}
      />

      <div className="jobs">
        <JobList jobs={jobs} />
      </div>
    </div>
  );
};

export default Queue;
