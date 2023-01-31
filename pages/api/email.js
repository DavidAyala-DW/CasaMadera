import nodemailer from "nodemailer";

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

async function sendEmail(body){

  let html = "";
  Object.entries(body).forEach( ([key,value]) => {
    html += `<p> <b style="text-transform: capitalize">${key.replace('_', ' ')}:</b> &nbsp; ${value} </p>`
  })
  
  console.log(html);

  try {

    await transporter.sendMail({
      from: '"New Message" <luis@dango.digital>', // sender address
      to: "luis@dango.digital,luis.zanabria2@unmsm.edu.pe,emma@noble33.com", // list of receivers
      subject: "New Message", // Subject line
      html: html, // html body
    });
  
    return {
      "status" : "successful",
      "message": "The email has been sended"
    }

  } catch (error) {

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