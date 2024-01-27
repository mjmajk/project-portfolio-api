import { verifyToken } from "../firebase.js";
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
    async createProject(_, { project }, { token }) {
      verifyToken(token);

      const createdProject = new ProjectModel({
        ...project,
      });

      const res = await createdProject.save();

      return {
        id: res._id,
        ...project,
      };
    },
    async editProject(_, { ID, project }, { token }) {
      verifyToken(token);

      await ProjectModel.updateOne({ _id: ID }, project);

      return {
        id: ID,
        ...project,
      };
    },
    async createCompany(_, { company }, { token }) {
      verifyToken(token);

      const createdCompany = new CompanyModel({
        ...company,
      });

      const res = await createdCompany.save();

      return {
        id: res._id,
        ...company,
      };
    },
    async createTechnology(_, { technology }, { token }) {
      await verifyToken(token);

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
