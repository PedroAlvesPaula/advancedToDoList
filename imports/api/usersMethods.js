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
    },
    async 'users.getUserInformations'(){
        if (!this.userId) throw new Meteor.Error('O usuário precisa estar logado para esta ação');

        const user = await Meteor.users.findOneAsync(this.userId);

        const date = user.profile.dateOfBirth;

        return {
            username: user.username,
            email: user.emails[0].address,
            dateOfBirth: date ? new Date(date).toLocaleDateString('pt-BR') : '',
            gender: user.profile.gender,
            companyWorks: user.profile.companyWorks,
            profileImage: user.profile.profileImage
        }
    }
});