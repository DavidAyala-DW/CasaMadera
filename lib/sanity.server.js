import { createClient } from 'next-sanity'
import { config } from './sanity-config'

const configObject = {
  ...config,
  token: process.env.SANITY_API_TOKEN ?? "skyviGkh02bceUhFpApkppfS4Xnnrw9DvVfHyYlapscbsAR1KKEEh5GjXe161W1p8UdQwgc38yqoRBP68E7ygLOlMtsT2g9TckLkC54o6hkwzDEMlVQKO3LIngLhswlNEWBOqEYW7Mtsoyru6BAyN2WkEysT77GRiLEWlqB4yuugEnIVIFyd",
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(configObject)

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN ?? "skyviGkh02bceUhFpApkppfS4Xnnrw9DvVfHyYlapscbsAR1KKEEh5GjXe161W1p8UdQwgc38yqoRBP68E7ygLOlMtsT2g9TckLkC54o6hkwzDEMlVQKO3LIngLhswlNEWBOqEYW7Mtsoyru6BAyN2WkEysT77GRiLEWlqB4yuugEnIVIFyd",
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient
