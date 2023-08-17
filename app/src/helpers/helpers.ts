import { fakerEN_US, fakerDE, fakerRU } from "@faker-js/faker";

export interface IUser {
    userId: string;
    name: string;
    address: string;
    phone: string;
}

export function getUsers(amount: number, region: string, currentSeed: number) {
    const faker = {
        en_US: fakerEN_US,
        de: fakerDE,
        ru: fakerRU,
    };

    Object.values(faker).forEach((localeFaker) => {
        localeFaker.seed(currentSeed);
    });

    const users: Array<IUser> = new Array(amount).fill("").map(() => {
        const user = {
            userId: faker[region as keyof typeof faker].string.uuid(),
            name: faker[region as keyof typeof faker].person.fullName(),
            address:
                faker[region as keyof typeof faker].location.streetAddress(
                    true
                ),
            phone: faker[region as keyof typeof faker].phone.number(
                "+# ### ### ## ##"
            ),
        }; //refactor
        return user;
    });

    return users;
}
