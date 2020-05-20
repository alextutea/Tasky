const validUsers = [
    {
        email: "valid-user1@email.com",
        password: "ASDqwe123!@#",
        username: "valid-user1"
    },
    {
        email: "valid-user2@email.com",
        password: "ASDqwe123!@#",
        username: "valid-user2"
    },
    {
        email: "valid-user3@email.com",
        password: "ASDqwe123!@#",
        username: "valid-user3"
    }
]

const invalidUsers = {
    noEmail: [
        {
            password: "ASDqwe123!@#",
            username: "invalid-user-no-email1"
        }
    ],
    badEmail: [
        {
            email: "a1",
            password: "ASDqwe123!@#",
            username: "invalid-user-bad-email1"
        }
    ],
    noPassword: [
        {
            email: "invalid-user1@email.com",
            username: "invalid-user-no-password"
        }
    ],
    shortPassword: [
        {
            email: "invalid-user1@email.com",
            password: "A",
            username: "invalid-user-short-password"
        }
    ],
    noUsername: [
        {
            email: "invalid-user1@email.com",
            password: "ASDqwe123!@#"
        }
    ],
    shortUsername: [
        {
            email: "invalid-user1@email.com",
            password: "ASDqwe123!@#",
            username: "us"
        }
    ]
}

module.exports = {validUsers, invalidUsers}