const { ObjectID, ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.contact = client.db().collection("contacts");
    }

    extractContactData(payload){
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };

        Object.keys(contact).forEach(
            (key) => contact[key] == undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload){
        const contact = this.extractContactData(payload);
        const result = await this.contact.findOneAndUpdate(
            contact, 
            { $set: {favorite: contact.favorite == true }},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    async find(filter){
        const curosr = await this.Contact.find(filter);
        return await curosr.toArray();
    }

    async findbyId(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isvalid(id) ? new ObjectId(id) : null,
        });
    }

    async findByName(name){
        return await this.fiind({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async update(id, payload){
        const filter = {
            _id: objectId.isValid (id) ? new objectId (id) : null ,
        };
        const update = this.extractConactData ( payload ) ;
        const result = await this . Contact.findoneAndupdate (
            filter ,
            { $set : update } ,
            { returnDocument : "after" }
        );
        return result.value;
    }


    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite(){
        return await this.find({ favorite: true});
    }

    async deleteAll(){
        const result = await this.Contact.deleteMany({});
    }

}

module.exports = ContactSerice;