const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  sanitySiteId: 'casaMadera',
  sanityLocationDocType: 'locations',
  sanityRouteDocType: 'routesCasaMadera',
  sanityEventDocType: 'eventCasaMadera',
  sanityPrivateEventsDocType: 'eventsCasaMadera',
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerToken: process.env.NODEMAILER_TOKEN,
  mailchimpApiKey: process.env.MAILCHIMP_API_KEY,
  mailchimpListId: process.env.MAILCHIMP_LIST_ID,
  testEmailTo: process.env.TEST_EMAIL_TO,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
}

export function getConfigValue(key, required = true) {
  if (required && typeof config[key] === 'undefined') {
    throw new Error(
      `Missing configuration for '${key}'. You probably forgot to set an env var.`
    )
  }

  return config[key]
}
