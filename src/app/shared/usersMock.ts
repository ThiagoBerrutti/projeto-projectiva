import { User } from "./models/user";

export class UsersMock
{
    public static users: User[] = [
        User.factory('user1', '12345', 1, 'Arthur','Aguiar','111.111.111-11','1111111111'),
        User.factory('user2', '12345', 2, 'Bob','Burnquist','222.222.222-22','2222222222'),
        User.factory('user3', '12345', 3, 'Charles','Chaplin','333.333.333-33','3333333333'),
        User.factory('user4', '12345', 4, 'Donald','Duck','444.444.444-44','4444444444'),
        User.factory('user5', '12345', 5, 'Edward','Elric','555.555.555-55','5555555555')
    ];
}