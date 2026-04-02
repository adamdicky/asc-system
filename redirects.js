const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  //Blocking payload default login, change to /login
  const blockAdminLogin = {
    source: '/admin/login',
    destination: '/login',
    permanent: true, //HTTP 308 permanent redirect
  }

  const redirects = [internetExplorerRedirect, blockAdminLogin]

  return redirects
}

export default redirects
