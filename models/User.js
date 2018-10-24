const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  routines: {
    type: "array",
    items: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        title: {
          type: "string"
        },
        content: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              note: {
                type: "string"
              },
              status: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  usefulsites: {
    type: "array",
    items: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        description: {
          type: "string"
        },
        id: {
          type: "string"
        },
        content: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              description: {
                type: "string"
              },
              url: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  projects: {
    type: "array",
    items: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        description: {
          type: "string"
        },
        createdate: {
          type: "string"
        },
        status: {
          type: "string"
        },
        urls: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              url: {
                type: "string"
              },
              description: {
                type: "string"
              }
            }
          }
        },
        note: {
          type: "string"
        }
      }
    }
  }
});

module.exports = User = mongoose.model("users", UserSchema);
