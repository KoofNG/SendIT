import router from '../resources/router';

import dbQueries from '../resources/dbQueries';

const user = router;

user.post('/signup', dbQueries.doSignUp);

user.post('/login', dbQueries.doLogin);

export default user;