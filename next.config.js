/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // enable experimental mode for app dir(for server components) bcoz it is still in beta mode
  experimental:{
    appDir: true,
  },
}
