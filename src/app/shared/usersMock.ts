import { Client } from "./models/client";
import { UserWithClients } from "./models/user-with-clients";

export class UsersMock
{
    public static users: UserWithClients[] = [
        UserWithClients.factory('user1', '12345', 'Arthur','Aguiar','111.111.111-11','1111111111', ['client1', 'client2', 'client3']),
        UserWithClients.factory('user2', '12345', 'Bob','Burnquist','222.222.222-22','2222222222',  ['client1', 'client2', 'client3']),
        UserWithClients.factory('user3', '12345', 'Charles','Chaplin','333.333.333-33','3333333333',  ['client1', 'client2', 'client3']),
        UserWithClients.factory('user4', '12345', 'Donald','Duck','444.444.444-44','4444444444',  ['client1', 'client2', 'client3']),
        UserWithClients.factory('user5', '12345', 'Edward','Elric','555.555.555-55','5555555555',  ['client1', 'client2', 'client3'])
    ];

    public static clients: Client[] = [
        Client.factory('client1', '12345', 'Alex','Alba','11122233344','5566778899'),        
        Client.factory('client2', '12345', 'Bernard','Bereson','22233344455','6677889900'),
        Client.factory('client3', '12345', 'Christopher','Columbus','55566677788','7788990011'),
        Client.factory('client4', '12345', 'David','Dawson','44444444400','4444444400'),
        Client.factory('client5', '12345', 'Ethan','Erwin','55555555500','5555555500')
    ];
}