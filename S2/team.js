export default class Team {
    constructor(){
        this.teamName = 'Kanto';
        this.trainer = 'Ash';
        this.roster = [];
    }

    describe(){
        //Rework with objects
        let names = [];
        this.roster.forEach(ele => names.push(ele.name));

        return `Team ${this.teamName} with trainer ${this.trainer}
        has the following pokemon: ${[...names]}`;
    }

    addPokemon(p){
        let message = {
            value: '',
            type: 'ERROR' //ERROR or SUCCES
        };
        //Validations
        // It can only be allowed if the team has less than 6 pokemon. 
        //    Otherwise return a specific error: "The roster is full!"
        // The pokemon cannot be in the roster twice. 
        //    Return a fitting error: "This pokemon is already part of your roster"
        // On succes, you return a message: "The pokemon <name> has been succesfully added to the team!"
        //     replace <name> with the pokemon name that just got added

        if(this.roster.length == 6){
            message.value = 'The roster is full!';
            return message;
        }

        if(this.roster.find( ele => ele.id == p.id)){
            message.value = 'This pokemon is already part of your roster!';
            return message;
        }

        // Add to roster if succesfull
        this.roster.push(p);
        message.value = `The pokemon ${p.name} has been succesfully added to the team!`;
        message.type = 'SUCCES';
        return message;
    }

}
