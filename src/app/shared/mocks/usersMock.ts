import { Client } from "../models/client";
import { UserWithClients } from "../models/user-with-clients";

export class UsersMock
{
    public static users: UserWithClients[] = [
        UserWithClients.factory('user1', '12345', 'Arthur','Aguiar','11111111111','1111111111', ['client1', 'client2', 'client3']),
        UserWithClients.factory('user2', '12345', 'Bob','Burnquist','22222222222','2222222222',  ['client2', 'client3', 'client4']),
        UserWithClients.factory('user3', '12345', 'Charles','Chaplin','33333333333','3333333333',  ['client3', 'client5', 'client4']),
        UserWithClients.factory('user4', '12345', 'Donald','Duck','44444444444','4444444444',  ['client4', 'client5', 'client1']),
        UserWithClients.factory('user5', '12345', 'Edward','Elric','55555555555','5555555555',  ['client5', 'client2', 'client1'])
    ];

    public static clients: Client[] = [
        Client.factory('client1', '12345', 'Alex','Alba','11122233344','5566778899',['user1','user4','user5']),        
        Client.factory('client2', '12345', 'Bernard','Bereson','22233344455','6677889900',['user1','user2','user5']),
        Client.factory('client3', '12345', 'Christopher','Columbus','55566677788','7788990011',['user1','user2','user3']),
        Client.factory('client4', '12345', 'David','Dawson','44444444400','4444444400',['user2','user3','user4']),
        Client.factory('client5', '12345', 'Ethan','Erwin','55555555500','5555555500',['user3','user4','user5'])
    ];
}