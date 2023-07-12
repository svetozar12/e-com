// @ts-nocheck
export default [

  {
    name: "Root0",
    rootJson: {
  "options": {
    "go_package": "./user-service"
  },
  "nested": {
    "UserService": {
      "methods": {
        "Register": {
          "requestType": "RegisterRequest",
          "responseType": "RegisterResponse",
          "comment": null
        },
        "GetUser": {
          "requestType": "GetUserRequest",
          "responseType": "User",
          "comment": null
        },
        "UpdateUser": {
          "requestType": "UpdateUserRequest",
          "responseType": "User",
          "comment": null
        },
        "DeleteUser": {
          "requestType": "DeleteUserRequest",
          "responseType": "User",
          "comment": null
        }
      },
      "comment": null
    },
    "AuthenticationService": {
      "methods": {
        "Login": {
          "requestType": "LoginRequest",
          "responseType": "LoginResponse",
          "comment": null
        },
        "VerifyToken": {
          "requestType": "VerifyTokenRequest",
          "responseType": "VerifyTokenResponse",
          "comment": null
        }
      },
      "comment": null
    },
    "GetUserRequest": {
      "fields": {
        "id": {
          "type": "string",
          "id": 1,
          "comment": null
        }
      },
      "comment": "User Service"
    },
    "DeleteUserRequest": {
      "fields": {
        "id": {
          "type": "string",
          "id": 1,
          "comment": null
        }
      },
      "comment": null
    },
    "UpdateUserRequest": {
      "fields": {
        "id": {
          "type": "string",
          "id": 1,
          "comment": null
        },
        "email": {
          "type": "string",
          "id": 2,
          "comment": null
        }
      },
      "comment": null
    },
    "User": {
      "fields": {
        "email": {
          "type": "string",
          "id": 1,
          "comment": null
        }
      },
      "comment": null
    },
    "RegisterRequest": {
      "fields": {
        "email": {
          "type": "string",
          "id": 1,
          "comment": null
        },
        "password": {
          "type": "string",
          "id": 2,
          "comment": null
        }
      },
      "comment": null
    },
    "RegisterResponse": {
      "fields": {
        "token": {
          "type": "string",
          "id": 1,
          "comment": null
        }
      },
      "comment": null
    },
    "LoginRequest": {
      "fields": {
        "email": {
          "type": "string",
          "id": 1,
          "comment": null
        },
        "password": {
          "type": "string",
          "id": 2,
          "comment": null
        }
      },
      "comment": "Authentication Service"
    },
    "LoginResponse": {
      "fields": {
        "token": {
          "type": "string",
          "id": 1,
          "comment": null
        }
      },
      "comment": null
    },
    "VerifyTokenRequest": {
      "fields": {
        "token": {
          "type": "string",
          "id": 1,
          "comment": null
        }
      },
      "comment": null
    },
    "VerifyTokenResponse": {
      "fields": {
        "isValid": {
          "type": "bool",
          "id": 1,
          "comment": null
        }
      },
      "comment": null
    }
  }
},
  },

];