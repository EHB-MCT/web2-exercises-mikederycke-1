class Order {
    constructor(){
        this.enigmaEvent = 'Spaghettifestijn';
    }
    calculatePrice(){
        
    }
}

let order = new Order();
order.enigmaEvent;

let something = {
    enigmaEvent: 'BBQ',

}



















class Team {
    constructor(teamname){
        this.teamname = teamname;
        this.trainername = 'Ash';
        this.pokemonTeam = [];
    }

    describe(){
        return `${this.teamname} with trainer ${this.trainername}
        has these pokemon: ${[...this.pokemonTeam]}`;
    }
}
export default Team;
