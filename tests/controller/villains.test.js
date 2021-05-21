const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const { describe, it } = require('mocha')
const models = require('../../models')
const { mockVillains, singleMockvillain } = require('../mocks/mockData')
const { getVillains, slugger, addNewVillain } = require('../../controller/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let res
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let stubbedStatus
  let stubbedSendStatus
  let stubbedStatusSend


  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sinon.stub(models.villains, 'findOne')
    stubbedCreate = sinon.stub(models.villains, 'create')
    stubbedSend = sinon.stub()
    stubbedStatus = sinon.stub()
    stubbedSendStatus = sinon.stub()
    stubbedStatusSend = sandbox.stub()

    res = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus
    }
  })
  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })
  afterEach(() => {
    sandbox.reset()
  })


  describe('getVillains', () => {
    it('retrieves a list of villains from the database and calls res.send() with the list',
      async () => {
        const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(mockVillains)
        const stubbedSend = sinon.stub()
        const res = { send: stubbedSend }

        await getVillains({}, res)

        expect(stubbedFindAll).to.have.callCount(1)
        expect(stubbedSend).to.have.been.calledWith(mockVillains)
      })
  })


  describe('slugger', () => {
    it('retrieves the villain associated with the provided slug from the database and calls it with res.send() ',
      async () => {
        stubbedFindOne.returns(singleMockvillain)
        const stubbedSend = sinon.stub()
        const res = { send: stubbedSend }

        const req = { params: { slug: 'Shere khan' } }

        await slugger(req, res)

        expect(stubbedFindOne).to.have.been.calledWith({
          where: { slug: 'Shere khan' },
          attributes: ['name', 'movie', 'slug']
        })
        expect(stubbedSend).to.have.been.calledWith(singleMockvillain)
      })

    it('returns a 404 when no hero is found', async () => {
      stubbedFindOne.returns(null)
      const req = { params: { slug: 'not-found' } }

      await slugger(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'not-found' }
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })
  describe('addNewVillain', () => {
    it('creates a new villain database item from the data provided and responds with a 200 status and the new item',
      async () => {
        stubbedCreate.returns(singleMockvillain)
        const req = {
          body: {
            name: 'Shere Khan',
            movie: 'The Jungle Book',
            slug: 'shere-khan',
          }
        }

        stubbedStatus.returns({ send: stubbedSend })
        const res = { status: stubbedStatus }

        await addNewVillain(req, res)


        expect(stubbedCreate).to.have.been.calledWith({
          name: 'Shere Khan',
          movie: 'The Jungle Book',
          slug: 'shere-khan',
        })
        expect(stubbedStatus).to.have.been.calledWith(201)
        expect(stubbedSend).to.have.been.calledWith(singleMockvillain)
      })
  })
})
