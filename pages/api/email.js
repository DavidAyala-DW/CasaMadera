import nodemailer from 'nodemailer'
import { getClient } from '@/lib/sanity.server'

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_TOKEN,
  },
})

transporter.verify().then(() => {
  console.log('Ready to send emails')
})

function makeid(length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

async function sendEmail(body) {
  let html = ''
  Object.entries(body).forEach(([key, value]) => {
    html += `<p> <b style="text-transform: capitalize">${key.replace(
      '_',
      ' '
    )}:</b> &nbsp; ${value.replace('_', ' ')} </p>`
  })

  const doc = {
    _type: 'emailsCasaMadera',
    title: `New message from ${body?.name}`,
    description: [
      ...Object.entries(body).map(([key, value]) => {
        return {
          _key: makeid(12),
          _type: 'block',
          children: [
            {
              _key: makeid(12),
              _type: 'span',
              marks: ['strong'],
              text: `${key
                .replace('_', ' ')
                .replace(key[0], key[0].toUpperCase())}`,
            },
            {
              _key: makeid(12),
              _type: 'span',
              marks: [],
              text: ` : ${value.replace('_', ' ')}`,
            },
          ],
          markDefs: [],
          style: 'normal',
        }
      }),
    ],
    location: body?.location,
  }

  try {
    const client = getClient(false)
    await client.create(doc)

    let to

    if (body?.option == 'press') {
      to = 'emma@noble33.com'
    } else if (
      body?.option == 'general_inquiry' ||
      body?.option == 'reservation'
    ) {
      to =
        body?.location === 'West Hollywood'
          ? 'info@thecasamadera.com'
          : 'infotor@thecasamadera.com'
    } else if (body?.option == 'careers') {
      to = 'info@noble33.com'
    } else if (body?.option == 'events_inquiry') {
      to = 'events@thecasamadera.com'
    }

    await transporter.sendMail({
      from: `"Messages (Casa Madera - ${body.location})" <${process.env.NODEMAILER_USER}>`, // sender address
      replyTo: body.email,
      to, // list of receivers
      subject: `Message from ${body.name}`, // Subject line
      html, // html body
    })

    return {
      status: 'successful',
      message: 'The email was sent.',
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'failed',
      message: 'The email cannot be sended',
    }
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader('Access-Control-Allow-Credentials', '')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, OPTIONS, DELETE'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok')
  }

  const {
    query: { type },
    method,
    body,
  } = req

  let currentType = type ?? 'send_email'

  switch (currentType) {
    case 'send_email':
      if (method === 'POST') {
        // const {email, variant_id} = body;
        const respose = await sendEmail(body)
        res.status(200).json(respose)
      } else {
        res.status(405).json({ status: 'failed', message: 'Invalid method' })
      }

      break

    default:
      res.status(404).json({ status: 'failed', message: 'Invalid request' })
      break
  }
}
