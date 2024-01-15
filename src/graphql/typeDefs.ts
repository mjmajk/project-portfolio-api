export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  input ProjectInput {
    name: String
    description: String
    imageUrl: String
    length: Int
    shortDescription: String
    slug: String
    companyId: ID!
    technologiesIds: [ID!]
  }

  input CompanyInput{
    name: String
  }

  input TechnologyInput{
    name: String
  }

  type Technology {
    id: ID!
    name: String
  }


  type Company {
    id: ID!
    name: String
  }

  type Project {
    id: ID!
    name: String
    company: Company
    technologies: [Technology!]!
    description: String
    imageUrl: String
    length: Int
    shortDescription: String
    slug: String
  }

  type Query {
    project(slug: String): Project!
    projects: [Project!]!
    company(ID: ID!): [Company!]!
    companies: [Company!]!
    technologies: [Technology!]!
    technology(ID: ID!): [Technology!]!
  }

  type Mutation {
    createProject(project: ProjectInput!): Project!
    editProject(ID: ID!, project: ProjectInput!): Project!
    createCompany(company: CompanyInput!): Company!
    createTechnology(technology: TechnologyInput!): Technology!
  }
`;
