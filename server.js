const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/food', (req, res) => {
    const { sessionId, phoneNumber, text } = req.body;
    let response = '';
    const inputs = text.split('*');
    const lang = inputs[0]; // 1 = English, 2 = Kinyarwanda

    if (text === '') {
        // Level 1 - Language selection
        response = `CON Welcome to favourite food app, please choose language,\nMurakaza neza kuri favourite food app, Hitamo ururimi,\n1. English\n2. Kinyarwanda`;
    } else if (inputs.length === 1) {
        // Level 2 - Choose food
        if (lang === '1') {
            response = `CON Select the dish you like most:\n1. Chips and Chicken\n2. Beef and green Plantain\n3. Rice and beans\n4. Cassava Bread and greens\n5. Back`;
        } else if (lang === '2') {
            response = `CON Hitamo ibiryo Ukunda:\n1. Ifiriti n’Inkoko\n2. Agatogo\n3. Umuceri n’ibishyimbo\n4. Ubugari n’isombe\n5. Gusubira inyuma`;
        } else {
            response = 'END Invalid language selection.';
        }
    } else if (inputs.length === 2) {
        const foodChoice = inputs[1];

        // Level 3 - Show message based on selection
        if (lang === '1') {
            switch (foodChoice) {
                case '1':
                    response = 'END Your favourite food is Chips and Chicken, that is so unhealthy, do not eat it regularly.';
                    break;
                case '2':
                    response = 'END Your favourite food is Beef and green Plantain, that is healthy, as long as you eat it less than 5 times a week.';
                    break;
                case '3':
                    response = 'END Your favourite food is Rice and beans. That is healthy, as long as you drink a lot of water and eat some green vegetables.';
                    break;
                case '4':
                    response = 'END Your favourite food is Cassava Bread and greens, that is healthy. Verify that there is not too much oil in the greens.';
                    break;
                case '5':
                    response = `CON Welcome to favourite food app, please choose language,\nMurakaza neza kuri favourite food app, Hitamo ururimi,\n1. English\n2. Kinyarwanda`;
                    break;
                default:
                    response = 'END Invalid selection. Please try again.';
            }
        } else if (lang === '2') {
            switch (foodChoice) {
                case '1':
                    response = 'END Ibiryo ukunda ni ifiriti n’inkoko, Si byiza ku buzima ntukabirye buri kenshi.';
                    break;
                case '2':
                    response = 'END Ibiryo ukunda ni agatogo ni byiza ku buzima iyo ubiriye utarengeje icuro 5 mu cyumweru.';
                    break;
                case '3':
                    response = 'END Ibiryo ukunda ni umuceri n’ibishyimbo. Ni byiza ku buzima mu gihe wanyweye amazi menshi ukarya n’imboga.';
                    break;
                case '4':
                    response = 'END Ibiryo ukunda ni ubugari n’isombe ni byiza ku ubuzima, ugenzure neza niba isombe ritarimo amavuta menshi.';
                    break;
                case '5':
                    response = `CON Welcome to favourite food app, please choose language,\nMurakaza neza kuri favourite food app, Hitamo ururimi,\n1. English\n2. Kinyarwanda`;
                    break;
                default:
                    response = 'END Igisubizo si cyo. Ongera ugerageze.';
            }
        } else {
            response = 'END Invalid language selection.';
        }
    } else {
        response = 'END Invalid input. Please try again.';
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`✅ Favourite Food USSD App running on http://localhost:${PORT}/food`);
});
