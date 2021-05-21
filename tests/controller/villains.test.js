const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
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

    stubbedFindAll = sinon.stub(models.villains, 'findAll')
    stubbedFindOne = sinon.stub(models.villains, 'findOne')
    stubbedCreate = sinon.stub(models.villains, 'create')

    stubbedSend = sinon.stub()
    stubbedStatus = sinon.stub()
    stubbedSendStatus = sinon.stub()
    stubbedStatusSend = sinon.stub()

    res = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })
  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })
  afterEach(() => {
    sandbox.reset()
  })


  describe('getVillains', () => {
    it('retrieves a list of villains from the database and calls with the list',
      async () => {
        stubbedFindAll.returns(mockVillains)


        await getVillains({}, res)

        expect(stubbedFindAll).to.have.been.calledWith({ attributes: ['name', 'movie', 'slug'] })
        expect(stubbedSend).to.have.been.calledWith(mockVillains)
      })
    it('returns a 500 status when an error occurs retrieving villains', async () => {
      stubbedFindAll.throws('ERROR!')

      await getVillains({}, res)

      expect(stubbedFindAll).to.have.calledWith({ attributes: ['name', 'movie', 'slug'] })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('villains are unreachable, please try again')
    })
  })


  describe('slugger', () => {
    it('retrieves the villain associated with the provided slug from the database and calls it with res.send() ',
      async () => {
        stubbedFindOne.returns(singleMockvillain)

        const req = { params: { slug: 'Shere Khan' } }

        await slugger(req, res)

        expect(stubbedFindOne).to.have.been.calledWith({
          where: { slug: 'Shere Khan' },
          attributes: ['name', 'movie', 'slug']
        })
        expect(stubbedSend).to.have.been.calledWith(singleMockvillain)
      })

    it('returns a 404 when no villain is found', async () => {
      stubbedFindOne.returns(null)
      const req = { params: { slug: 'not-found' } }


      await slugger(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'not-found' },
        attributes: ['name', 'movie', 'slug']
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const req = { params: { slug: 'throw-error' } }


      await slugger(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'throw-error' },
        attributes: ['name', 'movie', 'slug']
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('villain is unreachable, please try again')
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
            slug: 'shere-khan'
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
    it('returns a 400 status when the required fiels arent given', async () => {
      const req = { body: { name: 'Shere Khan', movie: 'The Jungle Book' } }

      await addNewVillain(req, res)

      expect(stubbedCreate).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusSend).to.have.been.calledWith('You have not presented the attributes required: name, movie, slug')
    })
    it('returns a 500 status and error message throws-error ', async () => {
      stubbedCreate.throws('ERROR!')
      const req = { body: { name: 'Shere Khan', movie: 'The Jungle Book', slug: 'shere-khan', } }

      await addNewVillain(req, res)

      expect(stubbedCreate).to.have.been.calledWith({
        name: 'Shere Khan',
        movie: 'The Jungle Book',
        slug: 'shere-khan',
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('not able to create villain, please try again')
    })
  })
})
