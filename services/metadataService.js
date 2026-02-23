const metadataRepository = require("../repositories/metadataRepository")

async function addStructure(id, label) {
    return metadataRepository.add("structures", id, label)
}

async function renameStructure(id, label) {
    return metadataRepository.rename("structures", id, label)
}

async function removeStructure(id) {
    return metadataRepository.remove("structures", id)
}

async function getStructures() {
    return metadataRepository.getAll("structures")
}

async function getStructureById(id) {
    return metadataRepository.getById("structures", id)    
}

async function getStructureByName(label) {
    return metadataRepository.getByName("structures", label)
}

async function addUserType(id, label) {
    return metadataRepository.add("userTypes", id, label)
}

async function renameUserType(id, label) {
    return metadataRepository.rename("userTypes", id, label)
}

async function removeUserType(id) {
    return metadataRepository.remove("userTypes", id)
}

async function getUserTypes() {
    return metadataRepository.getAll("userTypes")
}

async function getUserTypeById(id) {
    return metadataRepository.getById("userTypes", id)    
}

async function getUserTypeByName(label) {
    return metadataRepository.getByName("userTypes", label)
}

module.exports = {
    addUserType,
    getUserTypes,
    addStructure,
    getStructures,
    removeUserType,
    renameUserType,
    renameStructure,
    removeStructure,
    getUserTypeById,
    getStructureById,
    getUserTypeByName,
    getStructureByName,
}