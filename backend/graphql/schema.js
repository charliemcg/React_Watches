const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        address: String!
        phone: String
        admin: Boolean!
    }
    type UserResponse {
        success: Boolean!
        token: String!
    }
    type Watch {
        _id: ID!
        brand: String!
        model: String!
        case: String
        bracelet: String
        dial: String
        diameter: String
        movement: String
        price: Float!
        description: String
        inStock: Boolean!
        image: String!
    }
    type Complication {
        date: Boolean!,
        annualCalendar: Boolean!,
        perpetualCalendar: Boolean!,
        chronograph: Boolean!,
        gmt: Boolean!,
        worldTime: Boolean!,
        minuteRepeater: Boolean!,
        moonPhase: Boolean!,
        tourbillon: Boolean!,
        powerReserve: Boolean!,
    }
    input UserInput {
        firstname: String!
        lastname: String!
        email: String!
        address: String!
        password: String!
        password2: String!
        phone: String
    }
    input WatchInput {
        brand: String!
        model: String!
        case: String
        bracelet: String
        dial: String
        diameter: String
        movement: String
        price: Float!
        description: String
        inStock: Boolean!
        image: String!
    }
    type RootQuery {
        watches(watchBrand: String!): [Watch!]!
        watch(watchId: String!): Watch!
        signIn(email: String!, password: String!): UserResponse!
    }
    type RootMutation {
        createWatch(watchInput: WatchInput): Watch
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
