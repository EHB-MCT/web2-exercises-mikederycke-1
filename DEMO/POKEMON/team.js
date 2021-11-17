export default class Team {
    constructor(){
        this.teamname = 'Kanto';
        this.trainer = 'Ash';
        this.roster = [];
    }

    describe(){
        let names = [];
        this.roster.forEach(p => names.push(p.name));

        return `<p>Team ${this.teamname} 
        with trainer ${this.trainer}
        has the following pokemon: ${[...names]} </p>`;
    }

    addPokemon(p){
        let message = {
            value: '',
            type: 'ERROR' //SUCCESS or ERROR
        }

        if(this.roster.length == 6){
            message.value = 'The roster is full!';
            return message;
        }

        if(this.roster.find( ele => ele.id == p.id)){
            message.value = 'This pokemon is already part of your roster!';
            return message;
        }

        //SUCCESS
        this.roster.push(p);
        message.value = `The pokemon ${p.name} has been successfully added to the team!`;
        message.type = 'SUCCES';
        return message;

    }

}