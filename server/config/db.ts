import { connect } from 'mongoose'

const mongoURI: undefined | string = process.env.MONGO_URI
console.log(mongoURI)

const configDB = () => {
    connect(String(mongoURI), {
        autoIndex: true
    }, (err) => {
        if(err) throw err
        console.log('Connected to db')
    })
}

export default configDB