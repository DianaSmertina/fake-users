import { fakerEN_US, fakerDE, fakerRU, Faker } from "@faker-js/faker";

export interface IUser {
    userId: string;
    name: string;
    address: string;
    phone: string;
}

export class RandomUsers {
    static currentFaker: Faker;
    static currentPhoneFormat: { 1: string; 2: string };

    static fakers = {
        en_US: fakerEN_US,
        de: fakerDE,
        ru: fakerRU,
    };

    static phoneFormat = {
        en_US: {
            1: "+1 ### ### ####",
            2: "1 ### ### ####",
        },
        de: {
            1: "+49 ### ### ####",
            2: "00 ### ### ####",
        },
        ru: {
            1: "+7 9## ### ####",
            2: "8 9## ### ####",
        },
    };

    private setRegionSettings(region: string) {
        RandomUsers.currentFaker =
            RandomUsers.fakers[region as keyof typeof RandomUsers.fakers];
        RandomUsers.currentPhoneFormat =
            RandomUsers.phoneFormat[
                region as keyof typeof RandomUsers.phoneFormat
            ];
    }

    private setSeed(currentSeed: number) {
        RandomUsers.currentFaker.seed(currentSeed);
    }

    private getAddress() {
        const addresses = {
            1: `${RandomUsers.currentFaker.location.city()}, 
                ${RandomUsers.currentFaker.location.streetAddress(true)}`,
            2: `${RandomUsers.currentFaker.location.state()}, 
                ${RandomUsers.currentFaker.location.city()},
                ${RandomUsers.currentFaker.location.street()},
                ${RandomUsers.currentFaker.number.int({ min: 1, max: 200 })}`,
        };
        const randomIndex = RandomUsers.currentFaker.number.int({
            min: 1,
            max: 2,
        });
        return addresses[randomIndex as keyof typeof addresses];
    }

    private getPhoneNumber() {
        const randomIndex = RandomUsers.currentFaker.number.int({
            min: 1,
            max: 2,
        });
        const format =
            RandomUsers.currentPhoneFormat[
                randomIndex as keyof typeof RandomUsers.currentPhoneFormat
            ];
        return RandomUsers.currentFaker.phone.number(format);
    }

    private getUsers(amount: number) {
        const users: Array<IUser> = new Array(amount).fill("").map(() => {
            const user = {
                userId: RandomUsers.currentFaker.string.uuid(),
                name: RandomUsers.currentFaker.person.fullName(),
                address: this.getAddress(),
                phone: this.getPhoneNumber(),
            };
            return user;
        });
        return users;
    }

    public updateUsers(amount: number, region: string, currentSeed: number) {
        this.setRegionSettings(region);
        this.setSeed(currentSeed);
        return this.getUsers(amount);
    }
}