import React from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../context/query";
import {
  deleteJobApiMethod,
  moveJobApiMethod,
} from "../../utils/fetchServicies";
import Job, { JobType } from "../shared-ui/Job/Job";

const JobList = ({ jobs }: { jobs: JobType[] }) => {
  const deleteMutation = useMutation(
    (name: string) => deleteJobApiMethod(name),
    {
      retry: 3,
      onSuccess: () => {
        queryClient.fetchQuery("jobs");
      },
    }
  );

  const moveMutation = useMutation(
    ({ name, up }: { name: string; up: boolean }) =>
      moveJobApiMethod({ name, up }),
    {
      retry: 3,
      onSuccess: () => {
        queryClient.fetchQuery("jobs");
      },
    }
  );

  const onMoveHandler = async (up: boolean, name: string) => {
    try {
       moveMutation.mutate({name, up});
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async (name: string) => {
    try {
      deleteMutation.mutate(name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {jobs.map((job, index) => {
        return (
          <Job
            {...job}
            index={index + 1}
            key={job.name}
            disableDownButton={index + 1 === jobs.length}
            disableUpButton={!index}
            onMoveHandler={onMoveHandler}
            onDeleteHandler={onDeleteHandler}
          />
        );
      })}
    </>
  );
};

export default JobList;
