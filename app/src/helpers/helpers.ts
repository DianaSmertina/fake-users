import { faker } from "@faker-js/faker";

export interface IUser {
    userId: string;
    name: string;
    address: string;
    phone: string;
}

export function getUsers(amount: number) {
    // faker.seed(123);
    const users: Array<IUser> = new Array(amount).fill(1).map(() => {
        const user = {
            userId: faker.string.uuid(),
            name: faker.person.fullName(),
            address: faker.location.streetAddress(true),
            phone: faker.phone.number("+# ### ### ## ##"),
        };
        return user;
    });

    return users;
}
