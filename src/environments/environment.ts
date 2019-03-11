// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const target = 'DEV';
const app = {
  DEV: {
    brand: {
      name: 'Fortune Boilerplate',
      logo: './assets/images/logo.png',
      copyright: 'Copyright &copy; ' + new Date().getFullYear()
    },
    mailer: {
      bug: 'bug@domain.com',
      info: 'info@domain.com',
      contact: 'contact@domain.com',
    },
    error: {
      showErrorDialog: false,
      showToaster: true,
      title: 'Something went wrong!',
      retryMessage: `We're trying to fix the problem, it might take a few seconds... Please try after sometime.`,
      errorMessage: `Oops... Looks like something went wrong, You can write yor query to us we will help you in solving this issue.`
    },
    baseAuth: {
      username: 'testInstance',
      password: '2k121101_MCPL'
    },
    // baseURL: 'http://192.168.6.218:8080/oauth-service/api/molcon/',
    baseURL: 'http://192.168.10.70:8080/oauth-service/api/molcon/',
  }
};

export const environment = {
  production: false,
  app: app[target]
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
