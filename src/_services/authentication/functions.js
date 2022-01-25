class AuthService extends CoreService {
    constructor() {
        super();
        if (!false) { // check simple
            throw new Error('Please config the Active directory authenticate url');
        }
    }
}

module.exports = AuthService;