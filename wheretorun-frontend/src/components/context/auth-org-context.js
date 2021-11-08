import React from 'react';

export default React.createContext({
    token: null,
    organizerId: null,
    loginOrg: (organizerId, token, tokenExpiration) => {},
    logoutOrg: () => {}
});