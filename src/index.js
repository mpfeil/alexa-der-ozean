'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "de-DE": {
        "translation": {
            "FACTS": [
                '71 % der Erdoberfläche sind von Meeren bedeckt.',
                'Die fünf Ozeane der Erde: Arktischer Ozean, Atlantischer Ozean, Indischer Ozean, Pazifischer Ozean, Antarktischer Ozean.',
                'Der Mond ist besser erforscht als die Weltmeere (nur 1% der Tiefsee sind erforscht).',
                'Der tiefste Punkt der Tiefsee ist der Marianengraben mit ca. 11 km.',
                'Der größte Meeresbewohner ist der Blauwal (bis zu 33,6 m lang und 200 t schwer).',
                '31,7 % der Weltmeere sind 4000 bis 5000 m tief.',
                'Etwa 6,4 Mio. Tonnen Plastikmüll befinden sich derzeit in den Ozeanen.',
                '90% der Vulkane auf der Erde befinden sich Unterwasser, sogenannte Schwarze Raucher, die Minerale aus dem Meeresboden lösen.',
                'Das Meerwasser hat einen Salzgehalt von durchschnittlich 3,5 %.',
                'Das Meer produziert ca. 70 % des Sauerstoffs, den die Menschen atmen und ist damit einer der bedeutendsten Faktoren, die Leben überhaupt möglich machen.',
                'Im Meer leben rund 250.000 verschiedene Tierarten.',
                'Quallen bevölkern das Meer bereits seit mehr als 500 Mio. Jahren'
            ],
            "SKILL_NAME" : "Der Ozean",
            "GET_FACT_MESSAGE" : "Hier sind deine Fakten: ",
            "HELP_MESSAGE" : "Du kannst sagen, „Nenne mir einen Fakt über den Ozean“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?",
            "HELP_REPROMPT" : "Wie kann ich dir helfen?",
            "STOP_MESSAGE" : "Auf Wiedersehen!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};