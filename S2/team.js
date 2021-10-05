export default class Team {
    constructor(){
        this.teamName = 'Kanto';
        this.trainer = 'Ash';
        this.roster = ['Bulbasaur'];
    }

    describe(){
        return `Team ${this.teamName} with trainer ${this.trainer}
        has the following pokemon: ${[...this.roster]}`;
    }

}
