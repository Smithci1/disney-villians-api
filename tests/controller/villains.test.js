const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('sinon-chai')
const { getVillains, slugger, addNewVillain } = require('../../contollers/villains')
const { mockVillains, sMockVillain } = require('../mocks/mockVillains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  describe('getVillains', () => {
    it('retrieves a list of villains from the database and calls res.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(mockVillains)
      const stubbedSend = sinon.stub()
      const res = { send: stubbedSend }

      await getVillains({}, res)
    })
  })

  describe('slugger', () => {})

  describe('addNewVillain', () => {})
})
