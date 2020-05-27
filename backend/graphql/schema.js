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
    type SignInErrors {
        email: String
        password: String
    }
    type SignUpErrors {
        firstname: String
        lastname: String
        email: String
        password: String
        address: String
        phone: String
    }
    type SignInResponse {
        success: Boolean!
        token: String
        errors: SignInErrors!
    }
    type SignUpResponse {
        success: Boolean!
        errors: SignUpErrors!
    }
    type WatchErrors {
        brand: String
        model: String
        housing: String
        bracelet: String
        dial: String
        diameter: String
        movement: String
        price: String
        description: String
        image: String
    }
    type WatchResponse {
        success: Boolean!
        errors: WatchErrors!
    }
    type Watch {
        _id: ID!
        brand: String!
        model: String!
        housing: String
        bracelet: String
        dial: String
        diameter: String
        movement: String
        price: String!
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
        housing: String
        bracelet: String
        dial: String
        diameter: String
        movement: String
        price: String!
        description: String
        inStock: Boolean!
        image: String!
    }
    type RootQuery {
        watches(watchBrand: String!): [Watch!]!
        watch(watchId: String!): Watch!
        signIn(email: String!, password: String!): SignInResponse!
    }
    type RootMutation {
        createWatch(watchInput: WatchInput): WatchResponse!
        signUp(userInput: UserInput): SignUpResponse!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
