const config = {
  sanitySiteId: process.env.SANITY_SITE_ID,
  sanityLocationDocType: process.env.SANITY_LOCATION_DOC_TYPE,
  sanityRouteDocType: process.env.SANITY_ROUTE_DOC_TYPE,
  sanityEventDocType: process.env.SANITY_EVENT_DOC_TYPE,
  sanityPrivateEventsDocType: process.env.SANITY_PRIVATE_EVENTS_DOC_TYPE,
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
