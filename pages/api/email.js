import nodemailer from "nodemailer";
import { getClient } from '@/lib/sanity.server'

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: "luis@dango.digital",
    pass: "ibqudfdyjkpazbku",
  },
});

transporter.verify().then( () => {
  console.log("Ready to send emails");
})

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function sendEmail(body){

  let html = "";
  Object.entries(body).forEach( ([key,value]) => {
    html += `<p> <b style="text-transform: capitalize">${key.replace('_', ' ')}:</b> &nbsp; ${value.replace('_', ' ')} </p>`
  })

  const doc = {
    _type: 'emailsCasaMadera',
    title: `New message from ${body?.name}`,
    description: [
      ...Object.entries(body).map( ([key,value]) => {
        return{
          "_key": makeid(12),
          "_type": "block",
          "children": [
              { 
                "_key": makeid(12),
                "_type": "span",
                "marks": ["strong"],
                "text": `${ key.replace('_', ' ').replace(key[0], key[0].toUpperCase()) }`
              },
              { 
                "_key": makeid(12),
                "_type": "span",
                "marks": [],
                "text": ` : ${value.replace('_', ' ')}`
              }
          ],
          "markDefs": [],
          "style": "normal"
        }
      })
    ],
    location: body?.location
  }

  try {

    const client = getClient(false);
    await client.create(doc);

    if(body?.option == "press"){

      await transporter.sendMail({
        from: `"New Message from ${body?.name}" <luis@dango.digital>`, // sender address
        to: "emma@noble33.com", // list of receivers
        subject: "New Message", // Subject line
        html: html, // html body
      });

    }

    if(body?.option == "general_inquiry" || body?.option == "reservation"){

      await transporter.sendMail({
        from: `"New Message from ${body?.name}" <luis@dango.digital>`, // sender address
        to: "info@thecasamadera.com", // list of receivers
        subject: "New Message", // Subject line
        html: html, // html body
      });

    }
    
    if(body?.option == "careers"){
      await transporter.sendMail({
        from: `"New Message from ${body?.name}" <luis@dango.digital>`, // sender address
        to: "info@noble33.com", // list of receivers
        subject: "New Message", // Subject line
        html: html, // html body
      });
    }

    if(body?.option == "events_inquiry"){
      await transporter.sendMail({
        from: `"New Message from ${body?.name}" <luis@dango.digital>`, // sender address
        to: "events@thecasamadera.com", // list of receivers
        subject: "New Message", // Subject line
        html: html, // html body
      });
    }  

    return {
      "status" : "successful",
      "message": "The email has been sended"
    }

  } catch (error) {

    console.log(error);
    return {
      "status" : "failed",
      "message": "The email cannot be sended"
    }  

  }

}

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', "");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }
  
  const {
    query: {type},
    method,
    body
  } = req;

  let currentType = type ?? "send_email";

  switch (currentType) {

    case 'send_email':

      if(method === "POST"){
        
        // const {email, variant_id} = body;
        const respose = await sendEmail(body);
        res.status(200).json(respose)
    
      }else{
        res.status(405).json({status: "failed", message: "Invalid method"});
      }

      break;

  default:
    res.status(404).json({status: "failed", message: "Invalid request"});
    break;

  }
  
}