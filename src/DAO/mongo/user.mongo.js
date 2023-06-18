import userModel from "../models/user.model.js";

export default class UserDaoMongo {
    constructor() {
        this.userModel = userModel
    }

    get = async (limit = 10, page = 1) => await this.userModel.paginate({}, { limit, page, lean: true })

    async getById(uid) {
        return await this.userModel.findOne({ _id: uid })
    }

    async getByEmail(uEmail) {
        return await this.userModel.findOne({ email: uEmail })
    }

    create = async (newUser) => {
        return await this.userModel.create(newUser)
    }

    async update(uid, userUpdate) {
        return await this.userModel.findOneAndUpdate({ _id: uid }, userUpdate)
    }
    async delete(uid) {
        return await this.userModel.findOneAndDelete({ _id: uid })
    }


}
