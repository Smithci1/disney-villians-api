const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('sinon-chai')
const { getVillains, slugger, addNewVillain } = require('../../contollers/villains')
const { mockVillains, sMockVillain } = require('../mocks/mockVillains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let stubbedFindOne



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
    it('retrieves the villain associated with the provided slug from the database and calls res.send with it', async () => {
      stubbedFindOne.returns(sMockVillain)
      const req = { params: { slug: 'Shere Khan' } }
      const stubbedSend = sinon.stub()
      const res = { send: stubbedSend }

      await slugger(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'Shere Khan' }, attributes: ['name', 'movie', 'slug'] })
      expect(stubbedSend).to.have.been.calledWith(sMockVillain)
    })
  })

  describe('addNewVillain', () => {})
})
