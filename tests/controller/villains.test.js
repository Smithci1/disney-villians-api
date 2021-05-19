const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { createSandbox } = require('sinon')
const { describe, it } = require('mocha')
const models = require('../../models')
const { getVillains, slugger, addNewVillain } = require('../../controller/villains')
const { mockVillains, singleMockVillain } = require('../mocks/mockVillains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
 let stubbedFindOne
  let res



  describe('getVillains', () => {
    it('retrieves a list of villains from the database and calls res.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(mockVillains)
      const stubbedSend = sinon.stub()
      const res = { send: stubbedSend }

      await getVillains({}, res)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(mockVillains)
    })
  })

  describe('slugger', () => {
    it('retrieves the villain associated with the provi ded slug from the database and calls res.send with it', async () => {
     stubbedFindOne.returns(singleMockVillain)

      const req = { params: { slug: 'Shere-Khan' } }

      
      
      
      await slugger(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'Shere-Khan' }, attributes: ['name', 'movie', 'slug'] })
      expect(stubbedSend).to.have.been.calledWith(singleMockVillain)
    })
  })

  describe('addNewVillain', () => {})
})
