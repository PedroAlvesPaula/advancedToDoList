import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function () {
    const userId = this.userId;
    if(!userId) return this.ready();

    return Meteor.users.find({ userId });
});