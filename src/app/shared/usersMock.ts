import { Client } from "./models/client";
import { UserWithClients } from "./models/user-with-clients";

export class UsersMock
{
    public static users: UserWithClients[] = [
        UserWithClients.factory('user1', '12345', 1, 'Arthur','Aguiar','111.111.111-11','1111111111'),
        UserWithClients.factory('user2', '12345', 2, 'Bob','Burnquist','222.222.222-22','2222222222'),
        UserWithClients.factory('user3', '12345', 3, 'Charles','Chaplin','333.333.333-33','3333333333'),
        UserWithClients.factory('user4', '12345', 4, 'Donald','Duck','444.444.444-44','4444444444'),
        UserWithClients.factory('user5', '12345', 5, 'Edward','Elric','555.555.555-55','5555555555')
    ];

    public static clients: Client[] = [
        Client.factory('client1', '12345', 6, 'Alex','Alba','111.111.111-00','1111111100'),        
        Client.factory('client2', '12345', 7, 'Bernard','Bereson','222.222.222-00','2222222200'),
        Client.factory('client3', '12345', 8, 'Christopher','Columbus','333.333.333-00','3333333300'),
        Client.factory('client4', '12345', 9, 'David','Dawson','444.444.444-00','4444444400'),
        Client.factory('client5', '12345', 10, 'Ethan','Erwin','555.555.555-00','5555555500')
    ];
}