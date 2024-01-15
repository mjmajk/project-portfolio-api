import { CompanyModel } from "../models/Company.js";
import { IProject, ProjectModel } from "../models/Project.js";
import { TechnologyModel } from "../models/Technology.js";

export const resolvers = {
  Query: {
    async project(_, { slug }) {
      return await ProjectModel.findOne({ slug });
    },
    async projects(...params) {
      console.log(params);

      return await ProjectModel.find();
    },
    async company(_, { ID }) {
      return await CompanyModel.findById(ID);
    },
    async companies() {
      return await CompanyModel.find();
    },
    async technologies() {
      return await TechnologyModel.find();
    },
    async technology(_, { ID }) {
      await TechnologyModel.findById(ID);
    },
  },
  Mutation: {
    async createProject(_, { project }) {
      const createdProject = new ProjectModel({
        ...project,
      });

      const res = await createdProject.save();

      return {
        id: res._id,
        ...project,
      };
    },
    async editProject(_, { ID, project }) {
      const response = await ProjectModel.updateOne({ _id: ID }, project);

      return {
        id: ID,
        ...project,
      };
    },
    async createCompany(_, { company }) {
      const createdCompany = new CompanyModel({
        ...company,
      });

      const res = await createdCompany.save();

      return {
        id: res._id,
        ...company,
      };
    },
    async createTechnology(_, { technology }) {
      const createdTechnology = new TechnologyModel({
        ...technology,
      });

      const res = await createdTechnology.save();

      return {
        id: res._id,
        ...technology,
      };
    },
  },
  Project: {
    async company(parent: IProject) {
      const company = await CompanyModel.findById(parent.companyId);

      return company;
    },
    async technologies(parent: IProject) {
      const technologies = await TechnologyModel.find()
        .where("_id")
        .in(parent.technologiesIds);

      return technologies;
    },
  },
};
