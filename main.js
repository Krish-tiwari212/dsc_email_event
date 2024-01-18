import nodemailer from "nodemailer";
import fs from 'fs';
import Papa from 'papaparse';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "datascienceclubvitc@gmail.com",
      pass: "ejtzsozcfovvneyj",
    },
});

let users = [];

const data = fs.readFileSync('data.csv', 'utf8');
Papa.parse(data, {
  complete: (results) => {
    results.data.forEach(row => {
      const [name, email, password] = row;
      const user = { name, email, password };
      users.push(user);
    });
  }
});

console.log(users);
let count = 0;
for(let i=0; i<users.length; i++) {
  try{
    async function main() {
        const info = await transporter.sendMail({
          from: '"Data Science Club" <datascienceclubvitc@gmail.com>', // sender address
          to: users[i].email, // list of receivers
          subject: "Raiders Of The Lost Data Leaderboard Credentials", // Subject line
          html: `Dear <b>${users[i].name}</b>,<br><br> Your credentials for Raiders Of The Lost Data Leaderboard are:<br><br><b>Username</b>: ${users[i].email}<br><b>Password</b>: ${users[i].password}<br><br><a href="#">Here is the Leaderboard</a><br><br>Please keep the credentails confidential. If you have any questions or need assistance, feel free to reach out to us
          <br><br>Best Regards,<br><i>Data Science Club<br>(Web Development Team)<br>VIT Chennai</i>`, 
        });
      
        console.log("Message sent: %s", info.messageId);
        count+=1;
        if(i==users.length-1) console.log(count);
    }
      
    main().catch(console.error);
  }
  catch(err) {
    console.log(err);
    console.log(i);
  }
}