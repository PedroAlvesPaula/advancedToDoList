import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'; 

Meteor.methods({
    'users.insertUser'(doc){
        const {
        email,
        password,
        username,
        dateOfBirth,
        gender,
        companyWorks,
        profileImage
        } = doc;

        return Accounts.createUser({
        email,
        username,
        password,
        profile: {
            dateOfBirth,
            gender,
            companyWorks,
            profileImage
        }})
    },
    'users.updateImage'({ imgBase64 }){
        checkboxClasses(imgBase64, String);

        const userId = this.userId;

        return Meteor.users.updateAsync(userId, {profileImg: imgBase64});
    }
});