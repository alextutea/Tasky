print('Start #################################################################');

db = db.getSiblingDB('tasky_prod_db');
db.createUser(
  {
    user: 'tasky_prod_api',
    pwd: 'ASDqwe123',
    roles: [{ role: 'readWrite', db: 'tasky_prod_db' }],
  },
);
db.createCollection('users');

db = db.getSiblingDB('tasky_dev_db');
db.createUser(
  {
    user: 'tasky_dev_api',
    pwd: 'ASDqwe123',
    roles: [{ role: 'readWrite', db: 'tasky_dev_db' }],
  },
);
db.createCollection('users');

db = db.getSiblingDB('tasky_test_db');
db.createUser(
  {
    user: 'tasky_test_api',
    pwd: 'ASDqwe123',
    roles: [{ role: 'readWrite', db: 'tasky_test_db' }],
  },
);
db.createCollection('users');

print('END #################################################################');