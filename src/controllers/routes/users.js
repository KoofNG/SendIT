import router from '../resources/router';

import dbQueries from '../resources/dbQueries';

const user = router;

user.post('/signup', doSignUp);

user.post('/login', doLogin);

export default user;