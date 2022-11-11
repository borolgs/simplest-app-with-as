const BASE_URL = `${__webpack_public_path__}api/v1/sap`;

const {
  location: { protocol, host },
} = window.document;

export const config = {
  api: {
    config: `${BASE_URL}/config`,
  },
  remotes: {
    remote1: {
      remoteApp: 'remote1',
      remoteComponent: './Remote',
      remoteComponentName: 'Remote 1',
      remoteEntryUrl: `/sap/bc/ui5_ui5/sap/zhr_d0921_covid/`,
      // remoteEntryUrl: `${protocol}//localhost:8081/remoteEntry.js`,
    },
    vacationVaccinePath: {
      remoteApp: 'vacationVacine',
      remoteComponent: './Remote',
      remoteComponentName: 'Vacation Vaccine',
      // remoteEntryUrl: `/sap/bc/ui5_ui5/sap/zhr_d0921_covid/`,
      remoteEntryUrl: `${protocol}//localhost:8081/remoteEntry.js`,
    },
  },
};

const vacationDonorPath = {
  prod: '/sap/bc/ui5_ui5/sap/zhr_d0909_donor/',
  localhost: 'http://localhost:3001/',
};
const leaveRequestPath = {
  prod: '/sap/bc/ui5_ui5/sap/zhr_d0202_vacb/',
  localhost: 'http://localhost:3000/',
};

const dismissalApplicationPath = {
  prod: '/sap/bc/ui5_ui5/sap/zhr_as_d0901/',
  localhost: 'http://localhost:3001',
};

const bevPath = {
  prod: '/sap/bc/ui5_ui5/sap/zbsp_d0917_bev/',
  localhost: 'http://localhost:8001/',
};

export type Config = typeof config;
