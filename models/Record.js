import { DataTypes } from "sequelize";
import db from "../database/db.js";
import UserContact from './UserContact.js'

const Record = db.define('tb_record', {
    record_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_contact_id: {
        type: DataTypes.INTEGER,
        references:{
            model: UserContact,
            key: "user_contact_id"
        }
    },
})

export default Record;