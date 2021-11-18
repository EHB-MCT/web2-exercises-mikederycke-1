import axios from 'axios';
import * as fs from 'fs/promises';

let response = await axios.get('https://jsonplaceholder.typicode.com/comments');
let emails = {
    count: 0,
    list: []
}
for(let comment of response.data){
    //add to list
    emails.list.push(comment.email);
    // up a fancy counter
    emails.count++;
}
await fs.appendFile('emails.json', JSON.stringify(emails));
  