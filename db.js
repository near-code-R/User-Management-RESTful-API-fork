import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
const uri = process.env.URLDbs;
const client = new MongoClient(uri);
import { ResponseError } from "./error/responseError.js";

class DataBase {
    constructor() {
        this.connect = client.db('userManagement');
        this.userCollection = this.connect.collection('user');
    };
    get existsToken() {
        return this.userCollection.findOne({ token: { $exists: true } });
    };

    get #getUserCollection() {
        return this.userCollection.find().toArray()
    };
    async HashedPassword(pass) {
        return await bcrypt.hash(pass, 5);
    };
    async comparePassword(password, hasdedPasswords) {
        return await bcrypt.compare(password, hasdedPasswords)
    };
    async CreateDocs(body) {
        const { userName, password, confirmPassword, name } = body
        const resultCollectionUser = await this.#getUserCollection;
        if ((resultCollectionUser.find(doc => doc.name === name || doc.userName === userName))) {
            throw new ResponseError(400, 'User or UserName already exist');
        } else {
            const docs = {
                userName,
                password: await this.HashedPassword(password),
                name
            };
            const projection = {
                projection: {
                    name: 1,
                    userName: 1,
                    _id: 0
                }
            };
            await this.userCollection.insertOne(docs);
            const result = await this.userCollection.findOne({ name: name }, projection);
            return result;
        };
    };
    async checkLogin(body) {
        const { name, password } = body;
        const find = await this.userCollection.findOne({ name: name });
        if (find) {
            const comparePassword = await this.comparePassword(password, find?.password);
            if (comparePassword) {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(10, async (err, buf) => {
                        if (err) reject(err);
                        await this.userCollection.updateOne({ name: name }, { $set: { token: buf.toString('hex') } }, {
                            upsert: true
                        });
                        resolve(buf.toString("hex"));
                    });

                });
            } else throw new ResponseError(401, 'name or password incorrect');
        } else throw new ResponseError(401, 'name or password incorrect');
    };
    async getUserByToken(body) {
        const projection = {
            projection: {
                name: 1,
                userName: 1,
                _id: 0
            }
        }
        const find = await this.userCollection.findOne({ token: body }, projection)
        if (find) {
            return find
        }
        else throw new ResponseError(401, 'Token invalid')
    }
    async updateUser(body, token) {
        const { name, password } = body;
        const find = await this.userCollection.findOne({ token: token });
        if (find) {
            const comparePassword = await this.comparePassword(password, find.password)
            if (find.name !== name || !comparePassword) {
                const newHashed = await this.HashedPassword(password)
                await this.userCollection.updateOne({ token: token }, {
                    $set: { name: name, password: newHashed }
                });
                return `changes have been saved`
            } else return `no changes were made`
        } else throw new ResponseError(401, 'Token invalid');
    }
    async logOutUser(body) {
        const find = await this.userCollection.findOne({ token: body });
        if (find) {
            await this.userCollection.updateOne({ token: body }, { $unset: { token: null } });
            return `User logged out successfully`
        }
        else throw new ResponseError(401, 'Token invalid');
    }
}
class Contact extends DataBase {
    constructor() {
        super();
        this.count = 1;
    }
    async getContact(token) {
        const contact = await this.userCollection.findOne({ token: token });
        if (contact) return contact.contact;
        else throw new ResponseError(401, 'Token invalid');
    }
    async updateContact(body, token) {

        const { firts_name, last_name, phone_number, email } = body
        const getUserByToken = await this.getUserByToken(token);
        const docAddress = {
            idContact: this.count,
            firts_name,
            last_name,
            phone_number,
            email,
            owner: getUserByToken.name
        };
        if (getUserByToken) {
            await this.userCollection.updateOne({ name: getUserByToken.name }, { $set: { contact: docAddress } });
            const result = await this.userCollection.findOne({ name: getUserByToken.name }, { projection: { contact: 1, _id: 0 } });
            this.count++;
            return result
        } else throw new ResponseError(400, 'token invalid')
    }
    async deleteContact(token) {
        const contact = await this.userCollection.deleteOne({ token: token }, { $unset: { contact: null } });
        if (contact) return ` deleted contact successfully`;
        else throw new ResponseError(401, 'Token invalid');
    }
}

class Address extends Contact {
    constructor() {
        super();
        this.addressId = 1;
    }
    async getAddress(token) {
        const contact = await this.userCollection.findOne({ token: token });
        if (contact) return contact.address;
        else throw new ResponseError(401, 'Token invalid');
    }
    async updateAddress(body, token) {

        const { street, city, province, country, kodePos } = body
        const getUserByToken = await this.getUserByToken(token);
        const docAddress = {
            addressId: this.addressId,
            street,
            city,
            province,
            country,
            kodePos,
            owner: getUserByToken.name
        };
        if (getUserByToken) {
            await this.userCollection.updateOne({ name: getUserByToken.name }, { $set: { address: docAddress } });
            const result = await this.userCollection.findOne({ name: getUserByToken.name }, { projection: { address: 1, _id: 0 } });
            this.addressId++;
            return result
        } else throw new ResponseError(400, 'token invalid')
    }
    async deleteAddress(token) {
        const contact = await this.userCollection.deleteOne({ token: token }, { $unset: { address: null } });
        if (contact) return ` deleted address successfully`;
        else throw new ResponseError(401, 'Token invalid');
    }
}
const dataBase = new DataBase();
const contact = new Contact();
const address = new Address();
export {
    dataBase,
    contact,
    address
}
process.on("SIGINT", async () => {
    console.log("Mongoose connection disconnected");
    await client.close();
})
