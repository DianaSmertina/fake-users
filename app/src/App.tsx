import { faker } from '@faker-js/faker';

function App() {
    const randomName = faker.person.fullName();
    return <>{`Hi, ${randomName}!`}</>
}

export default App;
