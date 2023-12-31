const { ObjectId } = require("mongodb");
const { db } = require("../db");

const messageCollection = db.collection('messages')
const serialize = (doc) => {
    doc._id = doc._id.toString()
    return doc
}
const getMessageById = async ({ _id }) => {
    try {
        const message = await messageCollection.findOne(new ObjectId(_id))
        return serialize(message);
    } catch (e) {
        console.log(`Error Getting Message ${e}`)
    }
    return null;
}
const getAllMessages = async () => {
    try {
        const messages = messageCollection.find({})
        return (await messages.toArray()).map(doc => {
            return serialize(doc)
        });
    } catch (e) {
        console.log(`Error Getting Messages ${e}`)
    }
    return []
}

const writeMessage = async ({ messageObj }) => {
    try {
        const inserted_message = await messageCollection.insertOne(messageObj)
        return serialize({
            ...messageObj,
            _id: inserted_message.insertedId
        })
    } catch (e) {
        console.log(`Error Writing Messages ${e}`)
    }
}
const updateMessage = async ({ _id, messageObj }) => {
    try {
        await messageCollection.updateOne({ _id: new ObjectId(_id) }, { $set: { ...messageObj } })
        return {
            ...messageObj,
            _id: _id
        }
    } catch (e) {
        console.log(`Error Writing Messages ${e}`)
    }
}
module.exports = {
    writeMessage,
    updateMessage,
    getAllMessages,
    getMessageById
}