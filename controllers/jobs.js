const response = require("../displayResponse");
const { NotFoundError, BadRequestError } = require("../errors");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  // Sorts the Job by the createdBy property, putting the most recent first
  const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");
  response(res, 200, { jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOne({ _id: id, createdBy: req.user._id });
  console.log(job);
  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  response(res, 200, { job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);
  response(res, 201, { job });
};
const updateJob = async (req, res) => {
  // Destructure necessary properties from the req object
  const {
    params: { id },
    body: { company, position },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Company and position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: id, createdBy: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  response(res, 200, { job });
};
const deleteJob = async (req, res) => {
  const {
    params: { id },
  } = req;
  const job = await Job.findByIdAndDelete({ _id: id, createdBy: req.user._id });
  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  response(res, 200, { job });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
