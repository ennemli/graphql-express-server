const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { run } = require('./db')
const { writeMessage, updateMessage, getAllMessages, getMessageById } = require('./controllers/messages')
const port= process.env.PORT || 3000;
const schema = buildSchema(`

    input MessageInput{
        message:String!
    }
    type Message{
        _id:String
        message:String
    }
    type Query{
        getMessageById(_id:String!):Message
        getAllMessages:[Message!]!
    }
    type Mutation{
        writeMessage(messageObj:MessageInput!):Message!
        updateMessage(_id:String!,messageObj:MessageInput!):Message!
    }
    
    `

)

const root = {
    updateMessage: async ({ _id, messageObj }) => {
        return await updateMessage({ _id, messageObj })
    },
    getAllMessages: () => {
        return getAllMessages()
    },
    getMessageById: async ({ _id }) => {
        return await getMessageById({ _id })
    },
    writeMessage: async ({ _id, messageObj }) => {
        return await writeMessage({ _id, messageObj })
    },

}
const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))
run().catch(console.dir)
app.listen(port)
console.log(` GraphQL server running at http://localhost:${port}/graphql`)
