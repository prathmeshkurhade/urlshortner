
const sessionIdtousermap = new Map();

function setUser(id, user) {
    sessionIdtousermap.set(id, user)
}

function getUser(id) {
    return sessionIdtousermap.get(id)
}

module.exports = {
    setUser,    
    getUser, 
}