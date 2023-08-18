import { fakerEN_US, fakerDE, fakerRU, Faker, faker } from "@faker-js/faker";

export interface IUser {
    userId: string;
    name: string;
    address: string;
    phone: string;
}

export class RandomUsers {
    static currentFaker: Faker;
    static currentPhoneFormat: Array<string>;
    static currentAlphabets: string;

    static fakers = {
        en_US: fakerEN_US,
        de: fakerDE,
        ru: fakerRU,
    };

    static phoneFormat = {
        en_US: ["+1 ### ### ####", "1 ### ### ####"],
        de: ["+49 ### ### ####", "00 ### ### ####"],
        ru: ["+7 9## ### ####", "8 9## ### ####"],
    };

    static alphabets = {
        en_US: "abcdefghijklmnopqrstuvwxyz",
        de: "äöüßabcdefghijklmnopqrstuvwxyz",
        ru: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
    };

    private setRegionSettings(region: keyof typeof RandomUsers.fakers) {
        RandomUsers.currentFaker = RandomUsers.fakers[region];
        RandomUsers.currentPhoneFormat = RandomUsers.phoneFormat[region];
        RandomUsers.currentAlphabets = RandomUsers.alphabets[region];
    }

    private setSeed(currentSeed: number) {
        RandomUsers.currentFaker.seed(currentSeed);
    }

    private getAddress() {
        const maxHouseNumber = 200;
        const addresses = [
            `${RandomUsers.currentFaker.location.city()}, 
                ${RandomUsers.currentFaker.location.streetAddress(true)}`,
            `${RandomUsers.currentFaker.location.state()}, 
                ${RandomUsers.currentFaker.location.city()},
                ${RandomUsers.currentFaker.location.street()},
                ${RandomUsers.currentFaker.number.int({ min: 1, max: maxHouseNumber})}`,
        ];
        return RandomUsers.currentFaker.helpers.arrayElement(addresses);
    }

    private getPhoneNumber() {
        const format = RandomUsers.currentFaker.helpers.arrayElement(
            RandomUsers.currentPhoneFormat
        );
        return RandomUsers.currentFaker.phone.number(format);
    }

    private getUsers(amount: number, mistakes: number, page: number) {
        const users: Array<IUser> = new Array(amount).fill("").map(() => {
            const user = {
                userId: RandomUsers.currentFaker.string.uuid(),
                name: RandomUsers.currentFaker.person.fullName(),
                address: this.getAddress(),
                phone: this.getPhoneNumber(),
            };
            return user;
        });
        if (mistakes !== 0) return this.addMistakes(users, mistakes, page);
        return users;
    }

    private addMistakes(users: Array<IUser>, mistakes: number, page: number) {
        const mistakesAmount = Math.floor(mistakes);
        const lastMistakeChance = mistakes - mistakesAmount;
        const usersWithMistakes = users.map((user, i) => {
            faker.seed(page + i);
            for (let i = 1; i <= mistakes; i++) {
                this.addMistake(user);
            }
            const randomChance = faker.number.float();
            if (lastMistakeChance && randomChance <= lastMistakeChance) {
                this.addMistake(user);
            }
            return user;
        });
        return usersWithMistakes;
    }

    private deleteCharacter(word: string, index: number) {
        if (word.length <= 1) return word;
        return word.slice(0, index) + word.slice(index + 1);
    }

    private addCharacter(word: string, index: number) {
        const pattern = /^[0-9 +]*$/;
        let stringForAdding = RandomUsers.currentAlphabets;
        if (pattern.test(word)) {
            stringForAdding = "012456789";
        }
        return (
            word.slice(0, index) +
            faker.helpers.arrayElement([...stringForAdding]) +
            word.slice(index)
        );
    }

    private changeCharacters(word: string, index: number) {
        if (index === 0) {
            return word[1] + word[0] + word.slice(2);
        }
        const letter = word[index];
        const letterToLeft = word[index - 1];
        return (
            word.slice(0, index - 1) +
            letter +
            letterToLeft +
            word.slice(index + 1)
        );
    }

    private addMistake(user: IUser) {
        const mistakeFunction = faker.helpers.arrayElement([
            this.deleteCharacter,
            this.addCharacter,
            this.changeCharacters,
        ]);
        const userKey = faker.helpers.arrayElement([
            "name",
            "address",
            "phone",
        ]);
        const characterIndex = faker.number.int({
            min: 0,
            max: user[userKey as keyof typeof user].length - 1,
        });
        user[userKey as keyof typeof user] = mistakeFunction(
            user[userKey as keyof typeof user],
            characterIndex
        );
    }

    public updateUsers(
        amount: number,
        region: string,
        currentSeed: number,
        mistakes: number,
        page: number
    ) {
        this.setRegionSettings(region as keyof typeof RandomUsers.fakers);
        this.setSeed(currentSeed);
        return this.getUsers(amount, mistakes, page);
    }
}
